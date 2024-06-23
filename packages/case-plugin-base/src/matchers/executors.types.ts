import { MatchContext } from '../context/types';
import { MatchResult } from './errors.types';
import { AnyData } from './matchers.types';
import { IsCaseNodeForType } from './utility.types';

/**
 * Checks a matcher against some actual data and returns a Promise containing a MatchResult.
 *
 * @remarks
 *
 * This function must have no side effects.
 * It may be called repeatedly on the
 * same data by ContractCase during a run.
 *
 * It must not modify the matcher descriptor during a run, but you may generate
 * alternate matcher descriptors when you call the descend methods on the context.
 *
 * Note that calling check and strip together must always return no errors:
 *
 * ```
 * yourMatcher.check(
 *   descriptor,
 *   context,
 *   yourMatcher.strip(descriptor)
 * ) // must be a `MatchResult` with no errors
 * ```
 *
 * @typeParam T - a matcher descriptor
 * @param matcher - the matcher descriptor
 * @param matchContext - the {@link MatchContext} for this run
 * @param actual - the actual data to check against
 * @returns either a Promise containing a {@link MatchResult} or
 *   a raw {@link MatchResult}. The Promise return type is preferred.
 */
export type CheckMatchFn<T> = (
  matcher: T,
  matchContext: MatchContext,
  actual: unknown,
) => Promise<MatchResult> | MatchResult;

/**
 * Strips the matchers from a matcher descriptor to return the raw data
 * represented by this matcher (ie, the example data).
 *
 * @remarks
 *
 * This function must have no side effects,
 * it may be called repeatedly on the
 * same data by ContractCase during a run.
 *
 * Note that calling check and strip together must always return no errors:
 *
 * ```
 * yourMatcher.check(
 *   descriptor,
 *   context,
 *   yourMatcher.strip(descriptor)
 * ) // must be a `MatchResult` with no errors
 * ```
 *
 * @typeParam T - a matcher descriptor
 * @param matcher - the matcher descriptor
 * @param matchContext - the {@link MatchContext} for this run
 * @returns the raw example data
 */
export type StripMatcherFn<T> = (
  matcher: T,
  matchContext: MatchContext,
) => AnyData;

/**
 * Extracts the name for this matcher in an English, human readable format.
 *
 * @remarks
 * CAUTION: Any two matchers that produce the same string MUST have
 * the exact same matching behaviour in all cases. The core relies on this
 * property.
 *
 * This function must have no side effects,
 * it may be called repeatedly on the
 * same data by ContractCase during a run.
 *
 *
 * @typeParam T - a matcher descriptor
 * @param matcher - the matcher descriptor
 * @param matchContext - the {@link MatchContext} for this run
 * @returns the raw example data
 */
export type NameMatcherFn<T> = (
  matcher: T,
  matchContext: MatchContext,
) => string;

/**
 * A MatcherExecutor contains the three functions
 * needed to execute a matcher descriptor during a run.
 *
 * @remarks
 * All functions must have no side effects.
 *
 * See the individual function types for more details.
 *
 * @typeParam matcherType - the string constant for this matcher descriptor
 * @typeParam T - the matcher descriptor object type
 */
export interface MatcherExecutor<
  MatcherType extends string,
  T extends IsCaseNodeForType<MatcherType>,
> {
  /** Describes the matcher descriptor in english */
  describe: NameMatcherFn<T>;
  /** Checks the matcher against some actual data */
  check: CheckMatchFn<T>;
  /** Strips the matchers from this descriptor, returning example data */
  strip: StripMatcherFn<T>;
}
