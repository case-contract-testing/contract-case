export const NUMBER_MATCHER_TYPE = 'JsonSerialisableNumber' as const;
export const STRING_MATCHER_TYPE = 'JsonSerialisableString' as const;
export const NULL_MATCHER_TYPE = 'JsonSerialisableNull' as const;
export const BOOLEAN_MATCHER_TYPE = 'JsonSerialisableBoolean' as const;
export const CASCADING_EXACT_MATCHER_TYPE = 'JsonExactPrimitive' as const;

export type AnyMatcherType =
  | typeof NUMBER_MATCHER_TYPE
  | typeof STRING_MATCHER_TYPE
  | typeof NULL_MATCHER_TYPE
  | typeof BOOLEAN_MATCHER_TYPE
  | typeof CASCADING_EXACT_MATCHER_TYPE;

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
  | CoreNumberMatcher
  | CoreStringMatcher
  | CoreNullMatcher
  | CoreBooleanMatcher
  | CoreCascadingExactMatcher;

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

export interface CoreNumberMatcher extends CaseMatcher {
  'case:matcher:type': typeof NUMBER_MATCHER_TYPE;
  'case:matcher:example': number;
}

export interface CoreStringMatcher extends CaseMatcher {
  'case:matcher:type': typeof STRING_MATCHER_TYPE;
  'case:matcher:example': string;
}

export interface CoreBooleanMatcher extends CaseMatcher {
  'case:matcher:type': typeof BOOLEAN_MATCHER_TYPE;
  'case:matcher:example': boolean;
}

export interface CoreCascadingExactMatcher extends CaseMatcher {
  'case:matcher:type': typeof CASCADING_EXACT_MATCHER_TYPE;
  'case:matcher:example': JsonSerialisablePrimitive;
  'case:matcher:exactlyEqualTo': JsonSerialisablePrimitive;
}

export interface CoreNullMatcher extends CaseMatcher {
  'case:matcher:type': typeof NULL_MATCHER_TYPE;
  'case:matcher:example': null;
}
