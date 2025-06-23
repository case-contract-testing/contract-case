type PromiseOrRaw<T> = Promise<T> | T;

export type SetupFunction = () => PromiseOrRaw<Record<string, unknown> | void>;

export type TeardownFunction = () => PromiseOrRaw<void>;

type SetupTeardown = {
  setup: SetupFunction;
  teardown: TeardownFunction;
};

/** Returned by ContractCase on a successful contract write */
export type ContractWriteSuccess = {
  /* The path(s) to the contract files written */
  contractPaths: Array<string>;
  /* The consumer slug (ie, the consumer part of the filename), normalised
   * however ContractCase chose to normalise it */
  consumerSlug: string;
  /* The provider slug (ie, the provider part of the filepath), normalised
   * however ContractCase chose to normalise it */
  providerSlug: string;
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
