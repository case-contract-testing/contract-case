import {
  CaseConfigurationError,
  CaseCoreError,
  MatchContextWithoutLookup,
} from '@contract-case/case-plugin-base';
import {
  AnyCaseMatcherOrData,
  isLookupableMatcher,
} from '@contract-case/case-plugin-dsl-types';
import { rawEquality } from '../../../../diffmatch/rawEquals';
import type { LookupMap, LookupType } from './types';
import { lookupName, stripType } from './lookupName';

export const findLookup = (
  matcherLookup: LookupMap,
  lookupType: LookupType,
  uniqueName: string,
  context: MatchContextWithoutLookup,
): AnyCaseMatcherOrData | undefined => {
  const key = lookupName({ lookupType, uniqueName });
  const lookupResult = matcherLookup[lookupName({ lookupType, uniqueName })];
  context.logger.deepMaintainerDebug(
    `Lookup for '${key}': `,
    lookupResult != null ? 'found' : 'not found',
  );
  return lookupResult;
};

const unboxAllLookups = (
  matcherLookup: LookupMap,
  matcherOrData: AnyCaseMatcherOrData,
  context: MatchContextWithoutLookup,
): AnyCaseMatcherOrData => {
  if (matcherOrData == null) {
    // Coerces undefined
    return null;
  }
  if (
    typeof matcherOrData === 'string' ||
    typeof matcherOrData === 'number' ||
    typeof matcherOrData === 'boolean'
  )
    return matcherOrData;
  if (
    typeof matcherOrData === 'function' ||
    typeof matcherOrData === 'bigint' ||
    typeof matcherOrData === 'symbol'
  ) {
    throw new CaseConfigurationError(
      `It looks like a value of type '${typeof matcherOrData}' was attempted to be serialised in the contract. This is unsupported`,
      context,
      'UNDOCUMENTED',
    );
  }

  if (Array.isArray(matcherOrData)) {
    return matcherOrData.map((item) =>
      unboxAllLookups(matcherLookup, item, context),
    );
  }

  if (isLookupableMatcher(matcherOrData)) {
    const replacement = findLookup(
      matcherLookup,
      `matcher`,
      matcherOrData['_case:matcher:uniqueName'],
      context,
    );
    if (replacement === undefined) {
      throw new CaseCoreError(
        `The matcher '${matcherOrData['_case:matcher:uniqueName']}' referenced recursively does not appear to exist. This should have been prevented at the time this matcher was saved.`,
      );
    }
    return unboxAllLookups(matcherLookup, replacement, context);
  }

  return Object.entries(matcherOrData)
    .map(([key, value]) => ({
      [key]: unboxAllLookups(matcherLookup, value, context),
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }));
};

export const addLookup = (
  matcherLookup: LookupMap,
  lookupType: LookupType,
  uniqueName: string,
  matcher: AnyCaseMatcherOrData,
  context: MatchContextWithoutLookup,
): Record<string, AnyCaseMatcherOrData> => {
  const name = lookupName({ lookupType, uniqueName });
  context.logger.deepMaintainerDebug(
    `Saving lookup ${lookupType} (${name}):`,
    matcher,
  );
  const candidateMatcher = matcherLookup[name];
  if (candidateMatcher) {
    if (
      !rawEquality(
        unboxAllLookups(matcherLookup, matcher, context),
        unboxAllLookups(matcherLookup, candidateMatcher, context),
      )
    ) {
      context.logger.error(
        `The ${lookupType} with the name '${stripType({ lookupType, name })}' has more than one definition, and they are not the same`,
      );
      context.logger.error(`New matcher is (${typeof matcher})`, matcher);
      context.logger.error(
        `Existing matcher is (${typeof matcher})`,
        matcherLookup[name],
      );

      throw new CaseConfigurationError(
        `The ${lookupType} with the name '${stripType({ lookupType, name })}' has more than one definition, and they are not the same`,
        context,
        'UNDOCUMENTED',
      );
    } else {
      context.logger.deepMaintainerDebug(
        `The ${lookupType} with the name '${stripType({ lookupType, name })}' is already stored exactly as given`,
      );
    }
  }

  return {
    ...matcherLookup,
    [name]: matcher,
  };
};
