import { CaseConfig, ContractDownloader } from '@contract-case/case-core';
import { defaultPrinter } from './defaultResultPrinter.js';
import { versionString } from '../../entities/versionString.js';

export const downloadContracts = (
  serviceName: string,
  config: CaseConfig
): Promise<unknown> =>
  Promise.resolve().then(() =>
    new ContractDownloader(config, defaultPrinter, [versionString]).download(
      serviceName
    )
  );
