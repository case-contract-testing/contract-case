import { AnyLeafMatcher } from '@contract-case/case-entities-internal';
import {
  errorWhen,
  matchingError,
  actualToString,
} from '../../../../entities/results';
import type { MatchContext, CaseError } from '../../../../entities/types';

export const testExactMatch = (
  matcher: AnyLeafMatcher,
  matchContext: MatchContext,
  actual: unknown
): Array<CaseError> =>
  errorWhen(
    actual !== matcher['_case:matcher:example'],
    matchingError(
      matcher,
      `${actualToString(
        actual
      )} (${typeof actual}) is not exactly equal to ${actualToString(
        matcher['_case:matcher:example']
      )} (${typeof matcher['_case:matcher:example']})`,
      actual,
      matchContext
    )
  );
