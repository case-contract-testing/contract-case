import { applyDefaultContext } from 'entities/context';
import type {
  AnyCaseNodeType,
  AnyData,
  DataOrCaseNodeFor,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

import { traversals } from 'diffmatch';
import type { Logger } from 'entities/logger/types';

export const coreCheckMatch = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  actual: unknown,
  logger: Logger
): Promise<MatchResult> =>
  Promise.resolve(
    traversals.descendAndCheck(
      matcherOrData,
      applyDefaultContext(matcherOrData, traversals, logger),
      actual
    )
  );

export const coreStripMatchers = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  logger: Logger
): AnyData =>
  traversals.descendAndStrip(
    matcherOrData,
    applyDefaultContext(matcherOrData, traversals, logger)
  );
