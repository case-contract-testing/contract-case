import type { MatchContext } from '../../../entities/context/types';
import type {
  CoreHttpBasicAuthValue,
  CoreHttpRequestMatcher,
  CoreHttpResponseMatcher,
  CoreHttpStatusCodeMatcher,
  CoreUrlEncodedStringMatcher,
  HTTP_BASIC_AUTH_TYPE,
  HTTP_REQUEST_MATCHER_TYPE,
  HTTP_RESPONSE_MATCHER_TYPE,
  HTTP_STATUS_CODE_MATCHER_TYPE,
  URL_ENCODED_STRING_TYPE,
} from './http/types';

export * from './http/types';

export const NUMBER_MATCHER_TYPE = '_case:MatchNumber' as const;
export const STRING_MATCHER_TYPE = '_case:MatchString' as const;
export const NULL_MATCHER_TYPE = '_case:MatchNull' as const;
export const BOOLEAN_MATCHER_TYPE = '_case:MatchBoolean' as const;
export const CASCADING_CONTEXT_MATCHER_TYPE = '_case:CascadingContext' as const;
export const SHAPED_ARRAY_MATCHER_TYPE = '_case:ArrayShape' as const;
export const SHAPED_OBJECT_MATCHER_TYPE = '_case:ObjectShape' as const;
export const LOOKUP_MATCHER_TYPE = '_case:Lookup' as const;
export const ARRAY_LENGTH_MATCHER_TYPE = '_case:ArrayLength' as const;
export const ARRAY_EACH_ENTRY_MATCHES_TYPE =
  '_case:ArrayEachEntryLike' as const;
export const ARRAY_CONTAINS_TYPE = '_case:ArrayContains' as const;
export const COMBINE_MATCHERS_TYPE = '_case:And' as const;
export const OBJECT_VALUES_MATCH_TYPE = '_case:ObjectValuesMatch' as const;
export const OBJECT_KEYS_MATCH_TYPE = '_case:ObjectKeysMatch' as const;
export const INTEGER_MATCH_TYPE = '_case:Integer' as const;
export const STRING_CONTAINS_TYPE = '_case:StringContains' as const;
export const STRING_PREFIX_TYPE = '_case:StringPrefix' as const;
export const STRING_SUFFIX_TYPE = '_case:StringSuffix' as const;
export const CONTEXT_VARIABLE_TYPE = '_case:ContextVariable' as const;
export const BASE64_ENCODED_TYPE = '_case:Base64Encoded' as const;
export const JSON_STRINGIFIED_TYPE = '_case:JsonEncoded' as const;

export type AnyCaseNodeType =
  | typeof NUMBER_MATCHER_TYPE
  | typeof STRING_MATCHER_TYPE
  | typeof NULL_MATCHER_TYPE
  | typeof BOOLEAN_MATCHER_TYPE
  | typeof CASCADING_CONTEXT_MATCHER_TYPE
  | typeof SHAPED_ARRAY_MATCHER_TYPE
  | typeof SHAPED_OBJECT_MATCHER_TYPE
  | typeof HTTP_STATUS_CODE_MATCHER_TYPE
  | typeof HTTP_REQUEST_MATCHER_TYPE
  | typeof HTTP_RESPONSE_MATCHER_TYPE
  | typeof LOOKUP_MATCHER_TYPE
  | typeof ARRAY_LENGTH_MATCHER_TYPE
  | typeof COMBINE_MATCHERS_TYPE
  | typeof ARRAY_EACH_ENTRY_MATCHES_TYPE
  | typeof ARRAY_CONTAINS_TYPE
  | typeof OBJECT_VALUES_MATCH_TYPE
  | typeof INTEGER_MATCH_TYPE
  | typeof STRING_CONTAINS_TYPE
  | typeof STRING_PREFIX_TYPE
  | typeof STRING_SUFFIX_TYPE
  | typeof OBJECT_KEYS_MATCH_TYPE
  | typeof CONTEXT_VARIABLE_TYPE
  | typeof URL_ENCODED_STRING_TYPE
  | typeof HTTP_BASIC_AUTH_TYPE
  | typeof BASE64_ENCODED_TYPE
  | typeof JSON_STRINGIFIED_TYPE;

export const isCaseNode = (
  maybeMatcher: unknown
): maybeMatcher is AnyCaseMatcher =>
  typeof maybeMatcher === 'object' &&
  maybeMatcher != null &&
  '_case:matcher:type' in (maybeMatcher as AnyCaseMatcher);

export const isLookupableMatcher = (
  maybeMatcher: unknown
): maybeMatcher is LookupableMatcher => {
  const matcher = maybeMatcher as LookupableMatcher;
  return (
    '_case:matcher:uniqueName' in matcher &&
    typeof '_case:matcher:uniqueName' === 'string' &&
    matcher['_case:matcher:type'] === LOOKUP_MATCHER_TYPE
  );
};

export type JsonSerialisablePrimitive = boolean | number | string | null;
export type AnyLeafOrStructure =
  | JsonSerialisablePrimitive
  | JsonOrMatcherArray
  | JsonOrMatcherMap;
export interface JsonOrMatcherMap {
  [key: string]: AnyCaseNodeOrData;
}
export type JsonOrMatcherArray = Array<AnyCaseNodeOrData>;

interface JsonMap {
  [key: string]: AnyData;
}
type JsonArray = Array<AnyData>;

export type AnyData = JsonSerialisablePrimitive | JsonMap | JsonArray;

export interface LookupableMatcher {
  '_case:matcher:type': typeof LOOKUP_MATCHER_TYPE;
  '_case:matcher:uniqueName': string;
  '_case:matcher:child'?: AnyCaseNodeOrData;
}

export type AnyCaseNodeOrData = AnyCaseMatcher | AnyLeafOrStructure;

interface IsCaseNodeForType<T extends AnyCaseNodeType> {
  '_case:matcher:type': T;
}

export type DataOrCaseNodeFor<T extends AnyCaseNodeType> =
  | CaseNodeFor<T>
  | AnyLeafOrStructure;

export type ResolvesTo<T extends string> = {
  '_case:matcher:resolvesTo': T;
};

export type AnyStringMatcher =
  | Extract<AnyCaseMatcher, ResolvesTo<'string'>>
  | (AnyCaseMatcher & ResolvesTo<'string'>);

export type CaseNodeFor<T extends AnyCaseNodeType> = Extract<
  AnyCaseMatcher,
  IsCaseNodeForType<T>
>;

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

export interface CoreCascadingMatcher extends Partial<MatchContext> {
  '_case:matcher:type': typeof CASCADING_CONTEXT_MATCHER_TYPE;
  '_case:matcher:child': AnyCaseNodeOrData;
}

export interface CoreNullMatcher extends CaseMatcherWithExample {
  '_case:matcher:type': typeof NULL_MATCHER_TYPE;
  '_case:matcher:example': null;
  '_case:matcher:resolvesTo': 'null';
}

export interface CoreShapedArrayMatcher {
  '_case:matcher:type': typeof SHAPED_ARRAY_MATCHER_TYPE;
  '_case:matcher:children': Array<AnyCaseNodeOrData>;
}

export interface CoreShapedObjectMatcher {
  '_case:matcher:type': typeof SHAPED_OBJECT_MATCHER_TYPE;
  '_case:matcher:children': JsonOrMatcherMap;
}

export const ARRAY_LENGTH_PARAMETER_INFINITE = 'unlimited' as const;

export interface CoreArrayLengthMatcher {
  '_case:matcher:type': typeof ARRAY_LENGTH_MATCHER_TYPE;
  '_case:matcher:minLength': number;
  '_case:matcher:maxLength': number | typeof ARRAY_LENGTH_PARAMETER_INFINITE;
}

export interface CoreAndCombinationMatcher {
  '_case:matcher:type': typeof COMBINE_MATCHERS_TYPE;
  '_case:matcher:children': Array<AnyCaseNodeOrData>;
}

export interface CoreArrayEachEntryMatches {
  '_case:matcher:type': typeof ARRAY_EACH_ENTRY_MATCHES_TYPE;
  '_case:matcher:matcher': AnyCaseNodeOrData;
  '_case:matcher:example'?: AnyCaseNodeOrData[];
}

export interface CoreObjectValuesMatch {
  '_case:matcher:type': typeof OBJECT_VALUES_MATCH_TYPE;
  '_case:matcher:matcher': AnyCaseNodeOrData;
  '_case:matcher:example'?: Record<string, AnyCaseNodeOrData>;
}

export interface CoreObjectKeysMatcher {
  '_case:matcher:type': typeof OBJECT_KEYS_MATCH_TYPE;
  '_case:matcher:matcher': AnyCaseNodeOrData;
  '_case:matcher:exampleKey'?: string;
}

export interface CoreArrayContainsMatch {
  '_case:matcher:type': typeof ARRAY_CONTAINS_TYPE;
  '_case:matcher:matchers': AnyCaseNodeOrData[];
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
  '_case:matcher:suffix': string | AnyCaseMatcher;
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreStringSuffixMatcher {
  '_case:matcher:type': typeof STRING_SUFFIX_TYPE;
  '_case:matcher:prefix': string | AnyCaseMatcher;
  '_case:matcher:suffix': string;
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreContextVariableMatcher {
  '_case:matcher:type': typeof CONTEXT_VARIABLE_TYPE;
  '_case:matcher:variableName': string;
}

export interface CoreBase64Encoded {
  '_case:matcher:type': typeof BASE64_ENCODED_TYPE;
  '_case:matcher:child': AnyStringMatcher;
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreJsonStringified {
  '_case:matcher:type': typeof JSON_STRINGIFIED_TYPE;
  '_case:matcher:child': AnyCaseNodeOrData;
  '_case:matcher:resolvesTo': 'string';
}

/** Leaf matchers are any type where === would match in an exact context */
export type AnyLeafMatcher =
  | CoreNumberMatcher
  | CoreStringMatcher
  | CoreNullMatcher
  | CoreBooleanMatcher
  | CoreHttpStatusCodeMatcher
  | CoreIntegerMatch
  | CoreStringContainsMatcher;

export type AnyCaseMatcher =
  | AnyLeafMatcher
  | CoreCascadingMatcher
  | CoreShapedArrayMatcher
  | CoreShapedObjectMatcher
  | CoreHttpRequestMatcher
  | CoreHttpResponseMatcher
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
  | CoreUrlEncodedStringMatcher
  | CoreHttpBasicAuthValue
  | CoreBase64Encoded
  | CoreJsonStringified;

export type HasExample<T extends AnyCaseMatcher> = T & {
  '_case:matcher:example': unknown;
};
