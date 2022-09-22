import {
  AnyCaseNodeOrData,
  CoreShapedArrayMatcher,
  SHAPED_ARRAY_MATCHER_TYPE,
} from './types';

export const coreShapedArrayMatcher = (
  example: Array<AnyCaseNodeOrData>
): CoreShapedArrayMatcher => ({
  'case:matcher:type': SHAPED_ARRAY_MATCHER_TYPE,
  'case:matcher:example': example,
});
