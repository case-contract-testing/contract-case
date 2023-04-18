import { coreBasicAuthValue } from '../../../entities/nodes/matchers/http/matcher';
import { AnyCaseNodeOrData, AnyStringMatcher } from '../../../entities/types';
import { stringPrefix } from './strings';

export const bearerToken = (token: AnyStringMatcher): AnyCaseNodeOrData =>
  stringPrefix('Bearer ', token);

export const basicAuth = (
  username: AnyStringMatcher,
  password: AnyStringMatcher
): AnyCaseNodeOrData =>
  stringPrefix('Basic ', coreBasicAuthValue(username, password));
