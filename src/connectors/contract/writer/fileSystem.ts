import filenamify from 'filenamify';
import slug from 'slug';

import type { ContractFile } from 'connectors/contract/structure/types';
import * as fs from 'fs';
import * as path from 'path';
import { CaseConfigurationError } from 'entities';
import type { ContractDescription } from 'entities/contract/types';
import type { MatchContext } from 'entities/types';

type CaseContractConfig = {
  testRunId: string;
  contractDir: string;
};

const EXTENSION = '.case.json';

const escapeFileName = (pathString: string) => filenamify(pathString);

const makeFilename = (
  description: ContractDescription,
  config: CaseContractConfig
) =>
  escapeFileName(
    `${slug(`${description.consumerName}-${description.providerName}`)}-${
      config.testRunId
    }${EXTENSION}`
  );

const makePath = (
  description: ContractDescription,
  config: CaseContractConfig
) => path.join(config.contractDir, makeFilename(description, config));

export const writeContract = (
  contract: ContractFile,
  context: MatchContext,
  config: CaseContractConfig = {
    testRunId: '12',
    contractDir: 'temp-contracts',
  }
): string => {
  const pathToFile = makePath(contract.description, config);
  context.logger.warn(
    'NOT YET IMPLEMENTED: Need to remove the default index of 12 for the contract file'
  );
  context.logger.warn(
    'NOT YET IMPLEMENTED: Add configuration for the directory to write the contracts to'
  );

  context.logger.maintainerDebug(`About to write contract to '${pathToFile}'`);
  if (fs.existsSync(pathToFile)) {
    context.logger.error(
      `Can't write to '${pathToFile}, as it already exists'`
    );
    throw new CaseConfigurationError(`The file ${pathToFile} already exists`);
  }
  fs.writeFileSync(pathToFile, JSON.stringify(contract));
  return pathToFile;
};

export const readContract = (pathToContract: string): ContractFile =>
  JSON.parse(fs.readFileSync(pathToContract, 'utf-8'));
