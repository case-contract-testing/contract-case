import { type AnyMatcher, isMatcher, AnyJson } from 'core/matchers/types';
import type { MatchContext } from './types';

const DEFAULT_CONTEXT: MatchContext = {
  'case:context:matchBy': 'exact',
  'case:context:serialisableTo': 'json',
};

const contextProperties = (matcher: AnyMatcher): MatchContext =>
  Object.entries(matcher)
    .filter(([k]) => k.startsWith('case:context'))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as MatchContext);

export const foldIntoContext = (
  matcher: AnyMatcher,
  context: MatchContext
): MatchContext => ({
  ...context,
  ...contextProperties(matcher),
});

export const applyDefaultContext = (
  matcher: AnyMatcher | AnyJson
): MatchContext =>
  isMatcher(matcher)
    ? foldIntoContext(matcher, DEFAULT_CONTEXT)
    : DEFAULT_CONTEXT;
