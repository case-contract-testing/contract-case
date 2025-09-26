import {
  AnyCaseMatcherOrData,
  AnyMockDescriptor,
} from '@contract-case/case-plugin-dsl-types';
import { MatchContext } from '../context/types';
import { coreLookupMatcher } from '../matchers/lookup';

const nameMatcher = (matcher: AnyCaseMatcherOrData, context: MatchContext) =>
  typeof matcher === 'object' &&
  matcher != null &&
  '_case:matcher:uniqueName' in matcher
    ? matcher
    : coreLookupMatcher(context.descendAndDescribe(matcher, context), matcher);

/**
 * Helper function that will name this mock if it isn't already named.
 * @public
 * @remarks
 *
 * You probably don't need to use this function, it is used by ContractCase internals.
 * TODO: it could be moved to the core.
 *
 * @param mock - a Mock Descriptor object
 * @param context - the {@link MatchContext} for this run
 * @returns a mock descriptor object where the request and response are guaranteed to be named.
 */
export const nameMock = <M extends AnyMockDescriptor>(
  mock: M,
  context: MatchContext,
): M => ({
  ...mock,
  ...(mock.request ? { request: nameMatcher(mock.request, context) } : {}),
  ...(mock.response ? { response: nameMatcher(mock.response, context) } : {}),
});
