import { LOOKUP_MATCHER_TYPE } from './constants.types';
import { AnyCaseMatcher, LookupableMatcher } from './definitions.types';

export const isCaseNode = (
  maybeMatcher: unknown
): maybeMatcher is AnyCaseMatcher =>
  typeof maybeMatcher === 'object' &&
  maybeMatcher != null &&
  '_case:matcher:type' in (maybeMatcher as AnyCaseMatcher);

export const isLookupableMatcher = (
  maybeMatcher: unknown
): maybeMatcher is LookupableMatcher => {
  const matcher = maybeMatcher as LookupableMatcher;
  return (
    '_case:matcher:uniqueName' in matcher &&
    typeof '_case:matcher:uniqueName' === 'string' &&
    matcher['_case:matcher:type'] === LOOKUP_MATCHER_TYPE
  );
};
