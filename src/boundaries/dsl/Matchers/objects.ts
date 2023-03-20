import {
  type AnyCaseNodeOrData,
  type CoreObjectValuesMatch,
  OBJECT_VALUES_MATCH_TYPE,
  type CoreObjectKeysMatcher,
  OBJECT_KEYS_MATCH_TYPE,
} from '../../../entities/types';

/**
 * Matches an object where each value matches the provided matcher.
 *
 * @param matcher - The object, array, primitive or matcher to match against
 * @param example - An example object that passes this matcher
 */
export const objectEachValueMatches = (
  matcher: AnyCaseNodeOrData,
  example?: Record<string, AnyCaseNodeOrData>
): CoreObjectValuesMatch => ({
  'case:matcher:type': OBJECT_VALUES_MATCH_TYPE,
  'case:matcher:matcher': matcher,
  ...(example !== undefined ? { 'case:matcher:example': example } : {}),
});

/**
 * Matches an object where each key matches the provided matcher.
 *
 * @param matcher - The matcher that all keys must pass
 * @param exampleKey - An example key that passes this matcher
 */
export const objectEachKeyMatches = (
  matcher: AnyCaseNodeOrData,
  exampleKey?: string
): CoreObjectKeysMatcher => ({
  'case:matcher:type': OBJECT_KEYS_MATCH_TYPE,
  'case:matcher:matcher': matcher,
  ...(exampleKey !== undefined ? { 'case:matcher:example': exampleKey } : {}),
});
