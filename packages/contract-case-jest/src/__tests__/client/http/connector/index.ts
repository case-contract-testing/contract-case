import { UserNotFoundConsumerError } from './errors.js';
import { API_NOT_FOUND } from './internals/apiErrors.js';
import { makeAxiosConnector } from './internals/axiosConnector.js';
import type { ServerHealth } from './types.js';

// This is the main API interface. It knows how to turn your business domain
// requests into logical requests for the connector. The connector's job is to
// turn the logical requests into actual requests.

interface User {
  userId: string;
  name: string;
}

interface Api {
  getAllProducts: () => Promise<Array<string>>;
  getProduct: (id: string) => Promise<string>;
  getUserByPath: (id: string) => Promise<User>;
  getUserByQuery: (id: string) => Promise<User>;
  health: () => Promise<ServerHealth>;
}

type WireServerHealth = {
  status: ServerHealth;
};

const api = (baseurl: string): Api => {
  const server = makeAxiosConnector(baseurl);

  return {
    getAllProducts: () => server.authedGet<string[]>('/products'),
    getProduct: (id) => server.authedGet(`/products/${id}`),
    getUserByPath: (id: string) =>
      server.authedGet<User>(`/users/${id}`).catch((e) => {
        if (e.code === API_NOT_FOUND) {
          throw new UserNotFoundConsumerError(`Unable to find user '${id}'`);
        }
        throw e;
      }),
    getUserByQuery: (id: string) =>
      server.authedGet<User>(`/users`, { id }).catch((e) => {
        if (e.code === API_NOT_FOUND) {
          throw new UserNotFoundConsumerError(`Unable to find user '${id}'`);
        }
        throw e;
      }),
    health: () =>
      server.get<WireServerHealth>('/health').then(({ status }) => status),
  };
};

export default api;
