import { coreBasicAuthValue } from '@contract-case/case-core-plugin-http-dsl';
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';
import { AnyCaseMatcher } from '@contract-case/case-entities-internal';
import { stringPrefix } from './strings';

export const bearerToken = (
  token: AnyCaseMatcher | string,
): AnyCaseMatcherOrData => stringPrefix('Bearer ', token);

export const basicAuth = (
  username: AnyCaseMatcher | string,
  password: AnyCaseMatcher | string,
): AnyCaseMatcherOrData =>
  stringPrefix('Basic ', coreBasicAuthValue(username, password));
