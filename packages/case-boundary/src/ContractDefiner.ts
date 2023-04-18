/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyMockDescriptorType,
  CaseConfigurationError,
  CaseCoreError,
  ContractDefiner as CoreContractDefiner,
} from '@contract-case/case-core';
import { AnyMatcher } from '@contract-case/test-equivalence-matchers';

import { convertConfig } from './config/config';
import { ContractCaseConfig } from './config/types';
import { handleError } from './boundary/errorHandler';
import { Result, Success } from './boundary/types';
import { MockDefinition } from './types';

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
        {}
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
          'Definer was undefined after it was initialised'
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
          'Definer was undefined after it was initialised'
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
          'Definer was undefined after it was initialised'
        );
      }

      return this.definer.stripMatchers(
        JSON.parse(JSON.stringify(matcherOrData))
      );
    } catch (e) {
      return handleError(e);
    }
  }
}
