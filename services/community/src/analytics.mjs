const dayFormatter=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tehran',year:'numeric',month:'2-digit',day:'2-digit'});
export const analyticsDay=timestamp=>dayFormatter.format(new Date(timestamp));
const shiftDay=(day,offset)=>new Date(Date.parse(day+'T12:00:00Z')+offset*86400000).toISOString().slice(0,10);
const dimensions={browser:'browsers',os:'systems',language:'languages',referrer:'referrers'};

export function createAnalytics(store,{now=Date.now,retentionDays=1095}={}) {
  const {run,get,all,transaction,db}=store;
  // Only the first upgrade scans retained detail rows. All subsequent reads use summaries.
  if(!get("SELECT value FROM metadata WHERE key='analytics:version'"))transaction(()=>{
    db.exec(`
      CREATE TABLE analytics_daily(scope TEXT NOT NULL,day TEXT NOT NULL,views INTEGER NOT NULL,visitors INTEGER,ips INTEGER,PRIMARY KEY(scope,day)) WITHOUT ROWID;
      CREATE INDEX analytics_daily_day ON analytics_daily(day,scope);
      CREATE TABLE analytics_dimensions(scope TEXT NOT NULL,dimension TEXT NOT NULL,day TEXT NOT NULL,label TEXT NOT NULL,views INTEGER NOT NULL,PRIMARY KEY(scope,dimension,day,label)) WITHOUT ROWID;
      CREATE INDEX analytics_dimensions_day ON analytics_dimensions(day);
      CREATE TABLE analytics_identities(scope TEXT NOT NULL,kind TEXT NOT NULL,identity TEXT NOT NULL,last_day TEXT NOT NULL,PRIMARY KEY(scope,kind,identity)) WITHOUT ROWID;
      CREATE INDEX analytics_identities_last_day ON analytics_identities(scope,kind,last_day);
      CREATE INDEX analytics_identities_expiry ON analytics_identities(last_day);
      CREATE TABLE analytics_day_identities(scope TEXT NOT NULL,day TEXT NOT NULL,kind TEXT NOT NULL,identity TEXT NOT NULL,PRIMARY KEY(scope,day,kind,identity)) WITHOUT ROWID;
      CREATE INDEX analytics_day_identities_day ON analytics_day_identities(day);
    `);
    const legacy=Boolean(get("SELECT name FROM sqlite_master WHERE type='table' AND name='daily'"));
    if(legacy){
      run('INSERT INTO analytics_daily SELECT post,day,views,NULL,NULL FROM daily');
      run("INSERT INTO analytics_daily SELECT '',day,sum(views),NULL,NULL FROM daily GROUP BY day");
    }
    for(const scope of ['post',"''"]){
      run(`INSERT INTO analytics_daily SELECT ${scope},day,count(*),count(DISTINCT visitor),count(DISTINCT ip_hash) FROM visits GROUP BY ${scope==='post'?'post,':''}day
        ON CONFLICT(scope,day) DO UPDATE SET views=max(analytics_daily.views,excluded.views),
        visitors=CASE WHEN analytics_daily.views>excluded.views THEN NULL ELSE excluded.visitors END,
        ips=CASE WHEN analytics_daily.views>excluded.views THEN NULL ELSE excluded.ips END`);
      for(const [kind,column] of [['visitor','visitor'],['ip','ip_hash']]){
        run(`INSERT INTO analytics_identities SELECT ${scope},?,${column},max(day) FROM visits GROUP BY ${scope==='post'?'post,':''}${column}`,kind);
        run(`INSERT INTO analytics_day_identities SELECT ${scope},day,?,${column} FROM visits WHERE day=? GROUP BY ${scope==='post'?'post,':''}day,${column}`,kind,analyticsDay(now()));
      }
      for(const column of Object.keys(dimensions))run(`INSERT INTO analytics_dimensions SELECT ${scope},?,day,${column},count(*) FROM visits GROUP BY ${scope==='post'?'post,':''}day,${column}`,column);
    }
    if(legacy)db.exec('DROP TABLE daily');
    run("INSERT INTO metadata VALUES('analytics:version','1')");db.exec('PRAGMA user_version=3');
  });

  // Called inside the accepted visit's transaction: detail and summaries commit together.
  function record({post,day,visitor,ipHash,browser,os,language,referrer}) {
    const values={browser,os,language,referrer};
    for(const scope of ['',post]){
      const unique={};
      for(const [kind,identity] of [['visitor',visitor],['ip',ipHash]]){
        unique[kind]=Number(run('INSERT OR IGNORE INTO analytics_day_identities VALUES(?,?,?,?)',scope,day,kind,identity).changes);
        run('INSERT INTO analytics_identities VALUES(?,?,?,?) ON CONFLICT(scope,kind,identity) DO UPDATE SET last_day=excluded.last_day WHERE excluded.last_day>analytics_identities.last_day',scope,kind,identity,day);
      }
      run('INSERT INTO analytics_daily VALUES(?,?,1,?,?) ON CONFLICT(scope,day) DO UPDATE SET views=views+1,visitors=visitors+excluded.visitors,ips=ips+excluded.ips',scope,day,unique.visitor,unique.ip);
      for(const column of Object.keys(dimensions))run('INSERT INTO analytics_dimensions VALUES(?,?,?,?,1) ON CONFLICT(scope,dimension,day,label) DO UPDATE SET views=views+1',scope,column,day,values[column]);
    }
  }

  function maintain(timestamp) {
    const today=analyticsDay(timestamp),stamp=JSON.stringify([today,retentionDays]);
    if(get("SELECT value FROM metadata WHERE key='analytics:maintenance'")?.value===stamp)return false;
    transaction(()=>{
      const firstDay=shiftDay(today,1-retentionDays);
      run('DELETE FROM analytics_day_identities WHERE day<?',today);
      run('DELETE FROM analytics_daily WHERE day<?',firstDay);
      run('DELETE FROM analytics_dimensions WHERE day<?',firstDay);
      run('DELETE FROM analytics_identities WHERE last_day<?',firstDay);
      run("INSERT INTO metadata VALUES('analytics:maintenance',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",stamp);
    });return true;
  }

  function stats({timestamp,days,post=''}) {
    days=Math.min(days,retentionDays);
    const today=analyticsDay(timestamp),firstDay=shiftDay(today,1-days);
    const totals=get('SELECT coalesce(sum(views),0) AS views,count(*)-count(visitors) AS unknownVisitors,count(*)-count(ips) AS unknownIps FROM analytics_daily WHERE scope=? AND day>=? AND day<=?',post,firstDay,today);
    const unique=kind=>get('SELECT count(*) AS n FROM analytics_identities WHERE scope=? AND kind=? AND last_day>=? AND last_day<=?',post,kind,firstDay,today).n;
    const summary={views:totals.views,visitors:totals.unknownVisitors?null:unique('visitor'),ips:totals.unknownIps?null:unique('ip')};
    const byDay=new Map(all('SELECT day,views,visitors FROM analytics_daily WHERE scope=? AND day>=? AND day<=? ORDER BY day',post,firstDay,today).map(row=>[row.day,row]));
    const daily=Array.from({length:days},(_,index)=>{const day=shiftDay(firstDay,index);return byDay.get(day)||{day,views:0,visitors:0};});
    const posts=all(`WITH period AS (SELECT scope,sum(views) AS views FROM analytics_daily WHERE day>=? AND day<=? GROUP BY scope)
      SELECT p.path,p.title,p.locale,p.enabled,p.views,(SELECT coalesce(sum(h.views),0) FROM historical_views h WHERE h.post=p.path) AS historicalViews,
      (SELECT coalesce(sum(hv.visitors),0) FROM historical_visitors hv WHERE hv.post=p.path) AS historicalVisitors,
      (SELECT count(*) FROM post_visitors pv WHERE pv.post=p.path)+(SELECT coalesce(sum(hv.visitors),0) FROM historical_visitors hv WHERE hv.post=p.path) AS visitors,coalesce(period.views,0) AS periodViews,
      (SELECT count(*) FROM comments c WHERE c.post=p.path AND c.status='pending') AS pending FROM posts p LEFT JOIN period ON period.scope=p.path ORDER BY p.views DESC,p.path`,firstDay,today);
    const breakdowns={};
    for(const [column,key] of Object.entries(dimensions))breakdowns[key]=all('SELECT label,sum(views) AS count FROM analytics_dimensions WHERE scope=? AND dimension=? AND day>=? AND day<=? GROUP BY label ORDER BY count DESC,label LIMIT 20',post,column,firstDay,today);
    return {days,retentionDays,firstDay,lastDay:today,summary,daily,posts,breakdownsComplete:!totals.unknownVisitors&&!totals.unknownIps,...breakdowns};
  }
  return {record,maintain,stats,retentionDays};
}
