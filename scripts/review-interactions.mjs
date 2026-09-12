import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { call, pause, events, socket } from './browser-session.mjs';
const origin = process.argv[2] ?? 'http://127.0.0.1:4186';
const output = 'docs/reviews/local-2026-09-09';
const results = [];
const evaluate = async expression => {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ': ' + result.exceptionDetails.exception?.description);
  return result.result.value;
};
const navigate = async path => { await call('Page.navigate', { url: origin + path }); await pause(600); await evaluate('document.fonts.ready.then(() => true)'); };
const check = async (name, work) => { try { await work(); results.push({name, passed:true}); } catch(error) { results.push({name, passed:false, error:String(error)}); } };
const screenshot = async name => { const image = await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false}); await fs.writeFile(`${output}/after/${name}.png`,Buffer.from(image.data,'base64')); };
const escape = async () => { await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27}); await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27}); await pause(100); };
await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});

await check('real archive HTML, refresh and page-1/out-of-range/legacy redirects in all editions', async () => {
  for (const base of ['', '/en', '/es']) {
    const path = `${base}/articles/page/2/`;
    await navigate(path);
    const first = await evaluate("[...document.querySelectorAll('.archive-items h2')].map(n=>n.textContent)");
    assert.ok(first.length && first.length <= 12);
    assert.equal(await evaluate("document.querySelector('link[rel=canonical]').href"),'https://ziabary.ir'+path);
    await call('Page.reload',{ignoreCache:true}); await pause(500);
    assert.deepEqual(await evaluate("[...document.querySelectorAll('.archive-items h2')].map(n=>n.textContent)"),first);
    for(const [suffix,status,target] of [['page/1/',308,`${base}/articles/`],['page/999/',404],['?page=2',308,path]]) {
      const response = await fetch(origin+`${base}/articles/`+suffix,{redirect:'manual'});
      assert.equal(response.status,status); if(target)assert.equal(response.headers.get('location'),target);
    }
  }
});

await check('independent article language menu and keyboard return focus', async () => {
  await navigate('/en/articles/apache-mod-jk-log-lock/');
  assert.equal(await evaluate("document.querySelectorAll('link[rel=alternate][hreflang]').length"),0);
  await evaluate("document.querySelector('.language-control summary').click()");
  assert.equal(await evaluate("document.querySelectorAll('.language-menu section').length"),1);
  assert.ok((await evaluate("[...document.querySelectorAll('.language-menu a')].map(a=>a.getAttribute('href'))")).includes('/articles/'));
  await escape();
  assert.equal(await evaluate("document.querySelector('.language-control').open"),false);
  assert.equal(await evaluate("document.activeElement.matches('.language-control summary')"),true);
});

await check('different article slugs use reciprocal real translations', async () => {
  await navigate('/articles/targoman-without-rent/');
  const links = await evaluate("[...document.querySelectorAll('link[rel=alternate][hreflang]')].map(n=>[n.hreflang,new URL(n.href).pathname])");
  assert.deepEqual(links.map(x=>x[0]).sort(),['en','es','fa']);
  assert.ok(links.some(x=>x[1]==='/en/articles/building-targoman-without-patronage/'));
  assert.ok(links.some(x=>x[1]==='/es/articles/construir-targoman-sin-padrinos/'));
});

await check('planned cards, useful destination, noindex and search exclusion', async () => {
  await navigate('/guides/');
  assert.equal(await evaluate("document.querySelectorAll('.planned-badge').length"),2);
  await navigate('/guides/ai-operator/');
  assert.ok((await evaluate('document.body.innerText')).includes('هنوز یادداشتی در این مجموعه منتشر نشده است.'));
  assert.ok((await evaluate("document.querySelector('meta[name=robots]').content")).includes('noindex'));
  assert.equal(await evaluate("document.querySelectorAll('link[hreflang]').length"),0);
  const search=await fetch(origin+'/search/fa.json').then(r=>r.json());
  assert.ok(!search.some(item=>item.href.includes('/guides/ai-operator/')));
});

await check('search is loaded on demand, Persian equivalence returns real article, Escape restores focus', async () => {
  await navigate('/');
  assert.equal(await evaluate("performance.getEntriesByType('resource').some(r=>r.name.includes('/search/'))"),false);
  await evaluate("document.querySelector('button[aria-label=جستجو]').focus();document.querySelector('button[aria-label=جستجو]').click()"); await pause(300);
  assert.equal(await evaluate("document.activeElement.matches('dialog input')"),true);
  for(const query of ['عیار','عيار']) {
    await evaluate(`(()=>{const input=document.querySelector('dialog input');input.value=${JSON.stringify(query)};input.dispatchEvent(new Event('input',{bubbles:true}));})()`); await pause(100);
    assert.ok((await evaluate("[...document.querySelectorAll('.search-results a')].map(a=>a.href)")).some(href=>href.includes('ayar-hoomas-assistant')));
  }
  await screenshot('search-persian-1440'); await escape();
  assert.equal(await evaluate("document.querySelector('dialog[open]')===null"),true);
  assert.equal(await evaluate("document.activeElement.getAttribute('aria-label')"),'جستجو');
});

await check('archive search state survives article visit, back, and direct refresh', async () => {
  await navigate('/articles/?q=عیار');
  assert.equal(await evaluate("document.querySelectorAll('.archive-items > article').length"),1);
  await evaluate("document.querySelector('.archive-items h2 a').click()"); await pause(400);
  await evaluate('history.back()'); await pause(400);
  assert.ok((await evaluate('location.search')).includes('q='));
  assert.equal(await evaluate("document.querySelector('.archive-controls input').value"),'عیار');
  await call('Page.reload',{ignoreCache:true});await pause(400);
  assert.equal(await evaluate("document.querySelectorAll('.archive-items > article').length"),1);
});

await check('desktop ToC position, active heading, direct fragment and sticky in RTL/LTR', async () => {
  for(const [path,rtl] of [['/articles/national-ai-organization-from-law-to-impact/',true],['/en/articles/ztai-indirect-data-access-en/',false]]) {
    await navigate(path);
    assert.equal(await evaluate("document.querySelector('.desktop-toc').open"),true);
    const side = await evaluate("(()=>{const t=document.querySelector('.article-toc').getBoundingClientRect(),b=document.querySelector('.article-body').getBoundingClientRect();return t.x<b.x})()");
    assert.equal(side,rtl);
    const id = await evaluate("document.querySelectorAll('.article-body h2')[2].id");
    await navigate(path+'#'+encodeURIComponent(id));
    assert.equal(await evaluate("document.querySelector('.article-toc a[aria-current]')?.getAttribute('href')"),'#'+id);
    const y=await evaluate("document.querySelector('.article-toc').getBoundingClientRect().top"); assert.ok(y>=90 && y<=115,String(y));
    await screenshot(rtl?'toc-fa-1440':'toc-en-1440');
    const historyLength=await evaluate('history.length');await evaluate('window.scrollBy(0,700)');await pause(200);assert.equal(await evaluate('history.length'),historyLength);
  }
});

await check('collection disclosure, continuous reading and old chapter fragment', async () => {
  await navigate('/guides/gpu-selection/');
  assert.equal(await evaluate("document.querySelectorAll('.chapter-details[open]').length"),0);
  await evaluate("document.querySelector('.continuous-toggle').click()");
  assert.equal(await evaluate("document.querySelectorAll('.chapter-details[open]').length"),7);
  await evaluate("document.querySelector('.continuous-toggle').click()");
  assert.equal(await evaluate("document.querySelectorAll('.chapter-details[open]').length"),0);
  await navigate('/guides/gpu-selection/#choosing-gpu-for-ai');
  assert.equal(await evaluate("document.querySelector('#choosing-gpu-for-ai .chapter-details').open"),true);
});

await check('GPU and server presets and complete reset preserve tools and defaults', async () => {
  await navigate('/guides/gpu-selection/#gpu-comparison-table');
  for(const id of ['gpu-comparison-table','server-comparison-table']) {
    assert.equal(await evaluate(`document.querySelector('#${id} .filters').open`),false);
    const initial=await evaluate(`document.querySelector('#${id} table thead tr').children.length`);
    await evaluate(`document.querySelector('#${id} .presets button:nth-child(2)').click()`);
    assert.equal(await evaluate(`document.querySelector('#${id} .presets button:nth-child(2)').getAttribute('aria-pressed')`),'true');
    await evaluate(`document.querySelector('#${id} .filters').open=true;document.querySelector('#${id} .show-all').click()`);
    assert.ok(await evaluate(`document.querySelector('#${id} table thead tr').children.length>${initial}`));
    await evaluate(`document.querySelector('#${id} .filter-actions > button').click()`);
    assert.equal(await evaluate(`document.querySelector('#${id} table thead tr').children.length`),initial);
    assert.equal(await evaluate(`document.querySelector('#${id} .presets button:first-child').getAttribute('aria-pressed')`),'true');
  }
  await screenshot('gpu-tools-1440');
});

await check('media summary expansion, independent internal/source links and gallery redirect', async () => {
  await navigate('/media/');
  const summary=await evaluate("document.querySelector('.media-row p').textContent");
  assert.ok(summary.length>600);
  await evaluate("document.querySelector('.entry-actions button').click()");
  assert.equal(await evaluate("document.querySelector('.media-row p').classList.contains('expanded')"),true);
  assert.equal(await evaluate("document.querySelector('.entry-actions button').closest('a')"),null);
  const authoredActions = await evaluate("document.querySelector('.media-row a[href=\"/articles/national-ai-organization-from-law-to-impact/\"]').closest('.media-row').querySelector('.entry-actions').querySelectorAll('a').length");
  assert.equal(authoredActions,2);
  await screenshot('media-expanded-1440');
  const redirect=await fetch(origin+'/gallery/',{redirect:'manual'});assert.equal(redirect.status,308);assert.equal(redirect.headers.get('location'),'/media/#photos');
  await navigate('/gallery/');assert.equal(await evaluate('location.pathname+location.hash'),'/media/#photos');
  assert.ok(await evaluate("document.querySelector('#media-panel-photos')!==null"));
});

await check('mobile ToC starts closed and 200% equivalent layout has no page overflow', async () => {
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:false});
  await navigate('/articles/national-ai-organization-from-law-to-impact/');
  assert.equal(await evaluate("document.querySelector('.mobile-toc').open"),false);
  await evaluate("document.querySelector('.article-toc').scrollIntoView();document.querySelector('.mobile-toc summary').click()"); await screenshot('toc-fa-390-open');
  await call('Emulation.setDeviceMetricsOverride',{width:720,height:500,deviceScaleFactor:2,mobile:false});
  for(const path of ['/','/articles/','/guides/gpu-selection/','/media/']) { await navigate(path); assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth+1'),false,path); }
  await screenshot('zoom-200-equivalent');
});

await check('JavaScript disabled: article body, ToC targets and real page links remain in HTML', async () => {
  await call('Emulation.setScriptExecutionDisabled',{value:true});
  const response=await fetch(origin+'/articles/national-ai-organization-from-law-to-impact/');const html=await response.text();
  assert.ok(html.includes('تعدد نهادها و تعارض تصمیم‌ها'));assert.ok(html.includes('class="article-toc'));
  await navigate('/articles/page/2/'); await screenshot('archive-no-js');
  assert.ok((await fetch(origin+'/articles/page/2/').then(r=>r.text())).includes('href="/articles/page/3/"'));
  await call('Emulation.setScriptExecutionDisabled',{value:false});
});
const exceptions=events.filter(e=>e.method==='Runtime.exceptionThrown');
await fs.writeFile(`${output}/interactions.json`,JSON.stringify({results,exceptions},null,2)+'\n');
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed),exceptions:exceptions.length}));
await call('Page.close');socket.end();
process.exitCode=results.some(r=>!r.passed)||exceptions.length?1:0;
