import { AnyCaseMatcherOrData } from './matchers.types';

export const LOOKUP_MATCHER_TYPE = '_case:Lookup' as const;

export interface LookupableMatcher {
  '_case:matcher:type': typeof LOOKUP_MATCHER_TYPE;
  '_case:matcher:uniqueName': string;
  '_case:matcher:child'?: AnyCaseMatcherOrData;
}

export const isLookupableMatcher = (
  maybeMatcher: unknown,
): maybeMatcher is LookupableMatcher => {
  const matcher = maybeMatcher as LookupableMatcher;
  return (
    '_case:matcher:uniqueName' in matcher &&
    typeof '_case:matcher:uniqueName' === 'string' &&
    matcher['_case:matcher:type'] === LOOKUP_MATCHER_TYPE
  );
};
