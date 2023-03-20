import {
  type AnyCaseNodeOrData,
  type MatchContextWithoutLookup,
  isLookupableMatcher,
  type AnyMockDescriptor,
} from '../../../entities/types';
import { addLookup } from './internals';
import type { LookupMap } from './types';

export const addMatcher = (
  matcherLookup: LookupMap,
  matcher: AnyCaseNodeOrData,
  context: MatchContextWithoutLookup
): LookupMap => {
  if (isLookupableMatcher(matcher) && 'case:matcher:child' in matcher) {
    return addLookup(
      matcherLookup,
      'matcher',
      matcher['case:matcher:uniqueName'],
      matcher['case:matcher:child'],
      context
    );
  }
  return matcherLookup;
};

export const addMock = (
  matcherLookup: LookupMap,
  mock: AnyMockDescriptor,
  context: MatchContextWithoutLookup
): LookupMap =>
  [mock.request, mock.response].reduce(
    (acc, curr) => addMatcher(acc, curr, context),
    matcherLookup
  );
