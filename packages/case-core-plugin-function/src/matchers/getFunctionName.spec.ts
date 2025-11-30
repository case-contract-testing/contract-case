import {
  CaseConfigurationError,
  DataContext,
  Logger,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { getFunctionName } from './getFunctionName';

const EMPTY_LOGGER = {
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

const EMPTY_DATA_CONTEXT: DataContext = {
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
  resultPrinter: {
    printError: () => 'PRINT_ERROR',
    printFailureTitle: () => 'PRINT_FAILURE',
    printSuccessTitle: () => 'PRINT_SUCCESS',
    printDownloadedContract: () => 'PRINT_DOWNLOADED_CONTRACT',
  },
  makeLogger(): Logger {
    return EMPTY_LOGGER;
  },
} as const;

const MOCK_LOOKUP = {
  lookupMatcher: () => [],
  saveLookupableMatcher: () => {},
  addDefaultVariable: (): [name: string, value: string] => ['name', 'value'],
  addStateVariable: (): [name: string, value: string] => ['name', 'value'],
  lookupVariable: () => 'TEST VALUE',
  invokeFunctionByHandle: () => Promise.resolve('returnValue'),
};

const EMPTY_MATCH_CONTEXT: MatchContext = {
  ...EMPTY_DATA_CONTEXT,
  descendAndCheck: () => Promise.resolve([]),
  descendAndStrip: () => [],
  descendAndDescribe: () => 'during testing',
  selfVerify: () => Promise.resolve(),
  ...MOCK_LOOKUP,
  makeLookup: () => MOCK_LOOKUP,
  descendAndValidate: () => Promise.resolve(),
};

describe('getFunctionName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns function name from context', () => {
    const context = {
      ...EMPTY_MATCH_CONTEXT,
      '_case:currentRun:context:pluginProvided': {
        functionName: 'mockFunction',
      },
    } as unknown as MatchContext;

    expect(getFunctionName(context)).toBe('mockFunction');
  });

  it('throws if plugin provided context is missing', () => {
    expect(() => getFunctionName(EMPTY_MATCH_CONTEXT)).toThrow(
      CaseConfigurationError,
    );
  });

  it('throws if function name is missing', () => {
    const context = {
      ...EMPTY_MATCH_CONTEXT,
      '_case:currentRun:context:pluginProvided': {},
    } as unknown as MatchContext;

    expect(() => getFunctionName(context)).toThrow(CaseConfigurationError);
  });

  it('throws if function name is not a string', () => {
    const context = {
      ...EMPTY_MATCH_CONTEXT,
      '_case:currentRun:context:pluginProvided': {
        functionName: 123,
      },
    } as unknown as MatchContext;

    expect(() => getFunctionName(context)).toThrow(CaseConfigurationError);
  });
});
