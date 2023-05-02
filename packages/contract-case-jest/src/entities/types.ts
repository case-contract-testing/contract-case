type PromiseOrRaw<T> = Promise<T> | T;

export type SetupFunction = () => PromiseOrRaw<Record<string, unknown> | void>;

export type TeardownFunction = () => PromiseOrRaw<void>;

type SetupTeardown = {
  setup: SetupFunction;
  teardown: TeardownFunction;
};

export type StateHandler = SetupFunction | SetupTeardown;

export type StateHandlers = Record<string, StateHandler>;

export type TestResponseFunction<R = unknown> = (
  data: R,
  config: Record<string, unknown>
) => Promise<unknown> | void;

export type TestErrorResponseFunction = (
  error: Error,
  config: Record<string, unknown>
) => Promise<unknown> | void;

export type TriggerConfig<C = Record<string, unknown>> = C & {
  // TODO try not to use any here?
  // but probably we have to
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: Record<string, any>;
};

export type Trigger<R = unknown, C = Record<string, unknown>> = (
  config: TriggerConfig<C>
) => Promise<R>;

export type TriggerPair<R> = {
  trigger: Trigger<R>;
  testResponses?: Record<string, TestResponseFunction<R>>;
  testErrorResponses?: Record<string, TestErrorResponseFunction>;
};
