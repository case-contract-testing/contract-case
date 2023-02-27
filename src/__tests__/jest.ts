import type {
  RunTestCallback,
  AnyMockDescriptorType,
  AnyState,
  CaseMockDescriptorFor,
  Assertable,
  CaseContract,
} from 'boundaries';

export const runJestTest: RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
): void => {
  // eslint-disable-next-line jest/expect-expect
  it(`${testName}`, () => verify());
};

// JEST BOILERPLATE
export const runCaseExample = <T extends AnyMockDescriptorType, R>(
  contract: CaseContract,
  states: Array<AnyState>,
  mock: CaseMockDescriptorFor<T>,
  trigger: (config: Assertable<T>['config']) => Promise<R>,
  testResponseObject: (data: R) => unknown
): Promise<unknown> =>
  contract.executeTest({
    states,
    mock,
    trigger: (config) => trigger(config).then(testResponseObject),
  });

export const runCaseRejectExample = <T extends AnyMockDescriptorType, R>(
  contract: CaseContract,
  states: Array<AnyState>,
  mock: CaseMockDescriptorFor<T>,
  trigger: (config: Assertable<T>['config']) => Promise<R>,
  testResponseObject: (error: Error) => unknown
): Promise<unknown> =>
  contract.executeTest({
    states,
    mock,
    trigger: (config) =>
      trigger(config).then((d) => {
        throw new Error(`Expected an error, but was ${d}`);
      }, testResponseObject),
  });
