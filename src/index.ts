import { applyDefaultContext } from 'core/context';
import type { HttpTestContext } from 'core/context/types';
import { matchCore } from 'core/matchCore';
import type { AnyCaseNodeType, DataOrCaseNodeFor } from 'core/matchers/types';
import type { MatchResult } from 'core/types';

export const checkMatch = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  actual: unknown
): Promise<MatchResult> =>
  matchCore(
    matcherOrData,
    actual,
    applyDefaultContext(matcherOrData, matchCore)
  );

export const prepareCase = <T extends AnyCaseNodeType>(
  testDescription: DataOrCaseNodeFor<T>
): Promise<HttpTestContext> =>
  Promise.resolve({ baseUrl: JSON.stringify(testDescription) });
