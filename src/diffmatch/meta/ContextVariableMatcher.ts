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

const check = (
  matcher: CoreContextVariableMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> | MatchResult => {
  if (
    matcher['case:matcher:variableName'] in
    matchContext['case:currentRun:context:variables']
  ) {
    const value =
      matchContext['case:currentRun:context:variables'][
        matcher['case:matcher:variableName']
      ];
    if (value === undefined) {
      throw new CaseConfigurationError(
        `The variable '${matcher['case:matcher:variableName']}' was undefined, which is not a valid variable value`,
        matchContext
      );
    }
    return matchContext.descendAndCheck(
      value,
      addLocation(
        `:stateVariable[${matcher['case:matcher:variableName']}]`,
        matchContext
      ),
      actual
    );
  }
  return matchContext.descendAndCheck(
    matchContext.lookupVariable(matcher['case:matcher:variableName']),
    addLocation(
      `:contractVariable[${matcher['case:matcher:variableName']}]`,
      matchContext
    ),
    actual
  );
};

const strip = (
  matcher: CoreContextVariableMatcher,
  matchContext: MatchContext
): AnyData => {
  if (
    matcher['case:matcher:variableName'] in
    matchContext['case:currentRun:context:variables']
  ) {
    const value =
      matchContext['case:currentRun:context:variables'][
        matcher['case:matcher:variableName']
      ];
    if (value === undefined) {
      throw new CaseConfigurationError(
        `The variable '${matcher['case:matcher:variableName']}' was undefined, which is not a valid variable value`,
        matchContext
      );
    }
    return matchContext.descendAndStrip(
      value,
      addLocation(
        `:stateVariable[${matcher['case:matcher:variableName']}]`,
        matchContext
      )
    );
  }
  return matchContext.descendAndStrip(
    matchContext.lookupVariable(matcher['case:matcher:variableName']),
    addLocation(
      `:contractVariable[${matcher['case:matcher:variableName']}]`,
      matchContext
    )
  );
};

export const ContextVariableMatcher: MatcherExecutor<
  typeof CONTEXT_VARIABLE_TYPE
> = {
  describe: (matcher) => `\${${matcher['case:matcher:variableName']}}`,
  check,
  strip,
};
