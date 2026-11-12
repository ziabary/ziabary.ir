const copies={
 fa:{heading:'گفت‌وگو درباره این نوشته',intro:'نظر شما پس از بررسی منتشر می‌شود.',name:'نام نمایشی',body:'نظر شما',submit:'ارسال برای بررسی',sending:'در حال ارسال…',queued:'نظرتان ثبت شد و پس از بررسی منتشر می‌شود.',reply:'پاسخ',replyTo:'در پاسخ به',cancel:'انصراف از پاسخ',empty:'هنوز نظری منتشر نشده است. می‌توانید آغازگر گفت‌وگو باشید.',more:'نظرهای بیشتر',admin:'نویسنده',views:'بازدید',people:'بازدیدکنندهٔ تقریبی',captcha:'لطفاً تأیید امنیتی را تکمیل کنید.',retry:'تلاش دوباره برای کپچا',privacy:'برای آمار بازدید، شناسه‌ای از مرورگر و نشانی IP ثبت می‌شود. این اطلاعات در نظرها نمایش داده نمی‌شود.',error:'ارسال انجام نشد؛ دوباره تلاش کنید.',limited:'تعداد درخواست‌ها زیاد است. کمی بعد دوباره تلاش کنید.',depth:'در این سطح امکان پاسخ بیشتر وجود ندارد.',unavailable:'ثبت نظر موقتاً در دسترس نیست.'},
 en:{heading:'Join the conversation',intro:'Comments appear after review.',name:'Display name',body:'Your comment',submit:'Submit for review',sending:'Sending…',queued:'Your comment was received and is awaiting review.',reply:'Reply',replyTo:'Replying to',cancel:'Cancel reply',empty:'No comments yet. Start the conversation.',more:'More comments',admin:'Author',views:'views',people:'estimated visitors',captcha:'Please complete the security check.',retry:'Retry CAPTCHA',privacy:'A browser identifier and IP address are recorded for visitor statistics. These are never shown with comments.',error:'Could not submit. Please try again.',limited:'Too many requests. Please try again later.',depth:'The reply depth limit has been reached.',unavailable:'Comments are temporarily unavailable.'},
 es:{heading:'Conversación sobre este artículo',intro:'Los comentarios se publican después de su revisión.',name:'Nombre visible',body:'Tu comentario',submit:'Enviar para revisión',sending:'Enviando…',queued:'Recibimos tu comentario. Está pendiente de revisión.',reply:'Responder',replyTo:'En respuesta a',cancel:'Cancelar respuesta',empty:'Aún no hay comentarios. Inicia la conversación.',more:'Más comentarios',admin:'Autor',views:'visitas',people:'visitantes estimados',captcha:'Completa la verificación de seguridad.',retry:'Reintentar CAPTCHA',privacy:'Se registra un identificador del navegador y la dirección IP para las estadísticas. Estos datos no aparecen en los comentarios.',error:'No se pudo enviar. Inténtalo de nuevo.',limited:'Demasiadas solicitudes. Inténtalo más tarde.',depth:'Se alcanzó el límite de respuestas anidadas.',unavailable:'Los comentarios no están disponibles temporalmente.'}
};
const element=(tag,attrs={},content)=>{const node=document.createElement(tag);for(const [key,value]of Object.entries(attrs)){if(key==='class')node.className=value;else node.setAttribute(key,String(value));}if(content!==undefined)node.textContent=String(content);return node;};
async function request(api,path,body,signal){const r=await fetch(api+path,{method:body?'POST':'GET',credentials:'omit',cache:'no-store',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined,signal:signal?AbortSignal.any([signal,AbortSignal.timeout(6000)]):AbortSignal.timeout(6000)});const data=await r.json();if(!r.ok)throw Object.assign(Error(data.error),{status:r.status,code:data.error});return data;}
let captchaPromise;
// The current official loader ships unresolved testing placeholders. Fill only
// those placeholders for the documented test key on a loopback development site.
export function configureARCaptchaTestKeys(provider,captcha,hostname){
 if(!captcha.testMode||captcha.siteKey!=='0000000000'||!['localhost','127.0.0.1'].includes(hostname))return;
 const index=Array.isArray(provider.testingSitekeys)?provider.testingSitekeys.indexOf('{{TESTING_SITE_KEY}}'):-1;
 if(index>=0&&Array.isArray(provider.testingChallengeIds)){
  provider.testingSitekeys[index]='0000000000';provider.testingChallengeIds[index]='000000000000000000000000000000';
 }
}
export function readARCaptchaToken(provider,widgetId,container){
 const value=provider?.getArcToken?.(widgetId);
 return typeof value==='string'?value:(container.querySelector('input[name="arcaptcha-token"]')?.value||'');
}
function captchaScript(){
 if(window.arcaptcha)return Promise.resolve(window.arcaptcha);
 if(!captchaPromise)captchaPromise=new Promise((resolve,reject)=>{const s=element('script',{src:'https://nwidget.arcaptcha.ir/1/api.js'});s.async=true;const timer=setTimeout(()=>{s.remove();captchaPromise=null;reject(Error('captcha_unavailable'));},8000);s.onload=()=>{clearTimeout(timer);if(window.arcaptcha)resolve(window.arcaptcha);else{captchaPromise=null;reject(Error('captcha_unavailable'));}};s.onerror=()=>{clearTimeout(timer);s.remove();captchaPromise=null;reject(Error('captcha_unavailable'));};document.head.append(s);});
 return captchaPromise;
}
const styles=new Map();
async function stylesheet(api){if(!styles.has(api))styles.set(api,new Promise((resolve,reject)=>{const link=element('link',{rel:'stylesheet',href:api+'/widget.css'}),timer=setTimeout(()=>{link.remove();styles.delete(api);reject(Error('style_unavailable'));},4000);link.onload=()=>{clearTimeout(timer);resolve();};link.onerror=()=>{clearTimeout(timer);link.remove();styles.delete(api);reject(Error('style_unavailable'));};document.head.append(link);}));return styles.get(api);}

/** A page counter has no comment form, CAPTCHA, stylesheet or additional font. */
export async function mountStats(host,{api,post,locale}){
 const copy=copies[locale]||copies.fa,numbers=new Intl.NumberFormat(locale);let disposed=false;
 host.dir=locale==='fa'?'rtl':'ltr';host.lang=locale;host.setAttribute('aria-label',copy.views);
 async function refresh(){
  const data=await request(api,'/api/public/stats?post='+encodeURIComponent(post));
  if(!disposed)host.textContent=numbers.format(data.views)+' '+copy.views+' · '+numbers.format(data.visitors)+' '+copy.people;
 }
 return {refresh,destroy(){disposed=true;host.replaceChildren();host.hidden=true;}};
}

export async function mount(host,{api,post,locale,health,onUnavailable}){
 if(health.captcha.provider!=='arcaptcha')throw Error('unsupported_captcha');
 await stylesheet(api);const copy=copies[locale]||copies.fa,numbers=new Intl.NumberFormat(locale),dates=new Intl.DateTimeFormat(locale==='fa'?'fa-IR':locale,{dateStyle:'medium',timeZone:'Asia/Tehran'});
 host.classList.add('community-widget');host.dir=locale==='fa'?'rtl':'ltr';host.setAttribute('aria-label',copy.heading);
 const heading=element('h2',{},copy.heading),stats=element('p',{class:'community-stats'}),intro=element('p',{class:'community-intro'},copy.intro),list=element('div',{class:'community-list'}),more=element('button',{type:'button',class:'community-more'},copy.more),form=element('form',{class:'community-form'}),notice=element('p',{role:'status','aria-live':'polite',class:'community-notice'});
 const nameId='community-name-'+crypto.randomUUID(),bodyId='community-body-'+crypto.randomUUID(),name=element('input',{id:nameId,name:'name',autocomplete:'nickname',minlength:2,maxlength:80,required:true}),body=element('textarea',{id:bodyId,name:'comment',minlength:3,maxlength:5000,rows:5,required:true}),replyNotice=element('div',{class:'community-reply-target'}),replyLabel=element('span'),cancel=element('button',{type:'button'},copy.cancel),captcha=element('div',{class:'community-captcha'}),captchaHost=element('div',{class:'community-captcha-widget'}),captchaError=element('p',{role:'status','aria-live':'polite'}),captchaRetry=element('button',{type:'button',class:'community-more'},copy.retry),submit=element('button',{type:'submit',class:'community-submit'},copy.submit),honeypot=element('input',{name:'website',tabindex:'-1',autocomplete:'off','aria-hidden':'true'}),privacy=element('p',{class:'community-privacy'},copy.privacy);
 honeypot.hidden=true;replyNotice.hidden=true;captchaRetry.hidden=true;replyNotice.append(replyLabel,cancel);captcha.append(captchaHost,captchaError,captchaRetry);
 form.append(element('label',{for:nameId},copy.name),name,element('label',{for:bodyId},copy.body),body,honeypot,replyNotice,captcha,submit,notice,privacy);host.replaceChildren(heading,stats,intro,list,more,form);
 let parent=null,token='',widgetId,disposed=false,loadingCaptcha=false,requestId=crypto.randomUUID(),cursor=null,comments=[];
 const unavailable=error=>{if(!error.status||error.status>=500){onUnavailable();return true;}return false;};
 const resetReply=()=>{parent=null;replyNotice.hidden=true;};cancel.onclick=resetReply;
 const render=()=>{
  list.replaceChildren();if(!comments.length){list.append(element('p',{class:'community-empty'},copy.empty));return;}
  const nodes=new Map();for(const item of comments){const node=element('article',{class:'community-comment'}),meta=element('header',{class:'community-comment-meta'}),message=element('p',{class:'community-comment-text'},item.body);meta.append(element('strong',{},item.author),element('time',{datetime:new Date(item.created).toISOString()},dates.format(new Date(item.created))));if(item.is_admin)meta.append(element('span',{class:'community-author-badge'},copy.admin));node.append(meta,message);
   if(item.depth<health.maxDepth){const reply=element('button',{type:'button',class:'community-reply'},copy.reply);reply.onclick=()=>{parent=item.id;replyLabel.textContent=copy.replyTo+' '+item.author;replyNotice.hidden=false;body.focus();form.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});void ensureCaptcha();};node.append(reply);}
   const children=element('div',{class:'community-replies'});node.append(children);nodes.set(item.id,{node,children});if(item.parent&&nodes.has(item.parent))nodes.get(item.parent).children.append(node);else if(!item.parent)list.append(node);
  }
 };
 async function refresh(append=false){try{const data=await request(api,'/api/public/comments?post='+encodeURIComponent(post)+(append&&cursor?'&cursor='+cursor:''));if(disposed)return;comments=append?[...comments,...data.comments]:data.comments;cursor=data.nextCursor;more.hidden=!cursor;stats.textContent=numbers.format(data.views)+' '+copy.views+' · '+numbers.format(data.visitors)+' '+copy.people;render();}catch(error){unavailable(error);throw error;}}
 more.onclick=()=>{more.disabled=true;refresh(true).catch(()=>{}).finally(()=>more.disabled=false);};
 async function ensureCaptcha(){if(loadingCaptcha||widgetId!==undefined||disposed)return;loadingCaptcha=true;captchaError.textContent='';captchaRetry.hidden=true;try{const provider=await captchaScript();if(disposed)return;configureARCaptchaTestKeys(provider,health.captcha,location.hostname);widgetId=provider.render(captchaHost,{site_key:health.captcha.siteKey,lang:locale==='fa'?'fa':'en',theme:document.documentElement.dataset.theme==='dark'?'dark':'light',callback:value=>{token=value;captchaError.textContent='';},expired_callback:()=>{token='';},error_callback:()=>{token='';captchaError.textContent=copy.captcha;captchaRetry.hidden=false;}});}catch{captchaError.textContent=copy.captcha;captchaRetry.hidden=false;}finally{loadingCaptcha=false;}}
 const clearCaptcha=()=>{if(widgetId!==undefined){if(window.arcaptcha?.destroy)window.arcaptcha.destroy(widgetId);else window.arcaptcha?.reset(widgetId);}widgetId=undefined;token='';captchaHost.replaceChildren();};
 captchaRetry.onclick=()=>{clearCaptcha();void ensureCaptcha();};form.addEventListener('focusin',()=>void ensureCaptcha());
 form.onsubmit=async event=>{event.preventDefault();notice.textContent='';if(!form.reportValidity())return;token=readARCaptchaToken(window.arcaptcha,widgetId,captcha);if(!token){notice.textContent=copy.captcha;await ensureCaptcha();return;}submit.disabled=true;submit.textContent=copy.sending;
  try{await request(api,'/api/public/comments',{post,parent,author:name.value,body:body.value,captchaToken:token,requestId,website:honeypot.value});body.value='';resetReply();requestId=crypto.randomUUID();notice.textContent=copy.queued;}catch(error){if(!unavailable(error))notice.textContent=error.status===429?copy.limited:error.code==='max_depth'?copy.depth:error.code==='captcha_failed'?copy.captcha:copy.error;}finally{submit.disabled=false;submit.textContent=copy.submit;clearCaptcha();if(!disposed&&!host.hidden)void ensureCaptcha();}
 };
 return {refresh,destroy(){disposed=true;clearCaptcha();host.replaceChildren();host.hidden=true;}};
}

/** Coarse browser properties plus a first-party installation nonce; no canvas/audio/font probing. */
export async function fingerprint(){
 let nonce='';try{nonce=localStorage.getItem('ziabary-community-id')||'';if(!/^[a-f0-9-]{36}$/.test(nonce)){nonce=crypto.randomUUID();localStorage.setItem('ziabary-community-id',nonce);}}catch{}
 const values=[navigator.userAgent,navigator.language,navigator.platform,Math.round(screen.width/100)*100,Math.round(screen.height/100)*100,screen.colorDepth,Intl.DateTimeFormat().resolvedOptions().timeZone,nonce];
 const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(values)));return [...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
export async function recordVisit({api,post,signal}){
 if(document.visibilityState==='hidden'||signal?.aborted)return false;
 const proof=await request(api,'/api/public/visit-ticket',{post},signal);const id=await fingerprint();await new Promise(resolve=>{const done=()=>{clearTimeout(timer);signal?.removeEventListener('abort',done);resolve();};const timer=setTimeout(done,1700);signal?.addEventListener('abort',done,{once:true});});if(document.visibilityState==='hidden'||signal?.aborted)return false;
 await request(api,'/api/public/visits',{post,fingerprint:id,ticket:proof.ticket,language:navigator.language,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,screen:Math.round(screen.width/100)*100+'×'+Math.round(screen.height/100)*100,referrer:document.referrer},signal);
 return true;
}
