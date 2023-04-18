#!/usr/bin/env node

import { ContractDownloader } from '../src/connectors/contract/ContractDownloader';
import { makeLogger } from '../src/connectors/logger';

const serviceName = process.argv[2];
if (serviceName === '' || serviceName === undefined) {
  throw new Error('Must provide a service name');
}

const logLevel = 'warn';

new ContractDownloader({
  logLevel,
  contractDir: 'temp-contracts',
})
  .download(serviceName)
  .then(
    () => {
      process.exit(0);
    },
    (e) => {
      makeLogger({
        '_case:currentRun:context:logLevel': logLevel,
        '_case:currentRun:context:location': ['CLI'],
      }).error(e.message);
      process.exit(1);
    }
  );
