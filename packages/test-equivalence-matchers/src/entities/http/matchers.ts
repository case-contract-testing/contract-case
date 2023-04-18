import { AnyStringMatcher } from '../matchers.types';
import { CoreHttpBasicAuthValue, HTTP_BASIC_AUTH_TYPE } from './types';

export const coreBasicAuthValue = (
  username: AnyStringMatcher,
  password: AnyStringMatcher
): CoreHttpBasicAuthValue => ({
  '_case:matcher:type': HTTP_BASIC_AUTH_TYPE,
  '_case:matcher:username': username,
  '_case:matcher:password': password,
  '_case:matcher:resolvesTo': 'string',
});
