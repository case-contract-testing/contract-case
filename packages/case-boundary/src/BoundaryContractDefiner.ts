/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { AnyMatcher } from '@contract-case/test-equivalence-matchers';

import { convertConfig, jsErrorToFailure, wrapLogPrinter } from './mappers';
import { BoundaryMockDefinition } from './types';
import {
  ContractCaseBoundaryConfig,
  ILogPrinter,
  IResultPrinter,
  BoundaryResult,
  BoundarySuccess,
  BoundarySuccessWithAny,
} from './boundary';
import { versionString } from './versionString';

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
  config: CaseConfig
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

export class BoundaryContractDefiner {
  private definer: ContractDefinerConnector<AnyMockDescriptorType> | undefined;

  private readonly constructorConfig: ContractCaseBoundaryConfig;

  private readonly logPrinter: ILogPrinter;

  private readonly resultPrinter: IResultPrinter;

  private readonly parentVersions: string[];

  constructor(
    config: ContractCaseBoundaryConfig,
    logPrinter: ILogPrinter,
    resultPrinter: IResultPrinter,
    parentVersions: string[]
  ) {
    this.constructorConfig = config;
    this.definer = undefined;
    this.logPrinter = logPrinter;
    this.resultPrinter = resultPrinter;
    this.parentVersions = parentVersions;
  }

  private initialiseDefiner() {
    if (this.definer === undefined) {
      const { config, partialInvoker } = convertConfig(this.constructorConfig);

      if (config.consumerName === undefined || config.consumerName === '') {
        throw new CaseConfigurationError(
          'Must provide a non-empty consumerName'
        );
      }

      if (config.providerName === undefined || config.providerName === '') {
        throw new CaseConfigurationError(
          'Must provide a non-empty providerName'
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
        [...this.parentVersions, versionString]
      );
    }
  }

  async runExample(
    definition: BoundaryMockDefinition,
    runConfig: ContractCaseBoundaryConfig
  ): Promise<BoundaryResult> {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (runExample)'
        );
      }

      const { config, partialInvoker } = convertConfig(runConfig);
      await this.definer.runExample(
        mapDefinition(definition, partialInvoker, config),
        config
      );
      return new BoundarySuccess();
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  async runRejectingExample(
    definition: BoundaryMockDefinition,
    runConfig: ContractCaseBoundaryConfig
  ): Promise<BoundaryResult> {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (runRejectingExample)'
        );
      }
      const { config, partialInvoker } = convertConfig(runConfig);
      await this.definer.runRejectingExample(
        { ...mapDefinition(definition, partialInvoker, config) },
        config
      );
      return new BoundarySuccess();
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  stripMatchers(matcherOrData: AnyMatcher): BoundaryResult {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (stripMatchers)'
        );
      }

      return new BoundarySuccessWithAny(
        this.definer.stripMatchers(JSON.parse(JSON.stringify(matcherOrData)))
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
            'Definer was undefined after it was initialised (endRecord)'
          );
        }
        return this.definer.endRecord();
      })
      .then(() => new BoundarySuccess())
      .catch((e) => jsErrorToFailure(e));
  }
}
