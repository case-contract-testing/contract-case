import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import {
  AnyMockDescriptor,
  MockExecutorFn,
} from '@contract-case/case-plugin-base';

type CoreSetupTypes = unknown;

export type MockSetupFns = {
  [T in AnyMockDescriptorType]: MockExecutorFn<
    AnyMockDescriptor,
    CoreSetupTypes,
    T
  >;
};
