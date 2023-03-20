import { AnyCaseNodeOrData, AnyStringMatcher } from '../../../entities/types';
import { stringPrefix } from './strings';

export const bearerToken = (token: AnyStringMatcher): AnyCaseNodeOrData =>
  stringPrefix('Bearer ', token);
