import {
  AllMockSetupInfos,
  AnyCaseMatcher,
  AnyMockDescriptor,
  AnyMockDescriptorType,
} from '@contract-case/case-entities-internal';
import { CaseConfigurationError } from '@contract-case/case-plugin-base';
import {
  CaseMockDescriptorFor,
  AnyData,
  AnyLeafOrStructure,
  SetupInfoFor,
  AnyState,
} from '@contract-case/case-plugin-dsl-types';
import { WritingCaseContract } from '../../core';

import type {
  MultiTestInvoker,
  Trigger,
} from '../../core/executeExample/types';
import type { CaseConfig, ContractWriteSuccess } from '../../core/types';

import { writerDependencies } from '../dependencies';
import { TestPrinter } from './types';
import { configFromEnv } from '../../core/config';
import { CaseContractDescription } from '../../entities/types';

export type DefinitionSuccessExample<
  T extends AnyMockDescriptorType,
  R = unknown,
  MockSetups = AllMockSetupInfos,
> = MultiTestInvoker<T, R> & {
  states?: Array<AnyState>;
  definition: CaseMockDescriptorFor<AnyMockDescriptor, T>;
  trigger?: Trigger<T, R>;
  testResponse?: (data: R, config: SetupInfoFor<MockSetups, T>) => unknown;
  triggerAndTest?: Trigger<T>;
};

export type DefinitionFailingExample<
  T extends AnyMockDescriptorType,
  R = unknown,
  MockSetups = AllMockSetupInfos,
> = MultiTestInvoker<T, R> & {
  states?: Array<AnyState>;
  definition: CaseMockDescriptorFor<AnyMockDescriptor, T>;
  trigger?: Trigger<T, R>;
  triggerAndTest?: Trigger<T>;
  testErrorResponse?: (
    err: Error,
    config: SetupInfoFor<MockSetups, T>,
  ) => unknown;
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
    parentVersions: string[],
    dependencies = writerDependencies(printer),
  ) {
    this.config = {
      ...dependencies.defaultConfig,
      ...configFromEnv(),
      ...config,
    };
    this.contract = new WritingCaseContract(
      description,
      dependencies,
      this.config,
      parentVersions,
    );

    this.invoker = invoker;
  }

  registerFunction(
    handle: string,
    invokeableFn: (...args: unknown[]) => Promise<unknown | void>,
  ): void {
    this.contract.registerFunction(handle, invokeableFn);
  }

  runInteraction<T extends AnyMockDescriptorType, R>(
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
    runConfig: CaseConfig = {},
  ): Promise<unknown> {
    if (trigger === undefined && testResponse !== undefined) {
      throw new CaseConfigurationError(
        'The testResponse function was supplied, but this is not valid without also supplying `trigger`',
        'DONT_ADD_LOCATION',
        'INVALID_CONFIG',
      );
    }

    if (trigger !== undefined && testResponse === undefined) {
      throw new CaseConfigurationError(
        'There was a trigger supplied, but without a corresponding `testResponse` function',
        'DONT_ADD_LOCATION',
        'INVALID_CONFIG',
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
      runConfig,
    );
  }

  runRejectingInteraction<T extends AnyMockDescriptorType, R>(
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
    runConfig: CaseConfig = {},
  ): Promise<unknown> {
    if (trigger === undefined && testErrorResponse !== undefined) {
      throw new CaseConfigurationError(
        'The testErrorResponse function was supplied, but this is not valid without also supplying `trigger`',
        'DONT_ADD_LOCATION',
        'INVALID_CONFIG',
      );
    }

    if (trigger !== undefined && testErrorResponse === undefined) {
      throw new CaseConfigurationError(
        'There was a trigger supplied, but without a corresponding `testErrorResponse` function',
        'DONT_ADD_LOCATION',
        'INVALID_CONFIG',
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
      runConfig,
    );
  }

  endRecord(): Promise<ContractWriteSuccess> {
    return this.contract.endRecord();
  }

  stripMatchers(matcherOrData: AnyCaseMatcher | AnyLeafOrStructure): AnyData {
    return this.contract.stripMatchers(matcherOrData);
  }
}
