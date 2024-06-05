import { SetupInfoFor } from '@contract-case/case-core-plugin-http-dsl';
import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import { MatchResult } from '@contract-case/case-plugin-base';

export * from './states/types';

export type Assertable<T extends AnyMockDescriptorType> = {
  config: SetupInfoFor<T>;
  assert: () => Promise<MatchResult>;
};
