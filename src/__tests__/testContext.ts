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
  'case:currentRun:context:logLevel': 'none',
  'case:currentRun:context:location': [],
  'case:context:matchBy': 'type',
  'case:context:serialisableTo': 'json',
  'case:currentRun:context:contractMode': 'write',
  'case:currentRun:context:printResults': false,
  'case:currentRun:context:testName': '',
  'case:currentRun:context:variables': {},
  'case:currentRun:context:defaultConfig': {},
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
