import axios from 'axios';

import { unmarshallSuccess, unmarshallFailure } from './marshaller.js';

type HttpConnector = {
  authedGet: <T>(path: string, query?: Record<string, string>) => Promise<T>;
  get: <T>(path: string) => Promise<T>;
  getIfNoneMatch: (
    path: string,
    etag: string,
  ) => Promise<'not-modified' | 'modified'>;
};

// This is the connector for axios.
// It knows how to turn logical requests into axios calls

export const makeAxiosConnector = (baseurl: string): HttpConnector => ({
  authedGet: (path, query) =>
    axios
      .get(`${baseurl}${path}`, {
        headers: { Accept: 'application/json' },
        ...(query ? { params: query } : {}),
        //      headers: { Authorization: `Bearer ${authToken}` },
      })
      .then(unmarshallSuccess, unmarshallFailure),
  get: (path) =>
    axios
      .get(`${baseurl}${path}`, { headers: { Accept: 'application/json' } })
      .then(unmarshallSuccess, unmarshallFailure),
  // A conditional GET. If the server replies 304 Not Modified, the cached copy
  // is still valid; any 2XX means the resource changed.
  getIfNoneMatch: (path, etag) =>
    axios
      .get(`${baseurl}${path}`, {
        headers: { Accept: 'application/json', 'If-None-Match': etag },
        validateStatus: (status) =>
          status === 304 || (status >= 200 && status < 300),
      })
      .then((response) =>
        response.status === 304 ? 'not-modified' : 'modified',
      ),
});
