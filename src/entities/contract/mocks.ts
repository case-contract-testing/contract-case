import { coreLookupMatcher } from 'entities/nodes/matchers';
import type {
  AnyCaseNodeOrData,
  MatchContext,
  AnyMockType,
  CaseMockFor,
} from 'entities/types';

const nameMatcher = (matcher: AnyCaseNodeOrData, context: MatchContext) =>
  coreLookupMatcher(context.descendAndDescribe(matcher, context), matcher);

export const nameMock = <T extends AnyMockType>(
  mock: CaseMockFor<T>,
  context: MatchContext
): CaseMockFor<T> => ({
  ...mock,
  request: nameMatcher(mock.request, context),
  response: nameMatcher(mock.response, context),
});
