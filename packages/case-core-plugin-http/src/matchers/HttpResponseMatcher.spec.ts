import {
  CoreHttpResponseMatcher,
  HTTP_RESPONSE_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  CaseCoreError,
  DataContext,
  Logger,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { HttpResponseMatcher } from './HttpResponseMatcher';

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
  descendAndDescribeResult: string;
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

describe('HttpResponseMatcher', () => {
  let mockMatchContext: MatchContext;

  const responseMatcher: CoreHttpResponseMatcher = {
    '_case:matcher:type': HTTP_RESPONSE_MATCHER_TYPE,
    status: 200,
  };

  beforeEach(() => {
    mockMatchContext = createMockMatchContext({
      descendAndCheckResult: [],
      descendAndStripResult: 'stripped',
      descendAndDescribeResult: '"default description"',
    });
  });

  describe('describe()', () => {
    it('describes response with status only', () => {
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: '200',
      });
      expect(
        HttpResponseMatcher.describe(responseMatcher, mockMatchContext),
      ).toBe('returns a (200) response without a body');
    });

    it('describes response with body', () => {
      const matcherWithBody = {
        ...responseMatcher,
        body: { some: 'body' },
      };
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      expect(
        HttpResponseMatcher.describe(matcherWithBody, mockMatchContext),
      ).toBe('returns a (description) response with body description');
    });

    it('describes response with headers', () => {
      const matcherWithHeaders = {
        ...responseMatcher,
        headers: { 'Content-Type': 'application/json' },
      };
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      expect(
        HttpResponseMatcher.describe(matcherWithHeaders, mockMatchContext),
      ).toBe(
        'returns a (description) response without a body with the following headers description',
      );
    });

    it('uses unique name if present', () => {
      const matcherWithUniqueName = {
        ...responseMatcher,
        uniqueName: 'My Unique Response',
      };
      expect(
        HttpResponseMatcher.describe(matcherWithUniqueName, mockMatchContext),
      ).toBe('returns My Unique Response');
    });
  });

  describe('check', () => {
    it('throws if actual is not an http response', async () => {
      await expect(
        HttpResponseMatcher.check(
          responseMatcher,
          mockMatchContext,
          'not-a-response',
        ),
      ).rejects.toThrow(CaseCoreError);
    });

    it('checks status', async () => {
      const actual = { status: 200, headers: {} };
      const result = await HttpResponseMatcher.check(
        responseMatcher,
        mockMatchContext,
        actual,
      );
      expect(result).toEqual([]);
    });

    it('checks body if present', async () => {
      const matcherWithBody = {
        ...responseMatcher,
        body: { some: 'body' },
      };
      const actual = { status: 200, headers: {}, body: { some: 'body' } };
      const result = await HttpResponseMatcher.check(
        matcherWithBody,
        mockMatchContext,
        actual,
      );
      expect(result).toEqual([]);
    });

    it('checks headers if present', async () => {
      const matcherWithHeaders = {
        ...responseMatcher,
        headers: { 'Content-Type': 'application/json' },
      };
      const actual = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      };
      const result = await HttpResponseMatcher.check(
        matcherWithHeaders,
        mockMatchContext,
        actual,
      );
      expect(result).toEqual([]);
    });
  });

  describe('strip', () => {
    it('strips status', () => {
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 200,
        descendAndDescribeResult: 'description',
      });
      expect(
        HttpResponseMatcher.strip(responseMatcher, mockMatchContext),
      ).toEqual({
        status: 200,
      });
    });

    it('strips body if present', () => {
      const matcherWithBody = {
        ...responseMatcher,
        body: { some: 'body' },
      };
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      // Mocking mustResolveToNumber for status
      const contextWithNumber = {
        ...mockMatchContext,
        descendAndStrip: (matcher: any) => {
          if (matcher === 200) return 200;
          return 'stripped';
        },
      };

      expect(
        HttpResponseMatcher.strip(matcherWithBody, contextWithNumber),
      ).toEqual({
        status: 200,
        body: 'stripped',
      });
    });

    it('strips headers if present', () => {
      const matcherWithHeaders = {
        ...responseMatcher,
        headers: { 'Content-Type': 'application/json' },
      };
      const contextWithNumber = {
        ...mockMatchContext,
        descendAndStrip: (matcher: any) => {
          if (matcher === 200) return 200;
          return 'stripped';
        },
      };
      expect(
        HttpResponseMatcher.strip(matcherWithHeaders, contextWithNumber),
      ).toEqual({
        status: 200,
        headers: 'stripped',
      });
    });
  });

  describe('validate', () => {
    it('validates status', async () => {
      await expect(
        HttpResponseMatcher.validate(responseMatcher, mockMatchContext),
      ).resolves.not.toThrow();
    });

    it('validates body if present', async () => {
      const matcherWithBody = {
        ...responseMatcher,
        body: { some: 'body' },
      };
      await expect(
        HttpResponseMatcher.validate(matcherWithBody, mockMatchContext),
      ).resolves.not.toThrow();
    });

    it('validates headers if present', async () => {
      const matcherWithHeaders = {
        ...responseMatcher,
        headers: { 'Content-Type': 'application/json' },
      };
      await expect(
        HttpResponseMatcher.validate(matcherWithHeaders, mockMatchContext),
      ).resolves.not.toThrow();
    });
  });
});
