import {
  CoreContextVariableMatcher,
  CONTEXT_VARIABLE_TYPE,
} from '@contract-case/case-entities-internal';
import {
  MatchContext,
  MatchResult,
  CaseConfigurationError,
  addLocation,
  AnyData,
  MatcherExecutor,
} from '@contract-case/case-plugin-base';

const check = (
  matcher: CoreContextVariableMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> | MatchResult => {
  if (
    matcher['_case:matcher:variableName'] in
    matchContext['_case:currentRun:context:variables']
  ) {
    const value =
      matchContext['_case:currentRun:context:variables'][
        matcher['_case:matcher:variableName']
      ];
    if (value === undefined) {
      throw new CaseConfigurationError(
        `The variable '${matcher['_case:matcher:variableName']}' was undefined, which is not a valid variable value`,
        matchContext,
      );
    }
    return matchContext.descendAndCheck(
      value,
      addLocation(
        `:stateVariable[${matcher['_case:matcher:variableName']}]`,
        matchContext,
      ),
      actual,
    );
  }
  return matchContext.descendAndCheck(
    matchContext.lookupVariable(matcher['_case:matcher:variableName']),
    addLocation(
      `:contractVariable[${matcher['_case:matcher:variableName']}]`,
      matchContext,
    ),
    actual,
  );
};

const strip = (
  matcher: CoreContextVariableMatcher,
  matchContext: MatchContext,
): AnyData => {
  if (
    matcher['_case:matcher:variableName'] in
    matchContext['_case:currentRun:context:variables']
  ) {
    const value =
      matchContext['_case:currentRun:context:variables'][
        matcher['_case:matcher:variableName']
      ];
    if (value === undefined) {
      throw new CaseConfigurationError(
        `The variable '${matcher['_case:matcher:variableName']}' was undefined, which is not a valid variable value`,
        matchContext,
      );
    }
    return matchContext.descendAndStrip(
      value,
      addLocation(
        `:stateVariable[${matcher['_case:matcher:variableName']}]`,
        matchContext,
      ),
    );
  }
  return matchContext.descendAndStrip(
    matchContext.lookupVariable(matcher['_case:matcher:variableName']),
    addLocation(
      `:contractVariable[${matcher['_case:matcher:variableName']}]`,
      matchContext,
    ),
  );
};

export const ContextVariableMatcher: MatcherExecutor<
  typeof CONTEXT_VARIABLE_TYPE,
  CoreContextVariableMatcher
> = {
  describe: (matcher) => `{{${matcher['_case:matcher:variableName']}}}`,
  check,
  strip,
};
