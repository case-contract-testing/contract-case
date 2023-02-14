import { CaseConfigurationError, CaseCoreError } from 'entities';
import { makeLogger as defaultMakeLogger } from 'connectors/logger';

import { traversals } from 'diffmatch/traversals';
import { resultPrinter } from 'connectors/resultPrinter';
import {
  configToRunContext,
  DEFAULT_CONFIG,
  DEFAULT_TEST_ID,
} from 'connectors/contract/core/executeExample/setup';
import type { CaseConfig } from 'connectors/contract/core/types';
import { applyNodeToContext, constructInitialContext } from 'entities/context';
import type {
  AnyCaseNodeOrData,
  LookupableMatcher,
  LogLevelContext,
  MatchContext,
  AnyCaseNodeType,
  AnyData,
  DataOrCaseNodeFor,
  MatchResult,
  ContractDescription,
  Logger,
  RawLookupFns,
  ContractLookupFns,
  MatchContextWithoutLookup,
} from 'entities/types';
import { hasErrors } from 'entities/results';

import {
  findMatcher,
  makeContract,
  addLookupableMatcher,
  addVariable,
  findVariable,
} from './structure';
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

    const contractFns: RawLookupFns = {
      lookupMatcher: this.lookupMatcher.bind(this),
      saveLookupableMatcher: this.saveLookupableMatcher.bind(this),
      addVariable: this.addVariable.bind(this),
      lookupVariable: this.lookupVariable.bind(this),
    };

    const makeLookup = (
      context: MatchContextWithoutLookup
    ): ContractLookupFns => ({
      lookupMatcher: (uniqueName: string) =>
        contractFns.lookupMatcher(uniqueName, context),
      saveLookupableMatcher: (matcher) =>
        contractFns.saveLookupableMatcher(matcher, context),
      addDefaultVariable: (
        name: string,
        stateName: string,
        value: AnyCaseNodeOrData
      ) => contractFns.addVariable(name, 'default', stateName, value, context),
      addStateVariable: (
        name: string,
        stateName: string,
        value: AnyCaseNodeOrData
      ) => contractFns.addVariable(name, 'state', stateName, value, context),
      lookupVariable: (name: string) =>
        contractFns.lookupVariable(name, context),
    });

    this.initialContext = constructInitialContext(
      traversals,
      makeLogger,
      makeLookup,
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

  lookupVariable(
    name: string,
    context: MatchContextWithoutLookup
  ): AnyCaseNodeOrData {
    if (this.currentContract === undefined) {
      context.logger.error(
        `lookupVariable was called without initialising the contract file. This should not be possible.`
      );
      throw new CaseConfigurationError(
        'Contract was not initialised at the time that lookupVariable was called'
      );
    }

    const stateVariable = findVariable(this.currentContract, 'state', name);
    if (stateVariable !== undefined) {
      return stateVariable;
    }
    const defaultVariable = findVariable(this.currentContract, 'default', name);

    if (defaultVariable === undefined) {
      throw new CaseConfigurationError(
        `Variable '${name}' was requested but appears not to be set. Is the variable spelt correctly, and the states for this mock are correctly set`
      );
    }
    return defaultVariable;
  }

  addVariable(
    name: string,
    type: 'default' | 'state',
    stateName: string,
    value: AnyCaseNodeOrData,
    context: MatchContextWithoutLookup
  ): ContractFile {
    if (this.currentContract === undefined) {
      context.logger.error(
        `addVariable was called by state '${stateName}' without initialising the contract file. This should not be possible.`
      );
      throw new CaseConfigurationError(
        'Contract was not initialised at the time that addVariable was called'
      );
    }

    this.currentContract = addVariable(
      this.currentContract,
      type,
      name,
      value,
      context
    );
    return this.currentContract;
  }

  saveLookupableMatcher(
    namedMatcher: LookupableMatcher,
    context: MatchContextWithoutLookup
  ): ContractFile {
    if (this.currentContract === undefined) {
      context.logger.error(
        'saveNamedMatcher was called without initialising the contract file. This should not be possible.'
      );
      throw new CaseConfigurationError(
        'Contract was not initialised at the time that saveNamedMatcher was called'
      );
    }

    this.currentContract = addLookupableMatcher(
      this.currentContract,
      namedMatcher,
      context
    );
    return this.currentContract;
  }

  lookupMatcher(
    uniqueName: string,
    context: MatchContextWithoutLookup
  ): AnyCaseNodeOrData {
    if (!this.currentContract) {
      context.logger.error(
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
