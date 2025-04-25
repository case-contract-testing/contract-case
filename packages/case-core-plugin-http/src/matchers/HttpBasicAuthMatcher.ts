import {
  CoreHttpBasicAuthValueMatcher,
  HTTP_BASIC_AUTH_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  CaseConfigurationError,
  MatchContext,
  MatchResult,
  makeResults,
  matchingError,
  actualToString,
  combineResultPromises,
  addLocation,
  MatcherExecutor,
} from '@contract-case/case-plugin-base';
import { AnyData } from '@contract-case/case-plugin-dsl-types';

const encode = (
  username: string,
  password: string,
  matchContext: MatchContext,
) => {
  if (username.includes(':')) {
    throw new CaseConfigurationError(
      `The username for basic auth was: '${username}', but it must not contain a ':' (See RFC 7617)`,
      matchContext,
      'BAD_INTERACTION_DEFINITION',
    );
  }
  return Buffer.from(`${username}:${password}`).toString('base64');
};
const check = async (
  matcher: CoreHttpBasicAuthValueMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> => {
  if (typeof actual !== 'string') {
    return makeResults(
      matchingError(
        matcher,
        `${actualToString(
          actual,
        )} is not a string; so can't use it as basic auth`,
        actual,
        matchContext,
      ),
    );
  }

  let decoded: string;
  try {
    decoded = Buffer.from(actual, 'base64').toString('utf8');
  } catch {
    return makeResults(
      matchingError(
        matcher,
        `${actualToString(actual)} failed to decode from base64 to utf8`,
        actual,
        matchContext,
      ),
    );
  }

  if (!decoded.includes(':')) {
    return makeResults(
      matchingError(
        matcher,
        `Basic auth value decoded to ${decoded}, which doesn't contain a ':'`,
        actual,
        matchContext,
      ),
    );
  }

  const pivot = decoded.indexOf(':');
  const actualUsername = decoded.substring(0, pivot);
  const actualPassword = decoded.substring(pivot + 1);

  return combineResultPromises(
    matchContext.descendAndCheck(
      matcher['_case:matcher:username'],
      addLocation('username', matchContext),
      actualUsername,
    ),
    matchContext.descendAndCheck(
      matcher['_case:matcher:password'],
      addLocation('password', matchContext),
      actualPassword,
    ),
  );
};

const strip = (
  matcher: CoreHttpBasicAuthValueMatcher,
  matchContext: MatchContext,
): AnyData => {
  const username = matchContext.descendAndStrip(
    matcher['_case:matcher:username'],
    matchContext,
  );
  const password = matchContext.descendAndStrip(
    matcher['_case:matcher:password'],
    matchContext,
  );
  if (typeof username !== 'string') {
    throw new CaseConfigurationError(
      "The username for basic auth didn't resolve to a string, please check the definition",
      matchContext,
      'BAD_INTERACTION_DEFINITION',
    );
  }

  if (typeof password !== 'string') {
    throw new CaseConfigurationError(
      "The password for basic auth didn't resolve to a string, please check the definition",
      matchContext,
      'BAD_INTERACTION_DEFINITION',
    );
  }

  return encode(username, password, matchContext);
};

export const HttpBasicAuthMatcher: MatcherExecutor<
  typeof HTTP_BASIC_AUTH_TYPE,
  CoreHttpBasicAuthValueMatcher
> = {
  describe: (matcher, matchContext) =>
    `http basic auth with username='${matchContext.descendAndDescribe(
      matcher['_case:matcher:username'],
      addLocation('username', matchContext),
    )}' and password=${matchContext.descendAndDescribe(
      matcher['_case:matcher:password'],
      addLocation('password', matchContext),
    )}`,
  check,
  strip,
  validate: (matcher, matchContext) =>
    Promise.resolve()
      .then(() => {
        if (!('_case:matcher:password' in matcher)) {
          throw new CaseConfigurationError(
            'The HttpBasicAuthMatcher must be given a password',
            matchContext,
          );
        }
        if (!('_case:matcher:username' in matcher)) {
          throw new CaseConfigurationError(
            'The HttpBasicAuthMatcher must be given a username',
            matchContext,
          );
        }
      })
      .then(() =>
        matchContext.descendAndValidate(
          matcher['_case:matcher:username'],
          addLocation('username', matchContext),
        ),
      )
      .then(() =>
        matchContext.descendAndValidate(
          matcher['_case:matcher:password'],
          addLocation('password', matchContext),
        ),
      ),
};
