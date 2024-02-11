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

type WireErrorResponse = {
  message: string;
};

const isWireErrorResponse = (data: unknown): data is WireErrorResponse => {
  const maybeResponse = data as WireErrorResponse;
  return (
    typeof maybeResponse === 'object' &&
    'message' in maybeResponse &&
    typeof maybeResponse.message === 'string'
  );
};

export const unmarshallFailure = (error: Error): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new ApiError(
          "The server says that you're not authorised.",
          API_NOT_AUTHORISED,
        );
      }

      if (error.response.status === 404) {
        throw new ApiError(`Not found: ${error.response.data}`, API_NOT_FOUND);
      }

      throw new ApiError(
        error.response.data && isWireErrorResponse(error.response.data)
          ? error.response.data.message
          : `The server returned an error code (${error.response.status})`,
        API_ERROR,
      );
    }
    if (error.request) {
      throw new ApiError(
        `The server didn't respond: ${error.message} `,
        API_NO_RESPONSE,
      );
    }
  }
  throw new Error(`[API Failed] ${error.message}`);
};
