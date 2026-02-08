import {
  CoreStringMatcher,
  STRING_MATCHER_TYPE,
} from '@contract-case/case-entities-internal';
import {
  MatchContext,
  CaseError,
  combineResults,
  errorWhen,
  matchingError,
  MatcherExecutor,
  describeMessage,
} from '@contract-case/case-plugin-base';
import { testExactMatch } from './internal/testExactMatch';

const check = (
  matcher: CoreStringMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Array<CaseError> =>
  combineResults(
    errorWhen(
      matchContext['_case:context:matchBy'] === 'exact',
      testExactMatch(matcher, matchContext, actual),
    ),
    errorWhen(
      typeof actual !== 'string',
      matchingError(
        matcher,
        `'${typeof actual}' is not a string`,
        actual,
        matchContext,
      ),
    ),
  );

export const StringMatcher: MatcherExecutor<
  typeof STRING_MATCHER_TYPE,
  CoreStringMatcher
> = {
  describe: (matcher, matchContext) =>
    describeMessage(
      matchContext['_case:context:matchBy'] === 'exact'
        ? `"${matcher['_case:matcher:example']}"`
        : '<any string>',
    ),
  check,
  strip: (matcher: CoreStringMatcher) => matcher['_case:matcher:example'],
  validate: () => Promise.resolve(),
};
