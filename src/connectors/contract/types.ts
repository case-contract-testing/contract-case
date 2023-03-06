import type { SetupInfoFor } from '../../entities/nodes/mocks/setup.types';
import type {
  StateHandlers,
  ExampleNames,
  AnyMockDescriptorType,
  AnyState,
  CaseMockDescriptorFor,
} from '../../entities/types';

export type RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
) => void;

type Trigger<T extends AnyMockDescriptorType, R = unknown> = (
  config: SetupInfoFor<T>
) => Promise<R>;

type TriggerPair<T extends AnyMockDescriptorType, R> = {
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

export type MultiTestInvoker<T extends AnyMockDescriptorType, R = unknown> = {
  stateHandlers?: StateHandlers;
  triggers?: Record<string, TriggerPair<T, R>> | undefined;
};

export type TestInvoker<
  T extends AnyMockDescriptorType,
  R = unknown
> = MultiTestInvoker<T, R> & {
  states?: Array<AnyState>;
  mock: CaseMockDescriptorFor<T>;
  trigger?: Trigger<T, R> | undefined;
};

export type InvokingScaffold<T extends AnyMockDescriptorType> = Omit<
  TestInvoker<T>,
  'mock'
> & { names: ExampleNames };
