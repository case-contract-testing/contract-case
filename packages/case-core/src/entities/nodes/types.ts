import {
  AnyCaseNodeType,
  CaseNodeFor,
  AnyData,
} from '@contract-case/case-entities-internal';
import type { MatchContext } from '../../entities/context/types';
import type { MatchResult } from '../../entities/results/types';

export * from './mocks/types';
export * from './mocks/setup.types';
export * from './matchers/types';

export type CheckMatchFn<T extends AnyCaseNodeType> = (
  matcher: CaseNodeFor<T>,
  matchContext: MatchContext,
  actual: unknown,
) => Promise<MatchResult> | MatchResult;

export type StripMatcherFn<T extends AnyCaseNodeType> = (
  matcher: CaseNodeFor<T>,
  matchContext: MatchContext,
) => AnyData;

export type NameMatcherFn<T extends AnyCaseNodeType> = (
  matcher: CaseNodeFor<T>,
  matchContext: MatchContext,
) => string;
export interface MatcherExecutor<T extends AnyCaseNodeType> {
  describe: NameMatcherFn<T>;
  check: CheckMatchFn<T>;
  strip: StripMatcherFn<T>;
}
