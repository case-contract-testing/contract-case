import type { LogLevel } from 'entities/logger/types';
import type { HttpResponseProviderConfig } from './connectors/types';

export type BaseCaseConfig = {
  logLevel: LogLevel;
  contractDir: string;
  testRunId: string;
};
export type CaseConfig = Partial<HttpResponseProviderConfig> &
  Partial<BaseCaseConfig>;
