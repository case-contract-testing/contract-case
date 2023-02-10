import type { SetupInfoFor } from 'entities/nodes/interactions/setup.types';
import type { AnyState, StateHandlers } from 'entities/states/types';
import type { AnyInteractionType, CaseInteractionFor } from 'entities/types';

export type RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
) => void;

type Trigger<T extends AnyInteractionType, R = unknown> = (
  config: SetupInfoFor<T>
) => Promise<R>;

export type MultiTestInvoker = {
  stateHandlers?: StateHandlers;
};

export type TestInvoker<
  T extends AnyInteractionType,
  R = unknown
> = MultiTestInvoker & {
  states?: Array<AnyState>;
  interaction: CaseInteractionFor<T>;
  trigger?: Trigger<T, R>;
};
