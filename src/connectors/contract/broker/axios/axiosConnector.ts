import axios from 'axios';
import type { LogContext } from '../../../../entities/types';

import { unmarshallSuccess, unmarshallFailure } from './marshaller';
import { BasicAuth } from './types';

type HttpConnector = {
  authedGet: <T>(path?: string) => Promise<T>;
  authedPut: <T, R>(
    path: string,
    content: T,
    context: LogContext
  ) => Promise<R>;

  authedPost: <T, R>(
    path: string,
    content: T,
    context: LogContext
  ) => Promise<R>;
};

// This is the connector for axios.
// It knows how to turn logical requests into axios calls

const withAuthHeaders = (
  headers: Record<string, string>,
  auth: string | BasicAuth
) => ({
  ...headers,
  ...(typeof auth === 'string' ? { Authorization: `Bearer ${auth}` } : {}),
});

export const makeAxiosConnector = (
  baseurl: string,
  auth: string | BasicAuth
): HttpConnector => ({
  authedGet: (path = '') =>
    axios
      .get(`${baseurl}${path}`, {
        ...(typeof auth !== 'string' ? { auth } : {}),
        headers: withAuthHeaders(
          {
            //   Accept: 'application/json',
          },
          auth
        ),
      })
      .then(unmarshallSuccess, unmarshallFailure),

  authedPut: (path, content, context: LogContext) => {
    context.logger.maintainerDebug(`PUT: ${baseurl}${path}`, content);
    return axios
      .put(`${baseurl}${path}`, content, {
        ...(typeof auth !== 'string' ? { auth } : {}),
        headers: withAuthHeaders(
          {
            Accept: 'application/json',
          },
          auth
        ),
      })
      .then(unmarshallSuccess, unmarshallFailure);
  },

  authedPost: (path, content, context: LogContext) => {
    context.logger.maintainerDebug(`POST: ${baseurl}${path}`, content);
    return axios
      .post(`${baseurl}${path}`, content, {
        ...(typeof auth !== 'string' ? { auth } : {}),
        headers: withAuthHeaders(
          {
            Accept: 'application/hal+json',
          },
          auth
        ),
      })
      .then(unmarshallSuccess, unmarshallFailure);
  },
});
