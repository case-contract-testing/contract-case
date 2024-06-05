import {
  AnyCaseNodeType,
  CaseNodeFor,
  AnyCaseMatcher,
} from '@contract-case/case-entities-internal';
import {
  AnyLeafOrStructure,
  isCaseNode,
} from '@contract-case/case-plugin-base';
import {
  coreAndMatcher,
  coreArrayLengthMatcher,
} from '../entities/matchers/auxiliary';
import * as leafMatchers from '../entities/matchers/leaf';
import {
  coreShapedArrayMatcher,
  coreShapedObjectMatcher,
} from '../entities/matchers/structure';

export const inferMatcher = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
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
      }),
    );
  }

  if (isCaseNode(matcherOrData)) {
    return matcherOrData;
  }

  return coreShapedObjectMatcher(matcherOrData);
};
