import {test} from 'node:test';import assert from 'node:assert/strict';import {startCommunity} from '../client/loader.mjs';
function environment(){
 let id=0,clock=0,requests=0,available=false,refreshes=0,visits=0,destroyed=0;
 const timers=new Map(),windowEvents=new Map(),documentEvents=new Map(),host={hidden:true};
 const win={location:{href:'https://example.com/articles/test/'},setTimeout(fn,ms){const key=++id;timers.set(key,{fn,at:clock+ms});return key;},clearTimeout(key){timers.delete(key);},requestIdleCallback(fn){return this.setTimeout(fn,10);},cancelIdleCallback(key){timers.delete(key);},addEventListener(name,fn){windowEvents.set(name,fn);},removeEventListener(name){windowEvents.delete(name);},async fetch(){requests++;if(!available)throw Error('offline');return {ok:true,json:async()=>({ok:true,version:1})};}};
 const doc={readyState:'loading',visibilityState:'visible',addEventListener(name,fn){documentEvents.set(name,fn);},removeEventListener(name){documentEvents.delete(name);}};
 const module={async mount(){return {async refresh(){refreshes++;if(!available)throw Error('offline');},destroy(){destroyed++;}};},async recordVisit(){visits++;}};
 async function tick(ms=0){clock+=ms;for(let round=0;round<20;round++){for(const[key,timer]of [...timers])if(timer.at<=clock){timers.delete(key);timer.fn();}await Promise.resolve();}}
 return {win,doc,host,module,tick,events:windowEvents,documentEvents,setAvailable:value=>{available=value;},state:()=>({requests,refreshes,visits,destroyed,timers:timers.size})};
}
test('no service work before page load and idle; offline comments hide and recover on online',async()=>{
 const e=environment(),stop=startCommunity({api:'https://community.example.com',post:'/articles/test/',host:e.host,window:e.win,document:e.doc,loadModule:async()=>e.module});
 await e.tick(1000);assert.equal(e.state().requests,0);e.events.get('online')();await e.tick(1000);assert.equal(e.state().requests,0);
 e.events.get('load')();await e.tick(10);assert.equal(e.state().requests,1);assert.equal(e.host.hidden,true);
 e.setAvailable(true);e.events.get('online')();await e.tick(250);assert.equal(e.host.hidden,false);assert.equal(e.state().visits,1);
 e.setAvailable(false);await e.tick(60000);assert.equal(e.host.hidden,true);
 e.setAvailable(true);e.events.get('online')();await e.tick(250);assert.equal(e.host.hidden,false);assert.equal(e.state().visits,1);
 const requests=e.state().requests;stop();await e.tick(600000);assert.equal(e.state().requests,requests);assert.equal(e.host.hidden,true);assert.equal(e.state().destroyed,1);
});
test('disabled configuration and draft previews never contact the service',async()=>{for(const api of ['', 'javascript:alert(1)']){const e=environment();startCommunity({api,post:'/',window:e.win,document:e.doc,loadModule:async()=>e.module});await e.tick(100000);assert.equal(e.state().requests,0);}const e=environment();e.win.location.href+='?show-drafts=true';startCommunity({api:'https://community.example.com',post:'/',window:e.win,document:e.doc});assert.equal(e.events.size,0);});
test('hidden tabs do not poll, and late work is discarded after navigation',async()=>{const e=environment();e.doc.readyState='complete';e.doc.visibilityState='hidden';const stop=startCommunity({api:'https://community.example.com',post:'/',host:e.host,window:e.win,document:e.doc,loadModule:async()=>e.module});await e.tick(10);assert.equal(e.state().requests,0);e.doc.visibilityState='visible';e.setAvailable(true);e.documentEvents.get('visibilitychange')();await e.tick(250);assert.equal(e.host.hidden,false);stop();assert.equal(e.documentEvents.size,0);});
