import {
  type AnyCaseNodeType,
  NUMBER_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
  BOOLEAN_MATCHER_TYPE,
  CASCADING_CONTEXT_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
} from 'core/matchers/types';
import { BooleanMatcher } from './leaves/BooleanMatcher';
import { NullMatcher } from './leaves/NullMatcher';
import { NumberMatcher } from './leaves/NumberMatcher';
import { StringMatcher } from './leaves/StringMatcher';
import { ExactCascadingContext } from './contextShift/CascadingContext';
import type { MatcherExecutor } from './types';

export const MatcherExecutors: { [T in AnyCaseNodeType]: MatcherExecutor<T> } =
  {
    [NUMBER_MATCHER_TYPE]: NumberMatcher,
    [STRING_MATCHER_TYPE]: StringMatcher,
    [BOOLEAN_MATCHER_TYPE]: BooleanMatcher,
    [CASCADING_CONTEXT_MATCHER_TYPE]: ExactCascadingContext,
    [NULL_MATCHER_TYPE]: NullMatcher,
  };
