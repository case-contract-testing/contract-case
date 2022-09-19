import type { MatchContext } from 'core/context/types';
import type { AnyMatcherType, MatcherFor } from 'core/matchers/types';
import type { MatchingError } from 'core/types';

export type MatcherExecutor<T extends AnyMatcherType> = (
  matcher: MatcherFor<T>,
  actual: unknown,
  matchContext: MatchContext
) => Array<MatchingError>;
