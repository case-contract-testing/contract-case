import type { MatchContext } from 'entities/context/types';
import type {
  CoreHttpRequestMatcher,
  CoreHttpResponseMatcher,
  CoreHttpStatusCodeMatcher,
  HTTP_REQUEST_MATCHER_TYPE,
  HTTP_RESPONSE_MATCHER_TYPE,
  HTTP_STATUS_CODE_MATCHER_TYPE,
} from './http/types';

export * from './http/types';

export const NUMBER_MATCHER_TYPE = 'MatchNumber' as const;
export const STRING_MATCHER_TYPE = 'MatchString' as const;
export const NULL_MATCHER_TYPE = 'MatchNull' as const;
export const BOOLEAN_MATCHER_TYPE = 'MatchBoolean' as const;
export const CASCADING_CONTEXT_MATCHER_TYPE = 'CascadingContext' as const;
export const SHAPED_ARRAY_MATCHER_TYPE = 'ArrayShape' as const;
export const SHAPED_OBJECT_MATCHER_TYPE = 'ObjectShape' as const;
export const LOOKUP_MATCHER_TYPE = 'Lookup' as const;
export const ARRAY_LENGTH_MATCHER_TYPE = 'ArrayLength' as const;
export const ARRAY_EACH_ENTRY_MATCHES_TYPE = 'ArrayEachEntryLike' as const;
export const ARRAY_CONTAINS_TYPE = 'ArrayContains' as const;
export const COMBINE_MATCHERS_TYPE = 'And' as const;
export const OBJECT_VALUES_MATCH_TYPE = 'ObjectValuesMatch' as const;
export const INTEGER_MATCH_TYPE = 'Integer' as const;
export const STRING_CONTAINS_TYPE = 'StringContains' as const;

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
  | typeof STRING_CONTAINS_TYPE;

export const isCaseNode = (
  maybeMatcher: unknown
): maybeMatcher is AnyCaseMatcher =>
  typeof maybeMatcher === 'object' &&
  maybeMatcher != null &&
  'case:matcher:type' in (maybeMatcher as AnyCaseMatcher);

export const isLookupableMatcher = (
  maybeMatcher: unknown
): maybeMatcher is LookupableMatcher => {
  const matcher = maybeMatcher as LookupableMatcher;
  return (
    'case:matcher:uniqueName' in matcher &&
    typeof 'case:matcher:uniqueName' === 'string' &&
    matcher['case:matcher:type'] === LOOKUP_MATCHER_TYPE
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
  'case:matcher:type': typeof LOOKUP_MATCHER_TYPE;
  'case:matcher:uniqueName': string;
  'case:matcher:child'?: AnyCaseNodeOrData;
}

export type AnyCaseNodeOrData = AnyCaseMatcher | AnyLeafOrStructure;

type IsCaseNodeForType<T extends AnyCaseNodeType> = {
  'case:matcher:type': T;
};

export type DataOrCaseNodeFor<T extends AnyCaseNodeType> =
  | CaseNodeFor<T>
  | AnyLeafOrStructure;

type ResolvesTo<T extends string> = {
  'case:matcher:resolvesTo': T;
};

export type AnyStringMatcher = Extract<AnyCaseMatcher, ResolvesTo<'string'>>;

export type CaseNodeFor<T extends AnyCaseNodeType> = Extract<
  AnyCaseMatcher,
  IsCaseNodeForType<T>
>;

interface CaseMatcherWithExample {
  'case:matcher:type': AnyCaseNodeType;
  'case:matcher:example': unknown;
}

export interface CoreNumberMatcher extends CaseMatcherWithExample {
  'case:matcher:type': typeof NUMBER_MATCHER_TYPE;
  'case:matcher:example': number;
  'case:matcher:resolvesTo': 'number';
}

export interface CoreStringMatcher extends CaseMatcherWithExample {
  'case:matcher:type': typeof STRING_MATCHER_TYPE;
  'case:matcher:example': string;
  'case:matcher:resolvesTo': 'string';
}

export interface CoreBooleanMatcher extends CaseMatcherWithExample {
  'case:matcher:type': typeof BOOLEAN_MATCHER_TYPE;
  'case:matcher:example': boolean;
  'case:matcher:resolvesTo': 'boolean';
}

export interface CoreCascadingMatcher extends Partial<MatchContext> {
  'case:matcher:type': typeof CASCADING_CONTEXT_MATCHER_TYPE;
  'case:matcher:child': AnyCaseNodeOrData;
}

export interface CoreNullMatcher extends CaseMatcherWithExample {
  'case:matcher:type': typeof NULL_MATCHER_TYPE;
  'case:matcher:example': null;
  'case:matcher:resolvesTo': 'null';
}

export interface CoreShapedArrayMatcher {
  'case:matcher:type': typeof SHAPED_ARRAY_MATCHER_TYPE;
  'case:matcher:children': Array<AnyCaseNodeOrData>;
}

export interface CoreShapedObjectMatcher {
  'case:matcher:type': typeof SHAPED_OBJECT_MATCHER_TYPE;
  'case:matcher:children': JsonOrMatcherMap;
}

export const ARRAY_LENGTH_PARAMETER_INFINITE = 'NO_LIMIT' as const;

export interface CoreArrayLengthMatcher {
  'case:matcher:type': typeof ARRAY_LENGTH_MATCHER_TYPE;
  'case:matcher:minLength': number;
  'case:matcher:maxLength': number | typeof ARRAY_LENGTH_PARAMETER_INFINITE;
}

export interface CoreAndCombinationMatcher {
  'case:matcher:type': typeof COMBINE_MATCHERS_TYPE;
  'case:matcher:children': Array<AnyCaseNodeOrData>;
}

export interface CoreArrayEachEntryMatches {
  'case:matcher:type': typeof ARRAY_EACH_ENTRY_MATCHES_TYPE;
  'case:matcher:matcher': AnyCaseNodeOrData;
  'case:matcher:example'?: AnyCaseNodeOrData[];
}

export interface CoreObjectValuesMatch {
  'case:matcher:type': typeof OBJECT_VALUES_MATCH_TYPE;
  'case:matcher:matcher': AnyCaseNodeOrData;
  'case:matcher:example'?: Record<string, AnyCaseNodeOrData>;
}

export interface CoreArrayContainsMatch {
  'case:matcher:type': typeof ARRAY_CONTAINS_TYPE;
  'case:matcher:matchers': AnyCaseNodeOrData[];
}

export interface CoreIntegerMatch {
  'case:matcher:type': typeof INTEGER_MATCH_TYPE;
  'case:matcher:example': number;
  'case:matcher:resolvesTo': 'number';
}

export interface CoreStringContainsMatcher {
  'case:matcher:type': typeof STRING_CONTAINS_TYPE;
  'case:matcher:contains': string | AnyCaseMatcher;
  'case:matcher:resolvesTo': 'string';
  'case:matcher:example'?: string;
}

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
  | CoreArrayContainsMatch;
