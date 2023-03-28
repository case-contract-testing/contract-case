// We need to allow underscores because they're part of the HAL response
/* eslint-disable no-underscore-dangle */
import { versionFromGitTag } from 'absolute-version';

import type { MakeBrokerApi, Broker } from '../../../core/types';

import { CaseConfigurationError } from '../../../entities';
import type {
  LogContext,
  ContractData,
  DataContext,
} from '../../../entities/types';

import { makeAxiosConnector } from '../../axios';
import { BasicAuth } from '../../axios/types';
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
  configContext: DataContext
): Broker => {
  const authToken =
    configContext['case:currentRun:context:brokerCiAccessToken'];
  const baseUrl = configContext['case:currentRun:context:brokerBaseUrl'];
  const basicAuth = configContext['case:currentRun:context:brokerBasicAuth'];

  if (baseUrl === undefined || baseUrl === '') {
    throw new CaseConfigurationError(
      "Can't access a broker without specifying the base URL. Set the environment variable CASE_BROKER_BASEURL or the config property brokerBaseUrl"
    );
  }
  if (typeof baseUrl !== 'string') {
    throw new CaseConfigurationError(
      `Expected the baseurl to be a string, but it was '${typeof authToken}'`
    );
  }

  if (authToken === undefined && basicAuth === undefined) {
    throw new CaseConfigurationError(
      "Can't access a broker without an authorization token or basic auth set. Set the environment variable CASE_BROKER_CI_TOKEN"
    );
  }

  if (authToken !== undefined) {
    if (authToken === '') {
      throw new CaseConfigurationError(
        "Can't access a broker without an authorization token. Set the environment variable CASE_BROKER_CI_TOKEN"
      );
    }
    if (typeof authToken !== 'string') {
      throw new CaseConfigurationError(
        `Expected the authToken to be a string, but it was '${typeof authToken}'`
      );
    }
  }

  if (authToken === undefined && basicAuth === undefined) {
    throw new CaseConfigurationError(
      "Can't access a broker without an authorization token or basic auth set. Set the environment variable CASE_BROKER_CI_TOKEN"
    );
  }

  const auth = (authToken ?? basicAuth) as string | BasicAuth;

  const server = makeAxiosConnector(trimSlash(baseUrl), auth);

  return {
    publishContract: (contract: ContractData, logContext: LogContext) => {
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
      });
    },

    downloadContract: (url: string) =>
      makeAxiosConnector(url, auth).authedGet(),

    urlsForVerification: (serviceName: string, logContext: LogContext) => {
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
              { latest: true },
            ],
            providerVersionTags: ['main'],
          },
          logContext
        )
        .then((d) => {
          logContext.logger.deepMaintainerDebug(
            `Pacts for verification responded with`,
            JSON.stringify(d, undefined, 2)
          );

          const numPacts = d._embedded.pacts.length;

          logContext.logger.debug(
            `Broker returned ${numPacts} URLs to possible contracts for verification`
          );

          return d._embedded.pacts.map((contract) => contract._links.self);
        });
    },
  };
};
