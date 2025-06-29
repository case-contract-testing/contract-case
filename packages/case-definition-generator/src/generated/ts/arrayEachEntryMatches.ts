import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';

// Constant
export const ARRAY_EACH_ENTRY_LIKE_TYPE = '_case:ArrayEachEntryLike' as const;
// Interface
export interface CoreArrayEachEntryMatchesMatches {
  '_case:matcher:type': typeof ARRAY_EACH_ENTRY_LIKE_TYPE;
  '_case:matcher:matcher': AnyCaseMatcherOrData;
  '_case:matcher:example'?: AnyCaseMatcherOrData[];
}
// Factory Function
/**
 * Matches an array where each element matches the provided matcher.
 *
 * @param matcher - The matcher to match against each element of the array.
 * @param example - Example data to use instead of the generated one
 */
export const arrayEachEntryMatches = (
  matcher: AnyCaseMatcherOrData,
  example?: AnyCaseMatcherOrData[],
): CoreArrayEachEntryMatchesMatches => ({
  '_case:matcher:type': ARRAY_EACH_ENTRY_LIKE_TYPE,
  '_case:matcher:matcher': matcher,
  ...(example !== undefined ? { '_case:matcher:example': example } : {}),
});
