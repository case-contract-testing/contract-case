import {
  AnyMatcherType,
  JSON_NUMBER_TYPE,
  JSON_STRING_TYPE,
} from 'dsl/Matchers/types';
import { JsonNumber } from './base/JsonNumber';
import { JsonString } from './base/JsonString';
import type { MatcherExecutor } from './types';

export const MatcherExecutors: { [T in AnyMatcherType]: MatcherExecutor<T> } = {
  [JSON_NUMBER_TYPE]: JsonNumber,
  [JSON_STRING_TYPE]: JsonString,
};
