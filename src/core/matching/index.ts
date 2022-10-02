import {
  type AnyCaseNodeType,
  NUMBER_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
  BOOLEAN_MATCHER_TYPE,
  CASCADING_CONTEXT_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  SHAPED_ARRAY_MATCHER_TYPE,
  SHAPED_OBJECT_MATCHER_TYPE,
} from 'core/nodes/matchers/types';

import { BooleanMatcher } from './leaf/BooleanMatcher';
import { NullMatcher } from './leaf/NullMatcher';
import { NumberMatcher } from './leaf/NumberMatcher';
import { StringMatcher } from './leaf/StringMatcher';
import { ExactCascadingContext } from './contextShift/CascadingContext';
import type { MatcherExecutor } from './types';
import { ShapedArrayExecutor } from './structure/ShapedArrayExecutor';
import { ShapedObjectExecutor } from './structure/ShapedObjectExecutor';

export const MatcherExecutors: { [T in AnyCaseNodeType]: MatcherExecutor<T> } =
  {
    [NUMBER_MATCHER_TYPE]: NumberMatcher,
    [STRING_MATCHER_TYPE]: StringMatcher,
    [BOOLEAN_MATCHER_TYPE]: BooleanMatcher,
    [CASCADING_CONTEXT_MATCHER_TYPE]: ExactCascadingContext,
    [NULL_MATCHER_TYPE]: NullMatcher,
    [SHAPED_ARRAY_MATCHER_TYPE]: ShapedArrayExecutor,
    [SHAPED_OBJECT_MATCHER_TYPE]: ShapedObjectExecutor,
  };
