import type { AnyCaseNodeOrData } from '../../entities/types';

export const SETUP_NAMED_STATE = 'NamedState' as const;
export const SETUP_VARIABLE_STATE = 'StateWithVariables' as const;

export type NameOnlyState = HasTypeForState<typeof SETUP_NAMED_STATE> & {
  stateName: string;
};

export type StateWithVariables = HasTypeForState<
  typeof SETUP_VARIABLE_STATE
> & {
  stateName: string;
  variables: Record<string, AnyCaseNodeOrData>;
};

export type AnyStateType =
  | typeof SETUP_NAMED_STATE
  | typeof SETUP_VARIABLE_STATE;

export type AnyState = NameOnlyState | StateWithVariables;

export type HasTypeForState<T extends AnyStateType> = {
  'case:state:type': T;
};

export type PromiseOrRaw<T> = Promise<T> | T;

type SetupFunction = () => PromiseOrRaw<Record<
  string,
  AnyCaseNodeOrData
> | void>;
type TeardownFunction = () => PromiseOrRaw<void>;
type SetupTeardown = {
  setup: SetupFunction;
  teardown: TeardownFunction;
};

export type StateHandlers = Record<string, SetupFunction | SetupTeardown>;

export const isSetupFunction = (
  f: SetupFunction | SetupTeardown | undefined
): f is SetupFunction => typeof (f as SetupFunction) === 'function';
