import type { MatchContext } from 'core/context/types';
import type {
  CoreJsonSerialiasbleNumberMatcher,
  CoreJsonSerialisableBooleanMatcher,
  CoreJsonSerialisableNullMatcher,
  CoreJsonSerialisableStringMatcher,
} from 'core/matchers/types';

export type NumberMatcher = CoreJsonSerialiasbleNumberMatcher & MatchContext;
export type StringMatcher = CoreJsonSerialisableStringMatcher & MatchContext;
export type BooleanMatcher = CoreJsonSerialisableBooleanMatcher & MatchContext;
export type NullMatcher = CoreJsonSerialisableNullMatcher & MatchContext;

/* import type {
  AnyMatcherType,
  JSON_SERIALISABLE_NUMBER_TYPE,
  JSON_SERIALISABLE_STRING_TYPE,
  JSON_EXACT_PRIMITIVE_TYPE,
  JSON_SERIALISABLE_NULL_TYPE,
  JSON_SERIALISABLE_BOOLEAN_TYPE,
} from 'core/types';
import type { JsonPrimitive } from 'dsl/types';
CoreJsonSerialiasbleNumberMatcher & MatchContext


export const isMatcher = (maybeMatcher: unknown): maybeMatcher is AnyMatcher =>
  'case:matcher:type' in (maybeMatcher as AnyMatcher);

export type AnyMatcher =
  | JsonNumberMatcher
  | JsonStringMatcher
  | JsonNullMatcher
  | JsonBooleanMatcher
  | JsonExactPrimitiveMatcher;

interface CaseMatcher {
  'case:matcher:type': AnyMatcherType;
  'case:matcher:example': unknown;
}

export interface NumberMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_SERIALISABLE_NUMBER_TYPE;
  'case:matcher:example': number;
}

export interface StringMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_SERIALISABLE_STRING_TYPE;
  'case:matcher:example': string;
}

export interface BooleanMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_SERIALISABLE_BOOLEAN_TYPE;
  'case:matcher:example': boolean;
}

export interface JsonExactPrimitiveMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_EXACT_PRIMITIVE_TYPE;
  'case:matcher:example': JsonPrimitive;
  'case:matcher:exactlyEqualTo': JsonPrimitive;
}

export interface NullMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_SERIALISABLE_NULL_TYPE;
  'case:matcher:example': null;
}
*/
