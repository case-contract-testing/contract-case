/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Represents any matcher, or any json data
 * @public
 */
export type AnyMatcherOrData = any;

/**
 * Represents any matcher that resolves to a string, or any string
 * @public
 */
export type AnyStringMatcher = any;

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
