import type { MatchContext } from 'core/context/types';
import type { CoreCascadingMatcher } from 'core/matchers/types';
import type { MatchingError } from 'core/types';

export const ExactCascadingContext = (
  matcher: CoreCascadingMatcher,
  actual: unknown,
  matchContext: MatchContext
): Array<MatchingError> =>
  matchContext.handleNext(matcher['case:matcher:child'], actual, matchContext);
