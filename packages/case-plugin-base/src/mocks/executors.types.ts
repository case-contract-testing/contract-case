import { MatchContext } from '../context/types';
import { AnyCaseMatcherOrData } from '../matchers/matchers.types';
import {
  AnyMockDescriptor,
  CaseMockDescriptorFor,
  HasTypeForMockDescriptor,
} from './nodes.types';

export type BaseSetupInfo = {
  // We allow Any here for now, because it makes defining tests very convenient
  // TODO: Don't use any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: Record<string, any>;
};

export type SetupInfoFor<AllSetupInfo, T extends string> = Extract<
  AllSetupInfo,
  HasTypeForMockDescriptor<T>
> &
  BaseSetupInfo;

type MockOutput = {
  actual: unknown;
  expected: AnyCaseMatcherOrData;
  context: MatchContext;
};

export type MockData<AllSetupInfo, T extends string> = {
  config: SetupInfoFor<AllSetupInfo, T>;
  assertableData: () => Promise<MockOutput>;
};

export type MockExecutorFn<
  AllMockDescriptors extends AnyMockDescriptor,
  AllSetupInfo,
  T extends string,
> = (
  mock: CaseMockDescriptorFor<AllMockDescriptors, T>,
  context: MatchContext,
) => Promise<MockData<AllSetupInfo, T>>;
