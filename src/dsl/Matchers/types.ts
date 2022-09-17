import type { JsonPrimitive } from 'dsl/types';

export const JSON_NUMBER_TYPE = 'JsonNumber' as const;
export const JSON_STRING_TYPE = 'JsonString' as const;
export const JSON_NULL_TYPE = 'JsonNull' as const;
export const JSON_EXACT_PRIMITIVE_TYPE = 'JsonExactPrimitive' as const;

export type AnyMatcherType =
  | typeof JSON_NUMBER_TYPE
  | typeof JSON_STRING_TYPE
  | typeof JSON_NULL_TYPE
  | typeof JSON_EXACT_PRIMITIVE_TYPE;

export type AnyMatcher =
  | JsonNumberMatcher
  | JsonStringMatcher
  | JsonNullMatcher
  | JsonExactPrimitiveMatcher;

type IsMatcherForType<T extends AnyMatcherType> = {
  'case:matcher:type': T;
};

export type MatcherFor<T extends AnyMatcherType> = Extract<
  AnyMatcher,
  IsMatcherForType<T>
>;

export interface CaseMatcher {
  'case:matcher:type': AnyMatcherType;
  'case:matcher:example': unknown;
}

export interface JsonNumberMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_NUMBER_TYPE;
  'case:matcher:example': number;
}

export interface JsonStringMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_STRING_TYPE;
  'case:matcher:example': string;
}
export interface JsonExactPrimitiveMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_EXACT_PRIMITIVE_TYPE;
  'case:matcher:example': JsonPrimitive;
  'case:matcher:exactlyEqualTo': JsonPrimitive;
}

export interface JsonNullMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_NULL_TYPE;
  'case:matcher:example': null;
}
