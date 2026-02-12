import {
  Logger,
  DataContext,
  MatchContext,
  describeMessage,
} from '@contract-case/case-plugin-base';
import { makeResultFormatter } from '../entities/resultPrinter';

export const MAINTAINER_TEST_CONTEXT = {
  testRunId: 'MAINTAINER',
};

const EMPTY_LOGGER: Logger = {
  error(): Promise<void> {
    return Promise.resolve();
  },
  warn(): Promise<void> {
    return Promise.resolve();
  },
  debug(): Promise<void> {
    return Promise.resolve();
  },
  maintainerDebug(): Promise<void> {
    return Promise.resolve();
  },
  deepMaintainerDebug(): Promise<void> {
    return Promise.resolve();
  },
};

export const EMPTY_DATA_CONTEXT: DataContext = {
  '_case:currentRun:context:logLevel': 'none',
  '_case:currentRun:context:parentVersions': [],
  '_case:currentRun:context:location': ['DURING_TESTS'],
  '_case:currentRun:context:connectorClient': 'Tests',
  '_case:context:matchBy': 'type',
  '_case:context:serialisableTo': 'json',
  '_case:currentRun:context:contractMode': 'write',
  '_case:currentRun:context:contractsToWrite': ['hash', 'main'],
  '_case:currentRun:context:printResults': true,
  '_case:currentRun:context:testName': '',
  '_case:currentRun:context:variables': {},
  '_case:currentRun:context:defaultConfig': {},
  '_case:currentRun:context:autoVersionFrom': 'TAG',
  logger: EMPTY_LOGGER,
  resultPrinter: makeResultFormatter({
    printMatchError: () => Promise.resolve(),
    printMessageError: () => Promise.resolve(),
    printTestTitle: () => Promise.resolve(),
  }),
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
  invokeFunctionByHandle: () => Promise.resolve('returnValue'),
};

export const EMPTY_MATCH_CONTEXT: MatchContext = {
  ...EMPTY_DATA_CONTEXT,
  descendAndCheck: () => Promise.resolve([]),
  descendAndStrip: () => [],
  descendAndDescribe: () => describeMessage('during testing'),
  selfVerify: () => Promise.resolve(),
  ...MOCK_LOOKUP,
  makeLookup: () => MOCK_LOOKUP,
  descendAndValidate: () => Promise.resolve(),
};
