import {
  CoreStringPrefixMatcher,
  STRING_PREFIX_TYPE,
} from '@contract-case/case-entities-internal';
import {
  MatchContext,
  MatchResult,
  makeResults,
  matchingError,
  addLocation,
  MatcherExecutor,
  mustResolveToString,
  CaseConfigurationError,
  describeConcat,
  describeMessage,
  renderToString,
} from '@contract-case/case-plugin-base';

const check = async (
  matcher: CoreStringPrefixMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> => {
  if (typeof actual !== 'string') {
    return makeResults(
      matchingError(
        matcher,
        `'${typeof actual}' is not a string`,
        actual,
        matchContext,
      ),
    );
  }

  return actual.startsWith(matcher['_case:matcher:prefix'])
    ? matchContext.descendAndCheck(
        matcher['_case:matcher:suffix'],
        addLocation(':prefix', matchContext),
        actual.slice(matcher['_case:matcher:prefix'].length),
      )
    : makeResults(
        matchingError(
          matcher,
          `The string '${actual}' did not start with the expected prefix '${matcher['_case:matcher:prefix']}'`,
          actual,
          matchContext,
        ),
      );
};

export const StringPrefixMatcher: MatcherExecutor<
  typeof STRING_PREFIX_TYPE,
  CoreStringPrefixMatcher
> = {
  describe: (matcher: CoreStringPrefixMatcher, matchContext) =>
    describeConcat(
      describeMessage(`"${matcher['_case:matcher:prefix']}`),
      describeMessage(
        `${renderToString(
          matchContext.descendAndDescribe(
            matcher['_case:matcher:suffix'],
            addLocation(':prefix', matchContext),
          ),
        ).replace(/^"+|"+$/g, '')}"`,
      ),
    ),
  check,
  strip: (matcher: CoreStringPrefixMatcher, matchContext) =>
    `${matcher['_case:matcher:prefix']}${mustResolveToString(
      matcher['_case:matcher:suffix'],
      addLocation(':suffix', matchContext),
    )}`,

  validate: (matcher, matchContext) =>
    Promise.resolve().then(() => {
      if (typeof matcher['_case:matcher:prefix'] !== 'string') {
        throw new CaseConfigurationError(
          `Expected a string for the prefix, but got '${typeof matcher['_case:matcher:prefix']}' instead. Did you put the arguments the wrong way around for the prefix matcher?`,
          matchContext,
        );
      }
      return matchContext.descendAndValidate(
        matcher['_case:matcher:suffix'],
        addLocation(':prefix', matchContext),
      );
    }),
};
