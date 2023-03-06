import type { WritingCaseContract } from './contract';
import { VerifyTriggerReturnObjectError } from '../entities';
import type {
  AnyCaseNodeType,
  AnyData,
  AnyMockDescriptorType,
  AnyState,
  Assertable,
  CaseMockDescriptorFor,
  DataOrCaseNodeFor,
} from '../entities/types';

export class DefineCaseContract {
  contract: WritingCaseContract;

  constructor(contract: WritingCaseContract) {
    this.contract = contract;
  }

  runExample<T extends AnyMockDescriptorType, R>(
    states: Array<AnyState>,
    mock: CaseMockDescriptorFor<T>,
    trigger: (config: Assertable<T>['config']) => Promise<R>,
    testResponseObject: (data: R) => unknown
  ): Promise<unknown> {
    return this.contract.executeTest({
      states,
      mock,
      trigger: (config) =>
        trigger(config).then((r) => {
          try {
            return testResponseObject(r);
          } catch (e) {
            throw new VerifyTriggerReturnObjectError(e);
          }
        }),
    });
  }

  runRejectingExample<T extends AnyMockDescriptorType, R>(
    states: Array<AnyState>,
    mock: CaseMockDescriptorFor<T>,
    trigger: (config: Assertable<T>['config']) => Promise<R>,
    testResponseObject: (error: Error) => unknown
  ): Promise<unknown> {
    return this.contract.executeTest({
      states,
      mock,
      trigger: (config) =>
        trigger(config).then((d) => {
          throw new Error(`Expected an error, but was ${d}`);
        }, testResponseObject),
    });
  }

  stripMatchers<T extends AnyCaseNodeType>(
    matcherOrData: DataOrCaseNodeFor<T>
  ): AnyData {
    return this.contract.stripMatchers(matcherOrData);
  }
}
