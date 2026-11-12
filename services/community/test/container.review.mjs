// Run from services/community after: docker build -t ziabary-community:local .
// All credentials, database and containers created here are disposable test fixtures.
import assert from 'node:assert/strict';import {mkdtemp,writeFile,rm} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join} from 'node:path';import {promisify} from 'node:util';import {execFile} from 'node:child_process';import {randomBytes} from 'node:crypto';
import {passwordHash} from '../src/security.mjs';import {posts,password,pageHtml} from './helpers.mjs';
const execute=promisify(execFile),name='ziabary-community-review-'+process.pid,volume=name+'-data',directory=await mkdtemp(join(tmpdir(),'community-container-'));
const secrets={username:'admin',passwordHash:await passwordHash(password),identityKey:randomBytes(32).toString('base64'),encryptionKey:randomBytes(32).toString('base64')};
await writeFile(join(directory,'secrets.json'),JSON.stringify(secrets),{mode:0o600});await writeFile(join(directory,'bootstrap.txt'),`Username: admin\nPassword: ${password}\nARCAPTCHA_SITE_KEY: 0000000000\nARCAPTCHA_SECRET_KEY: 00000000000000000000\n`,{mode:0o600});
const docker=(...args)=>execute('docker',args,{maxBuffer:1024*1024});
const base='http://127.0.0.1:8788';
const fresh={path:'/articles/after-start/',title:'Published after service startup',locale:'fa',commentable:true};
// Disposable HTTP website fixture; no catalogue is mounted into the service.
const websiteScript=`import {createServer} from 'node:http';const pages=${JSON.stringify(Object.fromEntries(posts.map(p=>[p.path,pageHtml(p)])))};createServer((req,res)=>{if(req.url==='/publish'){pages[${JSON.stringify(fresh.path)}]=${JSON.stringify(pageHtml(fresh))};res.end('published');return;}const html=pages[req.url];res.writeHead(html?200:404,{'Content-Type':'text/html'});res.end(html||'Not found');}).listen(5195,'127.0.0.1');`;
async function startWebsite(){
 await docker('exec','-d',name,'node','--input-type=module','-e',websiteScript);
 for(let i=0;i<30;i++){try{await docker('exec',name,'node','-e',"fetch('http://127.0.0.1:5195/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))");return;}catch{await new Promise(r=>setTimeout(r,100));}}
 throw Error('Website fixture did not start');
}
async function api(path,body,auth={}){const r=await fetch(base+path,{method:body?'POST':'GET',headers:{'User-Agent':'Mozilla/5.0 Chrome/140.0.0.0',...(body?{'Content-Type':'application/json',Origin:auth.admin?base:'http://127.0.0.1:5195'}:{}),...(auth.cookie?{Cookie:auth.cookie}:{}),...(auth.csrf?{'X-CSRF-Token':auth.csrf}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(10000)});return {status:r.status,data:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]};}
try{
 await docker('run','-d','--name',name,'--read-only','--cap-drop=ALL','--security-opt=no-new-privileges','--memory=256m','--cpus=1','--pids-limit=64','--tmpfs','/tmp:rw,noexec,nosuid,size=16m','-p','127.0.0.1:8788:8787','--mount',`type=bind,src=${directory}/secrets.json,dst=/run/secrets/community,readonly`,'--mount',`type=bind,src=${directory}/bootstrap.txt,dst=/run/secrets/bootstrap,readonly`,'--mount',`type=volume,src=${volume},dst=/data`,'-e','NODE_ENV=development','-e','PUBLIC_URL='+base,'-e','SITE_ORIGINS=http://127.0.0.1:5195','ziabary-community:local');
 let healthy=false;for(let i=0;i<60;i++){try{if((await api('/health')).status===200){healthy=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}if(!healthy){const logs=await docker('logs',name);throw Error('Container failed readiness: '+logs.stderr);}
 assert.equal((await docker('exec',name,'id','-u')).stdout.trim(),'1000');await assert.rejects(()=>docker('exec',name,'node','-e',"require('fs').writeFileSync('/app/blocked','x')"));
 await assert.rejects(()=>docker('exec',name,'node','-e',"require('fs').accessSync('/app/config/posts.json')"));
 await startWebsite();
 await docker('exec',name,'node','-e',"fetch('http://127.0.0.1:5195/publish').then(r=>process.exit(r.ok?0:1))");
 assert.equal((await api('/api/public/comments?post='+fresh.path)).status,200);
 const pending=await api('/api/public/comments',{post:posts[1].path,parent:null,author:'آزمون کانتینر',body:'ثبت نظر با اعتبارسنجی واقعی کلید آزمایشی کپچا',captchaToken:'000000000000000000000000000000',requestId:'container-review-unique-request',website:''});assert.equal(pending.status,202,JSON.stringify(pending));
 assert.equal((await api('/api/public/comments?post='+posts[1].path)).data.comments.length,0);
 const login=await api('/api/admin/login',{username:'admin',password},{admin:true});assert.equal(login.status,200);const auth={admin:true,cookie:login.cookie,csrf:login.data.csrf};assert.equal((await api('/api/admin/comments/1/moderate',{status:'approved'},auth)).status,200);
 assert.equal((await api('/api/public/comments?post='+posts[1].path)).data.comments.length,1);await docker('restart',name);await startWebsite();assert.equal((await api('/api/public/comments?post='+posts[1].path)).data.comments.length,1);
 console.log(JSON.stringify({status:'passed',uid:1000,readOnlyRoot:true,noCatalogue:true,automaticPublicationDiscovery:true,realARCaptchaTestValidation:true,moderation:true,persistedAcrossRestart:true}));
}finally{await docker('rm','-f',name).catch(()=>{});await docker('volume','rm',volume).catch(()=>{});await rm(directory,{recursive:true,force:true});}
