import type { MatchContext } from 'entities/context/types';
import type {
  CoreHttpStatusCodeMatcher,
  HTTP_STATUS_CODE_MATCHER_TYPE,
} from './http/types';

export const NUMBER_MATCHER_TYPE = 'MatchNumber' as const;
export const STRING_MATCHER_TYPE = 'MatchString' as const;
export const NULL_MATCHER_TYPE = 'MatchNull' as const;
export const BOOLEAN_MATCHER_TYPE = 'MatchBoolean' as const;
export const CASCADING_CONTEXT_MATCHER_TYPE = 'CascadingContext' as const;
export const SHAPED_ARRAY_MATCHER_TYPE = 'ArrayShape' as const;
export const SHAPED_OBJECT_MATCHER_TYPE = 'ObjectShape' as const;

export type AnyCaseNodeType =
  | typeof NUMBER_MATCHER_TYPE
  | typeof STRING_MATCHER_TYPE
  | typeof NULL_MATCHER_TYPE
  | typeof BOOLEAN_MATCHER_TYPE
  | typeof CASCADING_CONTEXT_MATCHER_TYPE
  | typeof SHAPED_ARRAY_MATCHER_TYPE
  | typeof SHAPED_OBJECT_MATCHER_TYPE
  | typeof HTTP_STATUS_CODE_MATCHER_TYPE;

export const isCaseNode = (
  maybeMatcher: unknown
): maybeMatcher is AnyCaseNode =>
  typeof maybeMatcher === 'object' &&
  maybeMatcher != null &&
  'case:matcher:type' in (maybeMatcher as AnyCaseNode);

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

export type AnyLeafMatcher =
  | CoreNumberMatcher
  | CoreStringMatcher
  | CoreNullMatcher
  | CoreBooleanMatcher
  | CoreHttpStatusCodeMatcher;

export type AnyCaseNode =
  | AnyLeafMatcher
  | CoreCascadingMatcher
  | CoreShapedArrayMatcher
  | CoreShapedObjectMatcher;

export type AnyCaseNodeOrData = AnyCaseNode | AnyLeafOrStructure;

type IsCaseNodeForType<T extends AnyCaseNodeType> = {
  'case:matcher:type': T;
};

export type DataOrCaseNodeFor<T extends AnyCaseNodeType> =
  | CaseNodeFor<T>
  | AnyLeafOrStructure;

type ResolvesTo<T extends string> = {
  'case:matcher:resolvesTo': T;
};

export type AnyStringMatcher = Extract<AnyCaseNode, ResolvesTo<'string'>>;

export type CaseNodeFor<T extends AnyCaseNodeType> = Extract<
  AnyCaseNode,
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
}

export interface CoreCascadingMatcher extends Partial<MatchContext> {
  'case:matcher:type': typeof CASCADING_CONTEXT_MATCHER_TYPE;
  'case:matcher:child': AnyCaseNodeOrData;
}

export interface CoreNullMatcher extends CaseMatcherWithExample {
  'case:matcher:type': typeof NULL_MATCHER_TYPE;
  'case:matcher:example': null;
}

export interface CoreShapedArrayMatcher {
  'case:matcher:type': typeof SHAPED_ARRAY_MATCHER_TYPE;
  'case:matcher:children': Array<AnyCaseNodeOrData>;
}

export interface CoreShapedObjectMatcher {
  'case:matcher:type': typeof SHAPED_OBJECT_MATCHER_TYPE;
  'case:matcher:children': JsonOrMatcherMap;
}
