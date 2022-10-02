import type { MatcherExecutor } from 'core/matching/types';
import type { MatchContext } from 'entities/context/types';
import { CaseCoreError } from 'entities/CaseCoreError';
import { foldIntoContext } from 'entities/context';
import { inferMatcher } from 'core/matching/inferMatcher';
import type { MatchResult } from 'entities/types';
import {
  AnyCaseNodeType,
  CaseNodeFor,
  AnyLeafOrStructure,
  BOOLEAN_MATCHER_TYPE,
  CASCADING_CONTEXT_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  NUMBER_MATCHER_TYPE,
  SHAPED_ARRAY_MATCHER_TYPE,
  SHAPED_OBJECT_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import { ExactCascadingContext } from './contextShift/CascadingContext';
import { BooleanMatcher } from './leaf/BooleanMatcher';
import { NullMatcher } from './leaf/NullMatcher';
import { NumberMatcher } from './leaf/NumberMatcher';
import { StringMatcher } from './leaf/StringMatcher';
import { ShapedArrayExecutor } from './structure/ShapedArrayExecutor';
import { ShapedObjectExecutor } from './structure/ShapedObjectExecutor';

const MatcherExecutors: { [T in AnyCaseNodeType]: MatcherExecutor<T> } = {
  [NUMBER_MATCHER_TYPE]: NumberMatcher,
  [STRING_MATCHER_TYPE]: StringMatcher,
  [BOOLEAN_MATCHER_TYPE]: BooleanMatcher,
  [CASCADING_CONTEXT_MATCHER_TYPE]: ExactCascadingContext,
  [NULL_MATCHER_TYPE]: NullMatcher,
  [SHAPED_ARRAY_MATCHER_TYPE]: ShapedArrayExecutor,
  [SHAPED_OBJECT_MATCHER_TYPE]: ShapedObjectExecutor,
};

export const matchCore = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  actual: unknown,
  parentMatchContext: MatchContext
): Promise<MatchResult> => {
  const matcher = inferMatcher<T>(matcherOrData) as CaseNodeFor<T>;
  const matchContext = foldIntoContext(matcher, parentMatchContext);

  const executor: MatcherExecutor<T> =
    MatcherExecutors[matcher['case:matcher:type'] as T];
  if (!executor) {
    throw new CaseCoreError(
      `Missing executor for matcher type '${matcher['case:matcher:type']}'`
    );
  }

  return Promise.resolve(executor(matcher, actual, matchContext));
};
