import {
  type AnyCaseNodeType,
  type MatcherExecutor,
  ARRAY_LENGTH_MATCHER_TYPE,
  NUMBER_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
  BOOLEAN_MATCHER_TYPE,
  CASCADING_CONTEXT_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  SHAPED_ARRAY_MATCHER_TYPE,
  SHAPED_OBJECT_MATCHER_TYPE,
  HTTP_STATUS_CODE_MATCHER_TYPE,
  HTTP_RESPONSE_MATCHER_TYPE,
  HTTP_REQUEST_MATCHER_TYPE,
  LOOKUP_MATCHER_TYPE,
  COMBINE_MATCHERS_TYPE,
  ARRAY_EACH_ENTRY_MATCHES_TYPE,
  OBJECT_VALUES_MATCH_TYPE,
  ARRAY_CONTAINS_TYPE,
  INTEGER_MATCH_TYPE,
  STRING_CONTAINS_TYPE,
  OBJECT_KEYS_MATCH_TYPE,
  CONTEXT_VARIABLE_TYPE,
} from 'entities/types';
import {
  NumberMatcher,
  StringMatcher,
  BooleanMatcher,
  NullMatcher,
  HttpStatusCodeMatcher,
  IntegerMatcher,
} from './leaf';
import {
  AndCombinationMatcher,
  CascadingContext,
  ContextVariableMatcher,
  LookupMatcher,
} from './meta';
import {
  ShapedArrayExecutor,
  ShapedObjectExecutor,
  HttpResponseMatcher,
  HttpRequestMatcher,
  EachArrayEntryMatches,
  ObjectEachValueMatches,
  ArrayContains,
  ArrayLengthExecutor,
} from './structure';
import { StringContainsMatcher } from './leaf/primitives/StringContainsMatcher';
import { ObjectEachKeyMatches } from './structure/ObjectEachKeyMatches';

export const MatcherExecutors: { [T in AnyCaseNodeType]: MatcherExecutor<T> } =
  {
    [NUMBER_MATCHER_TYPE]: NumberMatcher,
    [STRING_MATCHER_TYPE]: StringMatcher,
    [STRING_CONTAINS_TYPE]: StringContainsMatcher,
    [BOOLEAN_MATCHER_TYPE]: BooleanMatcher,
    [CASCADING_CONTEXT_MATCHER_TYPE]: CascadingContext,
    [NULL_MATCHER_TYPE]: NullMatcher,
    [SHAPED_ARRAY_MATCHER_TYPE]: ShapedArrayExecutor,
    [SHAPED_OBJECT_MATCHER_TYPE]: ShapedObjectExecutor,
    [HTTP_STATUS_CODE_MATCHER_TYPE]: HttpStatusCodeMatcher,
    [HTTP_RESPONSE_MATCHER_TYPE]: HttpResponseMatcher,
    [HTTP_REQUEST_MATCHER_TYPE]: HttpRequestMatcher,
    [LOOKUP_MATCHER_TYPE]: LookupMatcher,
    [ARRAY_LENGTH_MATCHER_TYPE]: ArrayLengthExecutor,
    [COMBINE_MATCHERS_TYPE]: AndCombinationMatcher,
    [ARRAY_EACH_ENTRY_MATCHES_TYPE]: EachArrayEntryMatches,
    [ARRAY_CONTAINS_TYPE]: ArrayContains,
    [OBJECT_VALUES_MATCH_TYPE]: ObjectEachValueMatches,
    [INTEGER_MATCH_TYPE]: IntegerMatcher,
    [OBJECT_KEYS_MATCH_TYPE]: ObjectEachKeyMatches,
    [CONTEXT_VARIABLE_TYPE]: ContextVariableMatcher,
  };
