import { CaseCoreError } from 'entities';
import type { MatchContext } from 'entities/context/types';
import type { AnyCaseNodeOrData } from 'entities/types';

export const mustResolveToString = (
  matcher: AnyCaseNodeOrData,
  context: MatchContext
): string => {
  const stripped = context.descendAndStrip(matcher, context);
  if (typeof stripped !== 'string') {
    throw new CaseCoreError(
      'Provided matcher did not resolve to a string',
      context
    );
  }
  return stripped;
};

export const mustResolveToNumber = (
  matcher: AnyCaseNodeOrData,
  context: MatchContext
): number => {
  const stripped = context.descendAndStrip(matcher, context);
  if (typeof stripped !== 'number') {
    throw new CaseCoreError(
      'Provided matcher did not resolve to a number',
      context
    );
  }
  return stripped;
};
