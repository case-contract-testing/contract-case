import type { CaseError, MatchResult } from '../types';

/**
 * Combines multiple {@link MatchResult} objects / Promises containing match results.
 * @public
 *
 * @param results - MatchResult or `Promise<MatchResult>` objects
 * @returns a Promise containing the combined Match Results.
 */
export const combineResultPromises = async (
  ...results: (MatchResult | Promise<MatchResult>)[]
): Promise<MatchResult> =>
  (await Promise.all(results.map((r) => Promise.resolve(r)))).flat();

/**
 * Combines multiple {@link MatchResult} objects into one match result object
 * @public
 *
 * @deprecated Prefer {@link combineResultPromises}
 *
 * @param results - MatchResult or `Promise<MatchResult>` objects
 * @returns combined Match Results.
 */
export const combineResults = (...results: MatchResult[]): MatchResult =>
  results.flat();

/**
 * Makes a {@link MatchResult} object.
 * @public
 *
 * @param err - any {@link CaseError} objects. If none supplied, then it makes a passing {@link MatchResult} object
 * @returns a {@link MatchResult} object.
 */
export const makeResults = (...err: CaseError[]): MatchResult => [...err];

/**
 * Makes a passing {@link MatchResult} object.
 * @public
 *
 * @returns a {@link MatchResult} object that has no errors.
 */
export const makeNoErrorResult = (): MatchResult => [];

/**
 * Tests whether a given {@link MatchResult} object has any errors.
 * @public
 *
 * @param result - a {@link MatchResult} object
 * @returns true if `result` has any errors
 */
export const hasErrors = (result: MatchResult | CaseError[]): boolean =>
  result.length !== 0;

/**
 * Tests whether a given {@link MatchResult} object has no errors.
 * @public
 *
 * @param result - a {@link MatchResult} object
 * @returns true if `result` has no errors (ie, is a passing {@link MatchResult})
 */
export const hasNoErrors = (result: MatchResult): boolean => !hasErrors(result);
