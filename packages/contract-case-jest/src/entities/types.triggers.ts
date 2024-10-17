export type TriggerSetup<C extends Record<string, string>> = {
  mock: Record<string, string> & C;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFunction(name: string): (...args: unknown[]) => any;
  getStateVariable(name: string): string;
};

export type Trigger<R, C extends Record<string, string>> = (
  setup: TriggerSetup<C>,
) => Promise<R>;

export type TestResponseFunction<R, C extends Record<string, string>> = (
  data: R,
  config: TriggerSetup<C>,
) => Promise<unknown> | void;

export type TestErrorResponseFunction<C extends Record<string, string>> = (
  error: Error,
  config: TriggerSetup<C>,
) => Promise<unknown> | void;

export type TriggerGroup<R, C extends Record<string, string>> = {
  trigger: Trigger<R, C>;
  testResponses?: Record<string, TestResponseFunction<R, C>>;
  testErrorResponses?: Record<string, TestErrorResponseFunction<C>>;
};

export type InferredTriggerPair<T> =
  T extends TriggerGroup<infer R, infer C> ? TriggerGroup<R, C> : never;

export type Groups = {
  [x: string]: TriggerGroup<unknown, Record<string, string>>;
};

export type TriggerGroups = {
  groups: Groups;

  addTriggerGroup<R, C extends Record<string, string>>(
    name: string,
    group: TriggerGroup<R, C>,
  ): TriggerGroups;
};
