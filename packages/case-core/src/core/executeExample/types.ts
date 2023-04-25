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

/**
 * Do both the trigger and the assertion on the response (this type exists
 * because we can't pass around native response objects)
 *
 * @throws CaseTriggerError for any errors during execution of the trigger,
 * VerifyTriggerReturnObject for any errors during the test,
 * CaseConfigurationError for any configuration issues, and CaseCoreError for
 * any errors in the boundary
 */
export type TriggerAndTest<T extends AnyMockDescriptorType> = (
  config: SetupInfoFor<T>
) => Promise<unknown>;

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
  triggerAndTests?: Record<string, TriggerAndTest<T>> | undefined;
  triggers?: Record<string, TriggerPair<T, R>> | undefined;
};

export type TestInvoker<
  T extends AnyMockDescriptorType,
  R = unknown
> = MultiTestInvoker<T, R> & {
  states?: Array<AnyState>;
  mockDescription: CaseMockDescriptorFor<T>;
  triggerAndTest?: TriggerAndTest<T>;
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
