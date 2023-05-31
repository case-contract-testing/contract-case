export type TriggerConfig<C extends Record<string, unknown>> = C & {
  // TODO try not to use any here?
  // but probably we have to
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: Record<string, any>;
};

export type Trigger<R, C extends Record<string, unknown>> = (
  config: TriggerConfig<C>
) => Promise<R>;

export type TestResponseFunction<R, C extends Record<string, unknown>> = (
  data: R,
  config: TriggerConfig<C>
) => Promise<unknown> | void;

export type TestErrorResponseFunction = (
  error: Error,
  config: Record<string, unknown>
) => Promise<unknown> | void;

export type TriggerGroup<R, C extends Record<string, unknown>> = {
  trigger: Trigger<R, C>;
  testResponses?: Record<string, TestResponseFunction<R, C>>;
  testErrorResponses?: Record<string, TestErrorResponseFunction>;
};

export type InferredTriggerPair<T> = T extends TriggerGroup<infer R, infer C>
  ? TriggerGroup<R, C>
  : never;

export type Groups = {
  [x: string]: TriggerGroup<unknown, Record<string, unknown>>;
};

export type TriggerGroups = {
  groups: Groups;

  addTriggerGroup<R, C extends Record<string, unknown>>(
    name: string,
    group: TriggerGroup<R, C>
  ): TriggerGroups;
};
