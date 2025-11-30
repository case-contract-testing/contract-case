import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import { MockExecutor, MockExecutorFn } from '@contract-case/case-plugin-base';
import {
  AnyMockDescriptor,
  CaseMockDescriptorFor,
} from '@contract-case/case-plugin-dsl-types';

type CoreSetupTypes = unknown;

/**
 * @deprecated use {@link MockExecutors} instead
 */
export type MockSetupFns = {
  [T in AnyMockDescriptorType]: MockExecutorFn<
    CaseMockDescriptorFor<AnyMockDescriptor, T>,
    CoreSetupTypes,
    T
  >;
};

/**
 * The internal type for mock executors, used by the execution engine
 */
export type AllMockExecutors = {
  [T in AnyMockDescriptorType]: MockExecutor<
    T,
    CaseMockDescriptorFor<AnyMockDescriptor, T>,
    CoreSetupTypes
  >;
};
