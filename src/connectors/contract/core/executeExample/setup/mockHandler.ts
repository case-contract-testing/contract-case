import type { MatchContext } from 'entities/context/types';
import { hasErrors } from 'entities/results/MatchResult';
import type {
  AnyMockDescriptorType,
  CaseMockDescriptorFor,
  Assertable,
} from 'entities/types';
import { addLocation } from 'entities/context';
import { CaseConfigurationError } from 'entities';

import { mockExecutor } from './mockExecutor';
import { MockExecutors } from './mockExecutors';

export const setupUnhandledAssert = <T extends AnyMockDescriptorType>(
  mockDescriptor: CaseMockDescriptorFor<T>,
  parentMatchContext: MatchContext
): Promise<Assertable<T>> =>
  mockExecutor(mockDescriptor, MockExecutors, parentMatchContext).then(
    ({ config, assertableData }) => ({
      config,
      assert: () =>
        assertableData().then(({ expected, context, actual }) =>
          Promise.resolve(
            context.selfVerify(expected, addLocation(':selfCheck', context))
          )
            .then((selfVerification) => {
              if (hasErrors(selfVerification)) {
                throw new CaseConfigurationError(
                  // TODO document this extensively.
                  `The matchers used have been given an example that doesn't pass the matcher: ${selfVerification[0]?.message} (at ${selfVerification[0]?.location})`
                );
              }
            })
            .then(() => context.descendAndCheck(expected, context, actual))
        ),
    })
  );
