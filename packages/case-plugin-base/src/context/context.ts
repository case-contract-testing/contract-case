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

import {
  AnyCaseMatcher,
  AnyCaseMatcherOrData,
  AnyData,
  isCaseNode,
} from '../matchers/types';
import { AnyMockDescriptor, isCaseMock } from '../mocks/types';
import { Logger } from '../logger/types';
import { shouldLog } from '../logger/shouldLog';

/**
 * `_case:currentRun:context:*` is not clobberable by child matchers
 *  (with the exception of _case:currentRun:context:logLevel).
 * `_case:context:*` is clobberable by child matchers
 */
const DEFAULT_CONTEXT: DefaultContext = {
  '_case:currentRun:context:parentVersions': [],
  '_case:currentRun:context:location': [],
  '_case:currentRun:context:contractMode': 'write',
  '_case:currentRun:context:logLevel': 'warn',
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
      `Example[${exampleId}]`,
    ],
  };
  exampleId += 1;
  return updateFunctions(newContext);
};

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
    '_case:currentRun:context:location': [],
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

export const applyNodeToContext = (
  caseNodeOrData: AnyCaseMatcherOrData | AnyMockDescriptor,
  context: MatchContext,
  runConfig: Partial<RunContext> = {},
): MatchContext => combineWithRoot(caseNodeOrData, context, runConfig);

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

export const locationString = (matchContext: LogLevelContext): string =>
  matchContext['_case:currentRun:context:location']
    .filter(
      (locationItem) =>
        (locationItem.startsWith(':') &&
          shouldLog(matchContext, 'maintainerDebug')) ||
        !locationItem.startsWith(':'),
    )
    .reduce<string>(
      (acc: string, curr: string) =>
        curr.startsWith('[') || curr.startsWith(':') || acc === ''
          ? `${acc}${curr}`
          : `${acc}.${curr}`,
      '',
    );
