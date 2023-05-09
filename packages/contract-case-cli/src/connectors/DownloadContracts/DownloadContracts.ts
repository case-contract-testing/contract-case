import { ContractDownloader, LogLevel } from '@contract-case/case-core';
import { defaultPrinter } from './defaultResultPrinter';

export const downloadContracts = (
  serviceName: string,
  logLevel: LogLevel
): Promise<unknown> =>
  Promise.resolve().then(() =>
    new ContractDownloader(
      {
        logLevel,
        contractDir: 'temp-contracts',
      },
      defaultPrinter
    ).download(serviceName)
  );
