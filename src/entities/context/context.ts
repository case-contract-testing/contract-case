import type { Logger } from '../../entities/logger/types';
import { isCaseMock } from '../../entities/nodes/mocks/types';
import { AnyData, isCaseNode } from '../../entities/nodes/matchers/types';
import type {
  AnyMockDescriptor,
  AnyCaseNodeOrData,
  AnyCaseMatcher,
  ContractLookupFns,
  MatchContextWithoutLookup,
  ResultPrinter,
  DataContext,
} from '../../entities/types';
import type {
  MatchContext,
  RunContext,
  DefaultContext,
  TraversalFns,
  LogLevelContext,
} from './types';
import { shouldLog } from '../../entities/logger/shouldLog';

/**
 * `case:currentRun:context:*` is not clobberable by child matchers
 *  (with the exception of case:currentRun:context:logLevel).
 * `case:context:*` is clobberable by child matchers
 */
const DEFAULT_CONTEXT: DefaultContext = {
  'case:currentRun:context:location': [],
  'case:currentRun:context:contractMode': 'write',
  'case:currentRun:context:logLevel': 'warn',
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

let exampleId = 0;

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
    'case:currentRun:context:location': [
      ...context['case:currentRun:context:location'],
      `Example[${exampleId}]`,
    ],
  };
  exampleId += 1;
  return updateFunctions(newContext);
};

export const constructDataContext = (
  makeLogger: (c: LogLevelContext) => Logger,
  resultPrinter: ResultPrinter,
  runConfig: Partial<RunContext>,
  defaults: Record<string, AnyData>
): DataContext => {
  const context = {
    makeLogger,
    ...DEFAULT_CONTEXT,
    'case:currentRun:context:defaultConfig': defaults,
    'case:currentRun:context:location': [],
    'case:currentRun:context:testName': 'OUTSIDE_TESTS' as const,
    'case:currentRun:context:variables': {},
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
  resultPrinter: ResultPrinter,
  runConfig: Partial<RunContext>,
  defaults: Record<string, AnyData>
): MatchContext => {
  const context = {
    ...traversals,
    ...constructDataContext(makeLogger, resultPrinter, runConfig, defaults),
    makeLookup,
  };

  return {
    ...context,
    ...makeLookup(context),
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

export const locationString = (matchContext: LogLevelContext): string =>
  matchContext['case:currentRun:context:location']
    .filter(
      (locationItem) =>
        (locationItem.startsWith(':') &&
          shouldLog(matchContext, 'maintainerDebug')) ||
        !locationItem.startsWith(':')
    )
    .reduce<string>(
      (acc: string, curr: string) =>
        curr.startsWith('[') || curr.startsWith(':') || acc === ''
          ? `${acc}${curr}`
          : `${acc}.${curr}`,
      ''
    );
