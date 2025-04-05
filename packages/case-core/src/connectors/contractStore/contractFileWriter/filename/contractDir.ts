import { HasContractFileConfig } from '@contract-case/case-plugin-base';
import { ContractData } from '@contract-case/case-plugin-base/dist/src/core/contract/types';

import filenamify from 'filenamify';
import slug from 'slug';
import * as path from 'path';
import { hashContract } from '../contractHasher';
import { EXTENSION, MAX_FILENAME_LENGTH } from './types';

const escapeFileName = (pathString: string) =>
  filenamify(pathString, { maxLength: MAX_FILENAME_LENGTH });

const makeFileName = (contract: ContractData, suffix: string) =>
  path.join(
    escapeFileName(slug(contract.description.providerName)),
    `${escapeFileName(slug(contract.description.consumerName))}-${suffix}${EXTENSION}`,
  );

export const makeHashPath = (
  contract: ContractData,
  config: HasContractFileConfig,
): string =>
  path.join(
    config['_case:currentRun:context:contractDir'],
    makeFileName(contract, hashContract(contract)),
  );

export const makeMainPath = (
  contract: ContractData,
  config: HasContractFileConfig,
): string =>
  path.join(
    config['_case:currentRun:context:contractDir'],
    makeFileName(contract, 'main'),
  );
