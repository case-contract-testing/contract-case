import {
  AnyMatcherType,
  JSON_BOOLEAN_TYPE,
  JSON_EXACT_PRIMITIVE_TYPE,
  JSON_NULL_TYPE,
  JSON_NUMBER_TYPE,
  JSON_STRING_TYPE,
} from 'core/types';
import { JsonBoolean } from './base/JsonBoolean';
import { JsonExactPrimitive } from './base/JsonExactPrimitive';
import { JsonNull } from './base/JsonNull';
import { JsonNumber } from './base/JsonNumber';
import { JsonString } from './base/JsonString';
import type { MatcherExecutor } from './types';

export const MatcherExecutors: { [T in AnyMatcherType]: MatcherExecutor<T> } = {
  [JSON_NUMBER_TYPE]: JsonNumber,
  [JSON_STRING_TYPE]: JsonString,
  [JSON_BOOLEAN_TYPE]: JsonBoolean,
  [JSON_EXACT_PRIMITIVE_TYPE]: JsonExactPrimitive,
  [JSON_NULL_TYPE]: JsonNull,
};
