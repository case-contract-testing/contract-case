import type { Logger } from 'entities/logger/types';
import {
  AnyInteraction,
  isCaseInteraction,
} from 'entities/nodes/interactions/types';
import {
  isCaseNode,
  AnyCaseNode,
  AnyCaseNodeOrData,
} from 'entities/nodes/matchers/types';
import type {
  MatchContext,
  RunContext,
  DefaultContext,
  Traversals,
} from './types';

/**
 * `case:run:context:*` is not clobberable by child matchers
 * `case:context:*` is clobberable by child matchers
 */
const DEFAULT_CONTEXT: DefaultContext = {
  'case:run:context:location': [],
  'case:run:context:expectation': 'consume',
  'case:context:matchBy': 'exact',
  'case:context:serialisableTo': 'json',
};

const contextProperties = (
  caseNode: AnyCaseNode | AnyInteraction
): MatchContext =>
  Object.entries(caseNode)
    .filter(([k]) => k.startsWith('case:context'))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as MatchContext);

export const foldIntoContext = (
  caseNode: AnyCaseNode | AnyInteraction,
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

const constructContext = (
  caseNodeOrData: AnyCaseNodeOrData | AnyInteraction,
  traversals: Traversals,
  logger: Logger,
  runConfig: Partial<RunContext>
) => ({
  logger,
  baseLogger: logger,
  ...traversals,
  ...DEFAULT_CONTEXT,
  ...runConfig,
  'case:run:context:tree': caseNodeOrData,
});

export const applyDefaultContext = (
  caseNodeOrData: AnyCaseNodeOrData | AnyInteraction,
  traversals: Traversals,
  logger: Logger,
  runConfig: Partial<RunContext> = {}
): MatchContext => {
  if (runConfig['case:run:context:logLevel']) {
    logger.setLevel(runConfig['case:run:context:logLevel']);
  }
  const context = combineWithRoot(
    caseNodeOrData,
    constructContext(caseNodeOrData, traversals, logger, runConfig)
  );
  logger.trace('Initial context is:', JSON.stringify(context, null, 2));
  return context;
};

export const addLocation = (
  location: string,
  context: MatchContext
): MatchContext => ({
  ...context,
  'case:run:context:location': context['case:run:context:location'].concat([
    location,
  ]),
});
