import { MatchContextWithoutLookup } from '@contract-case/case-plugin-base';
import {
  AnyCaseMatcher,
  AnyCaseMatcherOrData,
  AnyMockDescriptor,
  isLookupableMatcher,
} from '@contract-case/case-plugin-dsl-types';
import { addLookup } from './internals';
import type { LookupMap } from './types';

export const addMatcher = (
  matcherLookup: LookupMap,
  matcher: AnyCaseMatcherOrData,
  context: MatchContextWithoutLookup,
): LookupMap => {
  if (isLookupableMatcher(matcher) && '_case:matcher:child' in matcher) {
    context.logger.deepMaintainerDebug(
      'addMatcher: Calling addLookup for',
      matcher,
    );
    return addLookup(
      matcherLookup,
      'matcher',
      matcher['_case:matcher:uniqueName'],
      matcher['_case:matcher:child'],
      context,
    );
  }
  context.logger.deepMaintainerDebug('addMatcher: Not adding', matcher);
  return matcherLookup;
};

export const addMock = (
  matcherLookup: LookupMap,
  mock: AnyMockDescriptor,
  context: MatchContextWithoutLookup,
): LookupMap =>
  [mock.request, mock.response]
    .filter((x): x is AnyCaseMatcher => x !== undefined)
    .reduce((acc, curr) => addMatcher(acc, curr, context), matcherLookup);
