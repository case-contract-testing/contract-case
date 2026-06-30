import type { HelloResponse, User } from '../entities/responses.js';

export type BaseService = (ip: string) => HelloResponse;
export type HealthService = {
  ready: () => boolean;
  // The current ETag of the health resource, or undefined if it has no active
  // ETag. Used to answer conditional (If-None-Match) requests.
  etag: () => string | undefined;
};
export type UserService = { getUser: (id: string) => User };

export type UserRepository = { get: (id: string) => User | undefined };

export type BaseServiceDependencies = { baseService: BaseService };
export type UserServiceDependencies = { userRepository: UserRepository };
export type HealthServiceDependencies = { healthService: HealthService };

export type Dependencies = BaseServiceDependencies &
  HealthServiceDependencies &
  UserServiceDependencies;
