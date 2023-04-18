import { exampleToNames } from '../../../entities/contract';
import type {
  CaseExample,
  StateHandlers,
  MatchContext,
  AnyMockDescriptorType,
  Assertable,
  CaseMockDescriptorFor,
} from '../../../entities/types';
import { setupMock } from './setupMock';
import { executeStateTeardown, executeStateSetup } from './stateHandlers';

const setupWithTeardown =
  <T extends AnyMockDescriptorType>(
    example: CaseExample,
    stateSetups: StateHandlers
  ) =>
  (context: MatchContext) => {
    context.logger.maintainerDebug(`Calling setupUnhandledAssert`);
    return setupMock(example.mock as CaseMockDescriptorFor<T>, context).then(
      (assertable: Assertable<T>) => ({
        ...assertable,
        assert: () =>
          assertable
            .assert()
            .finally(() => executeStateTeardown(example, stateSetups, context)),
      })
    );
  };

export const setupExample = <T extends AnyMockDescriptorType>(
  example: CaseExample,
  stateSetups: StateHandlers,
  parentContext: MatchContext
): Promise<Assertable<T>> => {
  const exampleName = exampleToNames(
    example,
    parentContext['_case:currentRun:context:testName']
  );

  parentContext.logger.debug(
    `Beginning setup for example "${exampleName.mockName}"`
  );
  parentContext.logger.maintainerDebug(
    'Context is',
    JSON.stringify(parentContext, null, 2)
  );
  return executeStateSetup(example, stateSetups, parentContext).then(
    setupWithTeardown(example, stateSetups)
  );
};
