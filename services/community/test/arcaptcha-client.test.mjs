import {test} from 'node:test';import assert from 'node:assert/strict';import {configureARCaptchaTestKeys,readARCaptchaToken} from '../public/widget.js';
test('official ARCaptcha testing placeholders are repaired only for local development',()=>{
 const create=()=>({testingSitekeys:['{{TESTING_SITE_KEY}}'],testingChallengeIds:['{{TESTING_CHALLENGE_ID}}']});
 for(const [captcha,host]of [[{testMode:false,siteKey:'0000000000'},'localhost'],[{testMode:true,siteKey:'real-key'},'localhost'],[{testMode:true,siteKey:'0000000000'},'example.com']]){const p=create();configureARCaptchaTestKeys(p,captcha,host);assert.equal(p.testingSitekeys[0],'{{TESTING_SITE_KEY}}');}
 const p=create();configureARCaptchaTestKeys(p,{testMode:true,siteKey:'0000000000'},'localhost');assert.equal(p.testingSitekeys[0],'0000000000');assert.equal(p.testingChallengeIds[0],'000000000000000000000000000000');
 const existing={testingSitekeys:['real-or-fixed-key'],testingChallengeIds:['existing-token']};configureARCaptchaTestKeys(existing,{testMode:true,siteKey:'0000000000'},'localhost');assert.equal(existing.testingSitekeys[0],'real-or-fixed-key');
});
test('submission reads the selected ARCaptcha widget token and does not revive an expired value',()=>{
 const container={querySelector:()=>({value:'hidden-token'})};
 assert.equal(readARCaptchaToken({getArcToken:id=>{assert.equal(id,'widget-2');return 'solved-token';}},'widget-2',container),'solved-token');
 assert.equal(readARCaptchaToken({getArcToken:()=>''},'widget-2',container),'');
 assert.equal(readARCaptchaToken({},'widget-2',container),'hidden-token');
});
