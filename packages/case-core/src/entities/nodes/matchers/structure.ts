import {
  AnyCaseMatcherOrData,
  CoreShapedArrayMatcher,
  SHAPED_ARRAY_MATCHER_TYPE,
  JsonOrMatcherMap,
  CoreShapedObjectMatcher,
  SHAPED_OBJECT_MATCHER_TYPE,
  LookupableMatcher,
  LOOKUP_MATCHER_TYPE,
} from '@contract-case/case-entities-internal';

export const coreShapedArrayMatcher = (
  example: Array<AnyCaseMatcherOrData>
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
  child: AnyCaseMatcherOrData
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
