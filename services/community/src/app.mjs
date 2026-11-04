import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { openStore } from './store.mjs';
import { random, digest, mac, equal, checkPassword, verifyTotp, encrypt, decrypt, clientIp, ticket, readTicket } from './security.mjs';

class HttpError extends Error { constructor(status, code) { super(code); this.status=status; this.code=code; } }
const fail = (status,code) => { throw new HttpError(status,code); };
const text = (value,min,max) => { if(typeof value!=='string')fail(400,'invalid_input');const s=value.normalize('NFC').trim();if(s.length<min||s.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(s))fail(400,'invalid_input');return s; };
function fields(body,allowed) { if(!body||Array.isArray(body)||typeof body!=='object'||Object.keys(body).some(k=>!allowed.includes(k)))fail(400,'invalid_input'); }
function integer(value,min,max) { if(!Number.isSafeInteger(value)||value<min||value>max)fail(400,'invalid_input');return value; }
async function body(request) {
  if(request.headers['content-type']?.split(';')[0].trim()!=='application/json')fail(415,'json_required');
  if(request.headers['content-encoding'] && request.headers['content-encoding']!=='identity')fail(415,'encoding_not_supported');
  if(Number(request.headers['content-length']||0)>16384)fail(413,'body_too_large');
  let size=0;const chunks=[];
  for await(const chunk of request){size+=chunk.length;if(size>16384)fail(413,'body_too_large');chunks.push(chunk);}
  try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{fail(400,'invalid_json');}
}
const visible = `WITH RECURSIVE visible AS (
  SELECT id,parent,depth,author,body,created,is_admin,id AS root FROM comments WHERE post=? AND status='approved' AND parent IS NULL
  UNION ALL SELECT c.id,c.parent,c.depth,c.author,c.body,c.created,c.is_admin,v.root FROM comments c JOIN visible v ON c.parent=v.id WHERE c.status='approved'
)`;
export async function verifyTurnstile(config,token,ip) {
  try {
    const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
      method:'POST',body:new URLSearchParams({secret:config.captchaSecret,response:token,remoteip:ip}),signal:AbortSignal.timeout(5000)
    });
    if(!response.ok)return false;
    const data=await response.json();
    return data.success===true && (config.allowTestCaptcha || (config.captchaHosts.includes(data.hostname)&&data.action==='comment'));
  } catch { return false; }
}

export function createApplication(config,{verifyCaptcha=verifyTurnstile,now=Date.now}={}) {
  const store=openStore(config.database,config.posts,config.maxDatabaseMiB), {get,all,run,transaction,limit,audit}=store;
  const secret=config.identityKey;
  const credentials=digest(config.secrets.username+config.secrets.passwordHash+config.secrets.totpSecret);
  if(get("SELECT value FROM metadata WHERE key='credentials'")?.value!==credentials)transaction(()=>{run('DELETE FROM sessions');run("DELETE FROM metadata WHERE key='totp_counter'");run("INSERT INTO metadata VALUES('credentials',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",credentials);});
  let captchaInFlight=0,loginInFlight=0;
  const assets=new Map([
    ['/loader.js',['../client/loader.mjs','text/javascript; charset=utf-8']],
    ['/widget.js',['../public/widget.js','text/javascript; charset=utf-8']],
    ['/widget.css',['../public/widget.css','text/css; charset=utf-8']],
    ['/admin/',['../public/admin.html','text/html; charset=utf-8']],
    ['/admin/app.js',['../public/admin.js','text/javascript; charset=utf-8']],
    ['/admin/app.css',['../public/admin.css','text/css; charset=utf-8']]
  ].map(([url,[file,type]])=>[url,{type,bytes:readFileSync(new URL(file,import.meta.url))}]));
  const interval=setInterval(()=>store.prune(now(),config.retentionDays),3600000);interval.unref();store.prune(now(),config.retentionDays);
  const server=createServer({maxHeaderSize:8192},async(request,response)=>{
    const timestamp=now(),requestId=random().slice(0,16);
    const headers={
      'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY',
      'Cross-Origin-Resource-Policy':'cross-origin','Cache-Control':'no-store','X-Request-Id':requestId,
      'Permissions-Policy':'camera=(), microphone=(), geolocation=()',
      'Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"
    };
    if(config.production)headers['Strict-Transport-Security']='max-age=31536000';
    const send=(status,data)=>{if(response.writableEnded)return;response.writeHead(status,{...headers,'Content-Type':'application/json; charset=utf-8'});response.end(JSON.stringify(data));};
    try{
      if(!['GET','POST','OPTIONS'].includes(request.method))fail(405,'method_not_allowed');
      const url=new URL(request.url,config.origin),path=url.pathname,origin=request.headers.origin;
      const admin=path.startsWith('/api/admin/');
      const publicRoute=path.startsWith('/api/public/')||['/health','/loader.js','/widget.js','/widget.css'].includes(path);
      if(publicRoute&&origin){if(!config.origins.includes(origin))fail(403,'origin_denied');headers['Access-Control-Allow-Origin']=origin;headers.Vary='Origin';}
      if(admin&&origin&&origin!==config.origin)fail(403,'origin_denied');
      if(request.method==='OPTIONS'){
        if(!publicRoute||!origin)fail(403,'origin_denied');
        headers['Access-Control-Allow-Methods']='GET, POST, OPTIONS';headers['Access-Control-Allow-Headers']='Content-Type';headers['Access-Control-Max-Age']='600';response.writeHead(204,headers);response.end();return;
      }
      if(path==='/live'&&request.method==='GET'){send(200,{ok:true});return;}
      const asset=assets.get(path);
      if(asset&&request.method==='GET'){
        if(path.startsWith('/admin/')){
          headers['Content-Security-Policy']="default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'";
          headers['Cross-Origin-Resource-Policy']='same-origin';headers['X-Robots-Tag']='noindex, nofollow';
        }else headers['Cache-Control']='public, max-age=300';
        response.writeHead(200,{...headers,'Content-Type':asset.type});response.end(asset.bytes);return;
      }
      const ip=clientIp(request,config.trusted),ipHash=mac(secret,'ip:'+ip),ua=String(request.headers['user-agent']||'').slice(0,1024);
      const rate=(key,max,period)=>{if(!limit(key,max,period,timestamp)){headers['Retry-After']=String(Math.ceil(period/1000));fail(429,'rate_limited');}};
      if(publicRoute){rate('public:global',6000,60000);rate('public:'+ipHash,180,60000);}
      if(request.method==='POST'){
        if(admin?origin!==config.origin:!config.origins.includes(origin))fail(403,'origin_denied');
        if(publicRoute&&get('SELECT 1 FROM blocks WHERE ip_hash=? AND expires>?',ipHash,timestamp))fail(403,'request_denied');
      }
      if(path==='/health'&&request.method==='GET'){
        if(!config.siteKey||!config.captchaSecret)fail(503,'not_ready');
        send(200,{ok:true,version:1,captcha:{provider:'turnstile',siteKey:config.siteKey},maxDepth:4});return;
      }
      const knownPost=(value,commentable=false,archived=false)=>{if(typeof value!=='string'||value.length>250)fail(400,'invalid_post');const p=get('SELECT * FROM posts WHERE path=?',value);if(!p||(!archived&&!p.enabled)||(commentable&&!p.commentable))fail(404,'post_not_found');return p;};
      if(path==='/api/public/comments'&&request.method==='GET'){
        const post=knownPost(url.searchParams.get('post'),true),cursor=Number(url.searchParams.get('cursor')||Number.MAX_SAFE_INTEGER);integer(cursor,1,Number.MAX_SAFE_INTEGER);
        const roots=all("SELECT id FROM comments WHERE post=? AND parent IS NULL AND status='approved' AND id<? ORDER BY id DESC LIMIT 5",post.path,cursor);
        const comments=roots.length?all(visible+` SELECT id,parent,depth,author,body,created,is_admin FROM visible WHERE root IN (${roots.map(()=>'?').join(',')}) ORDER BY root DESC,id ASC LIMIT 505`,post.path,...roots.map(r=>r.id)):[];
        send(200,{comments,total:get(visible+' SELECT count(*) AS n FROM visible',post.path).n,nextCursor:roots.length===5?roots.at(-1).id:null,views:post.views,visitors:get('SELECT count(*) AS n FROM post_visitors WHERE post=?',post.path).n});return;
      }
      if(path==='/api/public/visit-ticket'&&request.method==='POST'){
        rate('ticket:'+ipHash,30,60000);const data=await body(request);fields(data,['post']);knownPost(data.post);
        send(200,{ticket:ticket(secret,{post:data.post,ip:ipHash,issued:timestamp,nonce:random()})});return;
      }
      if(path==='/api/public/visits'&&request.method==='POST'){
        rate('visit:'+ipHash,30,60000);const data=await body(request);fields(data,['post','fingerprint','ticket','language','timezone','screen','referrer']);const post=knownPost(data.post);
        const proof=readTicket(secret,data.ticket);
        if(!proof||proof.post!==post.path||proof.ip!==ipHash||timestamp-proof.issued<1500||timestamp-proof.issued>120000)fail(400,'invalid_visit_ticket');
        if(/bot|spider|crawler|headless|curl|wget|python|monitor/i.test(ua)){send(202,{counted:false});return;}
        const fingerprint=text(data.fingerprint,64,64);if(!/^[a-f0-9]{64}$/.test(fingerprint))fail(400,'invalid_input');
        const language=text(data.language||'unknown',1,40),timezone=text(data.timezone||'unknown',1,80),screen=text(data.screen||'unknown',1,30);
        let referrer='';try{const r=new URL(data.referrer);if(['https:','http:'].includes(r.protocol))referrer=r.origin.slice(0,200);}catch{}
        const visitor=mac(secret,'visitor:'+fingerprint),window=Math.floor(timestamp/1800000),day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tehran'}).format(new Date(timestamp));
        const browser=/Edg\//.test(ua)?'Edge':/Firefox\//.test(ua)?'Firefox':/Chrome\//.test(ua)?'Chrome':/Safari\//.test(ua)?'Safari':'Other';
        const os=/Android/.test(ua)?'Android':/iPhone|iPad/.test(ua)?'iOS':/Windows/.test(ua)?'Windows':/Macintosh/.test(ua)?'macOS':/Linux/.test(ua)?'Linux':'Other';
        const counted=transaction(()=>{
          if(get('SELECT 1 FROM visits WHERE post=? AND visitor=? AND window=?',post.path,visitor,window))return false;
          if(get('SELECT 1 FROM spent_tokens WHERE id=?',digest(data.ticket)))return false;
          run('INSERT INTO spent_tokens VALUES(?,?)',digest(data.ticket),timestamp+120000);
          run('INSERT INTO visitors VALUES(?,?,?) ON CONFLICT(id) DO UPDATE SET last_seen=excluded.last_seen',visitor,timestamp,timestamp);
          run('INSERT OR IGNORE INTO post_visitors VALUES(?,?)',post.path,visitor);
          run('INSERT INTO visits(post,visitor,ip_hash,ip,created,day,browser,os,language,timezone,screen,referrer,window) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',post.path,visitor,ipHash,encrypt(config.encryptionKey,ip),timestamp,day,browser,os,language,timezone,screen,referrer,window);
          run('UPDATE posts SET views=views+1 WHERE path=?',post.path);run('INSERT INTO daily VALUES(?,?,1) ON CONFLICT(post,day) DO UPDATE SET views=views+1',post.path,day);return true;
        });send(200,{counted});return;
      }
      if(path==='/api/public/comments'&&request.method==='POST'){
        rate('comment:second',config.commentsPerSecond,1000);rate('comment:ip:'+ipHash,12,60000);rate('comment:day',2000,86400000);
        const data=await body(request);fields(data,['post','parent','author','body','captchaToken','requestId','website']);const post=knownPost(data.post,true);
        if(data.website)fail(400,'request_denied');
        const author=text(data.author,2,80),message=text(data.body,3,5000),parent=data.parent==null?null:integer(data.parent,1,Number.MAX_SAFE_INTEGER),requestKey=mac(secret,ipHash+text(data.requestId,16,80));
        const payloadHash=digest(JSON.stringify([post.path,parent,author,message]));
        const previous=get('SELECT id,payload_hash FROM comments WHERE request_key=?',requestKey);
        if(previous){if(previous.payload_hash!==payloadHash)fail(409,'request_conflict');send(202,{status:'pending'});return;}
        let depth=0;
        const checkParent=()=>{const p=get(visible+' SELECT depth,root FROM visible WHERE id=?',post.path,parent);if(!p)fail(400,'invalid_parent');if(p.depth>=4)fail(400,'max_depth');const count=get('WITH RECURSIVE thread AS (SELECT id FROM comments WHERE id=? UNION ALL SELECT c.id FROM comments c JOIN thread t ON c.parent=t.id) SELECT count(*) AS n FROM thread',p.root).n;if(count>=101)fail(400,'thread_full');return p.depth+1;};
        if(parent)depth=checkParent();
        if(get("SELECT count(*) AS n FROM comments WHERE status='pending'").n>=10000)fail(503,'queue_full');
        rate('comment:success:'+ipHash,3,600000);rate('comment:daily:'+ipHash,20,86400000);
        const token=text(data.captchaToken,1,2048);if(!config.captchaSecret||!config.siteKey)fail(503,'not_ready');
        const claimed=run('INSERT OR IGNORE INTO spent_tokens VALUES(?,?)',digest(token),timestamp+300000);if(!claimed.changes)fail(400,'captcha_failed');
        if(captchaInFlight>=8)fail(503,'busy');
        let valid=false;captchaInFlight++;try{valid=await verifyCaptcha(config,token,ip);}finally{captchaInFlight--;}
        if(!valid)fail(400,'captcha_failed');
        transaction(()=>{
          if(parent)checkParent();
          run("INSERT INTO comments(post,parent,depth,author,body,status,created,updated,ip_hash,ip,request_key,payload_hash) VALUES(?,?,?,?,?,'pending',?,?,?,?,?,?)",post.path,parent,depth,author,message,timestamp,timestamp,ipHash,encrypt(config.encryptionKey,ip),requestKey,payloadHash);
        });send(202,{status:'pending'});return;
      }
      if(admin){
        headers['Cross-Origin-Resource-Policy']='same-origin';headers['X-Robots-Tag']='noindex, nofollow';
        if(request.headers['sec-fetch-site']&&request.headers['sec-fetch-site']!=='same-origin'&&request.headers['sec-fetch-site']!=='none')fail(403,'origin_denied');
        rate('admin:requests:'+ipHash,240,60000);
        if(path==='/api/admin/login'&&request.method==='POST'){
          rate('login:'+ipHash,5,900000);rate('login:global',100,900000);
          const data=await body(request);fields(data,['username','password','code']);const username=text(data.username,1,80),password=text(data.password,1,256),code=text(data.code,6,6);
          if(loginInFlight>=2)fail(503,'busy');let passwordOK;loginInFlight++;try{passwordOK=await checkPassword(password,config.secrets.passwordHash);}finally{loginInFlight--;}
          if(!passwordOK||!equal(username,config.secrets.username)){audit(timestamp,'failed_login','admin',{},ipHash);fail(401,'invalid_credentials');}
          const csrf=random(),session=random();
          try{transaction(()=>{
            const previous=Number(get("SELECT value FROM metadata WHERE key='totp_counter'")?.value??-1),counter=verifyTotp(config.secrets.totpSecret,code,timestamp,previous);
            if(counter===null)fail(401,'invalid_credentials');
            run("INSERT INTO metadata VALUES('totp_counter',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",String(counter));
            run('DELETE FROM sessions');run('INSERT INTO sessions VALUES(?,?,?,?,?)',digest(session),csrf,timestamp,timestamp,mac(secret,ua));audit(timestamp,'login','admin',{},ipHash);
          });}catch(error){if(error.code==='invalid_credentials')audit(timestamp,'failed_login','admin',{},ipHash);throw error;}
          headers['Set-Cookie']=`${config.production?'__Host-':''}community_session=${session}; HttpOnly; ${config.production?'Secure; ':''}SameSite=Strict; Path=/; Max-Age=28800`;
          send(200,{csrf,username:config.secrets.username});return;
        }
        const cookies=String(request.headers.cookie||'').split(';').map(x=>x.trim()),cookie=cookies.find(x=>x.startsWith(`${config.production?'__Host-':''}community_session=`))?.split('=')[1]||'';
        const session=get('SELECT * FROM sessions WHERE id=?',digest(cookie));
        if(!session||timestamp-session.created>config.sessionAge||timestamp-session.touched>config.sessionIdle||!equal(session.ua,mac(secret,ua)))fail(401,'authentication_required');
        if(request.method==='POST'&&!equal(session.csrf,String(request.headers['x-csrf-token']||'')))fail(403,'csrf_failed');
        run('UPDATE sessions SET touched=? WHERE id=?',timestamp,session.id);
        if(path==='/api/admin/session'&&request.method==='GET'){
          send(200,{username:config.secrets.username,csrf:session.csrf});return;
        }
        if(path==='/api/admin/logout'&&request.method==='POST'){
          transaction(()=>{run('DELETE FROM sessions WHERE id=?',session.id);audit(timestamp,'logout','admin',{},ipHash);});headers['Set-Cookie']=`${config.production?'__Host-':''}community_session=; HttpOnly; ${config.production?'Secure; ':''}SameSite=Strict; Path=/; Max-Age=0`;send(200,{ok:true});return;
        }
        if(path==='/api/admin/comments'&&request.method==='GET'){
          const status=url.searchParams.get('status')||'pending';if(!['pending','approved','rejected','spam','deleted'].includes(status))fail(400,'invalid_input');
          const cursor=integer(Number(url.searchParams.get('cursor')||Number.MAX_SAFE_INTEGER),1,Number.MAX_SAFE_INTEGER),post=url.searchParams.get('post')||'';if(post)knownPost(post,false,true);
          const comments=all('SELECT c.*,p.title FROM comments c JOIN posts p ON p.path=c.post WHERE c.status=? AND c.id<? AND (?=\'\' OR c.post=?) ORDER BY c.id DESC LIMIT 40',status,cursor,post,post).map(({ip,request_key,payload_hash,...c})=>({...c,hasIp:Boolean(ip)}));
          send(200,{comments,nextCursor:comments.length===40?comments.at(-1).id:null});return;
        }
        const moderation=/^\/api\/admin\/comments\/(\d+)\/(moderate|reply|block)$/.exec(path);
        if(moderation&&request.method==='POST'){
          const id=integer(Number(moderation[1]),1,Number.MAX_SAFE_INTEGER),comment=get('SELECT * FROM comments WHERE id=?',id);if(!comment)fail(404,'not_found');const data=await body(request);
          if(moderation[2]==='moderate'){
            fields(data,['status']);if(!['approved','rejected','spam','deleted'].includes(data.status))fail(400,'invalid_input');
            if(data.status==='approved')knownPost(comment.post);
            transaction(()=>{run('UPDATE comments SET status=?,updated=? WHERE id=?',data.status,timestamp,id);audit(timestamp,'moderate',id,{before:comment.status,after:data.status},ipHash);});
          }else if(moderation[2]==='reply'){
            fields(data,['body']);knownPost(comment.post);const message=text(data.body,3,5000);if(!get(visible+' SELECT 1 FROM visible WHERE id=?',comment.post,id)||comment.depth>=4)fail(400,'invalid_parent');
            const root=get(visible+' SELECT root FROM visible WHERE id=?',comment.post,id).root;
            if(get('WITH RECURSIVE thread AS (SELECT id FROM comments WHERE id=? UNION ALL SELECT c.id FROM comments c JOIN thread t ON c.parent=t.id) SELECT count(*) AS n FROM thread',root).n>=101)fail(400,'thread_full');
            transaction(()=>{run("INSERT INTO comments(post,parent,depth,author,body,status,created,updated,ip_hash,request_key,payload_hash,is_admin) VALUES(?,?,?,?,?,'approved',?,?,?,?,?,1)",comment.post,id,comment.depth+1,config.adminName,message,timestamp,timestamp,ipHash,random(),digest(message));audit(timestamp,'reply',id,{},ipHash);});
          }else{
            fields(data,['reason','days']);const reason=text(data.reason,3,200),days=integer(data.days,1,90);
            transaction(()=>{run('INSERT INTO blocks VALUES(?,?,?) ON CONFLICT(ip_hash) DO UPDATE SET reason=excluded.reason,expires=excluded.expires',comment.ip_hash,reason,timestamp+days*86400000);audit(timestamp,'block',id,{days,reason},ipHash);});
          }
          send(200,{ok:true});return;
        }
        if(path==='/api/admin/blocks'&&request.method==='GET'){send(200,{blocks:all('SELECT * FROM blocks WHERE expires>? ORDER BY expires DESC LIMIT 200',timestamp)});return;}
        if(path==='/api/admin/unblock'&&request.method==='POST'){
          const data=await body(request);fields(data,['ipHash']);if(!/^[a-f0-9]{64}$/.test(data.ipHash))fail(400,'invalid_input');transaction(()=>{run('DELETE FROM blocks WHERE ip_hash=?',data.ipHash);audit(timestamp,'unblock',data.ipHash,{},ipHash);});send(200,{ok:true});return;
        }
        if(path==='/api/admin/stats'&&request.method==='GET'){
          const days=Math.min(integer(Number(url.searchParams.get('days')||30),1,365),config.retentionDays),post=url.searchParams.get('post')||'';if(post)knownPost(post,false,true);const since=timestamp-days*86400000;
          const summary=get('SELECT count(*) AS views,count(DISTINCT visitor) AS visitors,count(DISTINCT ip_hash) AS ips FROM visits WHERE created>=? AND (?=\'\' OR post=?)',since,post,post);
          const daily=all('SELECT day,count(*) AS views,count(DISTINCT visitor) AS visitors FROM visits WHERE created>=? AND (?=\'\' OR post=?) GROUP BY day ORDER BY day',since,post,post);
          const posts=all(`SELECT p.path,p.title,p.locale,p.enabled,p.views,(SELECT count(*) FROM post_visitors pv WHERE pv.post=p.path) AS visitors,(SELECT count(*) FROM visits v WHERE v.post=p.path AND v.created>=?) AS periodViews,(SELECT count(*) FROM comments c WHERE c.post=p.path AND c.status='pending') AS pending FROM posts p ORDER BY p.views DESC,p.path`,since);
          const breakdown=column=>all(`SELECT ${column} AS label,count(*) AS count FROM visits WHERE created>=? AND (?='' OR post=?) GROUP BY ${column} ORDER BY count DESC LIMIT 20`,since,post,post);
          send(200,{days,retentionDays:config.retentionDays,summary,daily,posts,lifetime:{views:get('SELECT coalesce(sum(views),0) AS n FROM posts').n,visitors:get('SELECT count(*) AS n FROM visitors').n,pending:get("SELECT count(*) AS n FROM comments WHERE status='pending'").n},browsers:breakdown('browser'),systems:breakdown('os'),languages:breakdown('language'),referrers:breakdown('referrer')});return;
        }
        if(path==='/api/admin/visits'&&request.method==='GET'){
          const cursor=integer(Number(url.searchParams.get('cursor')||Number.MAX_SAFE_INTEGER),1,Number.MAX_SAFE_INTEGER),post=url.searchParams.get('post')||'';if(post)knownPost(post,false,true);
          const visits=all('SELECT * FROM visits WHERE id<? AND (?=\'\' OR post=?) ORDER BY id DESC LIMIT 40',cursor,post,post).map(({ip,visitor,...v})=>({...v,ip:decrypt(config.encryptionKey,ip),fingerprint:visitor.slice(0,16)}));
          audit(timestamp,'view_visit_details',post||'all',{count:visits.length},ipHash);send(200,{visits,nextCursor:visits.length===40?visits.at(-1).id:null});return;
        }
        if(path==='/api/admin/audit'&&request.method==='GET'){send(200,{events:all('SELECT * FROM audit ORDER BY id DESC LIMIT 100')});return;}
      }
      fail(404,'not_found');
    }catch(error){
      if(!(error instanceof HttpError))console.error(JSON.stringify({requestId,error:'internal_error'}));
      if(!response.headersSent)send(error.status||500,{error:error.code||'internal_error',requestId});else response.destroy();
    }
  });
  server.requestTimeout=10000;server.headersTimeout=10000;server.keepAliveTimeout=5000;server.maxConnections=256;server.maxRequestsPerSocket=100;
  let closing;
  return {server,store,close:()=>closing??=(async()=>{clearInterval(interval);await new Promise(resolve=>server.close(resolve));store.close();})()};
}
