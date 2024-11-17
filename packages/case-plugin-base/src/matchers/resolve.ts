import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';
import { MatchContext } from '../context/types';
import { CaseConfigurationError } from '../errors';

/**
 * During a matcher execution, this function can be called to ensure that the
 * provided matcher resolves to a string when stripped with `stripMatchers`.
 *
 * @remarks
 *
 * Use it if you expect that it's not possible for the matcher to
 * resolve to anything other than a string, as it throws a
 * {@link CaseConfigurationError}.
 *
 * If you use this function during a `check` operation, then the
 * `CaseConfigurationError` will ultimately become a `CaseCoreError`, because
 * it's not supposed to be possible to throw exceptions from a `check`
 *
 * If you're using it in `check`, make sure you also call it in `validate`.
 *
 * @public
 *
 * @param matcher - any matcher descriptor or data object
 * @param context - the current {@link MatchContext}
 * @returns the string value that the matcher resolves to
 * @throws a {@link CaseConfigurationError} if the matcher doesn't resolve to a string.
 */
export const mustResolveToString = (
  matcher: AnyCaseMatcherOrData,
  context: MatchContext,
): string => {
  const stripped = context.descendAndStrip(matcher, context);
  if (typeof stripped !== 'string') {
    const message = `The provided matcher did not resolve to a string. Instead, it resolved to: ${typeof stripped}`;
    context.logger.maintainerDebug(message, stripped, matcher);
    const error = new CaseConfigurationError(message, context);
    context.logger.deepMaintainerDebug('Stack trace is', error.stack);
    throw error;
  }
  return stripped;
};

/**
 * During a matcher execution, this function can be called to ensure that the
 * provided matcher resolves to number.
 *
 * @remarks
 *
 * Use it if you expect that it's not possible for the matcher to
 * resolve to anything other than a number, as it throws a
 * {@link CaseConfigurationError}.
 *
 * If you use this function during a `check` operation, then the
 * `CaseConfigurationError` will ultimately become a `CaseCoreError`, because
 * it's not supposed to be possible to throw exceptions from a `check`
 *
 * If you're using it in `check`, make sure you also call it in `validate`.
 * @public
 *
 * @param matcher - any matcher descriptor or data object
 * @param context - the current {@link MatchContext}
 * @returns the number value that the matcher resolves to
 * @throws a {@link CaseConfigurationError} if the matcher doesn't resolve to a number.
 */
export const mustResolveToNumber = (
  matcher: AnyCaseMatcherOrData,
  context: MatchContext,
): number => {
  const stripped = context.descendAndStrip(matcher, context);
  if (typeof stripped !== 'number') {
    const message = `Provided matcher did not resolve to a number. Instead, it resolved to: ${typeof stripped}`;
    context.logger.maintainerDebug(message, stripped, matcher);
    throw new CaseConfigurationError(message, context);
  }
  return stripped;
};
