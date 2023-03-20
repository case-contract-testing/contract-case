#!/usr/bin/env node

import { ContractDownloader } from '../src/connectors/contract/ContractDownloader';

const serviceName = process.argv[2];
if (serviceName === '' || serviceName === undefined) {
  throw new Error('Must provide a service name');
}

new ContractDownloader({
  logLevel: 'maintainerDebug',
  contractDir: 'temp-contracts',
})
  .download(serviceName)
  .then(
    () => {
      process.exit(0);
    },
    () => {
      process.exit(1);
    }
  );
