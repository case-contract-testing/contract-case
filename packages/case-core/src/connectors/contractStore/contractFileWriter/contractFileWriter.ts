import { mkdirp } from 'mkdirp';

import * as fs from 'fs';
import * as path from 'path';

import {
  DataContext,
  CaseConfigurationError,
  HasContractFileConfig,
} from '@contract-case/case-plugin-base';
import type { DownloadedContract, WriteContract } from '../../../core/types';
import { isHasContractFileConfig } from './contextValidator';
import { generateFileName, generateMainContractPath } from './filename';
import { ContractData } from '../../../entities/types';
import { readContract } from '../contractReader';
import { rawEquality } from '../../../diffmatch';
import { stripForComparison, stripForWriting } from './stripForComparison';

const contractsEqual = (
  existingContract: DownloadedContract,
  contract: ContractData,
) =>
  rawEquality(
    stripForComparison(existingContract),
    stripForComparison(contract),
  );

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
  if (fs.existsSync(pathToFile)) {
    if (
      context['_case:currentRun:context:contractFilename'] &&
      !context['_case:currentRun:context:overwriteFile']
    ) {
      context.logger.error(
        `Can't write to '${pathToFile}, as it already exists'`,
      );
      throw new CaseConfigurationError(`The file ${pathToFile} already exists`);
    }
    const existingContract = readContract(pathToFile);

    if (context['_case:currentRun:context:changedContracts'] === 'FAIL') {
      if (!contractsEqual(existingContract, contract)) {
        throw new CaseConfigurationError(
          `
        The existing contract in file:
            ${pathToFile} 
        didn't match the new contract being written.
        
        Please re-run your tests with one of:
        
        * The configuration property changedContracts is set to 'OVERWRITE'
        * The environment variable CASE_changedContracts=OVERWRITE
        
        If you see this on consecutive runs, please check 
        that your contract doesn't contain randomness 
        during contract definition`,
        );
      }
      context.logger.debug(
        `No need to overwrite contract '${pathToFile}', as it is identical to this one`,
      );
      return pathToFile;
    }
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

  if (context['_case:currentRun:context:contractFilename'] === undefined) {
    // If we haven't been given an explicit filename, we also write the main
    // contract too
    actuallyWriteContract(
      generateMainContractPath(contract, context),
      contract,
      context,
    );
  }

  const pathToFile = generateFileName(contract, context);

  actuallyWriteContract(pathToFile, contract, context);

  return pathToFile;
};

export const writeContract: WriteContract = (
  contract: ContractData,
  context: DataContext,
): string => internalWriteContract(stripForWriting(contract), context);
