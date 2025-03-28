import {
  MatchContext,
  addLocation,
  CaseConfigurationError,
  CaseCoreError,
  DataContext,
  LogContext,
} from '@contract-case/case-plugin-base';
import { ContractData } from '@contract-case/case-plugin-base/dist/src/core/contract/types';
import {
  BrokerApi,
  DeployCheckResult,
  DownloadedContract,
  DownloadedContracts,
  HasBrokerNotices,
} from '../types.broker';
import { BuildEnvironment } from '../types.environment';
import { downloadCaseContracts } from './downloadCaseContracts';

const logNotices = (response: HasBrokerNotices, context: LogContext) => {
  response.notices.forEach((notice) => {
    switch (notice.type) {
      case 'debug':
        context.logger.debug(`[From Broker] ${notice.text}`);
        break;
      case 'info':
        context.logger.debug(`[From Broker] ${notice.text}`);
        break;
      case 'prompt':
        context.logger.warn(`[From Broker] ${notice.text}`);
        break;
      case 'success':
        context.logger.debug(`[From Broker] ${notice.text}`);
        break;
      case 'error':
        context.logger.error(`[From Broker] ${notice.text}`);
        break;
      case 'danger':
        context.logger.error(`[From Broker] [DANGER] ${notice.text}`);
        break;
      case 'warning':
        context.logger.warn(`[From Broker] ${notice.text}`);
        break;
      default:
        throw new CaseCoreError(
          `The broker returned a log level ('${
            notice.type
          }') that Case doesn't know how to handle.\n\nThe problem is in the following notice object:\n\n${JSON.stringify(
            notice,
          )}`,
        );
    }
  });
};
export class BrokerService {
  broker: BrokerApi;

  environment: BuildEnvironment;

  constructor(broker: BrokerApi, environment: BuildEnvironment) {
    this.broker = broker;
    this.environment = environment;
  }

  publishVerificationResults(
    contract: DownloadedContract,
    success: boolean,
    context: MatchContext,
  ): Promise<void> {
    if (
      context['_case:currentRun:context:publish'] === false ||
      context['_case:currentRun:context:publish'] === 'NEVER'
    ) {
      context.logger.debug(
        `Not publishing verification results for ${contract.description.consumerName} -> ${contract.description.providerName} as publish: 'NEVER' is set (or false)`,
      );
      return Promise.resolve();
    }
    if (
      context['_case:currentRun:context:publish'] === 'ONLY_IN_CI' &&
      !this.environment.isCi()
    ) {
      context.logger.debug(
        `Not publishing verification results for ${contract.description.consumerName} -> ${contract.description.providerName} as publish: 'ONLY_IN_CI' is set, and this is not a detected CI environment`,
      );
      return Promise.resolve();
    }
    if (
      context['_case:currentRun:context:publish'] === true ||
      context['_case:currentRun:context:publish'] === 'ALWAYS' ||
      (context['_case:currentRun:context:publish'] === 'ONLY_IN_CI' &&
        this.environment.isCi())
    ) {
      return this.broker
        .publishVerificationResults(
          contract,
          success,
          this.environment.version(context),
          this.environment.branch(),
          addLocation(':PublishingContractAdvanced', context),
        )
        .then(() => {});
    }
    const message = `Configuration property 'publish' was set to the unexpected value '${context['_case:currentRun:context:publish']}'`;
    context.logger.error(message);

    return Promise.reject(new CaseConfigurationError(message));
  }

  publishContract(
    contract: ContractData,
    context: MatchContext,
  ): Promise<void> {
    if (
      context['_case:currentRun:context:publish'] === false ||
      context['_case:currentRun:context:publish'] === 'NEVER'
    ) {
      context.logger.debug(
        `Not publishing contract for ${contract.description.consumerName} -> ${contract.description.providerName} as publish: 'NEVER' is set (or false)`,
      );
      return Promise.resolve();
    }
    if (
      context['_case:currentRun:context:publish'] === 'ONLY_IN_CI' &&
      !this.environment.isCi()
    ) {
      context.logger.debug(
        `Not publishing contract for ${contract.description.consumerName} -> ${contract.description.providerName} as publish: 'ONLY_IN_CI' is set, and this is not a detected CI environment`,
      );
      return Promise.resolve();
    }
    if (
      context['_case:currentRun:context:publish'] === true ||
      context['_case:currentRun:context:publish'] === 'ALWAYS' ||
      (context['_case:currentRun:context:publish'] === 'ONLY_IN_CI' &&
        this.environment.isCi())
    ) {
      return this.broker
        .publishContractAdvanced(
          contract,
          this.environment.version(context),
          this.environment.branch(),
          addLocation(':PublishingContractAdvanced', context),
        )
        .then((publishResults) => {
          logNotices(publishResults, addLocation('BrokerResponse', context));
        });
    }
    const message = `Configuration property 'publish' was set to the unexpected value '${context['_case:currentRun:context:publish']}'`;
    context.logger.error(message);

    return Promise.reject(new CaseConfigurationError(message));
  }

  async downloadContracts(
    serviceName: string,
    context: DataContext,
  ): Promise<DownloadedContracts> {
    const contractUrls = await this.broker.urlsForVerification(
      serviceName,
      context,
    );
    context.logger.maintainerDebug('URLs are:', contractUrls);

    if (contractUrls.length === 0) {
      context.logger.warn(
        'No contracts to verify. This may be normal if there is nothing to verify for this service',
      );
      return [];
    }

    return downloadCaseContracts(contractUrls, this.broker, context);
  }

  canDeploy(
    serviceName: string,
    environment: string,
    context: DataContext,
    versionOverride?: string,
  ): Promise<DeployCheckResult> {
    const versionToCheck =
      versionOverride != null
        ? versionOverride
        : this.environment.version(context);
    context.logger.debug(
      `Checking whether '${serviceName}' at version '${versionToCheck}' can be deployed to '${environment}'`,
    );
    return this.broker
      .canDeploy(serviceName, versionToCheck, environment, context)
      .then((response) => {
        logNotices(response, context);
        return response;
      });
  }
}
