import type { SetupInfoFor } from 'entities/nodes/interactions/setup.types';
import type { AnyState, StateHandlers } from 'entities/states/types';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  ExampleNames,
} from 'entities/types';

export type RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
) => void;

type Trigger<T extends AnyInteractionType, R = unknown> = (
  config: SetupInfoFor<T>
) => Promise<R>;

type TriggerPair<T extends AnyInteractionType, R> = {
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

export type MultiTestInvoker<T extends AnyInteractionType, R = unknown> = {
  stateHandlers?: StateHandlers;
  triggers?: Record<string, TriggerPair<T, R>> | undefined;
};

export type TestInvoker<
  T extends AnyInteractionType,
  R = unknown
> = MultiTestInvoker<T, R> & {
  states?: Array<AnyState>;
  interaction: CaseInteractionFor<T>;
  trigger?: Trigger<T, R> | undefined;
};

export type InvokingScaffold<T extends AnyInteractionType> = Omit<
  TestInvoker<T>,
  'interaction'
> & { names: ExampleNames };
