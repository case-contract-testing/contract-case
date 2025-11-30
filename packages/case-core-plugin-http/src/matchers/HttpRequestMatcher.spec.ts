import {
  CoreHttpRequestMatcher,
  HTTP_REQUEST_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  CaseConfigurationError,
  CaseCoreError,
  DataContext,
  Logger,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { HttpRequestMatcher } from './HttpRequestMatcher';

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

describe('HttpRequestMatcher', () => {
  let mockMatchContext: MatchContext;

  const matcher: CoreHttpRequestMatcher = {
    '_case:matcher:type': HTTP_REQUEST_MATCHER_TYPE,
    method: 'GET',
    path: '/some/path',
  };

  beforeEach(() => {
    mockMatchContext = createMockMatchContext({
      descendAndCheckResult: [],
      descendAndStripResult: 'stripped',
      descendAndDescribeResult: '"default description"',
    });
  });

  describe('describe()', () => {
    it('describes basic request', () => {
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      expect(HttpRequestMatcher.describe(matcher, mockMatchContext)).toBe(
        'an http description request to description without a body',
      );
    });

    it('describes request with body', () => {
      const matcherWithBody = {
        ...matcher,
        body: { some: 'body' },
      };
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      expect(
        HttpRequestMatcher.describe(matcherWithBody, mockMatchContext),
      ).toBe('an http description request to description and body description');
    });

    it('describes request with query', () => {
      const matcherWithQuery = {
        ...matcher,
        query: { foo: 'bar' },
      };
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      expect(
        HttpRequestMatcher.describe(matcherWithQuery, mockMatchContext),
      ).toBe(
        'an http description request to description?foo=description without a body',
      );
    });

    it('describes request with headers', () => {
      const matcherWithHeaders = {
        ...matcher,
        headers: { 'Content-Type': 'application/json' },
      };
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      expect(
        HttpRequestMatcher.describe(matcherWithHeaders, mockMatchContext),
      ).toBe(
        'an http description request to description with the following headers description without a body',
      );
    });

    it('uses unique name if present', () => {
      const matcherWithUniqueName = {
        ...matcher,
        uniqueName: 'My Unique Request',
      };
      expect(
        HttpRequestMatcher.describe(matcherWithUniqueName, mockMatchContext),
      ).toBe('My Unique Request');
    });
  });

  describe('check', () => {
    it('throws if actual is missing', async () => {
      await expect(
        HttpRequestMatcher.check(matcher, mockMatchContext, undefined),
      ).rejects.toThrow(CaseConfigurationError);
    });

    it('throws if actual is not http request data', async () => {
      await expect(
        HttpRequestMatcher.check(matcher, mockMatchContext, { foo: 'bar' }),
      ).rejects.toThrow(CaseCoreError);
    });

    it('checks method and path', async () => {
      const actual = { method: 'GET', path: '/some/path' };
      const result = await HttpRequestMatcher.check(
        matcher,
        mockMatchContext,
        actual,
      );
      expect(result).toEqual([]);
    });

    it('checks body if present', async () => {
      const matcherWithBody = {
        ...matcher,
        body: { some: 'body' },
      };
      const actual = {
        method: 'GET',
        path: '/some/path',
        body: { some: 'body' },
      };
      const result = await HttpRequestMatcher.check(
        matcherWithBody,
        mockMatchContext,
        actual,
      );
      expect(result).toEqual([]);
    });

    it('checks query if present', async () => {
      const matcherWithQuery = {
        ...matcher,
        query: { foo: 'bar' },
      };
      const actual = {
        method: 'GET',
        path: '/some/path',
        query: { foo: 'bar' },
      };
      const result = await HttpRequestMatcher.check(
        matcherWithQuery,
        mockMatchContext,
        actual,
      );
      expect(result).toEqual([]);
    });

    it('checks headers if present', async () => {
      const matcherWithHeaders = {
        ...matcher,
        headers: { 'Content-Type': 'application/json' },
      };
      const actual = {
        method: 'GET',
        path: '/some/path',
        headers: { 'Content-Type': 'application/json' },
      };
      const result = await HttpRequestMatcher.check(
        matcherWithHeaders,
        mockMatchContext,
        actual,
      );
      expect(result).toEqual([]);
    });
  });

  describe('strip', () => {
    it('strips method and path', () => {
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      expect(HttpRequestMatcher.strip(matcher, mockMatchContext)).toEqual({
        method: 'stripped',
        path: 'stripped',
      });
    });

    it('strips body if present', () => {
      const matcherWithBody = {
        ...matcher,
        body: { some: 'body' },
      };
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      expect(
        HttpRequestMatcher.strip(matcherWithBody, mockMatchContext),
      ).toEqual({
        method: 'stripped',
        path: 'stripped',
        body: 'stripped',
      });
    });

    it('strips query if present', () => {
      const matcherWithQuery = {
        ...matcher,
        query: { foo: 'bar' },
      };
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      expect(
        HttpRequestMatcher.strip(matcherWithQuery, mockMatchContext),
      ).toEqual({
        method: 'stripped',
        path: 'stripped',
        query: 'stripped',
      });
    });

    it('strips headers if present', () => {
      const matcherWithHeaders = {
        ...matcher,
        headers: { 'Content-Type': 'application/json' },
      };
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: 'description',
      });
      expect(
        HttpRequestMatcher.strip(matcherWithHeaders, mockMatchContext),
      ).toEqual({
        method: 'stripped',
        path: 'stripped',
        headers: 'stripped',
      });
    });
  });

  describe('validate', () => {
    it('validates successfully', async () => {
      await expect(
        HttpRequestMatcher.validate(matcher, mockMatchContext),
      ).resolves.not.toThrow();
    });

    it('validates body if present', async () => {
      const matcherWithBody = {
        ...matcher,
        body: { some: 'body' },
      };
      await expect(
        HttpRequestMatcher.validate(matcherWithBody, mockMatchContext),
      ).resolves.not.toThrow();
    });

    it('validates query if present', async () => {
      const matcherWithQuery = {
        ...matcher,
        query: { foo: 'bar' },
      };
      await expect(
        HttpRequestMatcher.validate(matcherWithQuery, mockMatchContext),
      ).resolves.not.toThrow();
    });

    it('validates headers if present', async () => {
      const matcherWithHeaders = {
        ...matcher,
        headers: { 'Content-Type': 'application/json' },
      };
      await expect(
        HttpRequestMatcher.validate(matcherWithHeaders, mockMatchContext),
      ).resolves.not.toThrow();
    });
  });
});
