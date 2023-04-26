/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyMockDescriptorType,
  CaseConfigurationError,
  CaseCoreError,
  ContractDefinerConnector,
} from '@contract-case/case-core';
import { AnyMatcher } from '@contract-case/test-equivalence-matchers';

import { ContractCaseConfig } from './boundary/types';
import {
  mapStateHandlers,
  convertConfig,
  jsErrorToFailure,
  wrapLogPrinter,
} from './mappers';
import { MockDefinition } from './types';
import {
  ILogPrinter,
  IResultPrinter,
  Result,
  Success,
  SuccessWithAny,
} from './boundary';
import { mapTriggers } from './mappers/triggers';

export class ContractDefiner {
  private readonly constructorConfig: ContractCaseConfig;

  private readonly logPrinter: ILogPrinter;

  private readonly resultPrinter: IResultPrinter;

  private definer: ContractDefinerConnector<AnyMockDescriptorType> | undefined;

  constructor(
    config: ContractCaseConfig,
    logPrinter: ILogPrinter,
    resultPrinter: IResultPrinter
  ) {
    this.constructorConfig = config;
    this.definer = undefined;
    this.logPrinter = logPrinter;
    this.resultPrinter = resultPrinter;
  }

  private initialiseDefiner() {
    if (this.definer === undefined) {
      const config = convertConfig(this.constructorConfig);

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
        {
          ...(this.constructorConfig.stateHandlers
            ? {
                stateHandlers: mapStateHandlers(
                  this.constructorConfig.stateHandlers
                ),
              }
            : {}),

          ...(this.constructorConfig.triggerAndTests
            ? {
                triggerAndTests: mapTriggers(
                  this.constructorConfig.triggerAndTests
                ),
              }
            : {}),
        },
        wrapLogPrinter(this.logPrinter, this.resultPrinter)
      );
    }
  }

  async runExample(
    definition: MockDefinition,
    runConfig: ContractCaseConfig
  ): Promise<Result> {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (runExample)'
        );
      }
      await this.definer.runExample(definition, convertConfig(runConfig));
      return new Success();
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  async runRejectingExample(
    definition: MockDefinition,
    runConfig: ContractCaseConfig
  ): Promise<Result> {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (runRejectingExample)'
        );
      }
      await this.definer.runRejectingExample(
        definition,
        convertConfig(runConfig)
      );
      return new Success();
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  stripMatchers(matcherOrData: AnyMatcher): Result {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (stripMatchers)'
        );
      }

      return new SuccessWithAny(
        this.definer.stripMatchers(JSON.parse(JSON.stringify(matcherOrData)))
      );
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  endRecord(): Promise<Result> {
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
      .then(() => new Success())
      .catch((e) => jsErrorToFailure(e));
  }
}
