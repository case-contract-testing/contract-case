import {
  AllMockSetupInfos,
  AnyMockDescriptorType,
} from '@contract-case/case-entities-internal';
import { MatchResult, SetupInfoFor } from '@contract-case/case-plugin-base';

export * from './states/types';

export type Assertable<
  T extends AnyMockDescriptorType,
  MockSetups = AllMockSetupInfos,
> = {
  config: SetupInfoFor<MockSetups, T>;
  assert: () => Promise<MatchResult>;
};
