import {
  CoreUrlEncodedStringMatcher,
  URL_ENCODED_STRING_TYPE,
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
import { UrlEncodedStringMatcher } from './UrlEncodedStringMatcher';

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

describe('UrlEncodedStringMatcher', () => {
  let mockMatchContext: MatchContext;

  // TODO: We should replace this literal with a use of a generated type.
  const matcher: CoreUrlEncodedStringMatcher = {
    '_case:matcher:type': URL_ENCODED_STRING_TYPE,
    '_case:matcher:child': {
      '_case:matcher:type': 'some-child-matcher',
    } as any,
    // TODO: The `accepts` concept is unused, we should remove it
    '_case:matcher:accepts': 'string',
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
    it('returns formatted description with child description', () => {
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: describeMessage('child description'),
      });
      expect(renderToString(UrlEncodedStringMatcher.describe(matcher, mockMatchContext))).toBe(
        "uriEncoded string 'child description'",
      );
    });
  });

  describe('check()', () => {
    describe('when actual is not a string', () => {
      it('returns an error', async () => {
        const result = await UrlEncodedStringMatcher.check(
          matcher,
          mockMatchContext,
          123,
        );
        expect(result).toHaveLength(1);
        expect(result[0]?.message).toContain('is not a string');
      });
    });

    describe('when actual is a valid encoded string', () => {
      it('decodes and checks against child matcher', async () => {
        const actual = 'some%20value';
        const result = await UrlEncodedStringMatcher.check(
          matcher,
          mockMatchContext,
          actual,
        );
        expect(result).toEqual([]);
      });
    });
  });

  describe('strip()', () => {
    describe('when child resolves to a string', () => {
      it('encodes the result', () => {
        const context = createMockMatchContext({
          descendAndCheckResult: [],
          descendAndStripResult: 'some value',
          descendAndDescribeResult: describeMessage('description'),
        });
        expect(UrlEncodedStringMatcher.strip(matcher, context)).toBe(
          'some%20value',
        );
      });
    });

    describe('when child does not resolve to a string', () => {
      it('throws a configuration error', () => {
        const context = createMockMatchContext({
          descendAndCheckResult: [],
          descendAndStripResult: 123,
          descendAndDescribeResult: describeMessage('description'),
        });
        expect(() => UrlEncodedStringMatcher.strip(matcher, context)).toThrow(
          CaseConfigurationError,
        );
      });
    });
  });

  describe('validate()', () => {
    describe('when child resolves to a valid encodable string', () => {
      it('does not throw', async () => {
        const context = createMockMatchContext({
          descendAndCheckResult: [],
          descendAndStripResult: 'some value',
          descendAndDescribeResult: describeMessage('description'),
        });

        await expect(
          UrlEncodedStringMatcher.validate(matcher, context),
        ).resolves.not.toThrow();
      });
    });

    describe('when child does not resolve to a string', () => {
      it('throws an error', async () => {
        const context = createMockMatchContext({
          descendAndCheckResult: [],
          descendAndStripResult: 123,
          descendAndDescribeResult: describeMessage('description'),
        });

        await expect(
          UrlEncodedStringMatcher.validate(matcher, context),
        ).rejects.toThrow();
      });
    });

    describe('when decoded string is invalid', () => {
      it('throws a configuration error', async () => {
        const context = createMockMatchContext({
          descendAndCheckResult: [],
          descendAndStripResult: '%E0%A4%A',
          descendAndDescribeResult: describeMessage('description'),
        });

        await expect(
          UrlEncodedStringMatcher.validate(matcher, context),
        ).rejects.toThrow(CaseConfigurationError);
      });
    });
  });
});
