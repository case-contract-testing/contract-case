import {
  AnyCaseMatcher,
  AnyCaseNodeType,
  CaseNodeFor,
  hasExample,
} from '@contract-case/case-entities-internal';

import {
  MatchContext,
  foldIntoContext,
  MatcherExecutor,
  CaseCoreError,
  TraversalFns,
  addLocation,
  hasErrors,
  CaseConfigurationError,
} from '@contract-case/case-plugin-base';
import {
  AnyLeafOrStructure,
  AnyCaseMatcher as UnknownCaseNodeType,
} from '@contract-case/case-plugin-dsl-types';
import { inferMatcher } from './inferMatcher';

import { MatcherExecutors } from './MatcherExecutors';

const getExecutor = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  parentMatchContext: MatchContext,
) => {
  const matcher = inferMatcher<T>(matcherOrData) as CaseNodeFor<T>;
  const matchContext = foldIntoContext(matcher, parentMatchContext);

  const executor: MatcherExecutor<T, CaseNodeFor<T>> = MatcherExecutors[
    matcher['_case:matcher:type'] as T
  ];
  if (!executor) {
    throw new CaseCoreError(
      `Missing executor for matcher type '${matcher['_case:matcher:type']}'`,
    );
  }

  return {
    name: () => executor.describe(matcher, matchContext),
    check: async (actual: unknown) => {
      parentMatchContext.logger.deepMaintainerDebug(
        `Entering ${matcher['_case:matcher:type']}, actual is:`,
        actual,
      );
      const result = await executor.check(matcher, matchContext, actual);
      parentMatchContext.logger.deepMaintainerDebug(
        `Exiting ${matcher['_case:matcher:type']}, with ${result.length} errors`,
      );
      return result;
    },
    strip: () => executor.strip(matcher, matchContext),
    validate: () => executor.validate(matcher, matchContext),
  };
};

const descendAndCheck = <T extends AnyCaseNodeType>(
  matcherOrData: AnyLeafOrStructure | UnknownCaseNodeType | CaseNodeFor<T>,
  parentMatchContext: MatchContext,
  actual: unknown,
): ReturnType<MatcherExecutor<T, CaseNodeFor<T>>['check']> =>
  getExecutor(matcherOrData as AnyCaseMatcher, parentMatchContext).check(
    actual,
  );

const descendAndValidate = <T extends AnyCaseNodeType>(
  matcherOrData: AnyLeafOrStructure | UnknownCaseNodeType | CaseNodeFor<T>,
  parentMatchContext: MatchContext,
): ReturnType<MatcherExecutor<T, CaseNodeFor<T>>['validate']> =>
  getExecutor(matcherOrData as AnyCaseMatcher, parentMatchContext).validate();

const descendAndDescribe = <T extends AnyCaseNodeType>(
  matcherOrData: AnyLeafOrStructure | UnknownCaseNodeType | CaseNodeFor<T>,
  parentMatchContext: MatchContext,
): string =>
  getExecutor(matcherOrData as AnyCaseMatcher, parentMatchContext).name();

const descendAndStrip = <T extends AnyCaseNodeType>(
  matcherOrData: AnyLeafOrStructure | UnknownCaseNodeType | CaseNodeFor<T>,
  parentMatchContext: MatchContext,
): ReturnType<MatcherExecutor<T, CaseNodeFor<T>>['strip']> => {
  if (hasExample(matcherOrData)) {
    parentMatchContext.logger.deepMaintainerDebug(
      `Executing strip with matcher type: ${matcherOrData['_case:matcher:type']} and specific example`,
      matcherOrData['_case:matcher:example'],
    );

    return getExecutor(
      matcherOrData['_case:matcher:example'] as AnyCaseMatcher,
      parentMatchContext,
    ).strip();
  }
  parentMatchContext.logger.deepMaintainerDebug(
    `Executing strip with matcher ${
      typeof matcherOrData === 'object' &&
      matcherOrData !== null &&
      '_case:matcher:type' in matcherOrData
        ? `type: ${matcherOrData['_case:matcher:type']}`
        : `inferred from ${typeof matcherOrData}`
    }`,
  );
  return getExecutor(
    matcherOrData as AnyCaseMatcher,
    parentMatchContext,
  ).strip();
};

/**
 * selfVerify is the entry point into the self-verification process:
 *
 * - First check that the parameters passed to the matchers are appropriate
 * - Then validate that the matcher matches itself (ie, if stripped back to its
 *   example, does the example pass the matcher?)
 *
 * @param matcherOrData - The entry point matcher / example
 * @param parentMatchContext - The match context for this run
 * @returns a successful promise if verification passes, or a failed promise
 *    with details of what went wrong if verification failed.
 */
const selfVerify = <T extends AnyCaseNodeType>(
  matcherOrData: AnyLeafOrStructure | UnknownCaseNodeType | CaseNodeFor<T>,
  parentMatchContext: MatchContext,
): Promise<void> =>
  Promise.resolve()
    .then(() =>
      // First validate the parameters
      // This function will reject the promise if validation fails
      descendAndValidate(
        matcherOrData,
        addLocation(':selfVerifyValidate', parentMatchContext),
      ),
    )
    .then(() =>
      // Then validate that the matcher matches its example
      getExecutor<T>(matcherOrData as CaseNodeFor<T>, parentMatchContext).check(
        descendAndStrip<T>(
          matcherOrData as CaseNodeFor<T>,
          addLocation(':selfVerifyCheck', parentMatchContext),
        ),
      ),
    )
    .then((selfVerification) => {
      if (hasErrors(selfVerification)) {
        parentMatchContext.logger.deepMaintainerDebug(
          'Self verification FAILED',
        );
        throw new CaseConfigurationError(
          // TODO document this extensively.
          `The matchers used have been given an example that doesn't pass the matcher: ${selfVerification[0]?.message} (at ${selfVerification[0]?.location})`,
          'DONT_ADD_LOCATION',
          'UNDOCUMENTED',
        );
      }
      parentMatchContext.logger.deepMaintainerDebug(
        'Self verification succeeded',
      );
    });

export const traversals: TraversalFns = {
  descendAndDescribe,
  descendAndCheck,
  descendAndStrip,
  descendAndValidate,
  selfVerify,
};
