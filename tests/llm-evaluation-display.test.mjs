import test from 'node:test';
import assert from 'node:assert/strict';
import { loadLlmModules } from './helpers/llm-modules.mjs';
const modules = await loadLlmModules();
const {hasReportedValue,reportedSettings,evaluationMetricLabel,hasNumericResult}=modules['evaluation-display'];
test('empty metadata is omitted while zero and disabled settings remain visible',()=>{
 for(const missing of [null,undefined,'','  ','not-reported','Not reported','نامشخص','گزارش نشده','—']) assert.equal(hasReportedValue(missing),false);
 for(const actual of [0,false,'0','BF16','8K','Unknown checkpoint; tested in BF16']) assert.equal(hasReportedValue(actual),true);
 const settings={temperature:0,applyChatTemplate:false,shots:null,mode:'not-reported',scoreOrigin:'publisher',datasetSplit:'test'};
 assert.deepEqual(reportedSettings(settings),[['temperature',0],['applyChatTemplate',false],['datasetSplit','test']]);
 assert.equal(settings.shots,null);assert.equal(settings.scoreOrigin,'publisher');
});
test('generic score labels are localized without assigning a stronger metric meaning',()=>{
 assert.equal(evaluationMetricLabel('publisher-reported score','fa'),'امتیاز');
 assert.equal(evaluationMetricLabel('publisher-reported score','es'),'Puntuación');
 assert.equal(evaluationMetricLabel('nDCG@10','fa'),'nDCG@10');
 assert.equal(modules.evaluation.metricSemantics('publisher-reported score','score').direction,'unknown');
});
test('numeric zero is a result; missing values never become zero scores',()=>{
 for(const value of [0,1,-1]) assert.equal(hasNumericResult({value,benchmark:'MIRACL'}),true);
 for(const value of [null,undefined,NaN,Infinity,'not reported']) assert.equal(hasNumericResult({value,benchmark:'MIRACL'}),false);
});
test('display cleanup never makes incomplete reports comparable',()=>{
 const result=modules.guide.llmRepository.publishedEvaluations.find(r=>r.metric==='publisher-reported score');
 const before=structuredClone(result);
 reportedSettings(result.settings);evaluationMetricLabel(result.metric,'fa');
 assert.deepEqual(result,before);
 assert.equal(modules.evaluation.qualityComparison([result,{...result,id:'test-copy'}]).rank,false);
});
