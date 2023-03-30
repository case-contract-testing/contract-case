import { CaseConfigurationError, CaseCoreError } from '../entities';
import { addLocation } from '../entities/context';
import { ContractData, DataContext, MatchContext } from '../entities/types';
import { BrokerApi, DownloadedContracts } from './types.broker';
import { Environment } from './types.environment';

export class BrokerService {
  broker: BrokerApi;

  environment: Environment;

  constructor(broker: BrokerApi, environment: Environment) {
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
      context.logger.warn(
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
          addLocation('PublishingContract', context)
        )
        .then((publishResults) => {
          publishResults.notices.forEach((notice) => {
            switch (notice.type) {
              case 'debug':
                context.logger.debug(`[Broker] ${notice.text}`);
                break;
              case 'info':
                context.logger.debug(`[Broker] ${notice.text}`);
                break;
              case 'prompt':
                context.logger.debug(`[Broker] ${notice.text}`);
                break;
              case 'success':
                context.logger.debug(`[Broker] ${notice.text}`);
                break;
              case 'error':
                context.logger.error(`[Broker] ${notice.text}`);
                break;
              case 'danger':
                context.logger.error(`[Broker] [DANGER] ${notice.text}`);
                break;
              case 'warning':
                context.logger.warn(`[Broker] ${notice.text}`);
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
    const contracts = await Promise.all(
      contractUrls.map((contractUrl) => {
        context.logger.debug(
          `Downloading contract for '${contractUrl.name}' from ${contractUrl.href}`
        );
        return this.broker
          .downloadContract(contractUrl.href, context)
          .then((contractData) => ({
            contractData,
            name: contractUrl.name,
          }));
      })
    );

    const nonCaseContracts = contracts.filter(
      (c) =>
        !(
          'contractType' in c.contractData &&
          c.contractData.contractType === 'case::contract'
        )
    );

    nonCaseContracts.forEach((c) => {
      context.logger.debug(
        `Skipping contract '${c.name}' as it does not appear to be a Case Contract`
      );
    });

    const caseContracts = contracts.filter(
      (c) =>
        'contractType' in c.contractData &&
        c.contractData.contractType === 'case::contract'
    );

    if (caseContracts.length === 0) {
      context.logger.warn(
        `No Case contracts to verify. There were ${nonCaseContracts.length} non-case contracts.`
      );
      context.logger.warn(
        'You can see more information by re-running this task with logLevel: debug or lower'
      );
    }
    return caseContracts;
  }
}
