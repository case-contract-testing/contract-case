import {
  Server,
  ServiceDefinition,
  UntypedServiceImplementation,
} from '@grpc/grpc-js';

export const createServer = (
  service: ServiceDefinition,
  handlers: UntypedServiceImplementation,
): Server => {
  const server = new Server();
  server.addService(service, handlers);
  return server;
};
