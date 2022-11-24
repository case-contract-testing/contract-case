import { applyDefaultContext } from 'entities/context';
import type {
  AnyCaseNodeType,
  AnyData,
  DataOrCaseNodeFor,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

import { traversals } from 'diffmatch';
import type { Logger } from 'entities/logger/types';
import type { LoggableContext } from 'entities/context/types';
import { contractFns } from 'connectors/contract';

export const coreCheckMatch = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  actual: unknown,
  logger: (c: LoggableContext) => Logger
): Promise<MatchResult> =>
  Promise.resolve(
    traversals.descendAndCheck(
      matcherOrData,
      applyDefaultContext(matcherOrData, traversals, logger, contractFns),
      actual
    )
  );

export const coreStripMatchers = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  makeLogger: (c: LoggableContext) => Logger
): AnyData =>
  traversals.descendAndStrip(
    matcherOrData,
    applyDefaultContext(matcherOrData, traversals, makeLogger, contractFns)
  );
