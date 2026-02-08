import {
  CoreHttpBasicAuthValueMatcher,
  HTTP_BASIC_AUTH_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  CaseConfigurationError,
  DataContext,
  DescribeSegment,
  describeMessage,
  Logger,
  MatchContext,
  renderToString,
} from '@contract-case/case-plugin-base';
import { HttpBasicAuthMatcher } from './HttpBasicAuthMatcher';

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

interface MockState {
  descendAndCheckResult: any[];
  descendAndStripResult: any;
  descendAndDescribeResult: DescribeSegment;
}

const createMockMatchContext = (state: MockState): MatchContext => ({
  ...EMPTY_DATA_CONTEXT,
  descendAndCheck: () => Promise.resolve(state.descendAndCheckResult),
  descendAndStrip: () => state.descendAndStripResult,
  descendAndDescribe: () => state.descendAndDescribeResult,
  selfVerify: () => Promise.resolve(),
  ...MOCK_LOOKUP,
  makeLookup: () => MOCK_LOOKUP,
  descendAndValidate: () => Promise.resolve(),
});

describe('HttpBasicAuthMatcher', () => {
  let mockMatchContext: MatchContext;

  const matcher: CoreHttpBasicAuthValueMatcher = {
    '_case:matcher:type': HTTP_BASIC_AUTH_TYPE,
    '_case:matcher:username': 'user',
    '_case:matcher:password': 'pass',
    '_case:matcher:resolvesTo': 'string',
  };

  beforeEach(() => {
    mockMatchContext = createMockMatchContext({
      descendAndCheckResult: [],
      descendAndStripResult: 'stripped',
      descendAndDescribeResult: describeMessage('"default description"'),
    });
  });

  describe('describe()', () => {
    it('returns formatted basic auth description', () => {
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: describeMessage('description'),
      });
      expect(renderToString(HttpBasicAuthMatcher.describe(matcher, mockMatchContext))).toBe(
        "http basic auth with username='description' and password=description",
      );
    });
  });

  describe('check()', () => {
    describe('when actual is not a string', () => {
      it('returns an error', async () => {
        const result = await HttpBasicAuthMatcher.check(
          matcher,
          mockMatchContext,
          123,
        );
        expect(result).toHaveLength(1);
        expect(result[0]?.message).toContain('is not a string');
      });
    });

    describe('when decoded string does not contain colon', () => {
      it('returns an error', async () => {
        const actual = Buffer.from('no-colon').toString('base64');
        const result = await HttpBasicAuthMatcher.check(
          matcher,
          mockMatchContext,
          actual,
        );
        expect(result).toHaveLength(1);
        expect(result[0]?.message).toContain("doesn't contain a ':'");
      });
    });

    describe('when actual is valid base64 with username and password', () => {
      it('returns no errors', async () => {
        const actual = Buffer.from('user:pass').toString('base64');
        const result = await HttpBasicAuthMatcher.check(
          matcher,
          mockMatchContext,
          actual,
        );
        expect(result).toEqual([]);
      });
    });
  });

  describe('strip()', () => {
    describe('when username and password are valid strings', () => {
      it('encodes them as base64', () => {
        const context = createMockMatchContext({
          descendAndCheckResult: [],
          descendAndStripResult: 'stripped',
          descendAndDescribeResult: describeMessage('description'),
        });

        const expected = Buffer.from('stripped:stripped').toString('base64');
        expect(HttpBasicAuthMatcher.strip(matcher, context)).toBe(expected);
      });
    });

    describe('when username is not a string', () => {
      it('throws a configuration error', () => {
        const context = createMockMatchContext({
          descendAndCheckResult: [],
          descendAndStripResult: 123,
          descendAndDescribeResult: describeMessage('description'),
        });

        expect(() => HttpBasicAuthMatcher.strip(matcher, context)).toThrow(
          CaseConfigurationError,
        );
      });
    });

    describe('when username contains a colon', () => {
      it('throws a configuration error', () => {
        const context = {
          ...mockMatchContext,
          descendAndStrip: () => 'user:name',
        };
        expect(() => HttpBasicAuthMatcher.strip(matcher, context)).toThrow(
          CaseConfigurationError,
        );
      });
    });
  });

  describe('validate()', () => {
    describe('when matcher is valid', () => {
      it('does not throw', async () => {
        await expect(
          HttpBasicAuthMatcher.validate(matcher, mockMatchContext),
        ).resolves.not.toThrow();
      });
    });

    describe('when username is missing', () => {
      it('throws a configuration error', async () => {
        const invalidMatcher = {
          '_case:matcher:type': HTTP_BASIC_AUTH_TYPE,
          '_case:matcher:password': 'pass',
        } as any;
        await expect(
          HttpBasicAuthMatcher.validate(invalidMatcher, mockMatchContext),
        ).rejects.toThrow(CaseConfigurationError);
      });
    });

    describe('when password is missing', () => {
      it('throws a configuration error', async () => {
        const invalidMatcher = {
          '_case:matcher:type': HTTP_BASIC_AUTH_TYPE,
          '_case:matcher:username': 'user',
        } as any;
        await expect(
          HttpBasicAuthMatcher.validate(invalidMatcher, mockMatchContext),
        ).rejects.toThrow(CaseConfigurationError);
      });
    });
  });
});
