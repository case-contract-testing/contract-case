export type InteractionSetup<C extends Record<string, string>> = {
  mock: Record<string, string> & C;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFunction(name: string): (...args: unknown[]) => any;
  getStateVariable(name: string): string;
};

// example-extract _trigger-type
/**
 * This function will be called by ContractCase to invoke your client code. You should return
 * a promise containing the business object that your API client code returns.
 *
 * @param setup - The configuration of your interaction
 *              (ie, state variables, properties of the running mock, etc.)
 * @typeParam R - the return type of your client code (ie, your business object)
 * @typeParam C - the type of the Config for this mock (eg `HttpRequestConfig`)
 * @returns a Promise that either resolves to a value of type `R`, or rejects
 *          with an error if the client code failed or threw an error
 */
export type Trigger<R, C extends Record<string, string>> = (
  setup: InteractionSetup<C>,
) => Promise<R>;
// end-example

export type TestResponseFunction<R, C extends Record<string, string>> = (
  data: R,
  config: InteractionSetup<C>,
) => Promise<unknown> | void;

export type TestErrorResponseFunction<C extends Record<string, string>> = (
  error: Error,
  config: InteractionSetup<C>,
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
