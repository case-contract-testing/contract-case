import { MatchContext } from '../context/types';
import { MatchResult } from './errors.types';
import { AnyData } from './matchers.types';
import { IsCaseNodeForType } from './utility.types';

export type CheckMatchFn<T> = (
  matcher: T,
  matchContext: MatchContext,
  actual: unknown,
) => Promise<MatchResult> | MatchResult;

export type StripMatcherFn<T> = (
  matcher: T,
  matchContext: MatchContext,
) => AnyData;

export type NameMatcherFn<T> = (
  matcher: T,
  matchContext: MatchContext,
) => string;

export interface MatcherExecutor<
  MatcherType extends string,
  T extends IsCaseNodeForType<MatcherType>,
> {
  describe: NameMatcherFn<T>;
  check: CheckMatchFn<T>;
  strip: StripMatcherFn<T>;
}
