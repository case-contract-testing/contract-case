import type { AnyMatcherType, MatchingError } from 'core/types';
import type { MatcherFor } from 'dsl/Matchers/types';

export type MatcherExecutor<T extends AnyMatcherType> = (
  matcher: MatcherFor<T>,
  actual: unknown
) => Array<MatchingError>;
