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

import type {
  AnyMockDescriptorType,
  CaseContractDescription,
  DataContext,
} from '../../entities/types';
import { readerDependencies } from '../dependencies';
import { configFromEnv, configToRunContext } from '../../core/config';
import { constructDataContext } from '../../entities/context';
import { ContractStore } from '../../core/types.ContractReader';
import { CaseConfigurationError } from '../../entities';
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
  }

  getAvailableContractDescriptions(): CaseContractDescription[] {
    return this.contracts.map((link) => link.contents.description);
  }

  verifyContract<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>,
    configOverride = {},
  ): Promise<void> {
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

    return Promise.all(
      contractsToVerify.map((contractLink) => {
        this.context.logger.debug(
          `Verifying contract from file '${contractLink.filePath}'`,
        );
        return new ReadingCaseContract(
          contractLink.contents,
          this.dependencies,
          mergedConfig,
          this.parentVersions,
        ).verifyContract(invoker, this.callback);
      }),
    ).then(() => {});
  }
}
