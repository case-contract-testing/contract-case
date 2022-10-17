import { makeAxiosConnector } from './internals/axiosConnector';
import type { ServerHealth } from './types';

// This is the main API interface. It knows how to turn your business domain
// requests into logical requests for the connector. The connector's job is to
// turn the logical requests into actual requests.

interface Api {
  getAllProducts: () => Promise<Array<string>>;
  getProduct: (id: string) => Promise<string>;
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
    health: () =>
      server.get<WireServerHealth>('/health').then(({ status }) => status),
  };
};

export default api;
