import { TriggerConfig } from './entities/types';

export * from './boundaries';
export * from './jest';
export * as dsl from './boundaries/dsl';
export * from './entities/types';

// TODO remove this hack type and do it properly
export type HttpRequestConfig = TriggerConfig<{
  baseUrl: string;
}>;
