import filenamify from 'filenamify';
import slug from 'slug';

import type { ContractFile } from 'connectors/contract/structure/types';
import * as fs from 'fs';
import * as path from 'path';
import { CaseConfigurationError } from 'entities';
import type { ContractDescription } from 'entities/contract/types';
import type { Logger } from 'entities/logger/types';

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
  logger: Logger,
  config: CaseContractConfig = {
    testRunId: '12',
    contractDir: 'temp-contracts',
  }
): string => {
  const pathToFile = makePath(contract.description, config);
  logger.maintainerDebug(`About to write contract to '${pathToFile}'`);
  if (fs.existsSync(pathToFile)) {
    logger.error(`Can't write to '${pathToFile}, as it already exists'`);
    throw new CaseConfigurationError(`the file ${pathToFile} already exists`);
  }
  fs.writeFileSync(pathToFile, JSON.stringify(contract));
  return pathToFile;
};

export const readContract = (pathToContract: string): ContractFile =>
  JSON.parse(fs.readFileSync(pathToContract, 'utf-8'));
