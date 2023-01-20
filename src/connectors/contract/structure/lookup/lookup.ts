import { CaseConfigurationError } from 'entities';
import type { AnyCaseNodeOrData, Logger } from 'entities/types';
import { rawEquality } from './rawEquals';
import type { LookupMap } from './types';

type LookupType = 'matcher';

export const addLookup = (
  matcherLookup: LookupMap,
  lookupType: LookupType,
  uniqueName: string,
  matcher: AnyCaseNodeOrData,
  logger: Logger
): Record<string, AnyCaseNodeOrData> => {
  const lookupName = `${lookupType}:${uniqueName}`;
  logger.maintainerDebug(`Saving lookup ${lookupType}:`, matcher);
  if (matcherLookup[lookupName]) {
    if (!rawEquality(matcher, matcherLookup[lookupName])) {
      logger.error(
        `The ${lookupType} with the name '${lookupName}' has more than one definition, and they are not the same`
      );
      logger.error('New matcher is', matcher);
      logger.error('Existing matcher is', matcherLookup[lookupName]);

      throw new CaseConfigurationError(
        `The ${lookupType} with the name '${lookupName}' has more than one definition, and they are not the same`
      );
    } else {
      logger.maintainerDebug(
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
