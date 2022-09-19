import {
  type AnyMatcherType,
  JSON_SERIALISABLE_NUMBER_TYPE,
  JSON_SERIALISABLE_STRING_TYPE,
  JSON_SERIALISABLE_BOOLEAN_TYPE,
  JSON_EXACT_PRIMITIVE_TYPE,
  JSON_SERIALISABLE_NULL_TYPE,
} from 'core/matchers/types';
import { JsonSerialiableBoolean } from './base/JsonSerialiableBoolean';
import { JsonExactPrimitive } from './contextShift/JsonExactPrimitive';
import { JsonSerialiableNull } from './base/JsonSerialisableNull';
import { JsonSerialiableNumber } from './base/JsonSerialisableNumber';
import { JsonSerialisableString } from './base/JsonSerialisableString';
import type { MatcherExecutor } from './types';

export const MatcherExecutors: { [T in AnyMatcherType]: MatcherExecutor<T> } = {
  [JSON_SERIALISABLE_NUMBER_TYPE]: JsonSerialiableNumber,
  [JSON_SERIALISABLE_STRING_TYPE]: JsonSerialisableString,
  [JSON_SERIALISABLE_BOOLEAN_TYPE]: JsonSerialiableBoolean,
  [JSON_EXACT_PRIMITIVE_TYPE]: JsonExactPrimitive,
  [JSON_SERIALISABLE_NULL_TYPE]: JsonSerialiableNull,
};
