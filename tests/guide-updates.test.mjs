import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createReturningVisitCheck, VISIT_STORAGE_KEY } from '../src/lib/visit-history.mjs';
import { guideUpdates, guideUpdateHref, createUpdateHistory, unreadGuideUpdates, UPDATE_STORAGE_PREFIX } from '../src/lib/guide-updates.mjs';

const fakeStorage = () => {
  const values = new Map();
  return { getItem:key=>values.get(key)??null, setItem:(key,value)=>values.set(key,value) };
};

test('read receipts survive new visits without hiding unrelated or newly added news', () => {
  const storage=fakeStorage();
  const first=createUpdateHistory(()=>storage,new Set());
  const news=unreadGuideUpdates('llm','2026-09-22',first.has);
  assert.equal(news.length,3);
  first.mark('mimo26p');
  const returning=createUpdateHistory(()=>storage,new Set());
  assert.deepEqual(unreadGuideUpdates('llm','2026-09-22',returning.has).map(n=>n.id),['qimg21','sgl0520']);
  assert.equal(unreadGuideUpdates('gpu-selection','2026-09-22',returning.has).length,0);
  assert.deepEqual(unreadGuideUpdates('gpu-selection','2026-09-26',returning.has).map(n=>n.id),['smrubin72']);
  const added={...news[0],id:'nextmod'};
  assert.deepEqual(unreadGuideUpdates('llm','2026-09-22',returning.has,[added,news[0]]).map(n=>n.id),['nextmod']);
  assert.equal(storage.getItem(UPDATE_STORAGE_PREFIX+'mimo26p'),'1');
});

test('tabs write independent keys and blocked storage falls back to memory', () => {
  const storage=fakeStorage();
  const a=createUpdateHistory(()=>storage,new Set()), b=createUpdateHistory(()=>storage,new Set());
  a.mark('mimo26p');b.mark('qimg21');
  assert.ok(a.has('qimg21'));assert.ok(b.has('mimo26p'));
  const memory=new Set();
  const denied=()=>{throw new Error('storage blocked');};
  const blocked=createUpdateHistory(denied,memory);
  assert.equal(blocked.has('mimo26p'),false);
  assert.doesNotThrow(()=>blocked.mark('mimo26p'));
  assert.ok(createUpdateHistory(denied,memory).has('mimo26p'));
  const quota=createUpdateHistory(()=>({getItem:()=>null,setItem:()=>{throw new Error('quota');}}),new Set());
  quota.mark('qimg21');assert.ok(quota.has('qimg21'));
});

test('future and stale announcements are not shown, including the date boundaries', () => {
  const first=guideUpdates[0];
  const items=[{...first,id:'today',date:'2026-09-22'},{...first,id:'future',date:'2026-09-23'},
    {...first,id:'old',date:'2026-09-15'},{...first,id:'boundary',date:'2026-09-16'}];
  assert.deepEqual(unreadGuideUpdates('llm','2026-09-22',()=>false,items).map(n=>n.id),['today','boundary']);
});

test('each translated announcement keeps its unique short ID and links to a real dataset record', () => {
  const repo=JSON.parse(fs.readFileSync('data/llm/v0.3.0/repository.json','utf8'));
  const apiModels=JSON.parse(fs.readFileSync('data/llm/api-models.json','utf8'));
  const gpu=fs.readFileSync('src/lib/gpu-data.ts','utf8'), server=fs.readFileSync('src/lib/server-data.ts','utf8');
  assert.equal(new Set(guideUpdates.map(n=>n.id)).size,guideUpdates.length);
  for(const item of guideUpdates){
    assert.match(item.id,/^[a-z0-9-]{3,20}$/);
    if(item.kind==='model')assert.ok(repo.models.some(m=>m.id===item.target));
    if(item.kind==='api')assert.ok(apiModels.some(m=>m.id===item.target));
    if(item.kind==='software')assert.ok(repo.softwareProducts.some(s=>JSON.stringify(s).includes(item.target)));
    if(item.kind==='gpu')assert.ok(gpu.includes(`id: '${item.target}'`));
    if(item.kind==='server')assert.ok(server.includes(`id: '${item.target}'`));
    for(const locale of ['fa','en','es']){
      assert.ok(item.copy[locale].title && item.copy[locale].summary);
      if(locale!=='fa')assert.doesNotMatch(JSON.stringify(item.copy[locale]),/[\u0600-\u06ff]/);
      const url=new URL(guideUpdateHref(item,locale),'https://ziabary.ir');
      assert.equal(url.pathname,`${locale==='fa'?'':'/'+locale}/guides/${item.guide}/`);
      if(item.kind==='model'){
        assert.equal(url.searchParams.get('model'),item.target);
        assert.deepEqual(JSON.parse(url.searchParams.get('s_model-catalog')),{ids:[item.target],onlySelected:true});
      }else if(item.kind==='api'){
        assert.equal(url.searchParams.get('view'),'model-catalog');
        assert.deepEqual(JSON.parse(url.searchParams.get('s_model-catalog')),{q:item.target});
      }else if(item.kind==='software')assert.equal(JSON.parse(url.searchParams.get('s_software-products')).q,item.target);
      else assert.equal(url.hash,`#${item.kind}-${item.target}`);
    }
  }
});


test('first visit stays silent across navigation; a later visit sees only unread recent updates', () => {
  const storage = fakeStorage();
  const firstVisit = createReturningVisitCheck(() => storage);
  // The home page records the visit before navigating to a guide or another language.
  assert.equal(firstVisit(), false);
  assert.equal(storage.getItem(VISIT_STORAGE_KEY), '1');
  assert.equal(firstVisit(), false);
  const returningVisit = createReturningVisitCheck(() => storage);
  assert.equal(returningVisit(), true);
  const history = createUpdateHistory(() => storage, new Set());
  history.mark('dsparkvl');
  const items = unreadGuideUpdates('llm', '2026-09-27', history.has);
  assert.ok(items.length > 0);
  assert.ok(items.every(item => item.date >= '2026-09-21' && item.date <= '2026-09-27'));
  assert.ok(!items.some(item => item.id === 'dsparkvl'));
});

test('missing or invalid visit markers and unavailable storage do not enable notifications', () => {
  const storage = fakeStorage();
  storage.setItem(VISIT_STORAGE_KEY, 'invalid');
  assert.equal(createReturningVisitCheck(() => storage)(), false);
  const denied = createReturningVisitCheck(() => { throw new Error('blocked'); });
  assert.equal(denied(), false);
  assert.equal(denied(), false);
  const quota = createReturningVisitCheck(() => ({getItem: () => null, setItem: () => { throw new Error('full'); }}));
  assert.equal(quota(), false);
  assert.equal(quota(), false);
  const existing = createReturningVisitCheck(() => ({getItem: () => '1', setItem: () => { throw new Error('full'); }}));
  assert.equal(existing(), true);
});
