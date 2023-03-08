import type { LogLevel } from '../../../entities/logger/types';

// TODO figure out a better way to get all the config in here
import type { HttpResponseProviderConfig } from '../executeExample/setup/setupMock/mockConnectors/types';

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

// TODO figure out a better way to get all the config in here
export type CaseConfig = Partial<HttpResponseProviderConfig> &
  Partial<BaseCaseConfig>;
