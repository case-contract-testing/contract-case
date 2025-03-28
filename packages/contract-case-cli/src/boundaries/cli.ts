import { Command, program } from 'commander';
import { CaseConfig, LogLevel } from '@contract-case/case-core';

import {
  handleError,
  downloadContracts,
  canDeploy,
} from '../connectors/index.js';
import { versionString } from '../entities/versionString.js';

process.env['CASE_CONNECTOR_CLIENT'] = 'contract-case-cli';

const mapConfig = (options: unknown): CaseConfig => {
  // This function is full of type assertions because the case core does the actual validation.
  // TODO: Replace the boundary config type with one that accepts unknowns and
  // undefined so this abomination can go away
  if (options != null && typeof options === 'object') {
    return {
      ...('contractDir' in options && typeof options.contractDir === 'string'
        ? { contractDir: options.contractDir }
        : {}),
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
  .description('CLI to interact with contract files and contract brokers')
  .version(`@contract-case/cli@${versionString}`);

const commonOptions = (command: Command) =>
  command
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
    );

commonOptions(
  program
    .command('download-contracts')
    .description('download contracts from a broker')
    .argument(
      '<provider-name>',
      'Name of the provider to download contracts for',
    )
    .option('--contract-dir', 'directory to download contracts to'),
).action((providerName, options) =>
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

commonOptions(
  program
    .command('can-i-deploy')
    .description('Ask the broker if it is safe to deploy')
    .argument('<service-name>', 'Name of the service to check')
    .requiredOption('-e, --environment', 'environment to check against')
    .option(
      '--override-version',
      'override the version detection and instead query this specific version',
    ),
).action((providerName, options) =>
  Promise.resolve()
    .then(() =>
      canDeploy(providerName, options.environment, mapConfig(options)),
    )
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
