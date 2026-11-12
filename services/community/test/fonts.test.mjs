import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createSiteFonts} from '../src/fonts.mjs';

test('admin reads only the existing site fonts and coalesces requests',async()=>{
 let calls=0;
 const font=createSiteFonts('https://example.com',async(url,options)=>{calls++;assert.match(String(url),/^https:\/\/example.com\/fonts\/IranSansX\/fonts\/woff2\/IRANSansX-(Regular|Bold)\.woff2$/);assert.equal(options.redirect,'error');return new Response(Buffer.from('wOF2test-font'));});
 assert.equal(await font('../../secret'),null);
 const result=await Promise.all([font('IRANSansX-Regular.woff2'),font('IRANSansX-Regular.woff2')]);
 assert.equal(calls,1);assert.equal(result[0].toString(),'wOF2test-font');
 await font('IRANSansX-Regular.woff2');assert.equal(calls,1);
});
test('font reads recover after failure and reject oversized or invalid responses',async()=>{
 let working=false;
 const font=createSiteFonts('https://example.com',async()=>new Response(working?Buffer.from('wOF2ok'):'not a font'));
 await assert.rejects(font('IRANSansX-Bold.woff2'));working=true;
 assert.equal((await font('IRANSansX-Bold.woff2')).toString(),'wOF2ok');
 const large=createSiteFonts('https://example.com',async()=>new Response('wOF2'+'x'.repeat(256*1024)));
 await assert.rejects(large('IRANSansX-Regular.woff2'),/large/);
});
