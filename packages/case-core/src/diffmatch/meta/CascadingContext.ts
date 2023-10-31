import {
  CoreCascadingMatcher,
  AnyData,
  CASCADING_CONTEXT_MATCHER_TYPE,
} from '@contract-case/case-entities-internal';
import type {
  MatchContext,
  MatchResult,
  MatcherExecutor,
} from '../../entities/types';

const check = (
  matcher: CoreCascadingMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> | MatchResult =>
  matchContext.descendAndCheck(
    matcher['_case:matcher:child'],
    matchContext,
    actual,
  );

const strip = (
  matcher: CoreCascadingMatcher,
  matchContext: MatchContext,
): AnyData =>
  matchContext.descendAndStrip(matcher['_case:matcher:child'], matchContext);

export const CascadingContext: MatcherExecutor<
  typeof CASCADING_CONTEXT_MATCHER_TYPE
> = {
  describe: (matcher, matchContext) =>
    matchContext.descendAndDescribe(
      matcher['_case:matcher:child'],
      matchContext,
    ),
  check,
  strip,
};
