import {
  AnyMatcherType,
  JSON_EXACT_PRIMITIVE_TYPE,
  JSON_NULL_TYPE,
  JSON_NUMBER_TYPE,
  JSON_STRING_TYPE,
} from 'dsl/Matchers/types';
import { JsonExactPrimitive } from './base/JsonExactPrimitive';
import { JsonNull } from './base/JsonNull';
import { JsonNumber } from './base/JsonNumber';
import { JsonString } from './base/JsonString';
import type { MatcherExecutor } from './types';

export const MatcherExecutors: { [T in AnyMatcherType]: MatcherExecutor<T> } = {
  [JSON_NUMBER_TYPE]: JsonNumber,
  [JSON_STRING_TYPE]: JsonString,
  [JSON_EXACT_PRIMITIVE_TYPE]: JsonExactPrimitive,
  [JSON_NULL_TYPE]: JsonNull,
};
