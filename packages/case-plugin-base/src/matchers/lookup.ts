import { LOOKUP_MATCHER_TYPE, LookupableMatcher } from './lookup.types';
import { AnyCaseMatcherOrData } from './matchers.types';

export const coreLookupMatcher = (
  uniqueName: string,
  child: AnyCaseMatcherOrData,
): LookupableMatcher => ({
  '_case:matcher:type': LOOKUP_MATCHER_TYPE,
  '_case:matcher:uniqueName': uniqueName,
  '_case:matcher:child': child,
});
