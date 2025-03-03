// This module knows how to turn axios responses into
// the relevant response objects or errors

import axios, { AxiosResponse } from 'axios';
import { CaseCoreError } from '@contract-case/case-plugin-base';
import { format as prettyFormat } from 'pretty-format';
import { BrokerError } from '../../../core';
import { API_ERROR, API_NOT_AUTHORISED, API_NO_RESPONSE } from './apiErrors';

export const unmarshallSuccess = <T>(response: AxiosResponse<T>): T =>
  response.data;

export const unmarshallFailure = (error: Error): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new BrokerError(
          `The access token you provided was rejected by the broker\n\n - To assist in debugging, the response body was:\n${prettyFormat(error.response.data, { indent: 4 })}`,
          API_NOT_AUTHORISED,
        );
      }

      if (error.response.data && error.response.data.errors) {
        let errorMessage: string;
        try {
          errorMessage = [
            `The broker returned an error code (${error.response.status})`,
          ]
            .concat(
              Object.entries<string[]>(error.response.data.errors)
                .map(([k, v]: [string, string[]]) =>
                  v.map((message) => `Error in field '${k}': ${message}`),
                )
                .flat(),
            )
            .join('\n');
        } catch {
          errorMessage = `The broker returned an error code (${error.response.status}), and failed to parse the error response`;
        }
        throw new BrokerError(errorMessage, API_ERROR);
      }

      throw new BrokerError(
        `The broker returned an error code (${
          error.response.status
        }): ${JSON.stringify(error.response.data)}`,
        API_ERROR,
      );
    }
    if (error.request) {
      throw new BrokerError(
        `The server didn't respond: ${error.message} `,
        API_NO_RESPONSE,
      );
    }
  }
  throw new CaseCoreError(
    `Broker API Failed with: ${error.message}\n--Original stack trace:${error.stack}`,
  );
};
