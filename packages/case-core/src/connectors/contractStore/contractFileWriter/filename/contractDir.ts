import { HasContractFileConfig } from '@contract-case/case-plugin-base';

import filenamify from 'filenamify';
import slug from 'slug';
import * as path from 'path';
import { hashContract } from '../contractHasher';
import { EXTENSION, MAX_FILENAME_LENGTH } from './types';
import { ContractData } from '../../../../entities/types';

const escapeFileName = (pathString: string) =>
  filenamify(pathString, { maxLength: MAX_FILENAME_LENGTH });

export const providerSlug = (contract: ContractData): string =>
  escapeFileName(slug(contract.description.providerName));

export const consumerSlug = (contract: ContractData): string =>
  escapeFileName(slug(contract.description.consumerName));

const makeFileName = (contract: ContractData, suffix: string) =>
  path.join(
    providerSlug(contract),
    `${consumerSlug(contract)}-${suffix}${EXTENSION}`,
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
