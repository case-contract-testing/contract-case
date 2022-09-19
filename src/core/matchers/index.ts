import {
  CoreJsonSerialisableBooleanMatcher,
  CoreJsonSerialisableNullMatcher,
  CoreJsonSerialiasbleNumberMatcher,
  CoreJsonSerialisableStringMatcher,
  JSON_SERIALISABLE_BOOLEAN_TYPE,
  JSON_SERIALISABLE_NULL_TYPE,
  JSON_SERIALISABLE_NUMBER_TYPE,
  JSON_SERIALISABLE_STRING_TYPE,
} from './types';

/**
 * Matches a number following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259).
 *
 * @param example Any floating point number, not infinity, not NaN.
 * @returns
 */
export const coreNumberMatcher = (
  example: number
): CoreJsonSerialiasbleNumberMatcher => ({
  'case:matcher:type': JSON_SERIALISABLE_NUMBER_TYPE,
  'case:matcher:example': example,
});

export const coreStringMatcher = (
  example: string
): CoreJsonSerialisableStringMatcher => ({
  'case:matcher:type': JSON_SERIALISABLE_STRING_TYPE,
  'case:matcher:example': example,
});

export const coreBooleanMatcher = (
  example: boolean
): CoreJsonSerialisableBooleanMatcher => ({
  'case:matcher:type': JSON_SERIALISABLE_BOOLEAN_TYPE,
  'case:matcher:example': example,
});

export const coreNullMatcher = (
  example = null
): CoreJsonSerialisableNullMatcher => ({
  'case:matcher:type': JSON_SERIALISABLE_NULL_TYPE,
  'case:matcher:example': example,
});
