import {
  coreAndMatcher,
  coreArrayLengthMatcher,
} from 'entities/nodes/matchers/auxillary';
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
  AnyCaseMatcher,
} from 'entities/nodes/matchers/types';

export const inferMatcher = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure
): AnyCaseMatcher => {
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
    return coreAndMatcher(
      coreShapedArrayMatcher(matcherOrData),
      coreArrayLengthMatcher({
        minLength: matcherOrData.length,
        maxLength: matcherOrData.length,
      })
    );
  }

  if (isCaseNode(matcherOrData)) {
    return matcherOrData;
  }

  return coreShapedObjectMatcher(matcherOrData);
};
