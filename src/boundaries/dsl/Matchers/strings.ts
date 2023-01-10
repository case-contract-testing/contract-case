import {
  type CoreStringContainsMatcher,
  STRING_CONTAINS_TYPE,
} from 'entities/types';

/**
 * Matches any string that contains the given substring.
 *
 * @param example An example string
 */
export const stringContaining = (
  substring: string,
  example: string
): CoreStringContainsMatcher => ({
  'case:matcher:type': STRING_CONTAINS_TYPE,
  'case:matcher:contains': substring,
  'case:matcher:resolvesTo': 'string',
  'case:matcher:example': example,
});
