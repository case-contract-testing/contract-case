export const JSON_SERIALISABLE_NUMBER_TYPE = 'JsonSerialisableNumber' as const;
export const JSON_SERIALISABLE_STRING_TYPE = 'JsonSerialisableString' as const;
export const JSON_SERIALISABLE_NULL_TYPE = 'JsonSerialisableNull' as const;
export const JSON_SERIALISABLE_BOOLEAN_TYPE =
  'JsonSerialisableBoolean' as const;
export const JSON_EXACT_PRIMITIVE_TYPE = 'JsonExactPrimitive' as const;

export type AnyMatcherType =
  | typeof JSON_SERIALISABLE_NUMBER_TYPE
  | typeof JSON_SERIALISABLE_STRING_TYPE
  | typeof JSON_SERIALISABLE_NULL_TYPE
  | typeof JSON_SERIALISABLE_BOOLEAN_TYPE
  | typeof JSON_EXACT_PRIMITIVE_TYPE;

export const isMatcher = (maybeMatcher: unknown): maybeMatcher is AnyMatcher =>
  typeof maybeMatcher === 'object' &&
  maybeMatcher != null &&
  'case:matcher:type' in (maybeMatcher as AnyMatcher);

export type JsonSerialisablePrimitive = boolean | number | string | null;
export type AnyJson = JsonSerialisablePrimitive | JsonArray | JsonMap;
export interface JsonMap {
  [key: string]: AnyJson;
}
export type JsonArray = Array<AnyJson>;

export type AnyMatcher =
  | CoreJsonSerialiasbleNumberMatcher
  | CoreJsonSerialisableStringMatcher
  | CoreJsonSerialisableNullMatcher
  | CoreJsonSerialisableBooleanMatcher
  | JsonExactPrimitiveMatcher;

type IsMatcherForType<T extends AnyMatcherType> = {
  'case:matcher:type': T;
};

export type MatcherFor<T extends AnyMatcherType> = Extract<
  AnyMatcher,
  IsMatcherForType<T>
>;

interface CaseMatcher {
  'case:matcher:type': AnyMatcherType;
  'case:matcher:example': unknown;
}

export interface CoreJsonSerialiasbleNumberMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_SERIALISABLE_NUMBER_TYPE;
  'case:matcher:example': number;
}

export interface CoreJsonSerialisableStringMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_SERIALISABLE_STRING_TYPE;
  'case:matcher:example': string;
}

export interface CoreJsonSerialisableBooleanMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_SERIALISABLE_BOOLEAN_TYPE;
  'case:matcher:example': boolean;
}

export interface JsonExactPrimitiveMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_EXACT_PRIMITIVE_TYPE;
  'case:matcher:example': JsonSerialisablePrimitive;
  'case:matcher:exactlyEqualTo': JsonSerialisablePrimitive;
}

export interface CoreJsonSerialisableNullMatcher extends CaseMatcher {
  'case:matcher:type': typeof JSON_SERIALISABLE_NULL_TYPE;
  'case:matcher:example': null;
}
