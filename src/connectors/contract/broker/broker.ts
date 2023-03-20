import { versionFromGitTag } from 'absolute-version';

import type { MakeBrokerApi, Broker } from '../../../core/contract/types';

import { CaseConfigurationError } from '../../../entities';
import type {
  ContextLogger,
  ContractData,
  MatchContext,
} from '../../../entities/types';

import { makeAxiosConnector } from './axios';
import type {
  WireForVerificationRequest,
  WireForVerificationResponse,
} from './brokerDto.types';

const trimSlash = (str: string): string => {
  if (str.endsWith('/')) {
    return trimSlash(str.substring(0, str.length - 1));
  }
  return str;
};

export const makeBrokerApi: MakeBrokerApi = (
  configContext: MatchContext
): Broker => {
  const authToken =
    configContext['case:currentRun:context:brokerCiAccessToken'];
  const baseUrl = configContext['case:currentRun:context:brokerBaseUrl'];

  if (authToken === undefined || authToken === '') {
    throw new CaseConfigurationError(
      "Can't access a broker without an authorization token. Set the environment variable CASE_BROKER_CI_TOKEN"
    );
  }

  if (typeof authToken !== 'string') {
    throw new CaseConfigurationError(
      `Expected the authToken to be a string, but it was '${typeof authToken}'`
    );
  }

  if (baseUrl === undefined || baseUrl === '') {
    throw new CaseConfigurationError(
      "Can't access a broker without specifying the base URL. Set the environment variable CASE_BROKER_BASEURL"
    );
  }

  if (typeof baseUrl !== 'string') {
    throw new CaseConfigurationError(
      `Expected the baseurl to be a string, but it was '${typeof authToken}'`
    );
  }

  const server = makeAxiosConnector(trimSlash(baseUrl), authToken);

  return {
    publishContract: (contract: ContractData, logContext: ContextLogger) => {
      const version = versionFromGitTag();
      logContext.logger.debug(
        `Publishing contract for ${contract.description.consumerName}@${version} -> ${contract.description.providerName} to broker at ${baseUrl}`
      );

      const path = `/pacts/provider/${encodeURIComponent(
        contract.description.providerName
      )}/consumer/${encodeURIComponent(
        contract.description.consumerName
      )}/version/${encodeURIComponent(version)}`;

      logContext.logger.maintainerDebug(`Publish path is: ${path}`);

      return server.authedPut(path, contract, logContext).then((d) => {
        logContext.logger.debug(`Published successfully`);
        logContext.logger.deepMaintainerDebug(
          `Published result was`,
          JSON.stringify(d)
        );
        return d;
      });
    },

    forVerification: (serviceName: string, logContext: ContextLogger) => {
      logContext.logger.debug(
        `Finding contracts to verify for service '${serviceName}' on broker at ${baseUrl}`
      );

      const path = `/pacts/provider/${encodeURIComponent(
        serviceName
      )}/for-verification`;

      logContext.logger.maintainerDebug(`forVerification path is: ${path}`);
      return server
        .authedPost<WireForVerificationRequest, WireForVerificationResponse>(
          path,
          {
            consumerVersionSelectors: [
              {
                mainBranch: true,
              },
              {
                deployedOrReleased: true,
              },
            ],
            providerVersionTags: ['main'],
          },
          logContext
        )
        .then((d) => {
          logContext.logger.maintainerDebug(
            `Pacts for verification responded with`,
            JSON.stringify(d, undefined, 2)
          );

          // eslint-disable-next-line no-underscore-dangle
          const numPacts = d._embedded.pacts.length;

          logContext.logger.debug(
            `Broker returned ${numPacts} possible contracts for verification`
          );

          return d;
        });
    },
  };
};
