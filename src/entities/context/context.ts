import type { Logger } from 'entities/logger/types';
import { AnyMockDescriptor, isCaseMock } from 'entities/nodes/mocks/types';
import {
  isCaseNode,
  AnyCaseNodeOrData,
  AnyCaseMatcher,
} from 'entities/nodes/matchers/types';
import type {
  ContractLookupFns,
  MatchContextWithoutLookup,
  ResultPrinter,
} from 'entities/types';
import type {
  MatchContext,
  RunContext,
  DefaultContext,
  TraversalFns,
  HasLocation,
  LogLevelContext,
} from './types';

/**
 * `case:currentRun:context:*` is not clobberable by child matchers
 *  (with the exception of case:currentRun:context:logLevel).
 * `case:context:*` is clobberable by child matchers
 */
const DEFAULT_CONTEXT: DefaultContext = {
  'case:currentRun:context:location': [],
  'case:currentRun:context:contractMode': 'write',
  'case:currentRun:context:logLevel': 'info',
  'case:currentRun:context:printResults': true,
  'case:context:matchBy': 'exact',
  'case:context:serialisableTo': 'json',
};

const contextProperties = (
  caseNode: AnyCaseMatcher | AnyMockDescriptor
): MatchContext =>
  Object.entries(caseNode)
    .filter(
      ([k]) =>
        k.startsWith('case:context') || k === 'case:currentRun:context:logLevel'
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
  context: MatchContext
): MatchContext => ({
  ...context,
  ...contextProperties(caseNode),
});

let mockId = 0;

const combineWithRoot = (
  caseNodeOrData: AnyCaseNodeOrData | AnyMockDescriptor,
  context: MatchContext,
  runConfig: Partial<RunContext>
) => {
  const newContext = {
    ...(isCaseNode(caseNodeOrData) || isCaseMock(caseNodeOrData)
      ? foldIntoContext(caseNodeOrData, context)
      : context),
    ...runConfig,
    ...(context['case:run:context:tree'] // Only put the tree in if it isn't there already
      ? {}
      : { 'case:run:context:tree': caseNodeOrData }),
    'case:currentRun:context:location': [
      ...context['case:currentRun:context:location'],
      `Test[${mockId}]`,
    ],
  };
  mockId += 1;
  return updateFunctions(newContext);
};

export const constructInitialContext = (
  traversals: TraversalFns,
  makeLogger: (c: LogLevelContext) => Logger,
  makeLookup: (c: MatchContextWithoutLookup) => ContractLookupFns,
  resultPrinter: ResultPrinter,
  runConfig: Partial<RunContext>
): MatchContext => {
  const context = {
    makeLogger,
    ...traversals,
    ...DEFAULT_CONTEXT,
    'case:currentRun:context:location': [],
    'case:currentRun:context:testName': 'OUTSIDE_TESTS' as const,
    ...runConfig,
  };

  const logContext = {
    ...context,
    logger: makeLogger(context),
    resultPrinter,
    makeLookup,
  };

  return {
    ...logContext,
    ...makeLookup(logContext),
  };
};

export const applyNodeToContext = (
  caseNodeOrData: AnyCaseNodeOrData | AnyMockDescriptor,
  context: MatchContext,
  runConfig: Partial<RunContext> = {}
): MatchContext => combineWithRoot(caseNodeOrData, context, runConfig);

export const addLocation = (
  location: string,
  context: MatchContext
): MatchContext =>
  updateFunctions({
    ...context,
    'case:currentRun:context:location': context[
      'case:currentRun:context:location'
    ].concat([location]),
  });

export const locationString = (matchContext: HasLocation): string =>
  matchContext['case:currentRun:context:location'].reduce<string>(
    (acc: string, curr: string) =>
      curr.startsWith('[') || curr.startsWith(':') || acc === ''
        ? `${acc}${curr}`
        : `${acc}.${curr}`,
    ''
  );
