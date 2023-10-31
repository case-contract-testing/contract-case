import { CaseConfigurationError } from '../../../../entities';
import { addLocation } from '../../../../entities/context';
import { hasErrors } from '../../../../entities/results';
import type {
  AnyMockDescriptorType,
  Assertable,
  CaseMockDescriptorFor,
  MatchContext,
} from '../../../../entities/types';
import { mockExecutor } from './mockExecutor';
import { MockExecutors } from './mockExecutors';

export const setupMock = <T extends AnyMockDescriptorType>(
  mockDescriptor: CaseMockDescriptorFor<T>,
  parentMatchContext: MatchContext,
): Promise<Assertable<T>> =>
  mockExecutor(mockDescriptor, MockExecutors, parentMatchContext).then(
    ({ config, assertableData }) => ({
      config,
      assert: () =>
        assertableData().then(({ expected, context, actual }) =>
          Promise.resolve(
            context.selfVerify(expected, addLocation(':selfCheck', context)),
          )
            .then((selfVerification) => {
              if (hasErrors(selfVerification)) {
                throw new CaseConfigurationError(
                  // TODO document this extensively.
                  `The matchers used have been given an example that doesn't pass the matcher: ${selfVerification[0]?.message} (at ${selfVerification[0]?.location})`,
                );
              }
            })
            .then(() => context.descendAndCheck(expected, context, actual)),
        ),
    }),
  );
