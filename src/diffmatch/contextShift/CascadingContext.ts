import type { MatchContext } from 'entities/context/types';
import type { CoreCascadingMatcher } from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

export const ExactCascadingContext = (
  matcher: CoreCascadingMatcher,
  actual: unknown,
  matchContext: MatchContext
): Promise<MatchResult> =>
  matchContext.handleNext(matcher['case:matcher:child'], actual, matchContext);
