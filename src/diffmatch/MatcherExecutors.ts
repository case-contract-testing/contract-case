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
  AND_COMBINATION_MATCHER,
  ARRAY_EACH_ENTRY_MATCHES,
  OBJECT_VALUES_MATCH,
  ARRAY_CONTAINS_MATCH,
} from 'entities/types';
import {
  NumberMatcher,
  StringMatcher,
  BooleanMatcher,
  NullMatcher,
  HttpStatusCodeMatcher,
  ArrayLengthExecutor,
} from './leaf';
import { AndCombinationMatcher, CascadingContext } from './auxillary';
import {
  ShapedArrayExecutor,
  ShapedObjectExecutor,
  HttpResponseMatcher,
  HttpRequestMatcher,
  LookupMatcher,
  EachArrayEntryMatches,
  ObjectEachValueMatches,
  ArrayContains,
} from './structure';

export const MatcherExecutors: { [T in AnyCaseNodeType]: MatcherExecutor<T> } =
  {
    [NUMBER_MATCHER_TYPE]: NumberMatcher,
    [STRING_MATCHER_TYPE]: StringMatcher,
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
    [AND_COMBINATION_MATCHER]: AndCombinationMatcher,
    [ARRAY_EACH_ENTRY_MATCHES]: EachArrayEntryMatches,
    [ARRAY_CONTAINS_MATCH]: ArrayContains,
    [OBJECT_VALUES_MATCH]: ObjectEachValueMatches,
  };
