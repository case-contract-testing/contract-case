import {
  AnyCaseNodeOrData,
  CoreShapedArrayMatcher,
  CoreShapedObjectMatcher,
  JsonOrMatcherMap,
  LookupableMatcher,
  LOOKUP_MATCHER_TYPE,
  SHAPED_ARRAY_MATCHER_TYPE,
  SHAPED_OBJECT_MATCHER_TYPE,
} from './types';

export const coreShapedArrayMatcher = (
  example: Array<AnyCaseNodeOrData>
): CoreShapedArrayMatcher => ({
  '_case:matcher:type': SHAPED_ARRAY_MATCHER_TYPE,
  '_case:matcher:children': example,
});

export const coreShapedObjectMatcher = (
  example: JsonOrMatcherMap
): CoreShapedObjectMatcher => ({
  '_case:matcher:type': SHAPED_OBJECT_MATCHER_TYPE,
  '_case:matcher:children': example,
});

export const coreLookupMatcher = (
  uniqueName: string,
  child: AnyCaseNodeOrData
): LookupableMatcher => ({
  '_case:matcher:type': LOOKUP_MATCHER_TYPE,
  '_case:matcher:uniqueName': uniqueName,
  '_case:matcher:child': child,
});

export const coreLookupMatcherRequest = (
  uniqueName: string
): LookupableMatcher => ({
  '_case:matcher:type': LOOKUP_MATCHER_TYPE,
  '_case:matcher:uniqueName': uniqueName,
});
