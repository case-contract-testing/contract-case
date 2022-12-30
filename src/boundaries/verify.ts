import type { ContractFile } from 'connectors/contract/structure/types';
import { CaseConfigurationError } from 'entities';
import { nameExample } from 'entities/contract/interactions';
import { hasErrors } from 'entities/results/MatchResult';
import { isSetupFunction, RunTestCallback, StateFunctions } from './dsl/types';
import { setup } from './setup';

export const verifyContract = (
  contractFile: ContractFile,
  stateSetups: StateFunctions,
  runTestCb: RunTestCallback
): void => {
  contractFile.examples.forEach((example, index) => {
    runTestCb(nameExample(example, index), () =>
      Promise.all(
        example.states.map((state) => {
          const setupState = stateSetups[state.stateName];
          if (setupState === undefined) {
            throw new CaseConfigurationError(
              `Missing state '${state.stateName}'`
            );
          }

          return Promise.resolve(
            isSetupFunction(setupState) ? setupState() : setupState.setup()
          );
        })
        // TODO Roll these into the context
      )
        .then(() =>
          setup(example.states, example.interaction, {
            'case:currentRun:context:expectation': 'produce',
            'case:currentRun:context:baseurl': 'http://localhost:8084',
          })
        )
        .then((verifiable) => verifiable.verify())
        .then((verificationResult) => {
          if (hasErrors(verificationResult)) {
            throw new Error(`Verification errors: ${verificationResult}`);
          }
        })
        .then(() =>
          Promise.all(
            example.states.map((state) => {
              const stateFn = stateSetups[state.stateName];
              if (stateFn !== undefined && !isSetupFunction(stateFn)) {
                return Promise.resolve(stateFn.teardown());
              }

              return 'No teardown';
            })
          ).catch((e) => {
            // TODO: Log Failure to teardown here in a loud error message
            console.log('OH NO');
            return e;
          })
        )
        .then(() => {})
    );
  });
};
