import { AnyData } from '@contract-case/case-plugin-dsl-types';
import { MatchResult } from './errors.types';
import { IsCaseNodeForType } from './utility.types';
import { MatchContext } from '../context/types';

/**
 * A structured segment of a matcher description. Instead of returning a flat
 * string, `describe` functions return a tree of these segments, which can be
 * rendered into a flat string (for use as a lookup key) or pretty-printed with
 * indentation for nested structures.
 *
 * @public
 */
export type DescribeSegment =
  | {
      /** A plain text message */
      readonly kind: 'message';
      /** The text content of this segment */
      readonly message: string;
    }
  | {
      /** A nested segment wrapped in brackets */
      readonly kind: 'nested';
      /** The bracket style to use */
      readonly brackets: '{}' | '[]' | '()';
      /** The content inside the brackets */
      readonly content: DescribeSegment;
    }
  | {
      /** A concatenation of multiple segments */
      readonly kind: 'concat';
      /** The segments to concatenate */
      readonly segments: ReadonlyArray<DescribeSegment>;
    }
  | {
      /** Multiple segments joined with a separator */
      readonly kind: 'join';
      /** The separator string between segments */
      readonly separator: string;
      /** The segments to join */
      readonly segments: ReadonlyArray<DescribeSegment>;
    };

/**
 * Checks a matcher against some actual data and returns a Promise containing a MatchResult.
 *
 * For checks beyond this matcher, use {@link MatchContext#descendAndCheck} to
 * descend into any children.
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
 * @public
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
 * Validates the parameters of this matcher. ContractCase does two kinds of validation:
 *
 * - It calls `validate(matcher)`, to confirm that the parameters are
 *   appropriately set (this function)
 * - It calls `check(matcher,context, strip(matcher))`, to confirm that the user's example
 *   matches itself.
 *
 * Because of the second check, you generally don't need to validate structure in this function.
 * Use cases for this validation function are where only a subset of values are valid. For example,
 * the HTTP Status Code validation function will accept the string `"200"`, but not the string
 * `"The type system accepts this incorrect value"`.
 *
 * Like the other matcher functions, use {@link MatchContext#descendAndValidate} to
 * descend into any children.
 *
 * If any of the Matcher's properties fail validation, throw a CaseConfigurationError.
 *
 * @remarks
 *
 * This function must have no side effects,
 * it may be called repeatedly on the
 * same data by ContractCase during a run.
 *
 * ```
 * yourMatcher.check(
 *   descriptor,
 *   context,
 *   yourMatcher.strip(descriptor)
 * ) // must be a `MatchResult` with no errors
 * ```
 * @public
 * @typeParam T - a matcher descriptor
 * @param matcher - the matcher descriptor
 * @param matchContext - the {@link MatchContext} for this run
 * @returns a void `Promise`, rejected with `CaseConfigurationError` if the validation failed.
 */
export type ValidateMatcherFn<T> = (
  matcher: T,
  matchContext: MatchContext,
) => Promise<void>;

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
 * @public
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
 * Extracts a structured description for this matcher in an English, human
 * readable format. The returned {@link DescribeSegment} can be rendered to a
 * flat string with {@link renderToString}, or used to produce indented
 * pretty-printed output.
 *
 * @remarks
 * CAUTION: Any two matchers that produce the same rendered string MUST have
 * the exact same matching behaviour in all cases. The core relies on this
 * property.
 *
 * This function must have no side effects,
 * it may be called repeatedly on the
 * same data by ContractCase during a run.
 *
 * @public
 * @typeParam T - a matcher descriptor
 * @param matcher - the matcher descriptor
 * @param matchContext - the {@link MatchContext} for this run
 * @returns a {@link DescribeSegment} representing the description
 */
export type NameMatcherFn<T> = (
  matcher: T,
  matchContext: MatchContext,
) => DescribeSegment;

/**
 * A MatcherExecutor contains the three functions
 * needed to execute a matcher descriptor during a run.
 * @public
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
  /** Validate the configured arguments of this matcher */
  validate: ValidateMatcherFn<T>;
}
