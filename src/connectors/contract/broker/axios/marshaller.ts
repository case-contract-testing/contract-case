// This module knows how to turn axios responses into
// the relevant response objects or errors

import axios, { AxiosResponse } from 'axios';
import {
  ApiError,
  API_ERROR,
  API_NOT_AUTHORISED,
  API_NOT_FOUND,
  API_NO_RESPONSE,
} from './apiErrors';

export const unmarshallSuccess = <T>(response: AxiosResponse<T>): T =>
  response.data;

export const unmarshallFailure = (error: Error): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new ApiError(
          `The access token you provided was rejected by the broker`,
          API_NOT_AUTHORISED
        );
      }
      if (error.response.status === 404) {
        throw new ApiError(
          `${JSON.stringify(error.request.url)} Not found: ${JSON.stringify(
            error.response.data
          )}`,
          API_NOT_FOUND
        );
      }

      throw new ApiError(
        error.response.data
          ? error.response.data.message
          : `The server returned an error code (${error.response.status})`,
        API_ERROR
      );
    }
    if (error.request) {
      throw new ApiError(
        `The server didn't respond: ${error.message} `,
        API_NO_RESPONSE
      );
    }
  }
  throw new Error(`[API Failed] ${error.message}`);
};
