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
  LoggableContext,
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
  makeLogger: (c: LoggableContext) => Logger,
  runConfig: Partial<RunContext>
) => {
  const context = {
    makeLogger,
    ...traversals,
    ...DEFAULT_CONTEXT,
    ...runConfig,
    'case:run:context:tree': caseNodeOrData,
  };
  return { ...context, logger: makeLogger(context) };
};

export const applyDefaultContext = (
  caseNodeOrData: AnyCaseNodeOrData | AnyInteraction,
  traversals: Traversals,
  makeLogger: (c: LoggableContext) => Logger,
  runConfig: Partial<RunContext> = {}
): MatchContext => {
  const context = combineWithRoot(
    caseNodeOrData,
    constructContext(caseNodeOrData, traversals, makeLogger, runConfig)
  );

  if (runConfig['case:run:context:logLevel']) {
    context.logger.setLevel(runConfig['case:run:context:logLevel']);
  }
  context.logger.maintainerDebug(
    'Initial context is:',
    JSON.stringify(context, null, 2)
  );
  return context;
};

export const addLocation = (
  location: string,
  context: MatchContext
): MatchContext => {
  const nextContext = {
    ...context,

    'case:run:context:location': context['case:run:context:location'].concat([
      location,
    ]),
  };
  return { ...nextContext, logger: nextContext.makeLogger(nextContext) };
};
