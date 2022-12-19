import filenamify from 'filenamify';
import slug from 'slug';

import type { ContractFile } from 'connectors/contract/structure/types';
import * as fs from 'fs';
import * as path from 'path';
import { CaseConfigurationError } from 'entities';

type CaseContractConfig = {
  testRunId: string;
  contractDir: string;
};

const EXTENSION = '.case.json';

const escapeFileName = (pathString: string) => filenamify(pathString);

export const writeContract = (
  contract: ContractFile,
  config: CaseContractConfig = {
    testRunId: '12',
    contractDir: 'temp-contracts',
  }
): void => {
  const filename = escapeFileName(
    `${slug(
      `${contract.description.consumerName}-${contract.description.providerName}`
    )}-${config.testRunId}${EXTENSION}`
  );

  const pathToFile = path.join(config.contractDir, filename);

  if (fs.existsSync(pathToFile)) {
    throw new CaseConfigurationError(`the file ${pathToFile} already exists`);
  }

  fs.writeFileSync(pathToFile, JSON.stringify(contract));
};
