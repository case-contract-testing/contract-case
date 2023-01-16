import { CaseConfigurationError } from 'entities';
import { addLocation } from 'entities/context';
import type {
  MatchResult,
  MatcherExecutor,
  MatchContext,
  AnyData,
  CoreContextVariableMatcher,
  CONTEXT_VARIABLE_TYPE,
} from 'entities/types';

const getVariable = (variableName: string, matchContext: MatchContext) => {
  const variable =
    matchContext['case:currentRun:context:runVariables'][variableName];
  if (variable === undefined) {
    throw new CaseConfigurationError(
      `Variable '${variableName}' didn't appear to have a value. Is it correctly spelt, and set in a state variable that is used in this run?`,
      matchContext
    );
  }
  return variable.value;
};

const check = (
  matcher: CoreContextVariableMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> | MatchResult =>
  matchContext.descendAndCheck(
    getVariable(matcher['case:matcher:variableName'], matchContext),
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
    getVariable(matcher['case:matcher:variableName'], matchContext),
    addLocation(
      `:variable[${matcher['case:matcher:variableName']}]`,
      matchContext
    )
  );

export const ContextVariableMatcher: MatcherExecutor<
  typeof CONTEXT_VARIABLE_TYPE
> = {
  check,
  strip,
};
