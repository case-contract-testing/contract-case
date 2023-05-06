import {
  AnyData,
  AnyCaseMatcherOrData,
} from '@contract-case/case-entities-internal';
import { WritingCaseContract } from '../../core';

import type {
  MultiTestInvoker,
  Trigger,
} from '../../core/executeExample/types';
import type { CaseConfig } from '../../core/types';

import { CaseConfigurationError } from '../../entities';
import type {
  AnyMockDescriptorType,
  AnyState,
  CaseMockDescriptorFor,
  CaseContractDescription,
  SetupInfoFor,
} from '../../entities/types';
import { writerDependencies } from '../dependencies';
import { TestPrinter } from './types';
import { configFromEnv } from '../../core/config';

export type DefinitionSuccessExample<
  T extends AnyMockDescriptorType,
  R = unknown
> = MultiTestInvoker<T, R> & {
  states?: Array<AnyState>;
  definition: CaseMockDescriptorFor<T>;
  trigger?: Trigger<T, R>;
  testResponse?: (data: R, config: SetupInfoFor<T>) => unknown;
  triggerAndTest?: Trigger<T>;
};

export type DefinitionFailingExample<
  T extends AnyMockDescriptorType,
  R = unknown
> = MultiTestInvoker<T, R> & {
  states?: Array<AnyState>;
  definition: CaseMockDescriptorFor<T>;
  trigger?: Trigger<T, R>;
  triggerAndTest?: Trigger<T>;
  testErrorResponse?: (err: Error, config: SetupInfoFor<T>) => unknown;
};

export class ContractDefinerConnector<M extends AnyMockDescriptorType> {
  contract: WritingCaseContract;

  invoker: MultiTestInvoker<M>;

  config: CaseConfig;

  constructor(
    description: CaseContractDescription,
    config: CaseConfig,
    invoker: MultiTestInvoker<M>,
    printer: TestPrinter,
    dependencies = writerDependencies(printer)
  ) {
    this.config = {
      ...dependencies.defaultConfig,
      ...configFromEnv(),
      ...config,
    };
    console.log(this.config);
    this.contract = new WritingCaseContract(
      description,
      dependencies,
      this.config
    );

    this.invoker = invoker;
  }

  runExample<T extends AnyMockDescriptorType, R>(
    {
      states = [],
      definition,
      trigger,
      triggers,
      triggerAndTest,
      triggerAndTests,
      testResponse,
      stateHandlers,
    }: DefinitionSuccessExample<T, R>,
    runConfig: CaseConfig = {}
  ): Promise<unknown> {
    if (trigger === undefined && testResponse !== undefined) {
      throw new CaseConfigurationError(
        'The testResponse function was supplied, but this is not valid without also supplying `trigger`'
      );
    }

    if (trigger !== undefined && testResponse === undefined) {
      throw new CaseConfigurationError(
        'There was a trigger supplied, but without a corresponding `testResponse` function'
      );
    }

    return this.contract.executeTest(
      {
        states,
        mockDescription: definition,
        trigger,
        triggers:
          triggers ||
          (this.invoker as unknown as MultiTestInvoker<T, R>).triggers ||
          {},
        testResponse,
        triggerAndTest,
        triggerAndTests,
        stateHandlers: stateHandlers || this.invoker.stateHandlers || {},
      },
      runConfig
    );
  }

  runRejectingExample<T extends AnyMockDescriptorType, R>(
    {
      states = [],
      definition,
      trigger,
      triggers,
      triggerAndTest,
      triggerAndTests,
      testErrorResponse,
      stateHandlers,
    }: DefinitionFailingExample<T, R>,
    runConfig: CaseConfig = {}
  ): Promise<unknown> {
    if (trigger === undefined && testErrorResponse !== undefined) {
      throw new CaseConfigurationError(
        'The testErrorResponse function was supplied, but this is not valid without also supplying `trigger`'
      );
    }

    if (trigger !== undefined && testErrorResponse === undefined) {
      throw new CaseConfigurationError(
        'There was a trigger supplied, but without a corresponding `testErrorResponse` function'
      );
    }

    return this.contract.executeTest(
      {
        states,
        mockDescription: definition,
        trigger,
        testResponse: undefined,
        triggerAndTest,
        triggerAndTests,
        testErrorResponse,
        triggers:
          triggers ||
          (this.invoker as unknown as MultiTestInvoker<T, R>).triggers ||
          {},
        stateHandlers: stateHandlers || this.invoker.stateHandlers || {},
      },
      runConfig
    );
  }

  endRecord(): Promise<unknown> {
    return this.contract.endRecord();
  }

  stripMatchers(matcherOrData: AnyCaseMatcherOrData): AnyData {
    return this.contract.stripMatchers(matcherOrData);
  }
}
