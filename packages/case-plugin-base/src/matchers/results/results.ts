import type { CaseError, MatchResult } from '../types';

// TODO: Deprecate this and replace with the async one
export const combineResults = (...results: MatchResult[]): MatchResult =>
  results.flat();

export const combineResultPromises = async (
  ...results: (MatchResult | Promise<MatchResult>)[]
): Promise<MatchResult> =>
  (await Promise.all(results.map((r) => Promise.resolve(r)))).flat();

export const makeResults = (...err: CaseError[]): MatchResult => [...err];

export const makeNoErrorResult = (): MatchResult => [];

export const hasErrors = (result: MatchResult): boolean => result.length !== 0;

export const hasNoErrors = (result: MatchResult): boolean => !hasErrors(result);
