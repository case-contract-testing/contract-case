import {
  isCaseNode,
  AnyCaseNode,
  AnyCaseNodeOrData,
} from 'core/nodes/matchers/types';
import type { MatchContext } from './types';

const DEFAULT_CONTEXT: MatchContext = {
  handleNext: () => {
    throw new Error('Context unconfigured');
  },
  'case:context:matchBy': 'exact',
  'case:context:serialisableTo': 'json',
};

const contextProperties = (caseNode: AnyCaseNode): MatchContext =>
  Object.entries(caseNode)
    .filter(([k]) => k.startsWith('case:context'))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as MatchContext);

export const foldIntoContext = (
  caseNode: AnyCaseNode,
  context: MatchContext
): MatchContext => ({
  ...context,
  ...contextProperties(caseNode),
});

export const applyDefaultContext = (
  caseNodeOrData: AnyCaseNodeOrData,
  handleNext: MatchContext['handleNext']
): MatchContext => ({
  ...(isCaseNode(caseNodeOrData)
    ? foldIntoContext(caseNodeOrData, DEFAULT_CONTEXT)
    : DEFAULT_CONTEXT),
  handleNext,
});
