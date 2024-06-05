import { MatchContext } from '../context/types';
import { coreLookupMatcher } from '../matchers/lookup';
import { AnyCaseMatcherOrData } from '../matchers/matchers.types';
import { AnyMockDescriptor } from './types';

const nameMatcher = (matcher: AnyCaseMatcherOrData, context: MatchContext) =>
  coreLookupMatcher(context.descendAndDescribe(matcher, context), matcher);

export const nameMock = <M extends AnyMockDescriptor>(
  mock: M,
  context: MatchContext,
): M => ({
  ...mock,
  ...(mock.request ? { request: nameMatcher(mock.request, context) } : {}),
  ...(mock.response ? { response: nameMatcher(mock.response, context) } : {}),
});
