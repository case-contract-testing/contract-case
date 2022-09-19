import {
  type AnyMatcherType,
  NUMBER_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
  BOOLEAN_MATCHER_TYPE,
  CASCADING_EXACT_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
} from 'core/matchers/types';
import { BooleanMatcher } from './base/BooleanMatcher';
import { JsonExactPrimitive } from './contextShift/JsonExactPrimitive';
import { NullMatcher } from './base/NullMatcher';
import { NumberMatcher } from './base/NumberMatcher';
import { StringMatcher } from './base/StringMatcher';
import type { MatcherExecutor } from './types';

export const MatcherExecutors: { [T in AnyMatcherType]: MatcherExecutor<T> } = {
  [NUMBER_MATCHER_TYPE]: NumberMatcher,
  [STRING_MATCHER_TYPE]: StringMatcher,
  [BOOLEAN_MATCHER_TYPE]: BooleanMatcher,
  [CASCADING_EXACT_MATCHER_TYPE]: JsonExactPrimitive,
  [NULL_MATCHER_TYPE]: NullMatcher,
};
