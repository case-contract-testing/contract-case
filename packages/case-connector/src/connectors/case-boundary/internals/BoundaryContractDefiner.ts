import {
  AnyMockDescriptorType,
  AnyState,
  CaseConfig,
  CaseConfigurationError,
  CaseCoreError,
  TestInvoker,
  AnyMockDescriptor,
  ContractDefinerConnector,
} from '@contract-case/case-core';

import {
  convertConfig,
  jsErrorToFailure,
  mapInvokableFunction,
  wrapLogPrinter,
} from './mappers/index.js';
import {
  BoundaryAnyMatcher,
  BoundaryMockDefinition,
} from './types.jsii-boundary.js';
import {
  ContractCaseBoundaryConfig,
  ILogPrinter,
  IResultPrinter,
  BoundaryResult,
  BoundarySuccess,
  BoundarySuccessWithAny,
} from './boundary/index.js';
import { versionString } from '../../../entities/versionString.js';
import { BoundaryInvokableFunction } from './types.js';

type Definition = {
  states: Array<AnyState>;
  definition: AnyMockDescriptor;
};

const mapDefinitionPart = (matcherOrData: unknown): Definition =>
  JSON.parse(JSON.stringify(matcherOrData));

const mapDefinition = (
  definition: BoundaryMockDefinition,
  {
    stateHandlers,
    triggerAndTests,
    triggerAndTest,
  }: Partial<TestInvoker<AnyMockDescriptorType>>,
  config: CaseConfig,
) => ({
  ...mapDefinitionPart(definition),
  ...(stateHandlers
    ? {
        stateHandlers,
      }
    : {}),
  ...(triggerAndTests
    ? {
        triggerAndTests,
      }
    : {}),
  ...(triggerAndTest ? { triggerAndTest } : {}),
  config,
});

/**
 * A BoundaryContractDefiner allows defining contracts
 *
 * @public
 */
export class BoundaryContractDefiner {
  private definer: ContractDefinerConnector<AnyMockDescriptorType> | undefined;

  private readonly constructorConfig: ContractCaseBoundaryConfig;

  private readonly logPrinter: ILogPrinter;

  private readonly resultPrinter: IResultPrinter;

  private readonly parentVersions: string[];

  /**
   * @public
   * Construct a BoundaryContractDefiner to allow defining contracts.
   *
   * @param config - A ContractCaseBoundaryConfig object for the configuration
   * @param logPrinter - An ILogPrinter to enable printing logs
   * @param resultPrinter - An IResultPrinter to enable printing results
   * @param parentVersions - The names version(s) of the package(s) calling
   * this, where each entry in the array contains a name and version, with the
   * first entry in the array being the furthest package up the call stack.
   */
  constructor(
    config: ContractCaseBoundaryConfig,
    logPrinter: ILogPrinter,
    resultPrinter: IResultPrinter,
    parentVersions: string[],
  ) {
    this.constructorConfig = config;
    this.definer = undefined;
    this.logPrinter = logPrinter;
    this.resultPrinter = resultPrinter;
    // If invoked directly, we need to include our version
    if (!parentVersions.includes(versionString)) {
      this.parentVersions = [...parentVersions, versionString];
    } else {
      this.parentVersions = parentVersions;
    }
  }

  private initialiseDefiner() {
    if (this.definer === undefined) {
      const { config, partialInvoker } = convertConfig(this.constructorConfig);

      if (config.consumerName === undefined || config.consumerName === '') {
        throw new CaseConfigurationError(
          'Must provide a non-empty consumerName',
        );
      }

      if (config.providerName === undefined || config.providerName === '') {
        throw new CaseConfigurationError(
          'Must provide a non-empty providerName',
        );
      }

      this.definer = new ContractDefinerConnector(
        {
          consumerName: config.consumerName,
          providerName: config.providerName,
        },
        config,
        partialInvoker,
        wrapLogPrinter(this.logPrinter, this.resultPrinter),
        [...this.parentVersions],
      );
    }
  }

  async runInteraction(
    definition: BoundaryMockDefinition,
    runConfig: ContractCaseBoundaryConfig,
  ): Promise<BoundaryResult> {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (runInteraction)',
        );
      }

      const { config, partialInvoker } = convertConfig(runConfig);
      await this.definer.runInteraction(
        mapDefinition(definition, partialInvoker, config),
        config,
      );
      return new BoundarySuccess();
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  async runRejectingInteraction(
    definition: BoundaryMockDefinition,
    runConfig: ContractCaseBoundaryConfig,
  ): Promise<BoundaryResult> {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (runRejectingInteraction)',
        );
      }
      const { config, partialInvoker } = convertConfig(runConfig);
      await this.definer.runRejectingInteraction(
        { ...mapDefinition(definition, partialInvoker, config) },
        config,
      );
      return new BoundarySuccess();
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  registerFunction(
    handle: string,
    invokeableFn: BoundaryInvokableFunction,
  ): BoundaryResult {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (stripMatchers)',
        );
      }
      this.definer.registerFunction(handle, mapInvokableFunction(invokeableFn));
      return new BoundarySuccess();
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  stripMatchers(matcherOrData: BoundaryAnyMatcher): BoundaryResult {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (stripMatchers)',
        );
      }

      return new BoundarySuccessWithAny(
        JSON.stringify(
          this.definer.stripMatchers(JSON.parse(JSON.stringify(matcherOrData))),
        ),
      );
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  endRecord(): Promise<BoundaryResult> {
    return Promise.resolve()
      .then(() => {
        this.initialiseDefiner();
        if (this.definer === undefined) {
          throw new CaseCoreError(
            'Definer was undefined after it was initialised (endRecord)',
          );
        }
        return this.definer.endRecord();
      })
      .then(() => new BoundarySuccess())
      .catch((e) => jsErrorToFailure(e));
  }
}
