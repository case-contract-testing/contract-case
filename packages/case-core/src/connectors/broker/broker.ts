// We need to allow underscores because they're part of the HAL response
/* eslint-disable no-underscore-dangle */
import { CaseConfigurationError } from '../../entities';
import type {
  LogContext,
  ContractData,
  DataContext,
} from '../../entities/types';

import { makeAxiosConnector } from './axios';
import { BasicAuth } from './axios/types';
import {
  WireForVerificationRequest,
  WireForVerificationResponse,
  WireRequestForPublicationAdvanced,
  WireRequestPublishVerificationResults,
} from './brokerDto.types';
import {
  BrokerApi,
  DownloadedContract,
  MakeBrokerApi,
  PublishContractResult,
  PublishVerificationResult,
} from '../../core/types';
import { caseVersion } from '../../entities/caseVersion';

const trimSlash = (str: string | undefined): string => {
  if (typeof str !== 'string') return '';
  if (str.endsWith('/')) {
    return trimSlash(str.substring(0, str.length - 1));
  }
  return str;
};

const validatePrecondition = (
  baseUrl: string | undefined,
  authToken: string | undefined,
  basicAuth: unknown | undefined
) => {
  if (baseUrl === undefined || baseUrl === '') {
    return new CaseConfigurationError(
      "Can't access a broker without specifying the base URL. Set the environment variable CASE_BROKER_BASEURL or the config property brokerBaseUrl"
    );
  }
  if (typeof baseUrl !== 'string') {
    return new CaseConfigurationError(
      `Expected the baseurl to be a string, but it was '${typeof authToken}'`
    );
  }

  if (authToken === undefined && basicAuth === undefined) {
    return new CaseConfigurationError(
      "Can't access a broker without an authorization token or basic auth set. Set the environment variable CASE_BROKER_CI_TOKEN"
    );
  }

  if (authToken !== undefined) {
    if (authToken === '') {
      return new CaseConfigurationError(
        "Can't access a broker without an authorization token. Set the environment variable CASE_BROKER_CI_TOKEN"
      );
    }
    if (typeof authToken !== 'string') {
      return new CaseConfigurationError(
        `Expected the authToken to be a string, but it was '${typeof authToken}'`
      );
    }
  }

  if (authToken === undefined && basicAuth === undefined) {
    return new CaseConfigurationError(
      "Can't access a broker without an authorization token or basic auth set. Set the environment variable CASE_BROKER_CI_TOKEN"
    );
  }
  return undefined;
};

export const makeBrokerApi: MakeBrokerApi = (
  configContext: DataContext
): BrokerApi => {
  const authToken =
    configContext['_case:currentRun:context:brokerCiAccessToken'];
  const baseUrl = configContext['_case:currentRun:context:brokerBaseUrl'];
  const basicAuth = configContext['_case:currentRun:context:brokerBasicAuth'];

  const auth = (authToken ?? basicAuth) as string | BasicAuth;

  const server = makeAxiosConnector(trimSlash(baseUrl), auth);

  const err = validatePrecondition(baseUrl, authToken, basicAuth);

  return {
    publishContract: (
      contract: ContractData,
      version: string,
      logContext: LogContext
    ) => {
      if (err !== undefined) throw err;
      // TODO: Make this a first class object
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
      version: string,
      branch: string | false,
      logContext: LogContext
    ) => {
      if (err !== undefined) throw err;
      logContext.logger.debug(
        `Publishing contract for ${contract.description.consumerName}@${version} -> ${contract.description.providerName} to broker at ${baseUrl}`
      );

      return server.authedPost<
        WireRequestForPublicationAdvanced,
        PublishContractResult
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
              specification: 'pact', // TODO: Replace this with '_case::contract' when the broker supports it
              contentType: 'application/json',
              content: Buffer.from(JSON.stringify(contract)).toString('base64'),
            },
          ],
        },
        logContext
      );
    },

    publishVerificationResults: (
      contract: DownloadedContract,
      success: boolean,
      providerVersion: string,
      branch: string | false,
      logContext: LogContext
    ) =>
      Promise.resolve()
        .then(() => {
          if (err !== undefined) throw err;
          if (contract._links === undefined) {
            logContext.logger.maintainerDebug(
              'No links section in the following contract:',
              contract
            );
            throw new CaseConfigurationError(
              `The contract between ${contract.description.consumerName} and ${contract.description.providerName} does not appear to have a links section. Was it downloaded from a broker?`
            );
          }
          if (
            contract._links['pb:publish-verification-results'] === undefined
          ) {
            logContext.logger.maintainerDebug(
              'No pb:publish-verification-result section in the following contract:',
              contract
            );
            throw new CaseConfigurationError(
              `The contract between ${contract.description.consumerName} and ${contract.description.providerName} does not appear to have a publish verification results URL`
            );
          }
        })
        .then(() =>
          makeAxiosConnector(
            contract._links['pb:publish-verification-results'].href,
            auth
          )
            .authedPost<
              WireRequestPublishVerificationResults,
              PublishVerificationResult
            >(
              '',
              {
                providerApplicationVersion: providerVersion,
                success,
                ...(branch !== false ? { branch } : {}),
                verifiedByImplementation: 'ContractCase',
                verifiedByVersion: caseVersion,
                executionDate: new Date(Date.now()).toISOString(),
                tags: [],
              },
              logContext
            )
            .then((t) => t)
        ),

    downloadContract: (url: string, logContext: LogContext) => {
      if (err !== undefined) throw err;
      return makeAxiosConnector(url, auth).authedGet('', logContext);
    },

    urlsForVerification: (serviceName: string, logContext: LogContext) => {
      if (err !== undefined) throw err;
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
