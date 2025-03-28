import { CaseConfig, DeployChecker } from '@contract-case/case-core';
import { defaultPrinter } from './defaultResultPrinter.js';
import { versionString } from '../../entities/versionString.js';

export const canDeploy = (
  serviceName: string,
  environment: string,
  config: CaseConfig,
  version?: string,
): Promise<unknown> =>
  Promise.resolve().then(() =>
    new DeployChecker(config, defaultPrinter, [versionString]).check(
      serviceName,
      environment,
      version,
    ),
  );
