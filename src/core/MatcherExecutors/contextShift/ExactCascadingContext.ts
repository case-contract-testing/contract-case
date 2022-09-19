import type { MatchContext } from 'core/context/types';
import { matchCore } from 'core/matchCore';
import type { CoreCascadingExactMatcher } from 'core/matchers/types';
import type { MatchingError } from 'core/types';

export const ExactCascadingContext = (
  matcher: CoreCascadingExactMatcher,
  actual: unknown,
  matchContext: MatchContext
): Array<MatchingError> =>
  matchCore(matcher['case:matcher:child'], actual, matchContext);
