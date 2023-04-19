/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyMockDescriptorType,
  CaseConfigurationError,
  CaseCoreError,
  ContractDefiner as CoreContractDefiner,
} from '@contract-case/case-core';
import { AnyMatcher } from '@contract-case/test-equivalence-matchers';

import { ContractCaseConfig } from './boundary/types';
import { convertConfig, handleError } from './internal';
import { MockDefinition } from './types';
import { mapStateHandlers } from './internal/stateHandlers/mappers';
import { Result, Success } from './boundary';

export class ContractDefiner {
  private readonly constructorConfig: ContractCaseConfig;

  private definer: CoreContractDefiner<AnyMockDescriptorType> | undefined;

  constructor(config: ContractCaseConfig) {
    this.constructorConfig = config;
    this.definer = undefined;
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

      this.definer = new CoreContractDefiner(
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
            : undefined),
        }
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
      return handleError(e);
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
      return handleError(e);
    }
  }

  stripMatchers(matcherOrData: AnyMatcher): any {
    try {
      this.initialiseDefiner();
      if (this.definer === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (stripMatchers)'
        );
      }

      return this.definer.stripMatchers(
        JSON.parse(JSON.stringify(matcherOrData))
      );
    } catch (e) {
      return handleError(e);
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
      .catch((e) => handleError(e));
  }
}
