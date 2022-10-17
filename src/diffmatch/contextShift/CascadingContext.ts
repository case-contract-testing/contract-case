import type { MatchContext } from 'entities/context/types';
import type { MatcherExecutor } from 'entities/executors/types';
import type {
  AnyData,
  CASCADING_CONTEXT_MATCHER_TYPE,
  CoreCascadingMatcher,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

const check = (
  matcher: CoreCascadingMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> | MatchResult =>
  matchContext.descendAndCheck(
    matcher['case:matcher:child'],
    matchContext,
    actual
  );

const strip = (
  matcher: CoreCascadingMatcher,
  matchContext: MatchContext
): AnyData =>
  matchContext.descendAndStrip(matcher['case:matcher:child'], matchContext);

export const CascadingContext: MatcherExecutor<
  typeof CASCADING_CONTEXT_MATCHER_TYPE
> = { check, strip };
