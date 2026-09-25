// Dataset 0.3.0; catalog reviewed 2026-09-25.
import type { LlmGuideRepository } from '../schema';
import { families } from './families.v1';
import { models } from './models.v1';
import { artifacts } from './artifacts.v1';
import { softwareProducts } from './softwareProducts.v1';
import { softwareReleases } from './softwareReleases.v1';
import { engines } from './engines.v1';
import { servingStacks } from './servingStacks.v1';
import { deploymentConfigurations } from './deploymentConfigurations.v1';
import { softwareCapabilities } from './softwareCapabilities.v1';
import { apiCompatibility } from './apiCompatibility.v1';
import { hardwareConfigurations } from './hardwareConfigurations.v1';
import { workloads } from './workloads.v1';
import { qualityEvaluations } from './qualityEvaluations.v1';
import { applicationAssessments } from './applicationAssessments.v1';
import { executionFeasibility } from './executionFeasibility.v1';
import { deploymentCompatibility } from './deploymentCompatibility.v1';
import { benchmarkRuns } from './benchmarkRuns.v1';
import { specializedAssessments } from './specializedAssessments.v1';
import { claims } from './claims.v1';
import { evidence } from './evidence.v1';
import { publishedEvaluations } from './publishedEvaluations.v1';
import { modelProfiles } from './modelProfiles.v1';
import { modelUseGuidance } from './modelUseGuidance.v1';
import { artifactListings } from './artifactListings.v1';
import { referenceComparisons } from './referenceComparisons.v1';
import { selectionGuidance } from './selectionGuidance.v1';
import { articleSections } from './articleSections.v1';
import { quantizationStudies } from './quantizationStudies.v1';

export const llmDataset: LlmGuideRepository = {
  families, models, artifacts, softwareProducts, softwareReleases, engines, servingStacks, deploymentConfigurations, softwareCapabilities, apiCompatibility, hardwareConfigurations, workloads, qualityEvaluations, applicationAssessments, executionFeasibility, deploymentCompatibility, benchmarkRuns, specializedAssessments, claims, evidence, publishedEvaluations, modelProfiles, modelUseGuidance, artifactListings, referenceComparisons, selectionGuidance, articleSections, quantizationStudies
};

export const llmDatasetUpdatedOn = "2026-09-25";
