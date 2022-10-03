import type { MatcherExecutor } from 'diffmatch/types';
import type { MatchContext } from 'entities/context/types';
import type {
  CASCADING_CONTEXT_MATCHER_TYPE,
  CoreCascadingMatcher,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

const descend = (
  matcher: CoreCascadingMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> =>
  matchContext.handleNext(matcher['case:matcher:child'], matchContext, actual);

export const CascadingContext: MatcherExecutor<
  typeof CASCADING_CONTEXT_MATCHER_TYPE
> = { check: descend };
