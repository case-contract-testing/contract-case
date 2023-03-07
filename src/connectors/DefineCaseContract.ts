import { CaseConfigurationError } from '../entities';
import type {
  AnyCaseNodeType,
  AnyData,
  AnyMockDescriptorType,
  AnyState,
  CaseMockDescriptorFor,
  DataOrCaseNodeFor,
} from '../entities/types';

import type { WritingCaseContract } from './contract';
import type { MultiTestInvoker, Trigger } from './contract/types';

export type DefinitionSuccessExample<
  T extends AnyMockDescriptorType,
  R = unknown
> = MultiTestInvoker<T, R> & {
  states?: Array<AnyState>;
  definition: CaseMockDescriptorFor<T>;
  trigger?: Trigger<T, R>;
  testResponse?: (data: R) => unknown;
};

export type DefinitionFailingExample<
  T extends AnyMockDescriptorType,
  R = unknown
> = MultiTestInvoker<T, R> & {
  states?: Array<AnyState>;
  definition: CaseMockDescriptorFor<T>;
  trigger?: Trigger<T, R>;
  testErrorResponse?: (err: Error) => unknown;
};

export class DefineCaseContract {
  contract: WritingCaseContract;

  constructor(contract: WritingCaseContract) {
    this.contract = contract;
  }

  runExample<T extends AnyMockDescriptorType, R>({
    states = [],
    definition,
    trigger,
    testResponse,
    stateHandlers = {},
  }: DefinitionSuccessExample<T, R>): Promise<unknown> {
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
    return this.contract.executeTest({
      states,
      mockDescription: definition,
      trigger,
      testResponse,
      stateHandlers,
    });
  }

  runRejectingExample<T extends AnyMockDescriptorType, R>({
    states = [],
    definition,
    trigger,
    testErrorResponse,
    stateHandlers = {},
  }: DefinitionFailingExample<T, R>): Promise<unknown> {
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

    return this.contract.executeTest({
      states,
      mockDescription: definition,
      trigger,
      testResponse: undefined,
      testErrorResponse,
      stateHandlers,
    });
  }

  stripMatchers<T extends AnyCaseNodeType>(
    matcherOrData: DataOrCaseNodeFor<T>
  ): AnyData {
    return this.contract.stripMatchers(matcherOrData);
  }
}
