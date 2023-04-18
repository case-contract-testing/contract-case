import { DataContext, Logger } from '../entities/types';

export const MAINTAINER_TEST_CONTEXT = {
  testRunId: 'MAINTAINER',
};

const EMPTY_LOGGER: Logger = {
  error(): void {},
  warn(): void {},
  debug(): void {},
  maintainerDebug(): void {},
  deepMaintainerDebug(): void {},
};

export const EMPTY_DATA_CONTEXT: DataContext = {
  '_case:currentRun:context:logLevel': 'none',
  '_case:currentRun:context:location': [],
  '_case:context:matchBy': 'type',
  '_case:context:serialisableTo': 'json',
  '_case:currentRun:context:contractMode': 'write',
  '_case:currentRun:context:printResults': false,
  '_case:currentRun:context:testName': '',
  '_case:currentRun:context:variables': {},
  '_case:currentRun:context:defaultConfig': {},
  logger: EMPTY_LOGGER,
  resultPrinter: {
    printError(): void {},
    printSuccessTitle(): void {},
    printFailureTitle(): void {},
    printDownloadedContract(): void {},
  },
  makeLogger(): Logger {
    return EMPTY_LOGGER;
  },
};
