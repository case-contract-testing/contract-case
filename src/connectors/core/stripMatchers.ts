import { applyDefaultContext } from 'entities/context';
import type {
  AnyCaseNodeType,
  AnyData,
  DataOrCaseNodeFor,
} from 'entities/nodes/matchers/types';

import { traversals } from 'diffmatch';
import type { Logger } from 'entities/logger/types';
import type { LogLevelContext } from 'entities/types';
import { contractFns } from 'connectors/contract';
import { resultPrinter } from 'connectors/resultPrinter';
import { DEFAULT_CONFIG } from 'connectors/core/setup/defaultConfig';

import type { CaseConfig } from './setup/types';
import { configToRunContext } from './setup/config';

export const coreStripMatchers = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  makeLogger: (c: LogLevelContext) => Logger,
  config: CaseConfig = DEFAULT_CONFIG
): AnyData =>
  traversals.descendAndStrip(
    matcherOrData,
    applyDefaultContext(
      matcherOrData,
      traversals,
      makeLogger,
      contractFns,
      resultPrinter,
      configToRunContext(config)
    )
  );
