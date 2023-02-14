import type { MockSetupFn } from 'entities/nodes/mocks/setup.types';
import type { AnyMockType } from 'entities/types';

export type MockSetupFns = {
  [T in AnyMockType]: MockSetupFn<T>;
};
