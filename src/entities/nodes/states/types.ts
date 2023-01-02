export const SETUP_NAMED_STATE = 'SetupNamedState' as const;

export type SetupNamedState = HasTypeForState<typeof SETUP_NAMED_STATE> & {
  stateName: string;
};

export type AnyStateType = typeof SETUP_NAMED_STATE;

export type AnyState = SetupNamedState;

export type HasTypeForState<T extends AnyStateType> = {
  'case:state:type': T;
};

export type PromiseOrRaw<T> = Promise<T> | T;

type SetupFunction = () => PromiseOrRaw<Record<string, unknown> | void>;
type TeardownFunction = () => PromiseOrRaw<void>;
type SetupTeardown = {
  setup: SetupFunction;
  teardown: TeardownFunction;
};

export type StateFunctions = Record<string, SetupFunction | SetupTeardown>;

export const isSetupFunction = (
  f: SetupFunction | SetupTeardown | undefined
): f is SetupFunction => typeof (f as SetupFunction) === 'function';
