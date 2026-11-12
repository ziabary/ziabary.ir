import {createHash} from 'node:crypto';
import {createPageRegistry} from './pages.mjs';

// GA4 exports include comments before the header and may contain quoted newlines.
function csvRows(text) {
  if (Buffer.byteLength(text) > 5 * 1024 * 1024) throw Error('CSV exceeds 5 MiB.');
  const rows=[]; let row=[], field='', quoted=false, closed=false;
  const push=()=>{row.push(field);field='';closed=false;};
  for(let i=0;i<text.length;i++) {
    const c=text[i];
    if(quoted) {
      if(c==='"') { if(text[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;} }
      else field+=c;
    } else if(c===',') push();
    else if(c==='\n'||c==='\r') {
      if(c==='\r'&&text[i+1]==='\n')i++;
      push();rows.push(row);row=[];
      if(rows.length>10000)throw Error('CSV exceeds 10,000 rows.');
    } else if(c==='"'&&!field&&!closed) quoted=true;
    else { if(closed||c==='"')throw Error('Malformed CSV quoting.');field+=c; }
  }
  if(quoted)throw Error('Unclosed CSV field.');
  if(field||row.length||closed){push();rows.push(row);}
  return rows;
}

function reportDate(text, label) {
  const match=new RegExp('# '+label+': (\\d{4})(\\d{2})(\\d{2})').exec(text);
  const day=match&&`${match[1]}-${match[2]}-${match[3]}`;
  if(!day||!Number.isFinite(Date.parse(day))||new Date(day).toISOString().slice(0,10)!==day)throw Error('Missing or invalid GA4 report dates.');
  return day;
}

export function parseViewReport(csv, multiplier) {
  if(!Number.isSafeInteger(multiplier)||multiplier<1||multiplier>100)throw Error('Multiplier must be an integer from 1 to 100.');
  csv=csv.replace(/^\uFEFF/,'');
  const start=reportDate(csv,'Fecha de inicio'),end=reportDate(csv,'Fecha de finalización');
  if(start>end)throw Error('Report start date is after its end date.');
  const rows=csvRows(csv).filter(row=>row.some(Boolean)&&!row[0].startsWith('#'));
  const header=rows.shift(),pathIndex=header?.indexOf('Ruta de página y clase de pantalla'),viewsIndex=header?.indexOf('Vistas'),visitorsIndex=header?.indexOf('Usuarios activos');
  if(!(pathIndex>=0&&viewsIndex>=0&&visitorsIndex>=0))throw Error('Expected GA4 page-path, Vistas and Usuarios activos columns.');
  const paths=new Map(),seen=new Set();let ignored=0;
  for(const row of rows) {
    if(row.length!==header.length||!/^\d+$/.test(row[viewsIndex])||!/^\d+$/.test(row[visitorsIndex]))throw Error('Invalid CSV row or count.');
    const raw=row[pathIndex],views=Number(row[viewsIndex])*multiplier,visitors=Number(row[visitorsIndex])*multiplier;
    if(!Number.isSafeInteger(views)||!Number.isSafeInteger(visitors))throw Error('Count exceeds the safe integer range.');
    if(seen.has(raw))throw Error(`Duplicate CSV path: ${raw}`);
    seen.add(raw);
    if(!/^\/(?:en\/|es\/)?articles\/[a-z0-9_-]+\/?$/.test(raw)){ignored++;continue;}
    const path=raw.endsWith('/')?raw:raw+'/';
    const before=paths.get(path)||{views:0,visitors:0},sum={views:before.views+views,visitors:before.visitors+visitors};
    if(!Number.isSafeInteger(sum.views)||!Number.isSafeInteger(sum.visitors))throw Error('Count exceeds the safe integer range.');
    paths.set(path,sum);
  }
  const entries=[...paths].sort(([a],[b])=>a.localeCompare(b)).map(([path,counts])=>({path,...counts}));
  const hash=entries=>createHash('sha256').update(JSON.stringify({start,end,multiplier,entries})).digest('hex');
  // Keep the original view fingerprint compatible with imports made before visitor support.
  const fingerprint=hash(entries.map(({path,views})=>({path,views})));
  const visitorFingerprint=hash(entries.map(({path,visitors})=>({path,visitors})));
  return {id:`ga4:${start}:${end}`,fingerprint,visitorFingerprint,start,end,multiplier,entries,ignored};
}

export function existingViewImport(store, report) {
  const existing=store.get('SELECT * FROM historical_imports WHERE id=?',report.id);
  if(existing) {
    if(existing.fingerprint!==report.fingerprint)throw Error('This report period was already imported with different counts or multiplier.');
    const visitors=store.get('SELECT fingerprint FROM historical_visitor_imports WHERE source=?',report.id);
    if(visitors&&visitors.fingerprint!==report.visitorFingerprint)throw Error('This report period was already imported with different visitor counts.');
    return {...existing,visitorsImported:Boolean(visitors),visitorEstimates:store.get('SELECT coalesce(sum(visitors),0) AS n FROM historical_visitors WHERE source=?',report.id).n};
  }
  if(store.get('SELECT id FROM historical_imports WHERE start_day<=? AND end_day>=?',report.end,report.start))throw Error('Report dates overlap an earlier historical import.');
  return null;
}

export async function verifyViewReport(report,{siteOrigin,fetchPage=fetch,timeoutMs=15000,retries=2,onRetry=()=>{}}) {
  const entries=[],skipped=[];
  const registry=createPageRegistry({siteOrigin,fetchPage,timeoutMs,unavailableCacheMs:0,onVerified:()=>{},onMissing:()=>{}});
  try {
    for(const entry of report.entries) {
      try {
        let post;
        for(let attempt=0;;attempt++){
          try{post=await registry.resolve(entry.path);break;}
          catch(error){
            const upstreamStatus=error.cause?.status;
            const retryable=error.status===503&&(!upstreamStatus||[408,425,429,500,502,503,504].includes(upstreamStatus));
            if(!retryable||attempt>=retries)throw error;
            onRetry({path:entry.path,attempt:attempt+2,maxAttempts:retries+1});
            await new Promise(resolve=>setTimeout(resolve,250*(attempt+1)));
          }
        }
        if(!post.commentable){skipped.push({path:entry.path,reason:'not_public_article'});continue;}
        entries.push({...post,views:entry.views,visitors:entry.visitors});
      } catch(error) {
        if(error.status===404){skipped.push({path:entry.path,reason:'not_public_article'});continue;}
        throw Error(`Could not verify ${entry.path}; no counts imported.`,{cause:error});
      }
    }
  } finally {registry.close();}
  return totalReport({...report,entries,skipped});
}

function totalReport(report) {
  const views=report.entries.reduce((sum,entry)=>sum+entry.views,0),visitorEstimates=report.entries.reduce((sum,entry)=>sum+entry.visitors,0);
  if(!Number.isSafeInteger(views)||!Number.isSafeInteger(visitorEstimates))throw Error('Total exceeds the safe integer range.');
  return {...report,views,visitorEstimates};
}

// A visitor-only upgrade uses exactly the original import's article set, even if
// an article has since been withdrawn. It neither adds views nor registers new posts.
export function existingVisitorReport(store, report) {
  const paths=new Set(store.all('SELECT post FROM historical_views WHERE source=?',report.id).map(row=>row.post));
  return totalReport({...report,entries:report.entries.filter(entry=>paths.has(entry.path)),skipped:[]});
}

/** A single transaction preserves live increments and prevents concurrent/repeated imports. */
export function applyViewReport(store, report, now=Date.now()) {
  if(!report.entries.length)throw Error('No public articles matched the report.');
  return store.transaction(()=>{
    const existing=existingViewImport(store,report);
    if(existing?.visitorsImported)return {applied:false,posts:existing.posts,views:existing.views,visitorEstimates:existing.visitorEstimates};
    if(existing)report=existingVisitorReport(store,report);
    else {
      store.run('INSERT INTO historical_imports VALUES(?,?,?,?,?,?,?,?)',report.id,report.fingerprint,report.start,report.end,report.multiplier,now,report.entries.length,report.views);
      for(const post of report.entries) {
        const before=store.get('SELECT views FROM posts WHERE path=?',post.path)?.views||0;
        if(!Number.isSafeInteger(before+post.views))throw Error('Total exceeds the safe integer range.');
        store.run('INSERT INTO posts(path,title,locale,commentable,views) VALUES(?,?,?,?,?) ON CONFLICT(path) DO UPDATE SET views=posts.views+excluded.views',post.path,post.title,post.locale,1,post.views);
        store.run('INSERT INTO historical_views VALUES(?,?,?)',report.id,post.path,post.views);
      }
      store.audit(now,'import_historical_views',report.id,{multiplier:report.multiplier,posts:report.entries.length,views:report.views},'cli');
    }
    store.run('INSERT INTO historical_visitor_imports VALUES(?,?,?)',report.id,report.visitorFingerprint,now);
    for(const post of report.entries)store.run('INSERT INTO historical_visitors VALUES(?,?,?)',report.id,post.path,post.visitors);
    store.audit(now,'import_historical_visitors',report.id,{multiplier:report.multiplier,posts:report.entries.length,visitorEstimates:report.visitorEstimates},'cli');
    return {applied:true,viewsAlreadyImported:Boolean(existing),posts:report.entries.length,views:report.views,visitorEstimates:report.visitorEstimates};
  });
}
