import { DEFAULT_CONFIG, executeVerification } from 'connectors/contract/core';
import type { CaseConfig } from 'connectors/contract/core/types';
import { makeLogger as defaultMakeLogger } from 'connectors/logger';

import { applyNodeToContext } from 'entities/context';
import { nameExample } from 'entities/contract/interactions';
import type { Logger } from 'entities/logger/types';
import type { StateFunctions } from 'entities/states/types';
import type { LogLevelContext } from 'entities/types';

import { BaseCaseContract } from './BaseCaseContract';
import type { ContractFile } from './structure/types';
import type { RunTestCallback } from './types';

export class CaseVerifier extends BaseCaseContract {
  constructor(
    contractFile: ContractFile,
    config: CaseConfig = DEFAULT_CONFIG,
    makeLogger: (context: LogLevelContext) => Logger = defaultMakeLogger
  ) {
    super(
      contractFile.description,
      { testRunId: 'VERIFIER', ...config },
      makeLogger
    );
    this.currentContract = contractFile;
  }

  verifyContract(
    stateSetups: StateFunctions,
    runTestCb: RunTestCallback
  ): void {
    this.currentContract.examples.forEach((example, index) => {
      runTestCb(
        nameExample(example, `${index}`),
        executeVerification(
          example,
          `${index}`,
          stateSetups,
          applyNodeToContext(example.interaction, this.initialContext, {
            'case:currentRun:context:expectation': 'produce',
            'case:currentRun:context:location': [
              'verification',
              `interaction[${index}]`,
            ],
          })
        )
      );
    });
  }
}
