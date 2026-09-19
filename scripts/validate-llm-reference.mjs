/** Relational validation for the integrated reference records, used by the main dataset validator. */
export function validateLlmReference(repository) {
  const errors=[];
  const require=(condition,message)=>{if(!condition)errors.push(message);};
  const models=new Set(repository.models.map(m=>m.id)),sources=new Map(repository.evidence.map(e=>[e.id,e]));
  const observations=new Map();
  for(const result of repository.publishedEvaluations) for(const report of result.referenceObservations??[]) {
    require(!observations.has(report.id),`Duplicate reference observation ${report.id}`);observations.set(report.id,report);
    require(report.modelRef===result.modelVersionId,`Wrong model for ${report.id}`);
    require(sources.has(report.sourceId),`Missing source ${report.sourceId}`);
    require(result.evidenceIds.some(id=>sources.get(id)?.locator===report.sourceLocator),`Lost result locator ${report.id}`);
    require(report.value===result.value,`Unreviewed scale transformation ${report.id}`);
    require(report.evaluatedWeightRevision===null || report.evaluatedWeightRevision===result.evaluatedRevision,`Weight revision mismatch ${report.id}`);
    if(report.language===null)require(!result.language && result.languageScope?.kind==='unspecified',`Inferred language ${report.id}`);
    require(!sources.get(report.sourceId)?.sourceCapture || /^[a-f0-9]{64}$/.test(sources.get(report.sourceId).sourceCapture.contentSha256),`Invalid capture ${report.id}`);
  }
  const groups=new Set((repository.referenceComparisons??[]).map(g=>g.id));
  for(const group of repository.referenceComparisons??[]) {
    for(const id of group.evaluationIds)require(observations.has(id),`Missing observation ${id}`);
    for(const id of group.sourceIds)require(sources.has(id),`Missing comparison source ${id}`);
    require(!group.allowed.universalRanking && !group.allowed.qualityRatioClaim && !group.allowed.statisticalSignificanceClaim,`Unsupported comparison claim ${group.id}`);
    if(['separate-model-cards','publisher-collection-with-relayed-baselines'].includes(group.comparisonBasis))require(!group.allowed.withinReportNumericDifference,`Cross-report delta ${group.id}`);
  }
  for(const guide of repository.selectionGuidance??[]) {
    for(const id of guide.candidateModelRefs)require(models.has(id),`Missing guide model ${id}`);
    for(const id of guide.comparisonGroupIds)require(groups.has(id),`Missing guide comparison ${id}`);
    for(const locale of guide.locales)for(const field of ['title','decision','chooseWhen','doNotInfer'])require(!!guide[field][locale]?.trim(),`Missing ${locale} ${guide.id}/${field}`);
  }
  for(const section of repository.articleSections??[]) for(const id of section.comparisonGroupIds)require(groups.has(id),`Missing article comparison ${id}`);
  for(const q of repository.quantizationStudies??[]) {
    require(sources.has(q.sourceId),`Missing quantization source ${q.id}`);
    require(q.measuredDeploymentMemoryBytes===null && q.measuredTokensPerSecond===null,`Invented deployment measurement ${q.id}`);
  }
  return errors;
}
