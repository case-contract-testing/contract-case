import * as leafMatchers from 'entities/nodes/matchers/leaf';
import {
  coreShapedArrayMatcher,
  coreShapedObjectMatcher,
} from 'entities/nodes/matchers/structure';
import {
  type AnyCaseNodeType,
  type CaseNodeFor,
  type AnyLeafOrStructure,
  isCaseNode,
  AnyCaseNode,
} from 'entities/nodes/matchers/types';

export const inferMatcher = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure
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

  return coreShapedObjectMatcher(matcherOrData);
};
