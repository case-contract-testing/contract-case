import { MatchContext } from '../context/types';
import { CaseCoreError } from '../errors';
import { AnyCaseMatcherOrData } from './matchers.types';

/**
 * During a matcher execution, this function can be called to ensure that the
 * provided matcher resolves to a string.
 *
 * @remarks
 *
 * Use it if you expect that it should _never_ be possible for the matcher to
 * resolve to anything other than a string, as it throws a
 * {@link CaseCoreError}, indicating a bug.
 * @public
 *
 * @param matcher - any matcher descriptor or data object
 * @param context - the current {@link MatchContext}
 * @returns the string value that the matcher resolves to
 * @throws a {@link CaseCoreError} if the matcher doesn't resolve to a string.
 */
export const mustResolveToString = (
  matcher: AnyCaseMatcherOrData,
  context: MatchContext,
): string => {
  const stripped = context.descendAndStrip(matcher, context);
  if (typeof stripped !== 'string') {
    const message = `Provided matcher did not resolve to a string. Instead, it resolved to: ${typeof stripped}`;
    context.logger.maintainerDebug(message, stripped, matcher);
    throw new CaseCoreError(message, context);
  }
  return stripped;
};

/**
 * During a matcher execution, this function can be called to ensure that the
 * provided matcher resolves to number.
 *
 * @remarks
 *
 * Use it if you expect that it should _never_ be possible for the matcher to
 * resolve to anything other than a number, as it throws a
 * {@link CaseCoreError}, indicating a bug.
 * @public
 *
 * @param matcher - any matcher descriptor or data object
 * @param context - the current {@link MatchContext}
 * @returns the number value that the matcher resolves to
 * @throws a {@link CaseCoreError} if the matcher doesn't resolve to a number.
 */
export const mustResolveToNumber = (
  matcher: AnyCaseMatcherOrData,
  context: MatchContext,
): number => {
  const stripped = context.descendAndStrip(matcher, context);
  if (typeof stripped !== 'number') {
    const message = `Provided matcher did not resolve to a number. Instead, it resolved to: ${typeof stripped}`;
    context.logger.maintainerDebug(message, stripped, matcher);
    throw new CaseCoreError(message, context);
  }
  return stripped;
};
