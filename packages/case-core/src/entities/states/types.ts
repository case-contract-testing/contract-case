import { AnyCaseMatcherOrData } from '@contract-case/case-entities-internal';

export const SETUP_NAMED_STATE = '_case:NamedState' as const;
export const SETUP_VARIABLE_STATE = '_case:StateWithVariables' as const;

export type NameOnlyState = HasTypeForState<typeof SETUP_NAMED_STATE> & {
  readonly stateName: string;
};

export type StateWithVariables = HasTypeForState<
  typeof SETUP_VARIABLE_STATE
> & {
  readonly stateName: string;
  readonly variables: Record<string, AnyCaseMatcherOrData>;
};

export type AnyStateType =
  | typeof SETUP_NAMED_STATE
  | typeof SETUP_VARIABLE_STATE;

export type AnyState = NameOnlyState | StateWithVariables;

export type HasTypeForState<T extends AnyStateType> = {
  '_case:state:type': T;
};

export type PromiseOrRaw<T> = Promise<T> | T;

type SetupFunction = () => PromiseOrRaw<Record<
  string,
  AnyCaseMatcherOrData
> | void>;
type TeardownFunction = () => PromiseOrRaw<void>;
type SetupTeardown = {
  setup: SetupFunction;
  teardown: TeardownFunction;
};

export type StateHandlers = Record<string, SetupFunction | SetupTeardown>;

export const isSetupFunction = (
  f: SetupFunction | SetupTeardown | undefined,
): f is SetupFunction => typeof (f as SetupFunction) === 'function';
