import type { ContractFile } from 'connectors/contract/structure/types';
import { applyDefaultContext } from 'entities/context';
import { nameExample } from 'entities/contract/interactions';
import { makeLogger } from 'connectors/logger';
import { contractFns } from 'connectors/contract';
import { resultPrinter } from 'connectors/resultPrinter';
import {
  executeVerification,
  configToRunContext,
  DEFAULT_CONFIG,
} from 'connectors/core';
import type { CaseConfig } from 'connectors/core/types';
import { traversals } from 'diffmatch';
import type { StateFunctions } from 'entities/states/types';

import type { RunTestCallback } from './dsl/types';

export const verifyContract = (
  contractFile: ContractFile,
  stateSetups: StateFunctions,
  runTestCb: RunTestCallback,
  config: CaseConfig = DEFAULT_CONFIG
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
            ...configToRunContext(config),
            'case:currentRun:context:location': [
              'verification',
              `interaction[${index}]`,
            ],
          }
        )
      )
    );
  });
};
