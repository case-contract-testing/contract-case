import axios from 'axios';

import { LogContext } from '@contract-case/case-plugin-base';
import { unmarshallSuccess, unmarshallFailure } from './marshaller';
import { BasicAuth } from './types';

type HttpConnector = {
  authedGet: <R>(
    path: string,
    params: Record<string, string>,
    context: LogContext,
  ) => Promise<R>;
  authedPut: <T, R>(
    path: string,
    content: T,
    context: LogContext,
  ) => Promise<R>;

  authedPost: <T, R>(
    path: string,
    content: T,
    context: LogContext,
  ) => Promise<R>;
};

// This is the connector for axios.
// It knows how to turn logical requests into axios calls

const withAuthHeaders = (
  headers: Record<string, string>,
  auth: string | BasicAuth,
) => ({
  ...headers,
  ...(typeof auth === 'string' ? { Authorization: `Bearer ${auth}` } : {}),
});

export const makeAxiosConnector = (
  baseurl: string,
  auth: string | BasicAuth,
): HttpConnector => ({
  authedGet: (
    path: string,
    params: Record<string, string>,
    context: LogContext,
  ) => {
    const url = `${baseurl}${path}`;
    context.logger.deepMaintainerDebug(`GET:`, url);
    return axios
      .get(url, {
        ...(typeof auth !== 'string' ? { auth } : {}),
        headers: withAuthHeaders(
          {
            Accept: 'application/hal+json',
          },
          auth,
        ),
        // include parameters if there were any
        ...(Object.keys(params).length > 0 ? { params } : {}),
      })
      .then(unmarshallSuccess, unmarshallFailure)
      .then((response) => {
        context.logger.deepMaintainerDebug(`RESPONSE(GET):`, response);
        return response;
      });
  },

  authedPut: (path, content, context: LogContext) => {
    context.logger.deepMaintainerDebug(`PUT: ${baseurl}${path}`, content);
    return axios
      .put(`${baseurl}${path}`, content, {
        ...(typeof auth !== 'string' ? { auth } : {}),
        headers: withAuthHeaders(
          {
            Accept: 'application/json',
          },
          auth,
        ),
      })
      .then(unmarshallSuccess, unmarshallFailure)
      .then((response) => {
        context.logger.deepMaintainerDebug(`RESPONSE(PUT):`, response);
        return response;
      });
  },

  authedPost: (path, content, context: LogContext) => {
    context.logger.deepMaintainerDebug(`POST: ${baseurl}${path}`, content);
    return axios
      .post(`${baseurl}${path}`, content, {
        ...(typeof auth !== 'string' ? { auth } : {}),
        headers: withAuthHeaders(
          {
            Accept: 'application/hal+json',
          },
          auth,
        ),
      })
      .then(unmarshallSuccess, unmarshallFailure)
      .then((response) => {
        context.logger.deepMaintainerDebug(`RESPONSE(POST):`, response);
        return response;
      });
  },
});
