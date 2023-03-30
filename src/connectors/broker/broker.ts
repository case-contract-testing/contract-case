// We need to allow underscores because they're part of the HAL response
/* eslint-disable no-underscore-dangle */
import { versionFromGitTag } from 'absolute-version';
// eslint-disable-next-line import/no-extraneous-dependencies
import branchName from 'current-git-branch';

import { CaseConfigurationError } from '../../entities';
import type {
  LogContext,
  ContractData,
  DataContext,
} from '../../entities/types';

import { makeAxiosConnector } from './axios';
import { BasicAuth } from './axios/types';
import type {
  WireForVerificationRequest,
  WireForVerificationResponse,
  WireRequestForPublicationAdvanced,
} from './brokerDto.types';
import {
  Broker,
  Environment,
  MakeBrokerApi,
  PublishResult,
} from '../../core/types';

const trimSlash = (str: string): string => {
  if (str.endsWith('/')) {
    return trimSlash(str.substring(0, str.length - 1));
  }
  return str;
};

export const makeBrokerApi: MakeBrokerApi = (
  configContext: DataContext,
  environment: Environment
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
      if (!environment.isCi()) {
        logContext.logger.warn(
          `Not publishing contract for ${contract.description.consumerName} -> ${contract.description.providerName} as we only publish in CI, and this is not a detected CI environment`
        );
        return Promise.resolve();
      }

      // TODO: Make this a first class object
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

    publishContractAdvanced: (
      contract: ContractData,
      logContext: DataContext
    ) => {
      if (!environment.isCi()) {
        return Promise.resolve({
          notices: [
            {
              level: 'warning',
              text: `Not publishing contract for ${contract.description.consumerName} -> ${contract.description.providerName} as we only publish in CI, and this is not a detected CI environment`,
            },
          ],
        });
      }

      const version = versionFromGitTag();
      logContext.logger.debug(
        `Publishing contract for ${contract.description.consumerName}@${version} -> ${contract.description.providerName} to broker at ${baseUrl}`
      );
      const branch = branchName();

      return server.authedPost<
        WireRequestForPublicationAdvanced,
        PublishResult
      >(
        '/contracts/publish',
        {
          pacticipantName: contract.description.consumerName,
          pacticipantVersionNumber: version,
          ...(branch !== false ? { branch } : {}),
          tags: [],
          contracts: [
            {
              consumerName: contract.description.consumerName,
              providerName: contract.description.providerName,
              specification: 'pact', // TODO: Replace this with 'case::contract' when the broker supports it
              contentType: 'application/json',
              content: Buffer.from(JSON.stringify(contract)).toString('base64'),
            },
          ],
        },
        logContext
      );
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
