import { AnyCaseMatcher } from './matchers.types';

/**
 * Type guard to determine if an object is a ContractCase matcher descriptor or not
 * @public
 * @param maybeMatcher - a matcher or data
 * @returns true if `maybeMatcher` is a matcher descriptor, false if not
 */
export const isCaseNode = (
  maybeMatcher: unknown,
): maybeMatcher is AnyCaseMatcher =>
  typeof maybeMatcher === 'object' &&
  maybeMatcher != null &&
  '_case:matcher:type' in (maybeMatcher as AnyCaseMatcher);
