import type { MatchContext } from 'entities/context/types';
import type {
  AnyCaseNodeType,
  AnyData,
  CaseNodeFor,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

export type CheckMatchFn<T extends AnyCaseNodeType> = (
  matcher: CaseNodeFor<T>,
  matchContext: MatchContext,
  actual: unknown
) => Promise<MatchResult> | MatchResult;

export type StripMatcherFn<T extends AnyCaseNodeType> = (
  matcher: CaseNodeFor<T>,
  matchContext: MatchContext
) => AnyData;

export interface MatcherExecutor<T extends AnyCaseNodeType> {
  check: CheckMatchFn<T>;
  // strip: StripMatcherFn<T>;
}
