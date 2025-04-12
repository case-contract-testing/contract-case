import {
  MatchContext,
  ResultFormatter,
  LogLevelContext,
  Logger,
  RawLookupFns,
  MatchContextWithoutLookup,
  ContractLookupFns,
  constructMatchContext,
  CaseConfigurationError,
  CaseCoreError,
  applyNodeToContext,
  MatchResult,
} from '@contract-case/case-plugin-base';
import { AnyCaseMatcher } from '@contract-case/case-entities-internal';
import {
  AnyCaseMatcherOrData,
  AnyData,
  AnyLeafOrStructure,
  isLookupableMatcher,
} from '@contract-case/case-plugin-dsl-types';
import {
  findMatcher,
  makeContract,
  addLookupableMatcher,
  addVariable,
  findVariable,
} from './structure';
import { configToRunContext } from './config';
import type { CaseConfig, DefaultConfig } from './config/types';
import { DEFAULT_TEST_ID } from './defaultTestId';
import { traversals } from '../diffmatch';
import { coreShapedLike } from '../entities';
import { loadCorePlugins } from './plugins';
import { ContractData, CaseContractDescription } from '../entities/types';

type UserProvidedFunction = (...args: unknown[]) => Promise<unknown>;

export class BaseCaseContract {
  currentContract: ContractData;

  initialContext: MatchContext;

  /**
   * The currently executing context. Used to make it easy to do things
   * like get state variables during a stripMatchers call inside a test trigger
   */
  runningContext: MatchContext;

  userProvidedFunctions: Record<string, UserProvidedFunction>;

  constructor(
    description: CaseContractDescription,
    config: CaseConfig,
    defaultConfig: DefaultConfig,
    resultPrinter: ResultFormatter,
    makeLogger: (context: LogLevelContext) => Logger,
    parentVersions: Array<string>,
    userProvidedFunctions: Record<string, UserProvidedFunction> = {},
  ) {
    this.currentContract = makeContract(description);
    this.userProvidedFunctions = userProvidedFunctions;

    const contractFns: RawLookupFns = {
      lookupMatcher: this.lookupMatcher.bind(this),
      saveLookupableMatcher: this.saveLookupableMatcher.bind(this),
      addVariable: this.addVariable.bind(this),
      lookupVariable: this.lookupVariable.bind(this),
    };

    const invokeHandle = this.invokeFunctionByHandle.bind(this);

    const makeLookup = (
      context: MatchContextWithoutLookup,
    ): ContractLookupFns => ({
      lookupMatcher: (uniqueName: string) =>
        contractFns.lookupMatcher(uniqueName, context),
      saveLookupableMatcher: (matcher) =>
        contractFns.saveLookupableMatcher(matcher, context),
      addDefaultVariable: (
        name: string,
        stateName: string,
        value: AnyCaseMatcherOrData,
      ) => contractFns.addVariable(name, 'default', stateName, value, context),
      addStateVariable: (
        name: string,
        stateName: string,
        value: AnyCaseMatcherOrData,
      ) => contractFns.addVariable(name, 'state', stateName, value, context),
      lookupVariable: (name: string) =>
        contractFns.lookupVariable(name, context),
      invokeFunctionByHandle: (handle: string, callerArguments: unknown[]) =>
        invokeHandle(handle, callerArguments, context),
    });

    this.initialContext = constructMatchContext(
      traversals,
      makeLogger,
      makeLookup,
      resultPrinter,
      { ...configToRunContext({ ...defaultConfig, ...config }) },
      defaultConfig,
      parentVersions,
    );
    this.runningContext = this.initialContext;

    if (
      this.initialContext['_case:currentRun:context:testRunId'] ===
      DEFAULT_TEST_ID
    ) {
      this.initialContext.logger.warn(
        "The 'testRunId' config property has not been set for this run. It is recommended to set it for each CaseContract() or CaseVerifier() invocation.",
        // TODO: put in a URL to the documentation here
      );
    }
    this.initialContext.logger.maintainerDebug(`Running on ${process.version}`);

    loadCorePlugins(this.initialContext);
  }

  registerFunction(handle: string, invokeableFn: UserProvidedFunction): void {
    if (handle in this.userProvidedFunctions) {
      const message = `Registering a function with handle '${handle}', but a function with this handle is already registered. Make sure you are only calling registerHandle once.`;
      this.initialContext.logger.error(message);
      this.initialContext.logger.deepMaintainerDebug(
        'When trying to register the duplicate, the userProvidedFunctions were:',
        this.userProvidedFunctions,
      );
      throw new CaseConfigurationError(message);
    }
    this.initialContext.logger.debug(
      `Registered a user-provided invokable function with name '${handle}'`,
    );
    this.userProvidedFunctions[handle] = invokeableFn;
  }

  invokeFunctionByHandle(
    handle: string,
    callerArguments: unknown[],
    context: MatchContextWithoutLookup,
  ): Promise<unknown> {
    return Promise.resolve()
      .then(() => {
        context.logger.maintainerDebug(
          `Invoking function by handle: '${handle}', with callerArguments: `,
          callerArguments,
        );
        const invokeableFn = this.userProvidedFunctions[handle];
        if (invokeableFn == null) {
          const message = `Tried to invoke a user-provided function with the handle '${handle}', but it didn't exist\nMake sure you have used registerFunction to define a function with this handle when setting up your test`;
          context.logger.error(message);
          context.logger.deepMaintainerDebug(
            'When trying to add the duplicate, the userProvidedFunctions were:',
            this.userProvidedFunctions,
          );
          throw new CaseConfigurationError(message, context);
        }
        return invokeableFn;
      })
      .then((invokeableFn) => invokeableFn(...callerArguments));
  }

  lookupVariable(
    name: string,
    context: MatchContextWithoutLookup,
  ): AnyCaseMatcherOrData {
    if (this.currentContract === undefined) {
      context.logger.error(
        `lookupVariable was called without initialising the contract file. This should not be possible.`,
      );
      throw new CaseConfigurationError(
        'Contract was not initialised at the time that lookupVariable was called',
      );
    }

    const defaultVariable = findVariable(this.currentContract, name, context);

    if (defaultVariable === undefined) {
      throw new CaseConfigurationError(
        `Variable '${name}' was requested but appears not to be set. Check that the variable is spelt correctly, and the states for this mock are correctly setup`,
      );
    }
    return coreShapedLike(defaultVariable);
  }

  addVariable(
    name: string,
    type: 'default' | 'state',
    stateName: string,
    value: AnyCaseMatcherOrData,
    context: MatchContextWithoutLookup,
  ): [name: string, value: AnyCaseMatcherOrData] {
    context.logger.maintainerDebug(
      `Setting state variable '${name}', in test '${context['_case:currentRun:context:testName']}'  to value:`,
      value,
    );
    if (this.currentContract === undefined) {
      context.logger.error(
        `addVariable was called by state '${stateName}' without initialising the contract file. This should not be possible.`,
      );
      throw new CaseConfigurationError(
        'Contract was not initialised at the time that addVariable was called',
      );
    }

    this.currentContract = addVariable(
      this.currentContract,
      name,
      type,
      coreShapedLike(value),
      context,
    );

    return [name, value];
  }

  saveLookupableMatcher(
    namedMatcher: AnyCaseMatcherOrData,
    context: MatchContextWithoutLookup,
  ): ContractData {
    if (this.currentContract === undefined) {
      context.logger.error(
        'saveNamedMatcher was called without initialising the contract file. This should not be possible.',
      );
      throw new CaseConfigurationError(
        'Contract was not initialised at the time that saveNamedMatcher was called',
      );
    }
    if (!isLookupableMatcher(namedMatcher)) {
      context.logger.error(
        'Non-lookup matcher incorrectly received in saveLookupMatcher. Matcher follows',
        namedMatcher,
      );
      throw new CaseCoreError(
        `A non-lookup matcher was passed to saveLookupableMatcher. This is an error in a matcher or mock implementation. Please open an issue.`,
        context,
      );
    }

    this.currentContract = addLookupableMatcher(
      this.currentContract,
      namedMatcher,
      context,
    );
    return this.currentContract;
  }

  lookupMatcher(
    uniqueName: string,
    context: MatchContextWithoutLookup,
  ): AnyCaseMatcherOrData {
    if (!this.currentContract) {
      context.logger.error(
        'lookupMatcher was called without initialising the contract file. This should not be possible.',
      );
      throw new CaseCoreError(
        'Contract was not initialised at the time that lookupMatcher was called',
      );
    }

    // Have to pull this out, because typescript can't see that it's the same result even if we call twice
    const possibleMatch = findMatcher(
      this.currentContract,
      uniqueName,
      context,
    );
    if (possibleMatch !== undefined) {
      return possibleMatch;
    }
    throw new CaseConfigurationError(
      `Contract did not contain a matcher with the name '${uniqueName}'. Did you ask for it before it was defined?`,
    );
  }

  /**
   * Strips the matchers from a (potentially) case matcher and returns
   * the concrete example it would match.
   *
   * Note this isn't the only example it could match - just the default version.
   *
   * WARNING: If called outside a test, this function runs using the context of
   * the last test run. This means that state variables might not be correct.
   * Perhaps we should consider making it an error to call this if a test
   * isn't running?
   *
   * @param matcherOrData - the matcher or data to strip the matchers from
   * @returns the concrete example
   */
  stripMatchers(matcherOrData: AnyCaseMatcher | AnyLeafOrStructure): AnyData {
    this.runningContext.logger.maintainerDebug(
      'Stripping matchers from: ',
      matcherOrData,
    );
    this.runningContext.logger.deepMaintainerDebug(
      'At the time of this strip, the current context is',
      this.runningContext,
    );
    this.runningContext.logger.deepMaintainerDebug(
      'And the lookupable variables are:',
      Object.keys(this.currentContract.matcherLookup).filter((key) =>
        key.startsWith('variable'),
      ),
    );

    const strippedResult = traversals.descendAndStrip(
      matcherOrData,
      applyNodeToContext(matcherOrData, this.runningContext),
    );

    this.runningContext.logger.maintainerDebug(
      'Stripped result was: ',
      strippedResult,
    );
    return strippedResult;
  }

  /**
   * Checks if a matcher matchers some actual data.
   *
   * This is only exposed for tests at the moment - if it were exposed further,
   * we'd need to use the running test context like stripMatchers does.
   *
   *
   * WARNING: If called outside a test, this function runs using the context of
   * the last test run. This means that state variables might not be correct.
   *
   * @param matcherOrData - the matcher or data that is expected
   * @param actual - the actual data to match against
   * @returns a {@link MatchResult} object with the results of the match
   */
  checkMatch(
    matcherOrData: AnyCaseMatcher | AnyLeafOrStructure,
    actual: unknown,
  ): Promise<MatchResult> {
    return Promise.resolve()
      .then(() =>
        traversals.selfVerify(
          matcherOrData,
          applyNodeToContext(matcherOrData, this.initialContext),
        ),
      )
      .then(() =>
        traversals.descendAndCheck(
          matcherOrData,
          applyNodeToContext(matcherOrData, this.initialContext),
          actual,
        ),
      );
  }
}
