import {
  AnyCaseNodeOrData,
  CoreObjectValuesMatch,
  OBJECT_VALUES_MATCH_TYPE,
} from 'entities/types';

/**
 * Matches an object where each value matches the provided matcher.
 *
 * @param matcher The example object, array, primitive or matcher to match against
 */
export const objectEachValueMatches = (
  matcher: AnyCaseNodeOrData,
  example?: Record<string, AnyCaseNodeOrData>
): CoreObjectValuesMatch => ({
  'case:matcher:type': OBJECT_VALUES_MATCH_TYPE,
  'case:matcher:matcher': matcher,
  ...(example !== undefined ? { 'case:matcher:example': example } : {}),
});
