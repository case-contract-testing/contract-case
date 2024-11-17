import {
  AnyMockDescriptor,
  AnyMockDescriptorType,
} from '@contract-case/case-entities-internal';
import { MatchContext } from '@contract-case/case-plugin-base';
import { CaseMockDescriptorFor } from '@contract-case/case-plugin-dsl-types';
import { mockExecutor } from './mockExecutor';
import { MockExecutors } from '../../../plugins/mockExecutors';
import { Assertable } from '../../../../entities/types';

export const setupMock = <T extends AnyMockDescriptorType>(
  mockDescriptor: CaseMockDescriptorFor<AnyMockDescriptor, T>,
  parentMatchContext: MatchContext,
): Promise<Assertable<T>> =>
  mockExecutor(mockDescriptor, MockExecutors, parentMatchContext).then(
    ({ config, assertableData }) => ({
      config,
      assert: () =>
        assertableData().then(({ expected, context, actual }) =>
          Promise.resolve()
            .then(() => context.selfVerify(expected, context))
            .then(() => context.descendAndCheck(expected, context, actual)),
        ),
    }),
  );
