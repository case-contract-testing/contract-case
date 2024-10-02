import { AnyCaseMatcherOrData } from './matchers.types';

/**
 * The type constant for a lookup matcher
 * @internal
 */
export const LOOKUP_MATCHER_TYPE = '_case:Lookup' as const;

/**
 * The matcher descriptor for a lookupable matcher
 * @public
 */
export interface LookupableMatcher {
  '_case:matcher:type': typeof LOOKUP_MATCHER_TYPE;
  '_case:matcher:uniqueName': string;
  '_case:matcher:child'?: AnyCaseMatcherOrData;
}

/**
 * Determines if a specific matcher or data is a lookupable matcher
 * @public
 *
 * @param maybeMatcher - the matcher or data in question
 * @returns true if `maybeMatcher` is a lookupable matcher, false otherwise
 */
export const isLookupableMatcher = (
  maybeMatcher: unknown,
): maybeMatcher is LookupableMatcher => {
  const matcher = maybeMatcher as LookupableMatcher;
  return (
    matcher != null &&
    '_case:matcher:uniqueName' in matcher &&
    typeof '_case:matcher:uniqueName' === 'string' &&
    matcher['_case:matcher:type'] === LOOKUP_MATCHER_TYPE
  );
};
