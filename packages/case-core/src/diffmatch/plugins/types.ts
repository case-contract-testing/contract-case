import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import { MockExecutorFn } from '@contract-case/case-plugin-base';
import { AnyMockDescriptor } from '@contract-case/case-plugin-dsl-types';

type CoreSetupTypes = unknown;

export type MockSetupFns = {
  [T in AnyMockDescriptorType]: MockExecutorFn<
    AnyMockDescriptor,
    CoreSetupTypes,
    T
  >;
};
