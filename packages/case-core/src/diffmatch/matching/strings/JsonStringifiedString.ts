import {
  CoreJsonStringifiedMatcher,
  JSON_STRINGIFIED_TYPE,
} from '@contract-case/case-entities-internal';
import {
  MatchContext,
  MatchResult,
  makeResults,
  matchingError,
  actualToString,
  addLocation,
  CaseConfigurationError,
  MatcherExecutor,
  concatenateDescribe,
  describeMessage,
} from '@contract-case/case-plugin-base';
import { AnyData } from '@contract-case/case-plugin-dsl-types';

const check = (
  matcher: CoreJsonStringifiedMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> | MatchResult => {
  if (typeof actual !== 'string') {
    return makeResults(
      matchingError(
        matcher,
        `${actualToString(
          actual,
        )} is not a string; so it can't match a json stringified string`,
        actual,
        matchContext,
        '<A string that would parse as json>',
      ),
    );
  }

  let decodedActual: string;
  try {
    decodedActual = JSON.parse(actual);
  } catch (parseError) {
    return makeResults(
      matchingError(
        matcher,
        `${actualToString(actual)} failed to parse as json (${
          (parseError as Error).message
        })`,
        actual,
        matchContext,
        '<A string that would parse as json>',
      ),
    );
  }

  return matchContext.descendAndCheck(
    matcher['_case:matcher:child'],
    addLocation(':jsonStringify', matchContext),
    decodedActual,
  );
};

const strip = (
  matcher: CoreJsonStringifiedMatcher,
  matchContext: MatchContext,
): AnyData => {
  const result = matchContext.descendAndStrip(
    matcher['_case:matcher:child'],
    addLocation(':jsonStringify', matchContext),
  );

  let encoded: string;
  try {
    encoded = JSON.stringify(result);
  } catch (parseError) {
    throw new CaseConfigurationError(
      `Unable to json stringify '${result}' during stripMatchers (${
        (parseError as Error).message
      })`,
      matchContext,
      'BAD_INTERACTION_DEFINITION',
    );
  }
  return encoded;
};

export const JsonStringifiedString: MatcherExecutor<
  typeof JSON_STRINGIFIED_TYPE,
  CoreJsonStringifiedMatcher
> = {
  describe: (matcher, matchContext) =>
    concatenateDescribe(
      describeMessage("json stringified '"),
      matchContext.descendAndDescribe(
        matcher['_case:matcher:child'],
        addLocation(':jsonStringify', matchContext),
      ),
      describeMessage("'"),
    ),
  check,
  strip,
  validate: (matcher, matchContext) =>
    matchContext.descendAndValidate(
      matcher['_case:matcher:child'],
      addLocation(':jsonStringify', matchContext),
    ),
};
