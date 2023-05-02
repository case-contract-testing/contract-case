import { DataContext, Logger, MatchContext } from '../entities/types';

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
  '_case:currentRun:context:location': ['DURING_TESTS'],
  '_case:context:matchBy': 'type',
  '_case:context:serialisableTo': 'json',
  '_case:currentRun:context:contractMode': 'write',
  '_case:currentRun:context:printResults': true,
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

const MOCK_LOOKUP = {
  lookupMatcher: () => [],
  saveLookupableMatcher: () => {},
  addDefaultVariable: (): [name: string, value: string] => ['name', 'value'],
  addStateVariable: (): [name: string, value: string] => ['name', 'value'],
  lookupVariable: () => 'TEST VALUE',
};

export const EMPTY_MATCH_CONTEXT: MatchContext = {
  ...EMPTY_DATA_CONTEXT,
  descendAndCheck: () => Promise.resolve([]),
  descendAndStrip: () => [],
  descendAndDescribe: () => 'during testing',
  selfVerify: () => Promise.resolve([]),
  ...MOCK_LOOKUP,
  makeLookup: () => MOCK_LOOKUP,
};
