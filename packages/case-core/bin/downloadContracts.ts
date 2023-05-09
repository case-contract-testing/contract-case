#!/usr/bin/env node

import { defaultPrinter } from '../src/__tests__/jest/defaultTestPrinter';
import { ContractDownloader } from '../src/connectors/contract/ContractDownloader';
import { makeLogger } from '../src/connectors/logger';

const serviceName = process.argv[2];
if (serviceName === '' || serviceName === undefined) {
  throw new Error('Must provide a service name');
}

const logLevel = 'warn';

const logger = makeLogger(
  {
    '_case:currentRun:context:logLevel': logLevel,
    '_case:currentRun:context:location': ['CLI'],
  },
  defaultPrinter
);

if (process.env['CASE_BROKER_BASEURL'] === undefined) {
  logger.warn('Not downloading contracts as there is no broker baseUrl');
  process.exit(0);
}

Promise.resolve()
  .then(() =>
    new ContractDownloader(
      {
        logLevel,
        contractDir: 'temp-contracts',
      },
      defaultPrinter
    ).download(serviceName)
  )
  .then(
    () => {
      process.exit(0);
    },
    (e) => {
      logger.error(e.message);
      process.exit(1);
    }
  );
