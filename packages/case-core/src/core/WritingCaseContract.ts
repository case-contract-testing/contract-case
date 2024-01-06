import { Mutex } from 'async-mutex';

import { CaseCoreError, CaseFailedAssertionError } from '../entities';
import { applyNodeToContext, addLocation } from '../entities/context';
import { nameMock, exampleToNames } from '../entities/contract';
import { makeResults } from '../entities/results';
import {
  type CaseContractDescription,
  SETUP_VARIABLE_STATE,
  type CaseExample,
  type MatchContext,
  ERROR_TYPE_CONFIGURATION,
  AnyMockDescriptorType,
} from '../entities/types';

import { BaseCaseContract } from './BaseCaseContract';
import { addExample, hasFailure } from './structure';
import type { TestInvoker } from './executeExample/types';
import type { CaseConfig, WriterDependencies } from './types';
import { configToRunContext } from './config';
import { executeExample } from './executeExample';

export class WritingCaseContract extends BaseCaseContract {
  private testIndex = 0;

  private mutex: Mutex;

  private dependencies: WriterDependencies;

  constructor(
    description: CaseContractDescription,
    dependencies: WriterDependencies,
    config: CaseConfig,
    parentVersions: Array<string>,
  ) {
    super(
      description,
      config,
      dependencies.defaultConfig,
      dependencies.resultFormatter,
      dependencies.makeLogger,
      parentVersions,
    );
    this.mutex = new Mutex();
    this.dependencies = dependencies;
  }

  executeTest<T extends AnyMockDescriptorType, R>(
    {
      states = [],
      mockDescription,
      trigger,
      testResponse,
      triggers,
      testErrorResponse,
      triggerAndTest,
      triggerAndTests,
      stateHandlers = {},
    }: TestInvoker<T, R>,
    runConfig: CaseConfig,
  ): Promise<unknown> {
    const thisIndex = this.testIndex;
    this.testIndex += 1;

    const runContext = applyNodeToContext(
      mockDescription,
      this.initialContext,
      {
        '_case:currentRun:context:throwOnFail': true,
        '_case:currentRun:context:contractMode': 'write',
        '_case:currentRun:context:testName': `${thisIndex}`,
        ...configToRunContext(runConfig),
      },
    );

    runContext.logger.deepMaintainerDebug(
      'The full context object:',
      runContext,
    );
    // TODO: Tidy up the testinvokers so we don't have to pass around individual things
    runContext.logger.deepMaintainerDebug('TestInvoker: ', {
      states,
      mockDescription,
      trigger,
      testResponse,
      triggers,
      testErrorResponse,
      triggerAndTest,
      triggerAndTests,
      stateHandlers,
    });

    if (runContext['_case:currentRun:context:contractMode'] !== 'write') {
      runContext.logger.warn(
        `The contractMode is expected to be 'write', but it was '${runContext['_case:currentRun:context:contractMode']}'. If you are not expecting this message, this is almost certainly a misconfiguration`,
      );
    }
    return this.mutex
      .runExclusive(() => {
        states.forEach((state) => {
          if (state['_case:state:type'] === SETUP_VARIABLE_STATE) {
            Object.entries(state.variables).forEach(([key, value]) =>
              runContext.addDefaultVariable(key, state.stateName, value),
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
            triggerAndTest,
            triggerAndTests,
            testErrorResponse,
            names: exampleToNames(example, `${this.testIndex}`),
          },
          this,
          runContext,
        );
      })
      .then((r) => {
        runContext.logger.maintainerDebug('executeTest completed with:', r);
        return r;
      })
      .catch((e) => {
        runContext.logger.maintainerDebug('executeTest threw:', e);
        throw e;
      });
  }

  recordExample(
    example: CaseExample,
    currentContext: MatchContext,
  ): CaseExample {
    if (!this.currentContract) {
      currentContext.logger.error(
        'recordSuccess was called without initialising the contract file. This should not be possible.',
      );
      throw new CaseCoreError(
        'Contract was not initialised at the time that recordSuccess was called',
      );
    }
    if (example.result === 'PENDING') {
      throw new CaseCoreError(
        'Trying to record a pending example. This should never happen.',
      );
    }
    this.currentContract = addExample(
      this.currentContract,
      example,
      currentContext,
    );
    return example;
  }

  async endRecord(): Promise<void> {
    const writingContext = addLocation('WritingContract', this.initialContext);
    if (hasFailure(this.currentContract)) {
      // TODO: Print all failures
      throw new CaseFailedAssertionError(
        makeResults({
          type: ERROR_TYPE_CONFIGURATION,
          message: 'There were contract failures',
          code: 'FAIL',
          location: ['Writing Contract'],
          toString: () => 'There were contract failures',
        }),
      );
    }
    //  - if success, write contract
    const fileName = this.dependencies.writeContract(
      this.currentContract,
      writingContext,
    );
    writingContext.logger.debug(`Wrote contract file: ${fileName}`);

    await this.dependencies
      .makeBrokerService(writingContext)
      .publishContract(
        this.currentContract,
        addLocation(
          `PublishingContract(${this.currentContract.description.consumerName} -> ${this.currentContract.description.providerName})`,
          this.initialContext,
        ),
      );
  }
}
