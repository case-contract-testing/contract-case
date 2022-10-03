import {
  AnyCaseNodeOrData,
  CoreShapedArrayMatcher,
  CoreShapedObjectMatcher,
  JsonOrMatcherMap,
  SHAPED_ARRAY_MATCHER_TYPE,
  SHAPED_OBJECT_MATCHER_TYPE,
} from './types';

export const coreShapedArrayMatcher = (
  example: Array<AnyCaseNodeOrData>
): CoreShapedArrayMatcher => ({
  'case:matcher:type': SHAPED_ARRAY_MATCHER_TYPE,
  'case:matcher:children': example,
});

export const coreShapedObjectMatcher = (
  example: JsonOrMatcherMap
): CoreShapedObjectMatcher => ({
  'case:matcher:type': SHAPED_OBJECT_MATCHER_TYPE,
  'case:matcher:children': example,
});
