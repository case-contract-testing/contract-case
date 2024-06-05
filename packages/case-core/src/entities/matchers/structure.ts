import {
  CoreShapedArrayMatcher,
  SHAPED_ARRAY_MATCHER_TYPE,
  CoreShapedObjectMatcher,
  SHAPED_OBJECT_MATCHER_TYPE,
} from '@contract-case/case-entities-internal';
import {
  AnyCaseMatcherOrData,
  JsonOrMatcherMap,
  LookupableMatcher,
  LOOKUP_MATCHER_TYPE,
} from '@contract-case/case-plugin-base';

export const coreShapedArrayMatcher = (
  example: Array<AnyCaseMatcherOrData>,
): CoreShapedArrayMatcher => ({
  '_case:matcher:type': SHAPED_ARRAY_MATCHER_TYPE,
  '_case:matcher:children': example,
});

export const coreShapedObjectMatcher = (
  example: JsonOrMatcherMap,
): CoreShapedObjectMatcher => ({
  '_case:matcher:type': SHAPED_OBJECT_MATCHER_TYPE,
  '_case:matcher:children': example,
});

export const coreLookupMatcherRequest = (
  uniqueName: string,
): LookupableMatcher => ({
  '_case:matcher:type': LOOKUP_MATCHER_TYPE,
  '_case:matcher:uniqueName': uniqueName,
});
