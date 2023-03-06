import type { LogLevel } from '../../../../../../entities/logger/types';
import type { HttpResponseProviderConfig } from './connectors/types';

export type BaseCaseConfig = {
  logLevel: LogLevel;
  /**
   * The directory where the contract will be written. If you provide this, case
   * will generate the filename for you (unless `contractFilename` is specified,
   * in which case this setting is ignored)
   */
  contractDir: string;
  /**
   * The filename where the contract will be written. If you
   * provide this, `contractDir` is ignored
   */
  contractFilename?: string;
  testRunId: string;
  printResults: boolean;
};
export type CaseConfig = Partial<HttpResponseProviderConfig> &
  Partial<BaseCaseConfig>;
