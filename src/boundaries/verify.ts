import type { ContractFile } from 'connectors/contract/structure/types';
import { CaseConfigurationError } from 'entities';
import { applyDefaultContext } from 'entities/context';
import { nameExample } from 'entities/contract/interactions';
import { hasErrors } from 'entities/results/MatchResult';
import { traversals } from 'diffmatch';
import { makeLogger } from 'connectors/logger';
import { contractFns } from 'connectors/contract';
import { setupWithContext } from 'connectors/core/setup';
import { resultPrinter } from 'connectors/resultPrinter';

import { isSetupFunction, RunTestCallback, StateFunctions } from './dsl/types';

export const verifyContract = (
  contractFile: ContractFile,
  stateSetups: StateFunctions,
  runTestCb: RunTestCallback
): void => {
  contractFile.examples.forEach((example, index) => {
    runTestCb(nameExample(example, index), () => {
      const context = applyDefaultContext(
        example.interaction,
        traversals,
        makeLogger,
        contractFns,
        resultPrinter,
        {
          'case:currentRun:context:expectation': 'produce',
          // TODO: This shouldn't be the default
          'case:currentRun:context:logLevel': 'maintainerDebug',
          'case:currentRun:context:location': [
            'verification',
            `interaction[${index}]`,
          ],
          // TODO: Add configuration types and serialise here
          'case:currentRun:context:baseurl': 'http://localhost:8087',
        }
      );
      context.logger.warn('NOT YET IMPLEMENTED: Verifier configuration');
      context.logger.warn(
        'NOT YET IMPLEMENTED: Log level should not be set to maintainer by default in the verification'
      );
      context.logger.debug(
        `Beginning verification for interaction "${nameExample(
          example,
          index
        )}"`
      );
      context.logger.maintainerDebug(
        'Context is',
        JSON.stringify(context, null, 2)
      );
      return Promise.all(
        example.states.map((state) => {
          const setupState = stateSetups[state.stateName];
          if (setupState === undefined) {
            context.logger.error(
              `No state handler for '${state.stateName}' was defined`
            );
            throw new CaseConfigurationError(
              `Missing state '${state.stateName}'`
            );
          }

          context.logger.debug(`Calling state setup for '${state.stateName}'`);
          return Promise.resolve(
            isSetupFunction(setupState) ? setupState() : setupState.setup()
          );
        })
        // TODO Gracefully handle error
        // TODO Roll these into the context
      )
        .then(() => {
          context.logger.warn(
            'NOT YET IMPLEMENTED: Graceful state handler errors'
          );
          context.logger.maintainerDebug(`Calling setupWithContext`);
          return setupWithContext(
            example.states,
            example.interaction,
            Promise.resolve(context)
          );
        })
        .then((verifiable) => verifiable.verify())
        .then((verificationResult) => {
          if (hasErrors(verificationResult)) {
            context.logger.debug(`Verification errors present`);
            context.resultPrinter.printFailureTitle(example, index);
            verificationResult.forEach((e) => {
              context.resultPrinter.printError(e);
            });
            throw new Error(`Verification errors: ${verificationResult}`);
          }
          context.resultPrinter.printSuccessTitle(example, index);
        })
        .finally(() =>
          Promise.all(
            example.states.map((state) => {
              const stateFn = stateSetups[state.stateName];
              if (stateFn !== undefined && !isSetupFunction(stateFn)) {
                context.logger.debug(
                  `Calling state teardown for '${state.stateName}'`
                );
                return Promise.resolve(stateFn.teardown());
              }

              context.logger.debug(
                `No state teardown exists for '${state.stateName}'`
              );
              return 'No teardown';
            })
          ).catch((e) => {
            context.logger.error(
              'Test may have passed, but state teardown failed',
              e.message
            );
            throw new CaseConfigurationError(
              `State teardown errored: ${e.message}`
            );
          })
        )
        .then(() => {
          context.logger.debug(`This interaction passed verification`);
        });
    });
  });
};
