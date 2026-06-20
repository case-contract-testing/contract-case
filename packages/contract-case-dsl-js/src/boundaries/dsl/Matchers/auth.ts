import {
  AnyCaseMatcher,
  AnyCaseMatcherOrData,
} from '@contract-case/case-entities-internal';
import { coreBasicAuthValue } from './core/index.js';

import { stringPrefix } from './strings.js';

export const bearerToken = (token: AnyCaseMatcher): AnyCaseMatcherOrData =>
  stringPrefix('Bearer ', token);

export const basicAuth = (
  username: AnyCaseMatcher,
  password: AnyCaseMatcher,
): AnyCaseMatcherOrData =>
  stringPrefix('Basic ', coreBasicAuthValue(username, password));
