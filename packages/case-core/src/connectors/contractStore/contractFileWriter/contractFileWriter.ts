import { mkdirp } from 'mkdirp';

import * as fs from 'fs';
import * as path from 'path';

import {
  DataContext,
  CaseConfigurationError,
  HasContractFileConfig,
  ErrorCodes,
} from '@contract-case/case-plugin-base';
import type { WriteContract } from '../../../core/types';
import { isHasContractFileConfig } from './contextValidator';
import { generateFileName, generateMainContractPath } from './filename';
import { ContractData } from '../../../entities/types';
import { readContract } from '../contractReader';
import { contractsEqual, stripForWriting } from './contractNormaliser';

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
        context,
        'DISK_IO_PROBLEM',
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
    const existingContract = readContract(pathToFile);

    if (context['_case:currentRun:context:changedContracts'] === 'FAIL') {
      if (!contractsEqual(existingContract, contract, context)) {
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
          'DONT_ADD_LOCATION',
          'OVERWRITE_CONTRACTS_NEEDED',
        );
      }
      context.logger.debug(
        `No need to overwrite contract '${pathToFile}', as it is identical to this one`,
      );
      return pathToFile;
    }
  }

  if (context['_case:currentRun:context:changedContracts'] === 'FAIL') {
    throw new CaseConfigurationError(
      `
    Tried to write a new contract to
        ${pathToFile} 
    But it didn't exist. This isn't allowed with changedContracts set to fail.
    
    While ContractCase is running in snapshot test mode, it's a failure to
    create new contracts. You'll need to re-run your tests with one of:
    
    * The configuration property changedContracts is set to 'OVERWRITE'
    * The environment variable CASE_changedContracts=OVERWRITE
    `,
      'DONT_ADD_LOCATION',
      'OVERWRITE_CONTRACTS_NEEDED',
    );
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
      context,
      ErrorCodes.configuration.INVALID_CONFIG,
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
