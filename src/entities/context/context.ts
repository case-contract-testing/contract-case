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
 * `case:run:context:*` is not clobberable by child matchers
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

const combineWithRoot = (
  caseNodeOrData: AnyCaseNodeOrData | AnyInteraction,
  context: MatchContext
) => ({
  ...(isCaseNode(caseNodeOrData) || isCaseInteraction(caseNodeOrData)
    ? foldIntoContext(caseNodeOrData, context)
    : context),
});

let interactionId = 0;

const constructContext = (
  caseNodeOrData: AnyCaseNodeOrData | AnyInteraction,
  traversals: TraversalFns,
  makeLogger: (c: LogLevelContext) => Logger,
  runConfig: Partial<RunContext>,
  contractFns: ContractFns,
  resultPrinter: ResultPrinter
) => {
  const context = {
    makeLogger,
    ...traversals,
    ...DEFAULT_CONTEXT,
    'case:currentRun:context:location': [`test[${interactionId}]`],
    ...runConfig,
    'case:run:context:tree': caseNodeOrData,
  };
  interactionId += 1;
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

export const applyDefaultContext = (
  caseNodeOrData: AnyCaseNodeOrData | AnyInteraction,
  traversals: TraversalFns,
  makeLogger: (c: LogLevelContext) => Logger,
  contractFns: ContractFns,
  resultPrinter: ResultPrinter,
  runConfig: Partial<RunContext>
): MatchContext => {
  const context = combineWithRoot(
    caseNodeOrData,
    constructContext(
      caseNodeOrData,
      traversals,
      makeLogger,
      runConfig,
      contractFns,
      resultPrinter
    )
  );

  context.logger.maintainerDebug(
    'Initial context is:',
    JSON.stringify(context, null, 2)
  );
  return { ...context };
};

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
      curr.startsWith('[') || acc === '' ? `${acc}${curr}` : `${acc}.${curr}`,
    ''
  );
