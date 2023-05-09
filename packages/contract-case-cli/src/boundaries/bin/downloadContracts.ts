#!/usr/bin/env node

import { downloadContracts } from '../../connectors/DownloadContracts';

const serviceName = process.argv[2];
if (serviceName === '' || serviceName === undefined) {
  throw new Error('Must provide a service name');
}

const logLevel = 'warn';

if (process.env['CASE_BROKER_BASEURL'] === undefined) {
  throw new Error('Not downloading contracts as there is no broker baseUrl');
}

Promise.resolve()
  .then(() => downloadContracts(serviceName, logLevel))
  .then(
    () => {
      process.exit(0);
    },
    (e) => {
      // eslint-disable-next-line no-console
      console.error(e);
      process.exit(1);
    }
  );
