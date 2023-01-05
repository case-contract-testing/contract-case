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
} from 'entities/types';
import { CascadingContext } from './contextShift/CascadingContext';
import { ArrayLengthExecutor } from './leaf/ArrayLengthExecutor';
import { HttpStatusCodeMatcher } from './leaf/http/HttpStatusCodeMatcher';
import { BooleanMatcher } from './leaf/primitives/BooleanMatcher';
import { NullMatcher } from './leaf/primitives/NullMatcher';
import { NumberMatcher } from './leaf/primitives/NumberMatcher';
import { StringMatcher } from './leaf/primitives/StringMatcher';
import { HttpRequestMatcher } from './structure/HttpRequestMatcher';
import { HttpResponseMatcher } from './structure/HttpResponseMatcher';
import { LookupMatcher } from './structure/LookupMatcher';
import { ShapedArrayExecutor } from './structure/ShapedArrayExecutor';
import { ShapedObjectExecutor } from './structure/ShapedObjectExecutor';

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
  };
