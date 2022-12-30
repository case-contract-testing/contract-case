export type RunTestCallback = (
  testName: string,
  verify: () => Promise<void>
) => void;
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
