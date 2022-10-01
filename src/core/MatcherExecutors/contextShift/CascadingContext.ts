import type { MatchContext } from 'core/context/types';
import type { CoreCascadingMatcher } from 'core/matchers/types';
import type { MatchResult } from 'core/types';

export const ExactCascadingContext = (
  matcher: CoreCascadingMatcher,
  actual: unknown,
  matchContext: MatchContext
): Promise<MatchResult> =>
  matchContext.handleNext(matcher['case:matcher:child'], actual, matchContext);
