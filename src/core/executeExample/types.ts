import type { SetupInfoFor } from '../../entities/nodes/mocks/setup.types';
import type {
  StateHandlers,
  ExampleNames,
  AnyMockDescriptorType,
  AnyState,
  CaseMockDescriptorFor,
  Assertable,
} from '../../entities/types';

export type RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
) => void;

export type Trigger<T extends AnyMockDescriptorType, R = unknown> = (
  config: SetupInfoFor<T>
) => Promise<R>;

type TriggerPair<T extends AnyMockDescriptorType, R> = {
  trigger: Trigger<T, R>;
  testResponses?: Record<
    string,
    (data: R, config: SetupInfoFor<T>) => Promise<unknown> | void
  >;
  testErrorResponses?: Record<
    string,
    (error: Error, config: SetupInfoFor<T>) => Promise<unknown> | void
  >;
};

export type MultiTestInvoker<T extends AnyMockDescriptorType, R = unknown> = {
  stateHandlers?: StateHandlers | undefined;
  triggers?: Record<string, TriggerPair<T, R>> | undefined;
};

export type TestInvoker<
  T extends AnyMockDescriptorType,
  R = unknown
> = MultiTestInvoker<T, R> & {
  states?: Array<AnyState>;
  mockDescription: CaseMockDescriptorFor<T>;
  trigger?: Trigger<T, R> | undefined;
  testResponse?:
    | ((data: R, config: Assertable<T>['config']) => unknown)
    | undefined;
  testErrorResponse?:
    | ((data: Error, config: Assertable<T>['config']) => unknown)
    | undefined;
};

export type InvokingScaffold<T extends AnyMockDescriptorType, R> = Omit<
  TestInvoker<T, R>,
  'mockDescription'
> & { names: ExampleNames };
