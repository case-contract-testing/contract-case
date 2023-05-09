import { program } from 'commander';
import { CaseConfig, LogLevel } from '@contract-case/case-core';

import packageJson from '../../package.json';
import { handleError, downloadContracts } from '../connectors';

const mapConfig = (options: unknown): CaseConfig => ({
  ...(options != null &&
  typeof options === 'object' &&
  'logLevel' in options &&
  typeof options.logLevel === 'string'
    ? { logLevel: options.logLevel as LogLevel }
    : {}),
});

program
  .name('ContractCase')
  .description('CLI to access a ContractCase contract broker')
  .version(packageJson.version);

program
  .command('download-contracts')
  .description('download contracts from a a broker')
  .argument('<provider-name>', 'Name of the provider to download contracts for')
  .option('-l, --log-level <level>', 'log level')
  .action((providerName, options) =>
    Promise.resolve()
      .then(() => downloadContracts(providerName, mapConfig(options)))
      .then(
        () => {
          process.exit(0);
        },
        (e) => {
          handleError(e);
          process.exit(1);
        }
      )
  );

program.parse();
