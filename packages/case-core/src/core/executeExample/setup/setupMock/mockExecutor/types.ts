import { MockSetupFn } from '@contract-case/case-core-plugin-http-dsl';
import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';

export type MockSetupFns = {
  [T in AnyMockDescriptorType]: MockSetupFn<T>;
};
