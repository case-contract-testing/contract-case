import { CaseConfigurationError } from '../../../../../entities';
import type {
  AnyCaseNodeOrData,
  MatchContextWithoutLookup,
} from '../../../../../entities/types';
import { rawEquality } from './rawEquals';
import type { LookupMap, LookupType } from './types';

export const addLookup = (
  matcherLookup: LookupMap,
  lookupType: LookupType,
  uniqueName: string,
  matcher: AnyCaseNodeOrData,
  context: MatchContextWithoutLookup
): Record<string, AnyCaseNodeOrData> => {
  const lookupName = `${lookupType}:${uniqueName}`;
  context.logger.maintainerDebug(`Saving lookup ${lookupType}:`, matcher);
  if (matcherLookup[lookupName]) {
    if (!rawEquality(matcher, matcherLookup[lookupName])) {
      context.logger.error(
        `The ${lookupType} with the name '${lookupName}' has more than one definition, and they are not the same`
      );
      context.logger.error('New matcher is', matcher);
      context.logger.error('Existing matcher is', matcherLookup[lookupName]);

      throw new CaseConfigurationError(
        `The ${lookupType} with the name '${lookupName}' has more than one definition, and they are not the same`
      );
    } else {
      context.logger.maintainerDebug(
        `The ${lookupType} with the name '${lookupName}' is already stored exactly as given`
      );
    }
  }

  return {
    ...matcherLookup,
    [lookupName]: matcher,
  };
};

export const findLookup = (
  matcherLookup: LookupMap,
  lookupType: LookupType,
  uniqueName: string
): AnyCaseNodeOrData | undefined =>
  matcherLookup[`${lookupType}:${uniqueName}`];
