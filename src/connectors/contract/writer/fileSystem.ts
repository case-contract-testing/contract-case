import filenamify from 'filenamify';
import slug from 'slug';

import * as fs from 'fs';
import * as path from 'path';

import type { WriteContract } from '../../../core/contract/types';
import { DEFAULT_CONFIG } from '../../../core/contract';

import { CaseConfigurationError } from '../../../entities';
import type {
  MatchContext,
  MatchContextWithContractFileConfig,
  ContractDescription,
  ContractFile,
} from '../../../entities/types';

const checkCurrentRunField = <T extends MatchContext>(
  context: MatchContext,
  configName: string
) => {
  const maybeCaseContractConfig = context as T;
  const fieldName = `case:currentRun:context:${configName}`;
  if (fieldName in maybeCaseContractConfig) {
    const value = maybeCaseContractConfig[fieldName as keyof T];
    if (typeof value === 'string' && value !== '') {
      context.logger.maintainerDebug(
        `Validated config field '${fieldName}', accepted '${value}'`
      );
      return true;
    }
    context.logger.maintainerDebug(
      `Failed validation for config field '${fieldName}', failed '${value}'`
    );
  } else {
    context.logger.maintainerDebug(
      `Failed validation for config field '${fieldName}', not present in context`,
      context
    );
  }

  context.logger.error(
    `Missing configuration field '${configName}'. Please ensure it is set to a non-empty string.`
  );

  return false;
};

const isCaseContractConfig = (
  context: MatchContext
): context is MatchContextWithContractFileConfig =>
  ['testRunId', 'contractDir']
    .map((field) => checkCurrentRunField(context, field))
    .reduce((acc, curr) => acc && curr, true);

const EXTENSION = '.case.json';

const escapeFileName = (pathString: string) => filenamify(pathString);

const makeFilename = (
  description: ContractDescription,
  config: MatchContextWithContractFileConfig
) =>
  escapeFileName(
    `${slug(`${description.consumerName}-${description.providerName}`)}-${
      config['case:currentRun:context:testRunId']
    }${EXTENSION}`
  );

const makePath = (
  description: ContractDescription,
  config: MatchContextWithContractFileConfig
) =>
  path.join(
    config['case:currentRun:context:contractDir'],
    makeFilename(description, config)
  );

export const writeContract: WriteContract = (
  contract: ContractFile,
  context: MatchContext
): string => {
  if (!isCaseContractConfig(context)) {
    throw new CaseConfigurationError(
      'Unable to write contract without required configuration options set. See the error logs for more information.'
    );
  }
  if (
    context['case:currentRun:context:contractFilename'] !== 'undefined' &&
    context['case:currentRun:context:contractDir'] !==
      DEFAULT_CONFIG.contractDir
  ) {
    context.logger.warn(
      'Both contractFilename and contractDir have been specified, but you should only set one of these.'
    );

    context.logger.warn(
      `Ignoring contractDir setting, and writing to file at: ${context['case:currentRun:context:contractFilename']}`
    );
  }

  const pathToFile = context['case:currentRun:context:contractFilename']
    ? context['case:currentRun:context:contractFilename']
    : makePath(contract.description, context);

  context.logger.maintainerDebug(`About to write contract to '${pathToFile}'`);
  if (fs.existsSync(pathToFile)) {
    context.logger.error(
      `Can't write to '${pathToFile}, as it already exists'`
    );
    throw new CaseConfigurationError(`The file ${pathToFile} already exists`);
  }
  fs.writeFileSync(
    pathToFile,
    JSON.stringify(
      {
        ...contract,
        // The following is a hack so that the contract can be processed by the pact broker CLI
        consumer: { name: contract.description.consumerName },
        provider: { name: contract.description.providerName },
      },
      undefined,
      2
    )
  );
  return pathToFile;
};

export const readContract = (pathToContract: string): ContractFile =>
  JSON.parse(fs.readFileSync(pathToContract, 'utf-8'));
