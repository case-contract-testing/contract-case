import {
  MatchContext,
  addLocation,
  CaseConfigurationError,
  DataContext,
} from '@contract-case/case-plugin-base';
import {
  BrokerApi,
  DeployCheckResult,
  DownloadedContract,
  DownloadedContracts,
} from '../types.broker';
import { BuildEnvironment } from '../types.environment';
import { downloadCaseContracts } from './downloadCaseContracts';
import { ContractData } from '../../entities/types';

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
        .publishContract(
          contract,
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
    return this.broker.canDeploy(
      serviceName,
      versionToCheck,
      environment,
      context,
    );
  }
}
