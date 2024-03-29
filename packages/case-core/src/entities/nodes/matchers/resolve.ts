import { AnyCaseMatcherOrData } from '@contract-case/case-entities-internal';
import { CaseCoreError } from '../../../entities/errors';
import type { MatchContext } from '../../../entities/types';

export const mustResolveToString = (
  matcher: AnyCaseMatcherOrData,
  context: MatchContext,
): string => {
  const stripped = context.descendAndStrip(matcher, context);
  if (typeof stripped !== 'string') {
    throw new CaseCoreError(
      `Provided matcher did not resolve to a string. Instead, it resolved to: ${stripped}`,
      context,
    );
  }
  return stripped;
};

export const mustResolveToNumber = (
  matcher: AnyCaseMatcherOrData,
  context: MatchContext,
): number => {
  const stripped = context.descendAndStrip(matcher, context);
  if (typeof stripped !== 'number') {
    throw new CaseCoreError(
      'Provided matcher did not resolve to a number',
      context,
    );
  }
  return stripped;
};
