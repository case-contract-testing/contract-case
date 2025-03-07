import { Mutex } from 'async-mutex';

import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import {
  CaseConfigurationError,
  DataContext,
  constructDataContext,
  CaseCoreError,
} from '@contract-case/case-plugin-base';
import { CaseContractDescription } from '@contract-case/case-plugin-base/dist/src/core/contract/types';

import type {
  CaseConfig,
  ContractFileFromDisk,
  ReaderDependencies,
} from '../../core/types';
import type {
  MultiTestInvoker,
  RunTestCallback,
} from '../../core/executeExample/types';
import { ReadingCaseContract } from '../../core/ReadingCaseContract';

import { readerDependencies } from '../dependencies';
import { configFromEnv, configToRunContext } from '../../core/config';
import { ContractStore } from '../../core/types.ContractReader';
import { TestPrinter } from './types';

const readContractFromStore = (
  config: CaseConfig,
  reader: ContractStore,
): ContractFileFromDisk[] => {
  if (
    config.contractFilename !== undefined &&
    typeof config.contractFilename === 'string'
  ) {
    return [reader.readContract(config.contractFilename)];
  }
  if (
    config.contractDir !== undefined &&
    typeof config.contractDir === 'string'
  ) {
    return reader.readContractsFromDir(config.contractDir);
  }
  throw new CaseConfigurationError(
    'No contractFilename or contractDir specified. Must provide one of these so that Case can find the contract(s) to verify',
  );
};

export class ContractVerifierConnector {
  contracts: ContractFileFromDisk[];

  config: CaseConfig;

  callback: RunTestCallback;

  dependencies: ReaderDependencies;

  context: DataContext;

  parentVersions: string[];

  // This is needed so that each contract runs one at a time
  // (this connector can be passed multiple contracts)
  private mutex: Mutex;

  constructor(
    userConfig: CaseConfig,
    callback: RunTestCallback,
    printer: TestPrinter,
    parentVersions: string[],
    dependencies = readerDependencies(printer),
  ) {
    this.dependencies = dependencies;
    this.parentVersions = parentVersions;
    this.config = {
      ...dependencies.defaultConfig,
      ...configFromEnv(),
      ...userConfig,
    };

    this.context = // TODO: Extract constructDataContext to somewhere more DRY
      constructDataContext(
        this.dependencies.makeLogger,
        this.dependencies.resultFormatter,
        {
          ...configToRunContext(this.config),
        },
        dependencies.defaultConfig,
        parentVersions,
      );

    const store = this.dependencies.makeContractStore(this.context);

    this.contracts = readContractFromStore(this.config, store);

    this.callback = callback;

    this.mutex = new Mutex();
  }

  getAvailableContractDescriptions(): CaseContractDescription[] {
    return this.contracts.map((link) => link.contents.description);
  }

  verifyContract<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>,
    configOverride = {},
    invokeableFns: Record<
      string,
      (...args: unknown[]) => Promise<unknown>
    > = {},
  ): Promise<void> | undefined {
    const mergedConfig = { ...this.config, ...configOverride };

    if (typeof mergedConfig.providerName !== 'string') {
      throw new CaseConfigurationError(
        `Must provide a providerName to verify (received '${mergedConfig.providerName}').`,
      );
    }
    this.context.logger.debug(
      `There are ${this.contracts.length} contracts loaded (this may include contracts that don't belong to this run)`,
    );
    this.contracts
      .filter(
        (item) =>
          item.contents.description?.providerName !== mergedConfig.providerName,
      )
      .forEach((item) => {
        this.context.logger.debug(
          `Skipping ${item.filePath} because it is not for the provider '${mergedConfig.providerName}' (It was for '${item.contents.description?.providerName}' instead)`,
        );
      });

    const caseContractsForProvider = this.contracts.filter(
      (item) =>
        item.contents.description?.providerName === mergedConfig.providerName,
    );

    caseContractsForProvider
      .filter(
        (item) =>
          typeof mergedConfig.consumerName !== 'undefined' &&
          item.contents.description?.consumerName !== mergedConfig.consumerName,
      )
      .forEach((item) => {
        this.context.logger.debug(
          `Skipping ${item.filePath} because it is not for the consumer '${mergedConfig.consumerName}' (It was for '${item.contents.description?.consumerName}' instead)`,
        );
      });

    const contractsToVerify = caseContractsForProvider.filter(
      (item) =>
        typeof mergedConfig.consumerName === 'undefined' ||
        item.contents.description?.consumerName === mergedConfig.consumerName,
    );

    if (contractsToVerify.length === 0) {
      throw new CaseConfigurationError(
        "No contracts were matched for verification. Try this run again with logLevel: 'debug' to find out more",
      );
    }
    if (mergedConfig.internals == null) {
      throw new CaseCoreError(
        'Verify contract was called with no internals set - this is an error in the caller, probably the language specific wrapper',
      );
    }

    if (contractsToVerify.length > 1) {
      this.context.logger.debug(
        '*** Multiple contracts are being verified ***',
      );
      this.context.logger.debug(
        'Note that the following debug log may contain interactions from any contract in any order',
      );
    }
    const results = contractsToVerify.map((contractLink, index) => {
      this.context.logger.debug(
        `Verifying contract from file '${contractLink.filePath}'`,
      );
      const contractVerifier = new ReadingCaseContract(
        contractLink.contents,
        this.dependencies,
        {
          ...mergedConfig,
          coreLogContextPrefix:
            contractsToVerify.length > 1 ? `Contract[${index}]` : '',
        },
        this.parentVersions,
        this.mutex,
      );
      Object.entries(invokeableFns).forEach(([key, value]) => {
        contractVerifier.registerFunction(key, value);
      });
      return contractVerifier.verifyContract(invoker, this.callback);
    });
    if (mergedConfig.internals.asyncVerification) {
      this.context.logger.maintainerDebug(`Awaiting async verification`);
      return Promise.all(results).then(
        () => {
          this.context.logger.maintainerDebug(
            `Async verification complete (Success)`,
          );
        },
        (e) => {
          this.context.logger.maintainerDebug(
            `Async verification complete (Error: ${e.message})`,
          );
          throw e;
        },
      );
    }
    this.context.logger.maintainerDebug(`Synchronous verification complete`);
    return undefined;
  }
}
