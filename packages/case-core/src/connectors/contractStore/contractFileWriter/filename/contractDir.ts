import { HasContractFileConfig } from '@contract-case/case-plugin-base';

import * as path from 'path';
import { hashContract } from '../contractHasher';
import { EXTENSION } from './types';
import { ContractData } from '../../../../entities/types';
import { consumerSlug, providerSlug } from './slugs';

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
