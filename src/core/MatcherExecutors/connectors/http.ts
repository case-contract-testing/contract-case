import type { MatchContext } from 'core/context/types';
import type {
  WillSendHttpRequest,
  WILL_SEND_HTTP_REQUEST,
} from 'core/matchers/types';
import type { MatchingError } from 'core/types';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';
import { CaseCoreError } from 'core/CaseCoreError';

export const CanSendHttpRequest: MatcherExecutor<
  typeof WILL_SEND_HTTP_REQUEST
> = (
  matcher: WillSendHttpRequest,
  actual: unknown,
  matchContext: MatchContext
): Array<MatchingError> => {
  if (matcher.method !== 'get') throw new CaseCoreError('Not implemented');
  // eslint-disable-next-line no-console
  console.error(actual, matchContext);
  // start server

  return [];
};
