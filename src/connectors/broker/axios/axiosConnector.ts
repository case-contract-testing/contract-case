import axios from 'axios';
import type { MatchContext } from '../../../entities/types';

import { unmarshallSuccess, unmarshallFailure } from './marshaller';

type HttpConnector = {
  authedGet: <T>(path: string) => Promise<T>;
  authedPut: <T, R>(
    path: string,
    content: T,
    context: MatchContext
  ) => Promise<R>;
};

// This is the connector for axios.
// It knows how to turn logical requests into axios calls

export const makeAxiosConnector = (
  baseurl: string,
  authToken: string
): HttpConnector => ({
  authedGet: (path) =>
    axios
      .get(`${baseurl}${path}`, {
        headers: {
          //   Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(unmarshallSuccess, unmarshallFailure),

  authedPut: (path, content, context: MatchContext) => {
    context.logger.maintainerDebug(`PUT: ${baseurl}${path}`);
    return axios
      .put(`${baseurl}${path}`, content, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(unmarshallSuccess, unmarshallFailure);
  },
});
