import { Mutex } from 'async-mutex';

import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import {
  applyNodeToContext,
  nameMock,
  MatchContext,
  CaseCoreError,
  addLocation,
  makeResults,
  ERROR_TYPE_CONFIGURATION,
  CaseExample,
  CaseConfigurationError,
} from '@contract-case/case-plugin-base';

import { BaseCaseContract } from './BaseCaseContract';
import {
  addExample,
  getFailures,
  getPendingCount,
  getSuccessCount,
  hasFailure,
  isEmpty,
} from './structure';
import type { TestInvoker } from './executeExample/types';
import type { CaseConfig, WriterDependencies } from './types';
import { configToRunContext } from './config';
import { executeExample } from './executeExample';
import {
  CaseContractDescription,
  SETUP_VARIABLE_STATE,
} from '../entities/types';
import { CaseFailedAssertionError, exampleToNames } from '../entities';

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

        // So that stripMatcher ect have access to the context
        this.runningContext = runContext;

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
        if (r != null) {
          runContext.logger.maintainerDebug('executeTest completed with:', r);
        } else {
          runContext.logger.maintainerDebug(
            'executeTest completed with void return, as expected',
          );
        }
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
      const failures = getFailures(this.currentContract);
      const successCount = getSuccessCount(this.currentContract);
      const pendingCount = getPendingCount(this.currentContract);
      const totalCount = failures.length + successCount + pendingCount;

      const message = `Unable to write contract: ${failures.length}/${totalCount} interactions failed${pendingCount !== 0 ? ` (${pendingCount} were pending)` : ''}\nSee the other failing tests for details`;

      throw new CaseFailedAssertionError(
        message,
        makeResults(
          {
            type: ERROR_TYPE_CONFIGURATION,
            message,
            code: 'FAIL',
            location: ['Writing Contract'],
            toString: () =>
              `There were contract definition failures in ${failures.length}/${totalCount} interactions`,
          },
          ...failures,
        ),
      );
    }
    if (isEmpty(this.currentContract)) {
      throw new CaseConfigurationError(
        'The contract was empty when endRecord was called, but it must have interactions in it before it can be written.\nEnsure that calls to define the contract are made before endRecord is called.',
        writingContext,
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
