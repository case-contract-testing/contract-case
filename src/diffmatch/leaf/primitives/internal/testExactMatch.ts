import type { MatchContext } from 'entities/context/types';
import type { AnyLeafMatcher } from 'entities/nodes/matchers/types';
import { errorWhen, matchingError } from 'entities/results/MatchingError';
import { actualToString } from 'entities/results/renderActual';
import type { MatchingError } from 'entities/types';

export const testExactMatch = (
  matcher: AnyLeafMatcher,
  matchContext: MatchContext,
  actual: unknown
): Array<MatchingError> =>
  errorWhen(
    actual !== matcher['case:matcher:example'],
    matchingError(
      matcher,
      `${actualToString(
        actual
      )} (${typeof actual}) is not exactly equal to ${actualToString(
        matcher['case:matcher:example']
      )} (${typeof matcher['case:matcher:example']})`,
      actual,
      matchContext
    )
  );
