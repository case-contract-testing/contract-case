import { HasContractFileConfig } from '@contract-case/case-plugin-base';

import * as path from 'path';

import { makeHashPath, makeMainPath } from './contractDir';
import { EXTENSION } from './types';
import { ContractData } from '../../../../entities/types';
import { MAX_FILENAME_LENGTH } from '../../../../entities';

const warnIfLong = (pathToFile: string, context: HasContractFileConfig) => {
  if (!pathToFile.endsWith(EXTENSION)) {
    context.logger.warn(
      `The contract filename has been truncated, as it was over ${MAX_FILENAME_LENGTH} characters. The new name is '${pathToFile}'`,
    );
  }
  return pathToFile;
};

export const generateFileName = (
  contract: ContractData,
  context: HasContractFileConfig,
): string =>
  warnIfLong(
    path.resolve(
      context['_case:currentRun:context:contractFilename']
        ? context['_case:currentRun:context:contractFilename']
        : makeHashPath(contract, context),
    ),
    context,
  );

export const generateMainContractPath = (
  contract: ContractData,
  context: HasContractFileConfig,
): string =>
  warnIfLong(
    path.resolve(
      context['_case:currentRun:context:contractFilename']
        ? context['_case:currentRun:context:contractFilename']
        : makeMainPath(contract, context),
    ),
    context,
  );
