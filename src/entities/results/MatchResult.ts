import type { MatchingError, MatchResult } from './types';

export const combineResults = (...results: MatchResult[]): MatchResult =>
  results.flat();

export const makeResults = (...err: MatchingError[]): MatchResult => [...err];

export const makeNoErrorResult = (): MatchResult => [];

export const hasNoErrors = (result: MatchResult): boolean =>
  result.length === 0;
