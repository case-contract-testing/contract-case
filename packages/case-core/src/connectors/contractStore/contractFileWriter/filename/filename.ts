import { HasContractFileConfig } from '@contract-case/case-plugin-base';
import { ContractData } from '@contract-case/case-plugin-base/dist/src/core/contract/types';

import * as path from 'path';

import { makePath } from './contractDir';
import { EXTENSION, MAX_FILENAME_LENGTH } from './types';

export const generateFileName = (
  contract: ContractData,
  context: HasContractFileConfig,
): string => {
  const pathToFile = path.resolve(
    context['_case:currentRun:context:contractFilename']
      ? context['_case:currentRun:context:contractFilename']
      : makePath(contract, context),
  );

  if (!pathToFile.endsWith(EXTENSION)) {
    context.logger.warn(
      `The contract filename has been truncated, as it was over ${MAX_FILENAME_LENGTH} characters. The new name is '${pathToFile}'`,
    );
  }
  return pathToFile;
};
