import { traversals } from 'diffmatch';
import { applyDefaultContext } from 'entities/context';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from 'entities/nodes/interactions/types';
import type { Assertable } from 'entities/types';
import { makeLogger } from 'connectors/logger';
import { contractFns } from 'connectors/contract';
import type { AnyState } from 'entities/states/types';
import { setupWithContext } from 'connectors/core/setup/setup';
import { resultPrinter } from 'connectors/resultPrinter';
import type { CaseConfig } from 'connectors/core/setup/types';
import { DEFAULT_CONFIG } from 'connectors/core/setup/defaultConfig';
import { configToRunContext } from 'connectors/core/setup/config';

export const setup = <T extends AnyInteractionType>(
  states: Array<AnyState>,
  interaction: CaseInteractionFor<T>,
  runConfig: CaseConfig = DEFAULT_CONFIG
): Promise<Assertable<T>> =>
  setupWithContext(
    states,
    interaction,
    Promise.resolve(
      applyDefaultContext(
        interaction,
        traversals,
        makeLogger,
        contractFns,
        resultPrinter,
        configToRunContext(runConfig)
      )
    )
  );
