import { CaseConfigurationError, CaseCoreError } from 'entities';
import { makeLogger as defaultMakeLogger } from 'connectors/logger';
import type { Logger } from 'entities/logger/types';
import { traversals } from 'diffmatch/traversals';
import { resultPrinter } from 'connectors/resultPrinter';
import { configToRunContext } from 'connectors/contract/core/setup';
import { applyNodeToContext, constructInitialContext } from 'entities/context';
import type {
  AnyCaseNodeOrData,
  LookupableMatcher,
  ContractFns,
  LogLevelContext,
  MatchContext,
  AnyCaseNodeType,
  AnyData,
  DataOrCaseNodeFor,
  MatchResult,
} from 'entities/types';
import type { ContractDescription } from 'entities/contract/types';
import type { CaseConfig } from 'connectors/contract/core/types';

import { findMatcher, makeContract, addLookupableMatcher } from './structure';
import type { ContractFile } from './structure/types';

export class BaseCaseContract {
  currentContract: ContractFile;

  initialContext: MatchContext;

  constructor(
    description: ContractDescription,
    config: CaseConfig,
    makeLogger: (context: LogLevelContext) => Logger = defaultMakeLogger
  ) {
    this.currentContract = makeContract(description);

    const contractFns: ContractFns = {
      lookupMatcher: this.lookupMatcher.bind(this),
      saveLookupableMatcher: this.saveLookupableMatcher.bind(this),
    };
    this.initialContext = constructInitialContext(
      traversals,
      makeLogger,
      contractFns,
      resultPrinter,
      configToRunContext(config)
    );
  }

  saveLookupableMatcher(
    namedMatcher: LookupableMatcher,
    logger: Logger
  ): ContractFile {
    if (this.currentContract === undefined) {
      logger.error(
        'saveNamedMatcher was called without initialising the contract file. This should not be possible.'
      );
      throw new CaseConfigurationError(
        'Contract was not initialised at the time that saveNamedMatcher was called'
      );
    }

    // Have to pull this out, because typescript is dumb and can't see that it's not undefined
    this.currentContract = addLookupableMatcher(
      this.currentContract,
      namedMatcher,
      logger
    );
    return this.currentContract;
  }

  lookupMatcher(uniqueName: string, logger: Logger): AnyCaseNodeOrData {
    if (!this.currentContract) {
      logger.error(
        'lookupMatcher was called without initialising the contract file. This should not be possible.'
      );
      throw new CaseCoreError(
        'Contract was not initialised at the time that lookupMatcher was called'
      );
    }

    // Have to pull this out, because typescript is dumb and can't see that it's not undefined
    const possibleMatch = findMatcher(this.currentContract, uniqueName);
    if (possibleMatch !== undefined) {
      return possibleMatch;
    }
    throw new CaseConfigurationError(
      `Contract did not contain a matcher with the name '${uniqueName}'. Did you ask for it before it was defined?`
    );
  }

  stripMatchers<T extends AnyCaseNodeType>(
    matcherOrData: DataOrCaseNodeFor<T>
  ): AnyData {
    return traversals.descendAndStrip(
      matcherOrData,
      applyNodeToContext(matcherOrData, this.initialContext)
    );
  }

  checkMatch<T extends AnyCaseNodeType>(
    matcherOrData: DataOrCaseNodeFor<T>,
    actual: unknown
  ): Promise<MatchResult> {
    return Promise.resolve(
      traversals.descendAndCheck(
        matcherOrData,
        applyNodeToContext(matcherOrData, this.initialContext),
        actual
      )
    );
  }
}
