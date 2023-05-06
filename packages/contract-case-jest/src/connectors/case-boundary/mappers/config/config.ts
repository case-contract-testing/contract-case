import { ContractCaseBoundaryConfig } from '@contract-case/case-boundary';
import {
  ContractCaseConfig,
  ContractCaseVerifierConfig,
  IndividualFailedTestConfig,
  IndividualSuccessTestConfig,
} from '../../../../entities/config';
import { mapStateHandlers } from './state/state';
import { mapTriggers, mapSuccessTrigger, mapFailingTrigger } from './triggers';

const mapPublish = (publish: ContractCaseConfig['publish']) => {
  if (publish === true) return 'ALWAYS';
  if (publish === false) return 'NEVER';
  return publish;
};

export const mapConfig = ({
  publish,
  stateHandlers,
  triggers,
  testRunId,
  ...rest
}: ContractCaseVerifierConfig): ContractCaseBoundaryConfig => ({
  ...(publish !== undefined ? { publish: mapPublish(publish) } : {}),
  ...(stateHandlers !== undefined
    ? { stateHandlers: mapStateHandlers(stateHandlers) }
    : {}),
  ...(triggers !== undefined ? { triggerAndTests: mapTriggers(triggers) } : {}),
  ...(testRunId !== undefined
    ? { testRunId }
    : { testRunId: 'test-run-id-missing' }),
  ...rest,
});

export const mapSuccessConfig = <R, C extends Record<string, unknown>>({
  trigger,
  testResponse,
  ...config
}: ContractCaseConfig &
  IndividualSuccessTestConfig<R, C>): ContractCaseBoundaryConfig => ({
  ...mapConfig(config),
  ...(trigger && testResponse
    ? {
        triggerAndTest: {
          trigger: mapSuccessTrigger<R, C>(trigger, testResponse),
        },
      }
    : {}),
});

export const mapFailingConfig = <R, C extends Record<string, unknown>>({
  trigger,
  testErrorResponse,
  ...config
}: ContractCaseConfig &
  IndividualFailedTestConfig<R, C>): ContractCaseBoundaryConfig => ({
  ...mapConfig(config),
  ...(trigger && testErrorResponse
    ? {
        triggerAndTest: {
          trigger: mapFailingTrigger<R, C>(trigger, testErrorResponse),
        },
      }
    : {}),
});
