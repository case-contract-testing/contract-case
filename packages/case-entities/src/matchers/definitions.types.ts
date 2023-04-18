import {
  NUMBER_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
  BOOLEAN_MATCHER_TYPE,
  CASCADING_CONTEXT_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  SHAPED_ARRAY_MATCHER_TYPE,
  SHAPED_OBJECT_MATCHER_TYPE,
  ARRAY_LENGTH_MATCHER_TYPE,
  COMBINE_MATCHERS_TYPE,
  ARRAY_EACH_ENTRY_MATCHES_TYPE,
  OBJECT_VALUES_MATCH_TYPE,
  OBJECT_KEYS_MATCH_TYPE,
  ARRAY_CONTAINS_TYPE,
  INTEGER_MATCH_TYPE,
  STRING_CONTAINS_TYPE,
  STRING_PREFIX_TYPE,
  STRING_SUFFIX_TYPE,
  CONTEXT_VARIABLE_TYPE,
  BASE64_ENCODED_TYPE,
  JSON_STRINGIFIED_TYPE,
  AnyCaseNodeType,
  LOOKUP_MATCHER_TYPE,
  ARRAY_LENGTH_PARAMETER_INFINITE,
} from './constants.types';

interface MatchContextByType {
  '_case:context:matchBy': 'type';
}

interface CaseMatcherWithExample {
  '_case:matcher:type': AnyCaseNodeType;
  '_case:matcher:example': unknown;
}

export interface CoreNumberMatcher extends CaseMatcherWithExample {
  '_case:matcher:type': typeof NUMBER_MATCHER_TYPE;
  '_case:matcher:example': number;
  '_case:matcher:resolvesTo': 'number';
}

export interface CoreStringMatcher extends CaseMatcherWithExample {
  '_case:matcher:type': typeof STRING_MATCHER_TYPE;
  '_case:matcher:example': string;
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreBooleanMatcher extends CaseMatcherWithExample {
  '_case:matcher:type': typeof BOOLEAN_MATCHER_TYPE;
  '_case:matcher:example': boolean;
  '_case:matcher:resolvesTo': 'boolean';
}

export interface CoreCascadingMatcher {
  '_case:matcher:type': typeof CASCADING_CONTEXT_MATCHER_TYPE;
  '_case:matcher:child': AnyCaseMatcherOrData;
}

export interface CoreNullMatcher extends CaseMatcherWithExample {
  '_case:matcher:type': typeof NULL_MATCHER_TYPE;
  '_case:matcher:example': null;
  '_case:matcher:resolvesTo': 'null';
}

export interface CoreShapedArrayMatcher {
  '_case:matcher:type': typeof SHAPED_ARRAY_MATCHER_TYPE;
  '_case:matcher:children': Array<AnyCaseMatcherOrData>;
}

export interface CoreShapedObjectMatcher {
  '_case:matcher:type': typeof SHAPED_OBJECT_MATCHER_TYPE;
  '_case:matcher:children': Record<string, AnyCaseMatcherOrData>;
}

export interface CoreArrayLengthMatcher {
  '_case:matcher:type': typeof ARRAY_LENGTH_MATCHER_TYPE;
  '_case:matcher:minLength': number;
  '_case:matcher:maxLength': number | typeof ARRAY_LENGTH_PARAMETER_INFINITE;
}

export interface CoreAndCombinationMatcher {
  '_case:matcher:type': typeof COMBINE_MATCHERS_TYPE;
  '_case:matcher:children': Array<AnyCaseMatcherOrData>;
}

export interface CoreArrayEachEntryMatches {
  '_case:matcher:type': typeof ARRAY_EACH_ENTRY_MATCHES_TYPE;
  '_case:matcher:matcher': AnyCaseMatcherOrData;
  '_case:matcher:example'?: AnyCaseMatcherOrData[];
}

export interface CoreObjectValuesMatch {
  '_case:matcher:type': typeof OBJECT_VALUES_MATCH_TYPE;
  '_case:matcher:matcher': AnyCaseMatcherOrData;
  '_case:matcher:example'?: Record<string, AnyCaseMatcherOrData>;
}

export interface CoreObjectKeysMatcher {
  '_case:matcher:type': typeof OBJECT_KEYS_MATCH_TYPE;
  '_case:matcher:matcher': AnyCaseMatcherOrData;
  '_case:matcher:exampleKey'?: string;
}

export interface CoreArrayContainsMatch {
  '_case:matcher:type': typeof ARRAY_CONTAINS_TYPE;
  '_case:matcher:matchers': AnyCaseMatcherOrData[];
}

export interface CoreIntegerMatch {
  '_case:matcher:type': typeof INTEGER_MATCH_TYPE;
  '_case:matcher:example': number;
  '_case:matcher:resolvesTo': 'number';
}

export interface CoreStringContainsMatcher {
  '_case:matcher:type': typeof STRING_CONTAINS_TYPE;
  '_case:matcher:contains': string | AnyCaseMatcher;
  '_case:matcher:resolvesTo': 'string';
  '_case:matcher:example'?: string;
}

export interface CoreStringPrefixMatcher {
  '_case:matcher:type': typeof STRING_PREFIX_TYPE;
  '_case:matcher:prefix': string;
  '_case:matcher:suffix': AnyCaseMatcherOrData;
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreStringSuffixMatcher {
  '_case:matcher:type': typeof STRING_SUFFIX_TYPE;
  '_case:matcher:prefix': string | AnyCaseStringMatcher;
  '_case:matcher:suffix': string;
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreContextVariableMatcher {
  '_case:matcher:type': typeof CONTEXT_VARIABLE_TYPE;
  '_case:matcher:variableName': string;
}

export interface CoreBase64Encoded {
  '_case:matcher:type': typeof BASE64_ENCODED_TYPE;
  '_case:matcher:child': AnyCaseStringMatcher;
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreJsonStringified {
  '_case:matcher:type': typeof JSON_STRINGIFIED_TYPE;
  '_case:matcher:child': AnyCaseMatcherOrData;
  '_case:matcher:resolvesTo': 'string';
}

export interface LookupableMatcher {
  '_case:matcher:type': typeof LOOKUP_MATCHER_TYPE;
  '_case:matcher:uniqueName': string;
  '_case:matcher:child'?: AnyCaseMatcherOrData;
}

export type NumberMatcher = CoreNumberMatcher & MatchContextByType;
export type StringMatcher = CoreStringMatcher & MatchContextByType;
export type BooleanMatcher = CoreBooleanMatcher & MatchContextByType;
export type NullMatcher = CoreNullMatcher & MatchContextByType;

/** Leaf matchers are any type where === would match in an exact context */
export type AnyLeafMatcher =
  | CoreNumberMatcher
  | CoreStringMatcher
  | CoreNullMatcher
  | CoreBooleanMatcher
  | CoreIntegerMatch
  | CoreStringContainsMatcher;

export type AnyCaseMatcher =
  | AnyLeafMatcher
  | CoreCascadingMatcher
  | CoreShapedArrayMatcher
  | CoreShapedObjectMatcher
  | LookupableMatcher
  | CoreArrayLengthMatcher
  | CoreAndCombinationMatcher
  | CoreArrayEachEntryMatches
  | CoreObjectValuesMatch
  | CoreObjectKeysMatcher
  | CoreArrayContainsMatch
  | CoreStringSuffixMatcher
  | CoreStringPrefixMatcher
  | CoreContextVariableMatcher
  | CoreBase64Encoded
  | CoreJsonStringified;

export type ResolvesTo<T extends string> = {
  '_case:matcher:resolvesTo': T;
};

export type AnyCaseMatcherOrData = AnyCaseMatcher | AnyData;
export type AnyCaseStringMatcher =
  | Extract<AnyCaseMatcher, ResolvesTo<'string'>>
  | (AnyCaseMatcher & ResolvesTo<'string'>);

type JsonSerialisablePrimitive = boolean | number | string | null;

export type AnyLeafOrStructure =
  | JsonSerialisablePrimitive
  | JsonOrMatcherArray
  | JsonOrMatcherMap;
export interface JsonOrMatcherMap {
  [key: string]: AnyCaseMatcherOrData;
}
export type JsonOrMatcherArray = Array<AnyCaseMatcherOrData>;

interface JsonMap {
  [key: string]: AnyData;
}
type JsonArray = Array<AnyData>;

export type AnyData = JsonSerialisablePrimitive | JsonMap | JsonArray;
