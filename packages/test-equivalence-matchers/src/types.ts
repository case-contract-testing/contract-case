/* 

import {
  JsonOrMatcherMap,
  CoreShapedObjectMatcher,
  SHAPED_OBJECT_MATCHER_TYPE,
  AnyCaseNodeOrData,
  LookupableMatcher,
  LOOKUP_MATCHER_TYPE,
} from './entities/matchers.types';


export const coreShapedObjectMatcher = (
  example: JsonOrMatcherMap
): CoreShapedObjectMatcher => ({
  'case:matcher:type': SHAPED_OBJECT_MATCHER_TYPE,
  'case:matcher:children': example,
});

export const coreLookupMatcher = (
  uniqueName: string,
  child: AnyCaseNodeOrData
): LookupableMatcher => ({
  'case:matcher:type': LOOKUP_MATCHER_TYPE,
  'case:matcher:uniqueName': uniqueName,
  'case:matcher:child': child,
});
*/
