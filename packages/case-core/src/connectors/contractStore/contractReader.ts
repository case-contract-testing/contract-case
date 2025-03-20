import * as path from 'node:path';
import * as fs from 'node:fs';
import {
  CaseConfigurationError,
  DataContext,
} from '@contract-case/case-plugin-base';
import { DownloadedContract } from '../../core/types.broker';
import { ContractStore } from '../../core/types.ContractReader';

type Contents<T> = { contents: T; filePath: string };

export const readContract = (pathToContract: string): DownloadedContract => {
  let content = '';
  try {
    content = fs.readFileSync(pathToContract, 'utf-8');
  } catch (e) {
    throw new CaseConfigurationError(
      `Unable to load contract file from disk at '${pathToContract}': ${
        (e as Error).message
      }`,
    );
  }

  let contract: DownloadedContract;
  try {
    contract = JSON.parse(content);
  } catch (e) {
    throw new CaseConfigurationError(
      `Unable to parse contract file from disk at '${pathToContract}': ${
        (e as Error).message
      }`,
    );
  }
  return contract;
};

type ReadDescriptor = {
  contents: Buffer;
  filePath: string;
};

const readFile = (filePath: string): ReadDescriptor => {
  try {
    return { contents: fs.readFileSync(filePath), filePath };
  } catch (e) {
    throw new CaseConfigurationError(
      `Unable to load contract file from disk at '${filePath}': ${
        (e as Error).message
      }.\n\nThis is almost certainly a race condition where the files were deleted during the directory read.`,
    );
  }
};

const readDir = (pathToDir: string): ReadDescriptor[] =>
  fs
    .readdirSync(pathToDir)
    .flatMap((file) => {
      const filePath = path.join(pathToDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        return readDir(filePath);
      }

      return [readFile(filePath)];
    })
    .filter((f): f is Contents<Buffer> => f !== null);

const readContractsFromDir = (
  pathToDir: string,
  context: DataContext,
): Contents<DownloadedContract>[] => {
  if (!fs.existsSync(pathToDir)) {
    throw new CaseConfigurationError(
      `The directory '${pathToDir}' does not seem to exist, so can't read contracts from it`,
    );
  }
  if (!fs.statSync(pathToDir).isDirectory()) {
    throw new CaseConfigurationError(
      `'${pathToDir}' exists but is a not a directory, so can't read contracts from it`,
    );
  }

  const jsonContracts = readDir(pathToDir)
    .filter(Boolean)
    .map((l) => ({ contents: l.contents.toString(), filePath: l.filePath }))
    .map((s) => {
      try {
        return { contents: JSON.parse(s.contents), filePath: s.filePath };
      } catch (e) {
        context.logger.warn(
          `Failed (${(e as Error).message}) while parsing '${
            s.filePath
          }' as json.\n\nThis may be a configuration error. The best practice is to:\n\n  * Keep the contract directory clear of non-contract files\n  * Remove all files in this directory before downloading contracts`,
        );
        return { contents: null, filePath: s.filePath };
      }
    })
    .filter((u): u is Contents<DownloadedContract> => u.contents !== null);

  jsonContracts
    .filter((item) => item.contents.contractType !== 'case::contract')
    .forEach((item) => {
      context.logger.debug(
        `Skipping ${item.filePath} because it is not a case contract (incorrect contractType value of '${item.contents.contractType}')`,
      );
    });

  const caseContracts = jsonContracts.filter(
    (item) => item.contents.contractType === 'case::contract',
  );

  caseContracts
    .filter(
      (item) =>
        typeof item.contents.description?.providerName !== 'string' ||
        typeof item.contents.description?.consumerName !== 'string',
    )
    .forEach((item) => {
      context.logger.warn(
        `Skipping ${item.filePath} because it must have a description.consumerName and description.providerName (was '${item.contents.description?.consumerName}' and '${item.contents.description?.providerName}' respectively)`,
      );
    });

  return caseContracts.filter(
    (item) =>
      typeof item.contents.description?.providerName === 'string' &&
      typeof item.contents.description?.consumerName === 'string',
  );
};

export const makeContractStore = (context: DataContext): ContractStore => ({
  readContract: (pathToContract: string) => ({
    contents: readContract(pathToContract),
    filePath: pathToContract,
  }),
  readContractsFromDir: (pathToDir: string) =>
    readContractsFromDir(pathToDir, context),
});
