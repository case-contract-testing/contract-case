import {
  AnyInteraction,
  isCaseInteraction,
} from 'entities/nodes/interactions/types';
import {
  isCaseNode,
  AnyCaseNode,
  AnyCaseNodeOrData,
} from 'entities/nodes/matchers/types';
import type { MatchContext, SeralisableContext, Traversals } from './types';

const DEFAULT_CONTEXT: SeralisableContext = {
  'case:context:location': [],
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

export const addLocation = (
  location: string,
  context: MatchContext
): MatchContext => ({
  ...context,
  'case:context:location': context['case:context:location'].concat([location]),
});

export const applyDefaultContext = (
  caseNodeOrData: AnyCaseNodeOrData | AnyInteraction,
  traversals: Traversals
): MatchContext => ({
  ...(isCaseNode(caseNodeOrData) || isCaseInteraction(caseNodeOrData)
    ? foldIntoContext(caseNodeOrData, { ...traversals, ...DEFAULT_CONTEXT })
    : { ...traversals, ...DEFAULT_CONTEXT }),
});
