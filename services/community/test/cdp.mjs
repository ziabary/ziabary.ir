// Browser review helper; intentionally excluded from the production container.
export async function browserSession(port=9334){
 const target=await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'}).then(r=>r.json());const socket=new WebSocket(target.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
 let id=0;const pending=new Map(),events=[],handlers=new Map();
 socket.onmessage=async event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const p=pending.get(message.id);pending.delete(message.id);message.error?p.reject(Error(JSON.stringify(message.error))):p.resolve(message.result);}else if(message.method){events.push(message);for(const handler of handlers.get(message.method)||[])handler(message.params);}};
 const call=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});socket.send(JSON.stringify({id:key,method,params}));});
 const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression:'(()=>eval('+JSON.stringify(expression)+'))()',returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result?.value;};
 const pause=ms=>new Promise(r=>setTimeout(r,ms));const wait=async expression=>{for(let n=0;n<150;n++){if(await evaluate(expression))return;await pause(100);}throw Error('Timeout: '+expression);};
 for(const domain of ['Page','Runtime','Network','Log'])await call(domain+'.enable');await call('Network.setBlockedURLs',{urls:['*google-analytics.com*','*googletagmanager.com*']});
 return {call,evaluate,wait,pause,events,on(method,handler){handlers.set(method,[...(handlers.get(method)||[]),handler]);},async close(){await call('Page.close');socket.close();}};
}
