import {
  AllMockSetupInfos,
  AnyMockDescriptorType,
} from '@contract-case/case-entities-internal';
import { MatchResult } from '@contract-case/case-plugin-base';
import { SetupInfoFor } from '@contract-case/case-plugin-dsl-types';

export * from './states/types';
export * from './contract/types';

/**
 * Assertable holds a reference to the verifiable response of a mock.
 *
 * Note that the mock might not yet have been invoked.
 */
export type Assertable<
  T extends AnyMockDescriptorType,
  MockSetups = AllMockSetupInfos,
> = {
  /**
   * Contains any information returned after the mock was setup (eg, ports etc)
   * Used for passing to trigger functions that will invoke the mock.
   */
  config: SetupInfoFor<MockSetups, T>;
  /**
   * Verify the return data in the mock.
   *
   * Call this when the mock should have been called, and you're ready
   * to assert the result. Note that you'll get a failed match if the mock
   * hasn't actually been invoked.
   *
   * @returns A {@link MatchResult} to indicate success / failure of the
   *    assertion on this mock's expectation.
   */
  assert: () => Promise<MatchResult>;
};
