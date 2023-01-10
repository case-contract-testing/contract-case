import { CaseConfigurationError, coreShapedArrayMatcher } from 'entities';
import { coreArrayLengthMatcher } from 'entities/nodes/matchers/auxillary';
import {
  AnyCaseNodeOrData,
  ARRAY_CONTAINS_MATCH,
  ARRAY_EACH_ENTRY_MATCHES,
  CoreArrayContainsMatch,
  CoreArrayEachEntryMatches,
  CoreArrayLengthMatcher,
  CoreShapedArrayMatcher,
} from 'entities/types';

type ArrayLengthOptions = { minLength?: number; maxLength?: number };

/**
 * Matches an array where each element matches the provided matcher.
 *
 * @param matcher The example object, array, primitive or matcher to match against
 */
export const arrayEachEntryMatches = (
  matcher: AnyCaseNodeOrData,
  example?: Array<AnyCaseNodeOrData>
): CoreArrayEachEntryMatches => ({
  'case:matcher:type': ARRAY_EACH_ENTRY_MATCHES,
  'case:matcher:matcher': matcher,
  ...(example !== undefined ? { 'case:matcher:example': example } : {}),
});

/**
 * Matches an Array whose length is within a certain range.
 *
 * @param options `ArrayLengthOptions { minLength?: number; maxLength?: number }`
 */
export const arrayLength = (
  options: ArrayLengthOptions
): CoreArrayLengthMatcher => {
  const matcher = coreArrayLengthMatcher(options);
  if (
    matcher['case:matcher:minLength'] === 0 &&
    matcher['case:matcher:maxLength'] !== 0
  ) {
    throw new CaseConfigurationError(
      "Can't create an arrayLength matcher with minimum size 0 and maximum size not 0. Use a raw empty array instead. See the documentation for details."
    );
    // TODO write documentation for this
  }
  return matcher;
};

/**
 * Matches an Array which contains elements that match the given matchers
 *
 * @param matchers
 */
export const arrayContains = (
  ...matchers: AnyCaseNodeOrData[]
): CoreArrayContainsMatch => ({
  'case:matcher:type': ARRAY_CONTAINS_MATCH,
  'case:matcher:matchers': matchers,
});

/**
 * Matches an Array which starts with the provided array
 *
 * @param matchers
 */
export const arrayStartsWith = (
  matchers: AnyCaseNodeOrData[]
): CoreShapedArrayMatcher => coreShapedArrayMatcher(matchers);
