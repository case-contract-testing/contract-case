import type { HelloResponse } from '../model/responses';

export type BaseService = (ip: string) => HelloResponse;
export type HealthService = { ready: () => boolean };

export type BaseServiceDependencies = { baseService: BaseService };
export type HealthServiceDependencies = { healthService: HealthService };

export type Dependencies = BaseServiceDependencies & HealthServiceDependencies;
