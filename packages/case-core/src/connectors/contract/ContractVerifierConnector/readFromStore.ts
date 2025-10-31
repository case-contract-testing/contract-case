import { CaseConfigurationError } from '@contract-case/case-plugin-base';
import {
  CaseConfig,
  ContractFileFromDisk,
  ContractStore,
} from '../../../core/types';

export const readContractFromStore = (
  config: CaseConfig,
  reader: ContractStore,
): ContractFileFromDisk[] => {
  if (
    config.contractFilename !== undefined &&
    typeof config.contractFilename === 'string'
  ) {
    return [reader.readContract(config.contractFilename)];
  }
  if (
    config.contractDir !== undefined &&
    typeof config.contractDir === 'string'
  ) {
    return reader.readContractsFromDir(config.contractDir);
  }
  throw new CaseConfigurationError(
    'No contractFilename or contractDir specified. Must provide one of these so that Case can find the contract(s) to verify',
    'DONT_ADD_LOCATION',
    'INVALID_CONFIG',
  );
};
