import type { HelloResponse, User } from '../entities/responses.js';

export type BaseService = (ip: string) => HelloResponse;
export type HealthService = { ready: () => boolean };
export type UserService = { getUser: (id: string) => User };

export type UserRepository = { get: (id: string) => User | undefined };

export type BaseServiceDependencies = { baseService: BaseService };
export type UserServiceDependencies = { userRepository: UserRepository };
export type HealthServiceDependencies = { healthService: HealthService };

export type Dependencies = BaseServiceDependencies &
  HealthServiceDependencies &
  UserServiceDependencies;
