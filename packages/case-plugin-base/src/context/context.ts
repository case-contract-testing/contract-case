import {
  AnyCaseMatcher,
  AnyMockDescriptor,
  AnyCaseMatcherOrData,
  isCaseMock,
  AnyData,
} from '@contract-case/case-plugin-dsl-types';
import type {
  MatchContext,
  RunContext,
  DefaultContext,
  TraversalFns,
  LogLevelContext,
  ResultFormatter,
  DataContext,
  MatchContextWithoutLookup,
  ContractLookupFns,
} from './types';

import { isCaseNode } from '../matchers/types';
import { Logger } from '../logger/types';

/**
 * `_case:currentRun:context:*` is not clobberable by child matchers
 *  (with the exception of _case:currentRun:context:logLevel).
 *
 * `_case:context:*` is clobberable by child matchers. This means if you set
 * any `_case:context:*` properties on a matcher, they will override the current
 * context before the matcher is applied.
 */
const DEFAULT_CONTEXT: DefaultContext = {
  '_case:currentRun:context:parentVersions': [],
  '_case:currentRun:context:connectorClient': 'No Connector Client Supplied',
  '_case:currentRun:context:location': [],
  '_case:currentRun:context:contractMode': 'write',
  '_case:currentRun:context:logLevel': 'warn',
  '_case:currentRun:context:autoVersionFrom': 'TAG',
  '_case:currentRun:context:printResults': true,
  '_case:context:matchBy': 'exact',
  '_case:context:serialisableTo': 'json',
};

const contextProperties = (
  caseNode: AnyCaseMatcher | AnyMockDescriptor,
): MatchContext =>
  Object.entries(caseNode)
    .filter(
      ([k]) =>
        k.startsWith('_case:context') ||
        k === '_case:currentRun:context:logLevel',
    )
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as MatchContext);

const updateFunctions = (context: MatchContext) => {
  const logger = context.makeLogger(context);
  const nextContext = { ...context, logger };
  return {
    ...nextContext,
    ...nextContext.makeLookup(nextContext),
  };
};

/**
 * Folds this case matcher into the context. This is called by the core
 * before invoking the matcher's executor.
 *
 * This means that if you set any `_case:context:*` properties on a matcher,
 * they will override the current context before the matcher is applied.
 *
 * For example, if you have a context object with `_case:context:matchBy: 'exact'`
 * and you set `_case:context:matchBy: 'type'` on a matcher, the matcher will receive
 * context for matching with `_case:context:matchBy: 'type'` instead of `'exact'`.
 *
 * @internal
 *
 * @param caseNode - any descriptor
 * @param context - the current context
 * @returns a context object containing the descriptor combined with the context
 */
export const foldIntoContext = (
  caseNode: AnyCaseMatcher | AnyMockDescriptor,
  context: MatchContext,
): MatchContext => ({
  ...context,
  ...contextProperties(caseNode),
});

let exampleId = 0;

const combineWithRoot = (
  caseNodeOrData: AnyCaseMatcherOrData | AnyMockDescriptor,
  context: MatchContext,
  runConfig: Partial<RunContext>,
) => {
  const newContext = {
    ...(isCaseNode(caseNodeOrData) || isCaseMock(caseNodeOrData)
      ? foldIntoContext(caseNodeOrData, context)
      : context),
    ...runConfig,
    '_case:currentRun:context:location': [
      ...context['_case:currentRun:context:location'],
      `Interaction[${exampleId}]`,
    ],
  };
  exampleId += 1;
  return updateFunctions(newContext);
};

/**
 * Constructs a data context object
 *
 * @internal
 *
 */
export const constructDataContext = (
  makeLogger: (c: LogLevelContext) => Logger,
  resultPrinter: ResultFormatter,
  runConfig: Partial<RunContext>,
  defaults: Record<string, AnyData>,
  parentVersions: Array<string>,
): DataContext => {
  const context = {
    makeLogger,
    ...DEFAULT_CONTEXT,
    '_case:currentRun:context:defaultConfig': defaults,
    '_case:currentRun:context:testName': 'OUTSIDE_TESTS' as const,
    '_case:currentRun:context:variables': {},
    '_case:currentRun:context:parentVersions': parentVersions,
    ...runConfig,
  };

  const logContext = {
    ...context,
    logger: makeLogger(context),
    resultPrinter,
  };

  return {
    ...logContext,
  };
};

/**
 * TODO: Move this out of the plugin lib
 *
 * @internal
 */
export const constructMatchContext = (
  traversals: TraversalFns,
  makeLogger: (c: LogLevelContext) => Logger,
  makeLookup: (c: MatchContextWithoutLookup) => ContractLookupFns,
  resultPrinter: ResultFormatter,
  runConfig: Partial<RunContext>,
  defaults: Record<string, AnyData>,
  parentVersions: Array<string>,
): MatchContext => {
  const context = {
    ...traversals,
    ...constructDataContext(
      makeLogger,
      resultPrinter,
      runConfig,
      defaults,
      parentVersions,
    ),
    makeLookup,
  };

  return {
    ...context,
    ...makeLookup(context),
  };
};

/**
 * TODO: Move this out of the plugin lib
 *
 * @internal
 */
export const applyNodeToContext = (
  caseNodeOrData: AnyCaseMatcherOrData | AnyMockDescriptor,
  context: MatchContext,
  runConfig: Partial<RunContext> = {},
): MatchContext => combineWithRoot(caseNodeOrData, context, runConfig);

/**
 * Adds the current location to the context. Used to determine where we are when
 * printing logs and errors.
 *
 * There are some semantics here:
 *
 * Locations are joined together with `.`. For example, calling:
 *
 * ```
 *     addLocation('b', addLocation('a', context))
 * ```
 *
 * will result in `"a.b"` being the location at print time.
 *
 * If the location is part of an iteration, put it in square brackets, for
 * example `[2]`  or `[keyName]`. This will prevent the location logger from
 * adding `.` between consecutive locations. For example:
 *
 * ```
 *     addLocation('[1]', addLocation('a', context))
 * ```
 *
 * will result in `"a[1]"` being the location at print time.
 *
 * If the location starts with `:`, it's only logged during maintainer logs. For
 * example:
 *
 * ```
 *     addLocation(':internalDetail', addLocation('a', context))
 * ```
 *
 * will result in `"a"` during normal and debug logging, but `a:internalDetail`
 * when maintainer logging (or deeper) is enabled
 *
 * @public
 *
 * @param location - a string representing the current location. Prefix with `:`
 * if this location should only be printed during maintainer debugging
 * @param context - the current {@link MatchContext}
 * @returns a new {@link MatchContext} with updated location.
 */
export const addLocation = (
  location: string,
  context: MatchContext,
): MatchContext =>
  updateFunctions({
    ...context,
    '_case:currentRun:context:location': context[
      '_case:currentRun:context:location'
    ].concat([location]),
  });
