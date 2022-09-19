import { applyDefaultContext } from 'core/context';
import { matchCore } from 'core/matchCore';
import type { AnyMatcherType, MatcherFor, AnyJson } from 'core/matchers/types';
import type { MatchingError } from 'core/types';

export const checkMatch = <T extends AnyMatcherType>(
  matcherOrData: MatcherFor<T> | AnyJson,
  actual: unknown
): Array<MatchingError> =>
  matchCore(matcherOrData, actual, applyDefaultContext(matcherOrData));
