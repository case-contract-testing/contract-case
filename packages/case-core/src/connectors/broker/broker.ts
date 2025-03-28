// We need to allow underscores because they're part of the HAL response
/* eslint-disable no-underscore-dangle */

import {
  CaseConfigurationError,
  DataContext,
  LogContext,
} from '@contract-case/case-plugin-base';
import { ContractData } from '@contract-case/case-plugin-base/dist/src/core/contract/types';
import { makeAxiosConnector } from './axios';
import { BasicAuth } from './axios/types';
import {
  WireCanIDeployResponse,
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
  basicAuth: unknown | undefined,
) => {
  if (baseUrl === undefined || baseUrl === '') {
    return new CaseConfigurationError(
      "Can't access a broker without specifying the base URL. Set the environment variable CASE_BROKER_BASEURL or the config property brokerBaseUrl",
    );
  }
  if (typeof baseUrl !== 'string') {
    return new CaseConfigurationError(
      `Expected the baseurl to be a string, but it was '${typeof authToken}'`,
    );
  }

  if (authToken === undefined && basicAuth === undefined) {
    return new CaseConfigurationError(
      "Can't access a broker without an authorization token or basic auth set. Set the environment variable CASE_BROKER_CI_TOKEN",
    );
  }

  if (authToken !== undefined) {
    if (authToken === '') {
      return new CaseConfigurationError(
        "Can't access a broker without an authorization token. Set the environment variable CASE_BROKER_CI_TOKEN",
      );
    }
    if (typeof authToken !== 'string') {
      return new CaseConfigurationError(
        `Expected the authToken to be a string, but it was '${typeof authToken}'`,
      );
    }
  }

  if (authToken === undefined && basicAuth === undefined) {
    return new CaseConfigurationError(
      "Can't access a broker without an authorization token or basic auth set. Set the environment variable CASE_BROKER_CI_TOKEN",
    );
  }
  return undefined;
};

export const makeBrokerApi: MakeBrokerApi = (
  configContext: DataContext,
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
      logContext: LogContext,
    ) => {
      if (err !== undefined) throw err;
      // TODO: Make this a first class object
      logContext.logger.debug(
        `Publishing contract for ${contract.description.consumerName}@${version} -> ${contract.description.providerName} to broker at ${baseUrl}`,
      );

      const path = `/pacts/provider/${encodeURIComponent(
        contract.description.providerName,
      )}/consumer/${encodeURIComponent(
        contract.description.consumerName,
      )}/version/${encodeURIComponent(version)}`;

      logContext.logger.maintainerDebug(`Publish path is: ${path}`);

      return server.authedPut(path, contract, logContext).then((d) => {
        logContext.logger.debug(`Published successfully`);
        logContext.logger.deepMaintainerDebug(
          `Published result was`,
          JSON.stringify(d),
        );
      });
    },

    publishContractAdvanced: (
      contract: ContractData,
      version: string,
      branch: string | false,
      logContext: LogContext,
    ) => {
      if (err !== undefined) throw err;
      logContext.logger.debug(
        `Publishing contract for ${contract.description.consumerName}@${version} -> ${contract.description.providerName} to broker at ${baseUrl}`,
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
        logContext,
      );
    },

    publishVerificationResults: (
      contract: DownloadedContract,
      success: boolean,
      providerVersion: string,
      branch: string | false,
      logContext: LogContext,
    ) =>
      Promise.resolve()
        .then(() => {
          if (err !== undefined) throw err;
          if (contract._links === undefined) {
            logContext.logger.maintainerDebug(
              'No links section in the following contract:',
              contract,
            );
            throw new CaseConfigurationError(
              `The contract between '${contract.description.consumerName}' and '${contract.description.providerName}' doesn't have a links section. It may not have been downloaded from a broker, which means we can't publish verification status`,
            );
          }
          if (
            contract._links['pb:publish-verification-results'] === undefined
          ) {
            logContext.logger.maintainerDebug(
              'No pb:publish-verification-result section in the following contract:',
              contract,
            );
            throw new CaseConfigurationError(
              `The contract between '${contract.description.consumerName}' and '${contract.description.providerName}' doesn't have a publish verification results URL, so we can't publish it.`,
            );
          }
        })
        .then(() =>
          makeAxiosConnector(
            contract._links['pb:publish-verification-results'].href,
            auth,
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
              logContext,
            )
            .then((t) => t),
        ),

    downloadContract: (url: string, logContext: LogContext) => {
      if (err !== undefined) throw err;
      return makeAxiosConnector(url, auth).authedGet('', {}, logContext);
    },

    urlsForVerification: (serviceName: string, logContext: LogContext) => {
      if (err !== undefined) throw err;
      logContext.logger.debug(
        `Finding contracts to verify for service '${serviceName}' on broker at ${baseUrl}`,
      );

      const path = `/pacts/provider/${encodeURIComponent(
        serviceName,
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
          logContext,
        )
        .then((d) => {
          logContext.logger.deepMaintainerDebug(
            `Pacts for verification responded with`,
            JSON.stringify(d, undefined, 2),
          );

          const numPacts = d._embedded.pacts.length;

          logContext.logger.debug(
            `Broker returned ${numPacts} URLs to possible contracts for verification`,
          );

          return d._embedded.pacts.map((contract) => contract._links.self);
        });
    },

    canDeploy: (
      serviceName: string,
      serviceVersion: string,
      environment: string,
      logContext: LogContext,
    ) => {
      if (err !== undefined) throw err;

      logContext.logger.debug(
        `Asking if it's safe to deploy '${serviceName}' at version '${serviceVersion}' to '${environment}', using broker at ${baseUrl}`,
      );
      return server
        .authedGet<WireCanIDeployResponse>(
          '/can-i-deploy',
          {
            pacticipant: serviceName,
            version: serviceVersion,
            environment,
          },
          logContext,
        )
        .then((data) => {
          logContext.logger.maintainerDebug(
            `Can-I-Deploy returned with`,
            JSON.stringify(data, undefined, 2),
          );
          if (
            data.summary.deployable === true &&
            (data.summary.failed !== 0 || data.summary.unknown !== 0)
          ) {
            logContext.logger.warn(
              `!!!! The broker is not behaving as it is documented !!!!`,
            );
            logContext.logger.warn(
              `The broker said it was safe to deploy but had a non zero count of services in state failed (${data.summary.failed}) or unknown (${data.summary.unknown})`,
            );
            logContext.logger.warn(
              `Please raise this with the maintainers of the broker you are using`,
            );
          }
          if (data.summary.deployable !== true) {
            logContext.logger.debug(
              "The broker said it's not safe to deploy. Here's the matrix from the broker, which may be useful:",
              data.matrix,
            );
          }
          return {
            deployable: data.summary.deployable === true,
            reason: `${data.summary.reason}\nsuccess (${data.summary.success}), failed (${data.summary.failed}), unknown / never-verified (${data.summary.unknown}) services`,
          };
        });
    },
  };
};
