import { CaseConfigurationError, CaseCoreError } from 'entities';
import { makeLogger as defaultMakeLogger } from 'connectors/logger';

import { traversals } from 'diffmatch/traversals';
import { resultPrinter } from 'connectors/resultPrinter';
import {
  configToRunContext,
  DEFAULT_CONFIG,
  DEFAULT_TEST_ID,
} from 'connectors/contract/core/setup';
import type { CaseConfig } from 'connectors/contract/core/types';
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
  ContractDescription,
  Logger,
} from 'entities/types';
import { hasErrors } from 'entities/results';

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
      { ...configToRunContext(DEFAULT_CONFIG), ...configToRunContext(config) }
    );

    if (
      this.initialContext['case:currentRun:context:testRunId'] ===
      DEFAULT_TEST_ID
    ) {
      this.initialContext.logger.warn(
        "The 'testRunId' config property has not been set for this run. It is recommended to set it for each CaseContract() or CaseVerifier() invocation."
        // TODO: put in a URL to the documentation here
      );
    }
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

    // Have to pull this out, because typescript can't see that it's the same result even if we call twice
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
    this.initialContext.logger.warn(
      'DEPRECATED: This function should be removed and a new Interaction concept brought in'
    );
    return traversals.descendAndStrip(
      matcherOrData,
      applyNodeToContext(matcherOrData, this.initialContext)
    );
  }

  checkMatch<T extends AnyCaseNodeType>(
    matcherOrData: DataOrCaseNodeFor<T>,
    actual: unknown
  ): Promise<MatchResult> {
    return Promise.resolve()
      .then(() =>
        traversals.selfVerify(
          matcherOrData,
          applyNodeToContext(matcherOrData, this.initialContext)
        )
      )
      .then((selfVerification) => {
        if (hasErrors(selfVerification)) {
          throw new CaseConfigurationError(
            // TODO document this extensively.
            `The matchers used have been given an example that doesn't pass the matcher: ${selfVerification[0]?.message} (at ${selfVerification[0]?.location})`
          );
        }
      })
      .then(() =>
        traversals.descendAndCheck(
          matcherOrData,
          applyNodeToContext(matcherOrData, this.initialContext),
          actual
        )
      );
  }
}
