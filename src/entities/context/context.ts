import type { Logger } from 'entities/logger/types';
import {
  AnyInteraction,
  isCaseInteraction,
} from 'entities/nodes/interactions/types';
import {
  isCaseNode,
  AnyCaseNodeOrData,
  AnyCaseMatcher,
  LookupableMatcher,
} from 'entities/nodes/matchers/types';
import type { ResultPrinter } from 'entities/types';
import type {
  MatchContext,
  RunContext,
  DefaultContext,
  TraversalFns,
  ContractFns,
  HasLocation,
  LogLevelContext,
} from './types';

/**
 * `case:currentRun:context:*` is not clobberable by child matchers
 * `case:context:*` is clobberable by child matchers
 */
const DEFAULT_CONTEXT: DefaultContext = {
  'case:currentRun:context:location': [],
  'case:currentRun:context:expectation': 'consume',
  'case:currentRun:context:logLevel': 'info',
  'case:context:matchBy': 'exact',
  'case:context:serialisableTo': 'json',
};

const contextProperties = (
  caseNode: AnyCaseMatcher | AnyInteraction
): MatchContext =>
  Object.entries(caseNode)
    .filter(([k]) => k.startsWith('case:context'))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as MatchContext);

export const foldIntoContext = (
  caseNode: AnyCaseMatcher | AnyInteraction,
  context: MatchContext
): MatchContext => ({
  ...context,
  ...contextProperties(caseNode),
});

let interactionId = 0;

const combineWithRoot = (
  caseNodeOrData: AnyCaseNodeOrData | AnyInteraction,
  context: MatchContext,
  runConfig: Partial<RunContext>
) => {
  const newContext = {
    ...(isCaseNode(caseNodeOrData) || isCaseInteraction(caseNodeOrData)
      ? foldIntoContext(caseNodeOrData, context)
      : context),
    ...runConfig,
    ...(context['case:run:context:tree'] // Only put the tree in if it isn't there already
      ? {}
      : { 'case:run:context:tree': caseNodeOrData }),
    'case:currentRun:context:location': [
      ...context['case:currentRun:context:location'],
      `Test[${interactionId}]`,
    ],
  };
  interactionId += 1;
  return newContext;
};

export const constructInitialContext = (
  traversals: TraversalFns,
  makeLogger: (c: LogLevelContext) => Logger,
  contractFns: ContractFns,
  resultPrinter: ResultPrinter,
  runConfig: Partial<RunContext>
): MatchContext => {
  const context = {
    makeLogger,
    ...traversals,
    ...DEFAULT_CONTEXT,
    'case:currentRun:context:location': [],
    ...runConfig,
  };

  const logger = makeLogger(context);
  return {
    ...context,
    logger,
    resultPrinter,
    lookupMatcher: (uniqueName: string) =>
      contractFns.lookupMatcher(uniqueName, logger),
    saveLookupableMatcher: (matcher: LookupableMatcher) =>
      contractFns.saveLookupableMatcher(matcher, logger),
  };
};

export const applyNodeToContext = (
  caseNodeOrData: AnyCaseNodeOrData | AnyInteraction,
  context: MatchContext,
  runConfig: Partial<RunContext> = {}
): MatchContext => combineWithRoot(caseNodeOrData, context, runConfig);

export const addLocation = (
  location: string,
  context: MatchContext
): MatchContext => {
  const nextContext = {
    ...context,

    'case:currentRun:context:location': context[
      'case:currentRun:context:location'
    ].concat([location]),
  };
  const logger = nextContext.makeLogger(nextContext);
  return { ...nextContext, logger };
};

export const locationString = (matchContext: HasLocation): string =>
  matchContext['case:currentRun:context:location'].reduce<string>(
    (acc: string, curr: string) =>
      curr.startsWith('[') || curr.startsWith(':') || acc === ''
        ? `${acc}${curr}`
        : `${acc}.${curr}`,
    ''
  );
