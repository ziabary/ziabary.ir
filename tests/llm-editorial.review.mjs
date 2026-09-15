import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
const origin = process.env.LLM_REVIEW_ORIGIN ?? 'http://127.0.0.1:4189';
const phase = process.env.LLM_REVIEW_PHASE ?? 'after';
const output = 'docs/reviews/local-2026-09-15/llm-editorial';
const report = { origin, phase, checks: [], screenshots: [] };
async function E(expression) {
  const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}
async function wait(expression) {
  for (let i = 0; i < 100; i++) { if (await E(expression)) return; await pause(120); }
  throw Error('Timeout: ' + expression);
}
async function nav(model, panel) {
  await call('Page.navigate', { url: origin + '/guides/llm/?show-drafts=true&model=' + encodeURIComponent(model) + '&panel=' + panel });
  await wait(`document.querySelector('.model-profile')?.open && document.querySelectorAll('#model-catalog tr[data-row-id]').length===87`);
  await E(`document.documentElement.dataset.theme='dark';document.fonts.ready`);
  await pause(250);
}
async function panel(label) {
  await E(`[...document.querySelectorAll('.profile-tabs button')].find(e=>e.innerText===${JSON.stringify(label)}).click()`);
  await pause(140);
}
async function shot(name) {
  await E(`document.querySelector('.model-profile').scrollTop=0`); await pause(200);
  const r = await call('Page.captureScreenshot', { format: 'png' });
  const filename = phase + '-' + name + '.png';
  await fs.writeFile(output + '/' + filename, Buffer.from(r.data, 'base64')); report.screenshots.push(filename);
}
try {
  await fs.mkdir(output, { recursive: true }); await call('Page.enable'); await call('Runtime.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1050, deviceScaleFactor: 1, mobile: false });
  await nav('model:qwen-qwen3-8b', 'run'); await shot('desktop-qwen-run');
  report.qwenRunText = await E(`document.querySelector('.profile-body').innerText`);
  if (phase === 'after') {
    assert.doesNotMatch(report.qwenRunText, /در کارت همین مدل آمده|نام دقیق بسته و فرمان شروع در زیر/);
    assert.equal(await E(`document.querySelectorAll('.run-notes p').length`), 1);
    assert.match(report.qwenRunText, /ollama run qwen3:8b/);
    assert.match(report.qwenRunText, /حافظه/);
    const condition = 'طول زمینه و تعداد درخواست هم‌زمان، مصرف حافظه را افزون بر اندازهٔ وزن افزایش می‌دهند.';
    assert.equal(report.qwenRunText.split(condition).length - 1, 1);
    assert.equal(await E(`document.querySelectorAll('.run-card a[target="_blank"]').length >= 4`), true);
    report.checks.push('Qwen run command and external engine links retained; common memory condition appears once with engine scope.');
  }
  await panel('معرفی و کاربرد'); await shot('desktop-qwen-overview');
  await nav('model:baai-bge-m3', 'downloads'); await shot('desktop-bge-downloads');
  if (phase === 'after') {
    assert.match(await E(`document.querySelector('.profile-body').innerText`), /dense|متراکم/);
    for (const model of ['model:baai-bge-m3', 'model:jinaai-jina-embeddings-v3', 'model:moonshotai-kimi-k2-5', 'model:coherelabs-aya-expanse-8b']) {
      await nav(model, 'overview');
      for (const tab of ['معرفی و کاربرد', 'دریافت مدل', 'راه‌اندازی', 'حافظه و اجرا', 'کیفیت منتشرشده', 'منابع و مجوز']) {
        await panel(tab);
        const body = await E(`document.querySelector('.profile-body').innerText`);
        assert.doesNotMatch(body, /فهرست کامل در منابع مدل|مشخصات همین نسخه در کارت رسمی|نسخهٔ وابستگی و قالب ورودی|undefined|\[object Object\]/);
        assert.equal(await E(`Array.from(document.querySelectorAll('.profile-body p,.profile-body ul')).filter(e=>!e.textContent.trim()).length`), 0, model + '/' + tab);
        assert.equal(await E(`Array.from(document.querySelectorAll('.profile-body a[href^="https:"]')).every(a=>a.target==='_blank')`), true);
      }
    }
    report.checks.push('All six profile panels reviewed for BGE-M3, Jina v3, Kimi K2.5 and Aya 8B; no filler, empty paragraphs/lists or broken external-link targets.');
    await nav('model:baai-bge-m3', 'run');
    assert.match(await E(`document.querySelector('.profile-body').innerText`), /return_colbert_vecs=True/);
    await panel('معرفی و کاربرد'); await shot('desktop-bge-overview');
    await nav('model:baai-bge-m3', 'quality');
    await E(`document.querySelector('.published-result').open=true`); await shot('desktop-bge-quality');
    assert.equal(await E(`document.querySelectorAll('.published-result').length>0`), true);
    await nav('model:moonshotai-kimi-k2-5', 'overview');
    const introductions = await E(`Array.from(document.querySelectorAll('.use-card>p')).map(e=>e.innerText)`);
    assert.equal(new Set(introductions).size, introductions.length);
    await shot('desktop-kimi-overview');
    await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await nav('model:qwen-qwen3-8b', 'run'); await shot('mobile-qwen-run');
    assert.equal(await E(`document.documentElement.scrollWidth <= innerWidth`), true);
    assert.equal(await E(`document.querySelector('.model-profile').scrollWidth <= document.querySelector('.model-profile').clientWidth+1`), true);
    await E(`document.documentElement.dataset.theme='light'`); await shot('mobile-qwen-run-light');
    await nav('model:baai-bge-m3', 'overview'); await shot('mobile-bge-overview');
    const logos = await E(`Array.from(document.querySelectorAll('.model-profile img')).map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0}))`);
    assert.ok(logos.length && logos.every(i=>i.ok&&i.src.startsWith('/images/')));
    report.checks.push('390px mobile layout, dark/light themes and local model logos pass; no document or dialog overflow.');
    const errors = events.filter(e=>e.method==='Runtime.exceptionThrown'); assert.equal(errors.length,0,JSON.stringify(errors));
    report.checks.push('No browser runtime exceptions.');
  }
  await fs.writeFile(output + '/' + phase + '-browser-report.json', JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({phase,checks:report.checks,screenshots:report.screenshots},null,2));
} finally { await call('Page.close').catch(()=>{}); socket.end(); }
