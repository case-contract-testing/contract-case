import * as leafMatchers from 'core/matchers/leaf';
import { coreShapedArrayMatcher } from './matchers/structure';
import {
  type AnyCaseNodeType,
  type CaseNodeFor,
  type AnyJson,
  isCaseNode,
  AnyCaseNode,
} from './matchers/types';

export const inferMatcher = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyJson
): AnyCaseNode => {
  if (matcherOrData == null) {
    return leafMatchers.coreNullMatcher();
  }
  if (typeof matcherOrData === 'string') {
    return leafMatchers.coreStringMatcher(matcherOrData);
  }
  if (typeof matcherOrData === 'number') {
    return leafMatchers.coreNumberMatcher(matcherOrData);
  }
  if (typeof matcherOrData === 'boolean') {
    return leafMatchers.coreBooleanMatcher(matcherOrData);
  }

  if (Array.isArray(matcherOrData)) {
    return coreShapedArrayMatcher(matcherOrData);
  }

  if (isCaseNode(matcherOrData)) {
    return matcherOrData;
  }
  // TODO Object or array
  throw new Error('Not implemented');
};
