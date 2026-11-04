/** @typedef {{refresh:()=>Promise<void>,destroy:()=>void}} Widget */
/** @typedef {{mount:(host:HTMLElement,options:{api:string,post:string,locale:string,health:unknown,onUnavailable:()=>void})=>Promise<Widget>,recordVisit:(options:{api:string,post:string,signal:AbortSignal})=>Promise<void>}} CommunityModule */
/**
 * No network, font, CAPTCHA, fingerprint work or visible placeholder before load + idle.
 * @param {{api:string,post:string,locale?:string,host?:HTMLElement,window?:Window & typeof globalThis,document?:Document,loadModule?:(url:string)=>Promise<CommunityModule>}} options
 */
export function startCommunity({api,post,locale='fa',host,window:win=window,document:doc=document,loadModule=url=>import(/* @vite-ignore */ url)}) {
  if(!api || new URL(win.location.href).searchParams.has('show-drafts') || /\bnoindex\b/.test(doc.querySelector?.('meta[name="robots"]')?.getAttribute('content')||''))return ()=>{};
  let base;try{const url=new URL(api);if(url.protocol!=='https:'&&!['localhost','127.0.0.1'].includes(url.hostname))return ()=>{};base=url.href.replace(/\/$/,'');}catch{return ()=>{};}
  let stopped=false,busy=false,ready=false,timer=0,idle=0,delay=30000,visitorStarted=false,visitorTimer=0;
  /** @type {AbortController|undefined} */ let controller;
  /** @type {Widget|undefined} */ let widget;
  const visitorController=new AbortController();
  const hide=()=>{if(host)host.hidden=true;};hide();
  /** @param {number} ms */
  const schedule=ms=>{win.clearTimeout(timer);if(!stopped)timer=win.setTimeout(check,ms);};
  const unavailable=()=>{hide();schedule(delay);delay=Math.min(delay*2,300000);};
  const check=async()=>{
    if(stopped||busy)return;
    if(doc.visibilityState==='hidden'||win.navigator?.onLine===false){schedule(30000);return;}
    busy=true;const activeController=new AbortController();controller=activeController;const timeout=win.setTimeout(()=>activeController.abort(),1800);
    try{
      const response=await win.fetch(base+'/health',{credentials:'omit',cache:'no-store',signal:controller.signal});
      if(!response.ok)throw Error('unavailable');const health=await response.json();
      if(health.version!==1||!health.ok)throw Error('unavailable');
      win.clearTimeout(timeout);
      let moduleTimer=0;
      /** @type {Promise<never>} */ const moduleTimeout=new Promise((_,reject)=>{moduleTimer=win.setTimeout(()=>reject(Error('timeout')),4000);});
      const module=await Promise.race([loadModule(base+'/widget.js'),moduleTimeout]).finally(()=>win.clearTimeout(moduleTimer));
      if(stopped)return;
      if(host){
        if(!widget)widget=await module.mount(host,{api:base,post,locale,health,onUnavailable:unavailable});
        if(stopped){widget.destroy();return;}
        await widget.refresh();if(stopped)return;host.hidden=false;
      }
      if(!visitorStarted){visitorStarted=true;visitorTimer=win.setTimeout(()=>{if(!stopped)module.recordVisit({api:base,post,signal:visitorController.signal}).then(()=>{if(!stopped)return widget?.refresh();}).catch(()=>{});},0);}
      delay=30000;schedule(60000);
    }catch{if(!stopped)unavailable();}finally{busy=false;win.clearTimeout(timeout);}
  };
  const resume=()=>{if(ready&&doc.visibilityState!=='hidden')schedule(250);};
  const offline=()=>{hide();controller?.abort();if(ready)schedule(delay);};
  const begin=()=>{if(stopped)return;const idleStart=()=>{ready=true;schedule(0);};if(typeof win.requestIdleCallback==='function')idle=win.requestIdleCallback(idleStart,{timeout:8000});else timer=win.setTimeout(idleStart,1000);};
  if(doc.readyState==='complete')begin();else win.addEventListener('load',begin,{once:true});
  win.addEventListener('online',resume);win.addEventListener('offline',offline);doc.addEventListener('visibilitychange',resume);
  return ()=>{stopped=true;controller?.abort();visitorController.abort();win.clearTimeout(timer);win.clearTimeout(visitorTimer);if(idle)win.cancelIdleCallback?.(idle);win.removeEventListener('load',begin);win.removeEventListener('online',resume);win.removeEventListener('offline',offline);doc.removeEventListener('visibilitychange',resume);widget?.destroy();hide();};
}
