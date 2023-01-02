import type { ContractFile } from 'connectors/contract/structure/types';
import { applyDefaultContext } from 'entities/context';
import { nameExample } from 'entities/contract/interactions';
import { traversals } from 'diffmatch';
import { makeLogger } from 'connectors/logger';
import { contractFns } from 'connectors/contract';
import { resultPrinter } from 'connectors/resultPrinter';
import { executeVerification } from 'connectors/core';
import type { StateFunctions } from 'entities/states/types';
import type { RunTestCallback } from './dsl/types';

export const verifyContract = (
  contractFile: ContractFile,
  stateSetups: StateFunctions,
  runTestCb: RunTestCallback
): void => {
  contractFile.examples.forEach((example, index) => {
    runTestCb(
      nameExample(example, index),
      executeVerification(
        example,
        index,
        stateSetups,
        applyDefaultContext(
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
        )
      )
    );
  });
};
