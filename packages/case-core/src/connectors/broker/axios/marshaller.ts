// This module knows how to turn axios responses into
// the relevant response objects or errors

import axios, { AxiosResponse } from 'axios';
import {
  BrokerError,
  API_ERROR,
  API_NOT_AUTHORISED,
  API_NO_RESPONSE,
} from './apiErrors';

export const unmarshallSuccess = <T>(response: AxiosResponse<T>): T =>
  response.data;

export const unmarshallFailure = (error: Error): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new BrokerError(
          `The access token you provided was rejected by the broker`,
          API_NOT_AUTHORISED
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
                  v.map((message) => `Error in field '${k}': ${message}`)
                )
                .flat()
            )
            .join('\n');
        } catch {
          errorMessage = `The broker returned an error code (${error.response.status}), and failed to parse the error response`;
        }
        throw new BrokerError(errorMessage);
      }

      throw new BrokerError(
        `The broker returned an error code (${
          error.response.status
        }): ${JSON.stringify(error.response.data)}`,
        API_ERROR
      );
    }
    if (error.request) {
      throw new BrokerError(
        `The server didn't respond: ${error.message} `,
        API_NO_RESPONSE
      );
    }
  }
  throw new Error(`[API Failed] ${error.message}`);
};
