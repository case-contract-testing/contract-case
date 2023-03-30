import { Mutex } from 'async-mutex';

import { CaseCoreError, CaseFailedAssertionError } from '../entities';
import { applyNodeToContext, addLocation } from '../entities/context';
import { nameMock, exampleToNames } from '../entities/contract';
import { makeResults } from '../entities/results';
import {
  type ContractDescription,
  SETUP_VARIABLE_STATE,
  type CaseExample,
  type MatchContext,
  ERROR_TYPE_EXECUTION,
  AnyMockDescriptorType,
} from '../entities/types';

import { BaseCaseContract } from './BaseCaseContract';
import { addExample, hasFailure } from './structure';
import type { TestInvoker } from './executeExample/types';
import type {
  CaseConfig,
  WriterDependencies,
  MakeBrokerApi,
  WriteContract,
} from './types';
import { DEFAULT_CONFIG, configToRunContext } from './config';
import { executeExample } from './executeExample';

export class WritingCaseContract extends BaseCaseContract {
  testIndex = 0;

  mutex: Mutex;

  makeBrokerApi: MakeBrokerApi;

  writeContract: WriteContract;

  constructor(
    description: ContractDescription,
    {
      resultPrinter,
      makeLogger,
      makeBrokerApi,
      writeContract,
    }: WriterDependencies,
    config: CaseConfig = DEFAULT_CONFIG
  ) {
    super(description, config, resultPrinter, makeLogger);
    this.mutex = new Mutex();
    this.makeBrokerApi = makeBrokerApi;
    this.writeContract = writeContract;
  }

  executeTest<T extends AnyMockDescriptorType, R>(
    {
      states = [],
      mockDescription,
      trigger,
      testResponse,
      triggers,
      testErrorResponse,
      stateHandlers = {},
    }: TestInvoker<T, R>,
    runConfig: CaseConfig
  ): Promise<unknown> {
    const thisIndex = this.testIndex;
    this.testIndex += 1;

    const runContext = applyNodeToContext(
      mockDescription,
      this.initialContext,
      {
        'case:currentRun:context:throwOnFail': true,
        'case:currentRun:context:contractMode': 'write',
        'case:currentRun:context:testName': `${thisIndex}`,
        ...configToRunContext(runConfig),
      }
    );

    if (runContext['case:currentRun:context:contractMode'] !== 'write') {
      runContext.logger.warn(
        `The contractMode is expected to be 'write', but it was '${runContext['case:currentRun:context:contractMode']}'. If you are not expecting this message, this is almost certainly a misconfiguration`
      );
    }
    return this.mutex.runExclusive(() => {
      states.forEach((state) => {
        if (state['case:state:type'] === SETUP_VARIABLE_STATE) {
          Object.entries(state.variables).forEach(([key, value]) =>
            runContext.addDefaultVariable(key, state.stateName, value)
          );
        }
      });

      const example: CaseExample = {
        states,
        mock: nameMock(mockDescription, runContext),
        result: 'PENDING',
      };

      return executeExample<T, R>(
        example,
        {
          stateHandlers,
          trigger,
          triggers,
          testResponse,
          testErrorResponse,
          names: exampleToNames(example, `${this.testIndex}`),
        },
        this,
        runContext
      );
    });
  }

  recordExample(
    example: CaseExample,
    currentContext: MatchContext
  ): CaseExample {
    if (!this.currentContract) {
      currentContext.logger.error(
        'recordSuccess was called without initialising the contract file. This should not be possible.'
      );
      throw new CaseCoreError(
        'Contract was not initialised at the time that recordSuccess was called'
      );
    }
    if (example.result === 'PENDING') {
      throw new CaseCoreError(
        'Trying to record a pending example. This should never happen.'
      );
    }
    this.currentContract = addExample(
      this.currentContract,
      example,
      currentContext
    );
    return example;
  }

  async endRecord(): Promise<void> {
    const writingContext = addLocation('WritingContract', this.initialContext);
    if (hasFailure(this.currentContract)) {
      // TODO: Print all failures
      throw new CaseFailedAssertionError(
        makeResults({
          type: ERROR_TYPE_EXECUTION,
          message: 'There were contract failures',
          code: 'FAIL',
          location: ['Writing Contract'],
          toString: () => 'There were contract failures',
        })
      );
    }
    //  - if success, write contract
    const fileName = this.writeContract(this.currentContract, writingContext);
    writingContext.logger.debug(`Wrote contract file: ${fileName}`);

    if (!this.initialContext['case:currentRun:context:brokerCiAccessToken']) {
      this.initialContext.logger.warn(
        'Not publishing a contract, as there is no brokerCiAccessToken set'
      );
      return;
    }
    await this.makeBrokerApi(writingContext).publishContractAdvanced(
      this.currentContract,
      addLocation('PublishingContract', this.initialContext)
    );
  }
}
