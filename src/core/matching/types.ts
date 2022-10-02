import type { MatchContext } from 'entities/context/types';
import type {
  AnyCaseNodeType,
  CaseNodeFor,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

export type MatcherExecutor<T extends AnyCaseNodeType> = (
  matcher: CaseNodeFor<T>,
  actual: unknown,
  matchContext: MatchContext
) => Promise<MatchResult> | MatchResult;
