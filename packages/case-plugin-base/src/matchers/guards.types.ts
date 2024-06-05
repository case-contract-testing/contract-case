import { AnyCaseMatcher } from './matchers.types';

export const isCaseNode = (
  maybeMatcher: unknown,
): maybeMatcher is AnyCaseMatcher =>
  typeof maybeMatcher === 'object' &&
  maybeMatcher != null &&
  '_case:matcher:type' in (maybeMatcher as AnyCaseMatcher);
