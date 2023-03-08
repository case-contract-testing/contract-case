import type { MockSetupFn } from '../../../../../../entities/nodes/mocks/setup.types';
import type { AnyMockDescriptorType } from '../../../../../../entities/types';

export type MockSetupFns = {
  [T in AnyMockDescriptorType]: MockSetupFn<T>;
};
