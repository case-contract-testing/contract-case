import { addLocation } from 'entities/context';
import type {
  MatchResult,
  MatcherExecutor,
  MatchContext,
  AnyData,
  CoreContextVariableMatcher,
  CONTEXT_VARIABLE_TYPE,
} from 'entities/types';

const check = (
  matcher: CoreContextVariableMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> | MatchResult =>
  matchContext.descendAndCheck(
    matchContext.lookupVariable(matcher['case:matcher:variableName']),
    addLocation(
      `:variable[${matcher['case:matcher:variableName']}]`,
      matchContext
    ),
    actual
  );

const strip = (
  matcher: CoreContextVariableMatcher,
  matchContext: MatchContext
): AnyData =>
  matchContext.descendAndStrip(
    matchContext.lookupVariable(matcher['case:matcher:variableName']),
    addLocation(
      `:variable[${matcher['case:matcher:variableName']}]`,
      matchContext
    )
  );

export const ContextVariableMatcher: MatcherExecutor<
  typeof CONTEXT_VARIABLE_TYPE
> = {
  describe: (matcher) => `\${${matcher['case:matcher:variableName']}}`,
  check,
  strip,
};
