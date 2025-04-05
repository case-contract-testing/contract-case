import { mkdirp } from 'mkdirp';

import * as fs from 'fs';
import * as path from 'path';

import {
  DataContext,
  CaseConfigurationError,
  HasContractFileConfig,
} from '@contract-case/case-plugin-base';
import { ContractData } from '@contract-case/case-plugin-base/dist/src/core/contract/types';
import type { WriteContract } from '../../../core/types';
import { isHasContractFileConfig } from './contextValidator';
import { generateFileName, generateMainContractPath } from './filename';

/**
 * Strips any state-provided values from the contract.
 *
 * This is important because these are provided by the (possibly non-hermetic)
 * state handlers present in some interaction types (eg, contracts defined by
 * http response consumers). The state-provided variables are part of the test
 * configuration, and not part of the contract.
 *
 * Note this doesn't strip state variable default values, only those from state
 * handlers.
 *
 * @param contract - the contract to strip variables from
 * @returns the contract without the state-provided variables
 */
const stripStateVariables = (contract: ContractData): ContractData => ({
  ...contract,
  matcherLookup: Object.entries(contract.matcherLookup)
    .filter(([key]) => !key.startsWith('variable:state'))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
});

const createDirectory = (
  pathToFile: string,
  context: HasContractFileConfig,
) => {
  const dirName = path.dirname(pathToFile);
  if (!fs.existsSync(dirName)) {
    context.logger.maintainerDebug(`Creating directory ${dirName}`);
    try {
      mkdirp.sync(dirName);
    } catch (e) {
      throw new CaseConfigurationError(
        `Failed trying to create contract directory '${dirName}': ${
          (e as Error).message
        }`,
      );
    }
  }
};

const actuallyWriteContract = (
  pathToFile: string,
  contract: ContractData,
  context: HasContractFileConfig,
) => {
  if (
    fs.existsSync(pathToFile) &&
    context['_case:currentRun:context:contractFilename'] &&
    !context['_case:currentRun:context:overwriteFile']
  ) {
    context.logger.error(
      `Can't write to '${pathToFile}, as it already exists'`,
    );
    throw new CaseConfigurationError(`The file ${pathToFile} already exists`);
  }

  createDirectory(pathToFile, context);
  context.logger.maintainerDebug(`Writing contract to '${pathToFile}'`);
  fs.writeFileSync(pathToFile, JSON.stringify(contract, undefined, 2));
  return pathToFile;
};

const internalWriteContract = (
  contract: ContractData,
  context: DataContext,
): string => {
  if (!isHasContractFileConfig(context)) {
    throw new CaseConfigurationError(
      'Unable to write contract without required configuration options set. See the error logs for more information.',
    );
  }
  if (
    context['_case:currentRun:context:contractFilename'] !== undefined &&
    context['_case:currentRun:context:contractDir'] !==
      context['_case:currentRun:context:defaultConfig']['contractDir']
  ) {
    context.logger.warn(
      'Both contractFilename and contractDir have been specified, but you should only set one of these when writing a contract.',
    );

    context.logger.warn(
      `Ignoring contractDir setting, and writing to file at: ${context['_case:currentRun:context:contractFilename']}`,
    );
  }

  const pathToFile = generateFileName(contract, context);

  actuallyWriteContract(pathToFile, contract, context);

  if (context['_case:currentRun:context:contractFilename'] === undefined) {
    actuallyWriteContract(
      generateMainContractPath(contract, context),
      contract,
      context,
    );
  }

  return pathToFile;
};

export const writeContract: WriteContract = (
  contract: ContractData,
  context: DataContext,
): string => internalWriteContract(stripStateVariables(contract), context);
