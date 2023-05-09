import { CaseConfig, ContractDownloader } from '@contract-case/case-core';
import { defaultPrinter } from './defaultResultPrinter';

export const downloadContracts = (
  serviceName: string,
  config: CaseConfig
): Promise<unknown> =>
  Promise.resolve().then(() =>
    new ContractDownloader(config, defaultPrinter).download(serviceName)
  );
