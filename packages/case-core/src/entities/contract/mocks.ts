import { AnyCaseMatcherOrData } from '@contract-case/case-entities-internal';
import { coreLookupMatcher } from '../../entities/nodes/matchers';
import type {
  MatchContext,
  AnyMockDescriptorType,
  CaseMockDescriptorFor,
} from '../../entities/types';

const nameMatcher = (matcher: AnyCaseMatcherOrData, context: MatchContext) =>
  coreLookupMatcher(context.descendAndDescribe(matcher, context), matcher);

export const nameMock = <T extends AnyMockDescriptorType>(
  mock: CaseMockDescriptorFor<T>,
  context: MatchContext
): CaseMockDescriptorFor<T> => ({
  ...mock,
  request: nameMatcher(mock.request, context),
  response: nameMatcher(mock.response, context),
});
