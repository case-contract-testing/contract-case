import { LOOKUP_MATCHER_TYPE, LookupableMatcher } from './lookup.types';
import { AnyCaseMatcherOrData } from './matchers.types';

/**
 * Creates a matcher descriptor for a lookupable matcher.
 * @public
 * @remarks
 *
 * Useful if you want to automatically name lookupable matcher descriptors in your plugin.
 *
 * Note that lookup matchers must have identical contents when rendered.
 *
 * @param uniqueName - the name for this lookupable matcher
 * @param child - the contents of this lookupable matcher
 * @returns a {@link LookupableMatcher}
 */
export const coreLookupMatcher = (
  uniqueName: string,
  child: AnyCaseMatcherOrData,
): LookupableMatcher => ({
  '_case:matcher:type': LOOKUP_MATCHER_TYPE,
  '_case:matcher:uniqueName': uniqueName,
  '_case:matcher:child': child,
});
