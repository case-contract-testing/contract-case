import {
  AnyCaseMatcherOrData,
  isLookupableMatcher,
} from '@contract-case/case-entities-internal';
import {
  type MatchContextWithoutLookup,
  type AnyMockDescriptor,
} from '../../../entities/types';
import { addLookup } from './internals';
import type { LookupMap } from './types';

export const addMatcher = (
  matcherLookup: LookupMap,
  matcher: AnyCaseMatcherOrData,
  context: MatchContextWithoutLookup,
): LookupMap => {
  if (isLookupableMatcher(matcher) && '_case:matcher:child' in matcher) {
    return addLookup(
      matcherLookup,
      'matcher',
      matcher['_case:matcher:uniqueName'],
      matcher['_case:matcher:child'],
      context,
    );
  }
  return matcherLookup;
};

export const addMock = (
  matcherLookup: LookupMap,
  mock: AnyMockDescriptor,
  context: MatchContextWithoutLookup,
): LookupMap =>
  [mock.request, mock.response].reduce(
    (acc, curr) => addMatcher(acc, curr, context),
    matcherLookup,
  );
