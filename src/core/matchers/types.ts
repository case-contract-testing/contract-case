import type { MatchContext } from 'core/context/types';

export const NUMBER_MATCHER_TYPE = 'MatchNumber' as const;
export const STRING_MATCHER_TYPE = 'MatchString' as const;
export const NULL_MATCHER_TYPE = 'MatchNull' as const;
export const BOOLEAN_MATCHER_TYPE = 'MatchBoolean' as const;
export const CASCADING_CONTEXT_MATCHER_TYPE = 'CascadingContext' as const;
export const SHAPED_ARRAY_MATCHER_TYPE = 'ArrayShape' as const;
export const SHAPED_OBJECT_MATCHER_TYPE = 'ObjectShape' as const;

export const WILL_SEND_HTTP_REQUEST = 'WillSendHttpRequest' as const;
export const CAN_RECEIVE_HTTP_RESPONSE = 'CanReceiveHttpResponse' as const;

export type AnyCaseNodeType =
  | typeof NUMBER_MATCHER_TYPE
  | typeof STRING_MATCHER_TYPE
  | typeof NULL_MATCHER_TYPE
  | typeof BOOLEAN_MATCHER_TYPE
  | typeof CASCADING_CONTEXT_MATCHER_TYPE
  | typeof SHAPED_ARRAY_MATCHER_TYPE
  | typeof SHAPED_OBJECT_MATCHER_TYPE
  | typeof WILL_SEND_HTTP_REQUEST;

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

export type AnyLeafMatcher =
  | CoreNumberMatcher
  | CoreStringMatcher
  | CoreNullMatcher
  | CoreBooleanMatcher;

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

export type CaseNodeFor<T extends AnyCaseNodeType> = Extract<
  AnyCaseNode,
  IsCaseNodeForType<T>
>;

export interface CaseMatcherWithExample {
  'case:matcher:type': AnyCaseNodeType;
  'case:matcher:example': unknown;
}

export interface CoreNumberMatcher extends CaseMatcherWithExample {
  'case:matcher:type': typeof NUMBER_MATCHER_TYPE;
  'case:matcher:example': number;
}

export interface CoreStringMatcher extends CaseMatcherWithExample {
  'case:matcher:type': typeof STRING_MATCHER_TYPE;
  'case:matcher:example': string;
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

export interface CoreShapedArrayMatcher extends CaseMatcherWithExample {
  'case:matcher:type': typeof SHAPED_ARRAY_MATCHER_TYPE;
  'case:matcher:example': Array<AnyCaseNodeOrData>;
}

export interface CoreShapedObjectMatcher extends CaseMatcherWithExample {
  'case:matcher:type': typeof SHAPED_OBJECT_MATCHER_TYPE;
  'case:matcher:example': JsonOrMatcherMap;
}

export interface CanReceiveHttpResponse {
  'case:matcher:type': typeof CAN_RECEIVE_HTTP_RESPONSE;
  'case:context:expectation': 'can';
  status: number;
  body: AnyCaseNodeOrData | undefined;
}

export interface WillSendHttpRequest {
  'case:matcher:type': typeof WILL_SEND_HTTP_REQUEST;
  'case:context:expectation': 'will';
  method: 'get' | 'post' | 'delete' | 'head' | 'options' | 'put' | 'patch';
  path: string;
  body?: AnyCaseNodeOrData;
  responseMatcher: CanReceiveHttpResponse;
}
