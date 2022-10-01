import type { MatchContext } from 'core/context/types';
import type { AnyCaseNodeType, CaseNodeFor } from 'core/matchers/types';
import type { MatchResult } from 'core/types';

export type MatcherExecutor<T extends AnyCaseNodeType> = (
  matcher: CaseNodeFor<T>,
  actual: unknown,
  matchContext: MatchContext
) => Promise<MatchResult> | MatchResult;
