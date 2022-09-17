import type { MatchingError } from 'core/types';
import type { AnyMatcherType, MatcherFor } from 'dsl/Matchers/types';

export type MatcherExecutor<T extends AnyMatcherType> = (
  matcher: MatcherFor<T>,
  actual: unknown
) => Array<MatchingError>;
