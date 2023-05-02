import {
  AnyCaseStringMatcher,
  AnyCaseMatcherOrData,
} from '@contract-case/case-entities-internal';
import { coreBasicAuthValue } from './core';

import { stringPrefix } from './strings';

export const bearerToken = (
  token: AnyCaseStringMatcher
): AnyCaseMatcherOrData => stringPrefix('Bearer ', token);

export const basicAuth = (
  username: AnyCaseStringMatcher,
  password: AnyCaseStringMatcher
): AnyCaseMatcherOrData =>
  stringPrefix('Basic ', coreBasicAuthValue(username, password));
