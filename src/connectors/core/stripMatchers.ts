import { applyDefaultContext } from 'entities/context';
import type {
  AnyCaseNodeType,
  AnyData,
  DataOrCaseNodeFor,
} from 'entities/nodes/matchers/types';

import { traversals } from 'diffmatch';
import type { Logger } from 'entities/logger/types';
import type { LoggableContext } from 'entities/context/types';
import { contractFns } from 'connectors/contract';
import { resultPrinter } from 'connectors/resultPrinter';

export const coreStripMatchers = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  makeLogger: (c: LoggableContext) => Logger
): AnyData =>
  traversals.descendAndStrip(
    matcherOrData,
    applyDefaultContext(
      matcherOrData,
      traversals,
      makeLogger,
      contractFns,
      resultPrinter
    )
  );
