import filenamify from 'filenamify';
import slug from 'slug';

import type { ContractFile } from 'connectors/contract/structure/types';
import * as fs from 'fs';
import * as path from 'path';
import { CaseConfigurationError } from 'entities';
import type { ContractDescription } from 'entities/contract/types';
import type {
  MatchContext,
  MatchContextWithContractFileConfig,
} from 'entities/types';

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

export const writeContract = (
  contract: ContractFile,
  context: MatchContext
): string => {
  if (!isCaseContractConfig(context)) {
    throw new CaseConfigurationError(
      'Unable to write contract without required configuration options set. See the error logs for more information.'
    );
  }
  const pathToFile = makePath(contract.description, context);

  context.logger.maintainerDebug(`About to write contract to '${pathToFile}'`);
  if (fs.existsSync(pathToFile)) {
    context.logger.error(
      `Can't write to '${pathToFile}, as it already exists'`
    );
    throw new CaseConfigurationError(`The file ${pathToFile} already exists`);
  }
  fs.writeFileSync(pathToFile, JSON.stringify(contract, undefined, 2));
  return pathToFile;
};

export const readContract = (pathToContract: string): ContractFile =>
  JSON.parse(fs.readFileSync(pathToContract, 'utf-8'));
