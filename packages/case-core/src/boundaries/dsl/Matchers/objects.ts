import {
  CoreObjectValuesMatch,
  OBJECT_VALUES_MATCH_TYPE,
  CoreObjectKeysMatcher,
  OBJECT_KEYS_MATCH_TYPE,
} from '@contract-case/case-entities-internal';
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-base';

/**
 * Matches an object where each value matches the provided matcher.
 *
 * @param matcher - The object, array, primitive or matcher to match against
 * @param example - An example object that passes this matcher
 */
export const objectEachValueMatches = (
  matcher: AnyCaseMatcherOrData,
  example?: Record<string, AnyCaseMatcherOrData>,
): CoreObjectValuesMatch => ({
  '_case:matcher:type': OBJECT_VALUES_MATCH_TYPE,
  '_case:matcher:matcher': matcher,
  ...(example !== undefined ? { '_case:matcher:example': example } : {}),
});

/**
 * Matches an object where each key matches the provided matcher.
 *
 * @param matcher - The matcher that all keys must pass
 * @param exampleKey - An example key that passes this matcher
 */
export const objectEachKeyMatches = (
  matcher: AnyCaseMatcherOrData,
  exampleKey?: string,
): CoreObjectKeysMatcher => ({
  '_case:matcher:type': OBJECT_KEYS_MATCH_TYPE,
  '_case:matcher:matcher': matcher,
  ...(exampleKey !== undefined ? { '_case:matcher:example': exampleKey } : {}),
});
