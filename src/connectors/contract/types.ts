import type { SetupInfoFor } from 'entities/nodes/mocks/setup.types';
import type { AnyState, StateHandlers } from 'entities/states/types';
import type { AnyMockType, CaseMockFor, ExampleNames } from 'entities/types';

export type RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
) => void;

type Trigger<T extends AnyMockType, R = unknown> = (
  config: SetupInfoFor<T>
) => Promise<R>;

type TriggerPair<T extends AnyMockType, R> = {
  trigger: Trigger<T, R>;
  verifiers: Record<
    string,
    (data: R, config: SetupInfoFor<T>) => Promise<unknown> | void
  >;
  errorVerifiers: Record<
    string,
    (error: Error, config: SetupInfoFor<T>) => Promise<unknown> | void
  >;
};

export type MultiTestInvoker<T extends AnyMockType, R = unknown> = {
  stateHandlers?: StateHandlers;
  triggers?: Record<string, TriggerPair<T, R>> | undefined;
};

export type TestInvoker<T extends AnyMockType, R = unknown> = MultiTestInvoker<
  T,
  R
> & {
  states?: Array<AnyState>;
  mock: CaseMockFor<T>;
  trigger?: Trigger<T, R> | undefined;
};

export type InvokingScaffold<T extends AnyMockType> = Omit<
  TestInvoker<T>,
  'mock'
> & { names: ExampleNames };
