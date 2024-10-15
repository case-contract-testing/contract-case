import { program } from 'commander';
import { CaseConfig, LogLevel } from '@contract-case/case-core';

import packageJson from '../../package.json' assert { type: 'json' };
import { handleError, downloadContracts } from '../connectors/index.js';

const mapConfig = (options: unknown): CaseConfig => {
  // This function is full of type assertions because the case core does the actual validation.
  // TODO: Replace the boundary config type with one that accepts unknowns and
  // undefined so this abomination can go away
  if (options != null && typeof options === 'object') {
    return {
      ...('logLevel' in options && typeof options.logLevel === 'string'
        ? { logLevel: options.logLevel as LogLevel }
        : {}),
      ...('brokerCiAccessToken' in options
        ? { brokerCiAccessToken: options.brokerCiAccessToken as string }
        : {}),
      ...('brokerBaseUrl' in options
        ? { brokerCiAccessToken: options.brokerBaseUrl as string }
        : {}),
      ...('brokerPassword' in options || 'brokerUsername' in options
        ? {
            brokerBasicAuth: {
              ...{
                username:
                  'brokerUsername' in options
                    ? (options.brokerUsername as string)
                    : (undefined as unknown as string),
                password:
                  'brokerPassword' in options
                    ? (options.brokerPassword as string)
                    : (undefined as unknown as string),
              },
            },
          }
        : {}),
    };
  }
  return {};
};

program
  .name('ContractCase')
  .description('CLI to access a ContractCase contract broker')
  .version(packageJson.version);

program
  .command('download-contracts')
  .description('download contracts from a a broker')
  .argument('<provider-name>', 'Name of the provider to download contracts for')
  .option('-l, --log-level <level>', 'log level')
  .option(
    '--broker-ci-access-token',
    'broker CI token (recommended over username + password)',
  )
  .option('--broker-base-url', 'broker base URL')
  .option(
    '--broker-username',
    'broker basic auth username. Do not supply this if you are also using a broker CI token. Must be supplied with --broker-password',
  )
  .option(
    '--broker-password',
    'broker basic auth password. Do not supply this if you are also using a broker CI token. Must be supplied with --broker-username',
  )

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
        },
      ),
  );

program.parse();
