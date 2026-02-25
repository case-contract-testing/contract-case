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
  readonly contractPaths: Array<string>;
  /* The consumer slug (ie, the consumer part of the filename), normalised
   * however ContractCase chose to normalise it */
  readonly consumerSlug: string;
  /* The provider slug (ie, the provider part of the filepath), normalised
   * however ContractCase chose to normalise it */
  readonly providerSlug: string;
};

export type StateHandler = SetupFunction | SetupTeardown;

export type StateHandlers = Record<string, StateHandler>;

export interface ContractDescription {
  readonly consumerName: string;
  readonly providerName: string;
}

export interface VerificationTestHandle {
  readonly filePath: string;
  readonly testName: string;
  readonly testIndex: number;
  readonly contractIndex: number;
}

type MetadataValue = ContractMetadata | string;

export interface ContractMetadata {
  [key: string]: MetadataValue;
}

export type VerificationHandle = {
  readonly filePath: string;
  readonly contractIndex: number;
  readonly description: {
    /**
     * The name of the provider for this contract.
     */
    readonly providerName: string;

    /**
     * The name of the consumer for this contract.
     */
    readonly consumerName: string;
  };
  readonly metadata: ContractMetadata;
  readonly testHandles: VerificationTestHandle[];
};
