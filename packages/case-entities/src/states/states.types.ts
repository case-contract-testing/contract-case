import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';

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
