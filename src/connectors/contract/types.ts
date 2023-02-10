import type { SetupInfoFor } from 'entities/nodes/interactions/setup.types';
import type { AnyState, StateFunctions } from 'entities/states/types';
import type { AnyInteractionType, CaseInteractionFor } from 'entities/types';

export type RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
) => void;

type Trigger<T extends AnyInteractionType, R = unknown> = (
  config: SetupInfoFor<T>
) => Promise<R>;

export type TestInvoker<T extends AnyInteractionType, R = unknown> = {
  states?: Array<AnyState>;
  interaction: CaseInteractionFor<T>;
  trigger?: Trigger<T, R>;
  stateHandlers?: StateFunctions;
};
