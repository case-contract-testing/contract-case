type PromiseOrRaw<T> = Promise<T> | T;

export type SetupFunction = () => PromiseOrRaw<Record<string, unknown> | void>;

export type TeardownFunction = () => PromiseOrRaw<void>;

type SetupTeardown = {
  setup: SetupFunction;
  teardown: TeardownFunction;
};

export type StateHandler = SetupFunction | SetupTeardown;

export type StateHandlers = Record<string, StateHandler>;

export type RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>,
) => void;

export interface ContractDescription {
  consumerName: string;
  providerName: string;
}
