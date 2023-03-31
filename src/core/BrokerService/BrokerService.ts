import { CaseConfigurationError, CaseCoreError } from '../../entities';
import { addLocation } from '../../entities/context';
import { ContractData, DataContext, MatchContext } from '../../entities/types';
import { BrokerApi, DownloadedContracts } from '../types.broker';
import { BuildEnvironment } from '../types.environment';
import { downloadCaseContracts } from './downloadCaseContracts';

export class BrokerService {
  broker: BrokerApi;

  environment: BuildEnvironment;

  constructor(broker: BrokerApi, environment: BuildEnvironment) {
    this.broker = broker;
    this.environment = environment;
  }

  publishContract(
    contract: ContractData,
    context: MatchContext
  ): Promise<void> {
    if (
      context['case:currentRun:context:publish'] === false ||
      context['case:currentRun:context:publish'] === 'NEVER'
    ) {
      context.logger.debug(
        `Not publishing contract for ${contract.description.consumerName} -> ${contract.description.providerName} as publish: 'NEVER' is set (or false)`
      );
      return Promise.resolve();
    }
    if (
      context['case:currentRun:context:publish'] === 'ONLY_IN_CI' &&
      !this.environment.isCi()
    ) {
      context.logger.debug(
        `Not publishing contract for ${contract.description.consumerName} -> ${contract.description.providerName} as publish: 'ONLY_IN_CI' is set, and this is not a detected CI environment`
      );
      return Promise.resolve();
    }
    if (
      context['case:currentRun:context:publish'] === true ||
      context['case:currentRun:context:publish'] === 'ALWAYS' ||
      (context['case:currentRun:context:publish'] === 'ONLY_IN_CI' &&
        this.environment.isCi())
    ) {
      return this.broker
        .publishContractAdvanced(
          contract,
          this.environment.version(),
          this.environment.branch(),
          addLocation(':PublishingContractAdvanced', context)
        )
        .then((publishResults) => {
          const brokerResponse = addLocation('Response', context);
          publishResults.notices.forEach((notice) => {
            switch (notice.type) {
              case 'debug':
                brokerResponse.logger.debug(`[Broker] ${notice.text}`);
                break;
              case 'info':
                brokerResponse.logger.debug(`[Broker] ${notice.text}`);
                break;
              case 'prompt':
                brokerResponse.logger.warn(`[Broker] ${notice.text}`);
                break;
              case 'success':
                brokerResponse.logger.debug(`[Broker] ${notice.text}`);
                break;
              case 'error':
                brokerResponse.logger.error(`[Broker] ${notice.text}`);
                break;
              case 'danger':
                brokerResponse.logger.error(
                  `From-Broker] [DANGER] ${notice.text}`
                );
                break;
              case 'warning':
                brokerResponse.logger.warn(`From-Broker] ${notice.text}`);
                break;
              default:
                throw new CaseCoreError(
                  `The broker returned a log level ('${
                    notice.type
                  }') that Case doesn't know how to handle.\n\nThe problem is in the following notice object:\n\n${JSON.stringify(
                    notice
                  )}`
                );
            }
          });
        });
    }
    const message = `Configuration property 'publish' was set to the unexpected value '${context['case:currentRun:context:publish']}'`;
    context.logger.error(message);

    return Promise.reject(new CaseConfigurationError(message));
  }

  async downloadContracts(
    serviceName: string,
    context: DataContext
  ): Promise<DownloadedContracts> {
    const contractUrls = await this.broker.urlsForVerification(
      serviceName,
      context
    );
    context.logger.maintainerDebug('URLs are:', contractUrls);

    if (contractUrls.length === 0) {
      context.logger.warn(
        'No contracts to verify. This may be normal if there is nothing to verify for this service'
      );
      return [];
    }

    return downloadCaseContracts(contractUrls, this.broker, context);
  }
}
