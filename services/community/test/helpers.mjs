import {mkdtemp,rm,writeFile} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join} from 'node:path';import {randomBytes} from 'node:crypto';
import {createApplication} from '../src/app.mjs';import {passwordHash,totp,trustedNetworks} from '../src/security.mjs';
export const password='A long test password with plenty of entropy!';
const hashed=await passwordHash(password);
export const posts=[{path:'/',title:'خانه',locale:'fa',commentable:false},{path:'/articles/test/',title:'یادداشت آزمایشی',locale:'fa',commentable:true},{path:'/en/articles/test-en/',title:'Test article',locale:'en',commentable:true}];
export async function fixture(options={}){
 const dir=await mkdtemp(join(tmpdir(),'ziabary-community-'));let time=Date.UTC(2026,10,4,10,0,5);
 const secrets={username:'admin',passwordHash:hashed,totpSecret:'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ',identityKey:randomBytes(32).toString('base64'),encryptionKey:randomBytes(32).toString('base64'),turnstileSecret:'server-only-test-secret'};
 const config={production:false,origin:'http://127.0.0.1:8787',origins:['http://127.0.0.1:5195'],secrets,siteKey:'test-site-key',captchaSecret:secrets.turnstileSecret,posts,database:join(dir,'test.sqlite'),identityKey:Buffer.from(secrets.identityKey,'base64'),encryptionKey:Buffer.from(secrets.encryptionKey,'base64'),trusted:trustedNetworks([]),commentsPerSecond:5,retentionDays:90,adminName:'نویسنده',sessionAge:28800000,sessionIdle:1800000,captchaHosts:['127.0.0.1'],allowTestCaptcha:false,...options.config};
 const app=createApplication(config,{now:()=>time,verifyCaptcha:options.verifyCaptcha||async function(c,token){return token.startsWith('valid-');}});await new Promise(resolve=>app.server.listen(options.port||0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+app.server.address().port;
 async function call(path,{method,body,admin=false,cookie='',csrf='',headers={}}={}){
  const response=await fetch(base+path,{method:method||(body?'POST':'GET'),headers:{'User-Agent':'Mozilla/5.0 Chrome/140.0.0.0 Safari/537.36',...(body?{'Content-Type':'application/json',Origin:admin?config.origin:config.origins[0]}:{}),...(cookie?{Cookie:cookie}:{}),...(csrf?{'X-CSRF-Token':csrf}:{}),...headers},body:body===undefined?undefined:typeof body==='string'?body:JSON.stringify(body)});
  const type=response.headers.get('content-type')||'';return {status:response.status,headers:response.headers,data:type.includes('json')?await response.json():await response.text()};
 }
 const login=async()=>{const response=await call('/api/admin/login',{admin:true,body:{username:'admin',password,code:totp(secrets.totpSecret,Math.floor(time/30000))}});return {...response,cookie:response.headers.get('set-cookie')?.split(';')[0],csrf:response.data.csrf};};
 let sequence=0;const comment=(values={})=>({post:posts[1].path,author:'خواننده',body:'این یک نظر آزمایشی است.',parent:null,captchaToken:'valid-'+(++sequence),requestId:'request-'+sequence+'-unique-value',website:'',...values});
 const cleanup=async()=>{await app.close();await rm(dir,{recursive:true,force:true});};
 await writeFile(join(dir,'secrets.json'),JSON.stringify(secrets));await writeFile(join(dir,'posts.json'),JSON.stringify(posts));
 return {dir,app,config,call,login,comment,cleanup,now:()=>time,advance:ms=>{time+=ms;},setTime:value=>{time=value;}};
}
