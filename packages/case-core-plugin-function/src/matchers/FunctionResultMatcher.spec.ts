import {
  CoreFunctionErrorResultMatcher,
  CoreFunctionSuccessResultMatcher,
  FUNCTION_RESULT_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  CaseConfigurationError,
  CaseCoreError,
  DataContext,
  DescribeSegment,
  describeMessage,
  Logger,
  MatchContext,
  renderToString,
} from '@contract-case/case-plugin-base';
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';
import {
  FunctionResultMatcherExecutor,
  isSuccessResult,
} from './FunctionResultMatcher';

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

describe('FunctionResultMatcherExecutor', () => {
  let mockMatchContext: MatchContext;

  const successMatcher: CoreFunctionSuccessResultMatcher = {
    '_case:matcher:type': FUNCTION_RESULT_MATCHER_TYPE,
    success: 'SomeSuccess',
  };

  const errorMatcher: CoreFunctionErrorResultMatcher = {
    '_case:matcher:type': FUNCTION_RESULT_MATCHER_TYPE,
    errorClassName: 'SomeError',
  };

  beforeEach(() => {
    mockMatchContext = createMockMatchContext({
      descendAndCheckResult: [],
      descendAndStripResult: 'stripped',
      descendAndDescribeResult: describeMessage('"default description"'),
    });
  });

  describe('isSuccessResult', () => {
    it('returns true for success matcher', () => {
      expect(isSuccessResult(successMatcher)).toBe(true);
    });

    it('returns false for error matcher', () => {
      expect(isSuccessResult(errorMatcher)).toBe(false);
    });
  });

  describe('description function', () => {
    it('describes success result', () => {
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: describeMessage('some description'),
      });
      expect(
        renderToString(FunctionResultMatcherExecutor.describe(
          successMatcher,
          mockMatchContext,
        )),
      ).toBe('returns some description');
    });

    it('describes error result', () => {
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: describeMessage('"SomeError"'),
      });
      expect(
        renderToString(FunctionResultMatcherExecutor.describe(errorMatcher, mockMatchContext)),
      ).toBe('throwing a SomeError');
    });

    it('describes error result with message', () => {
      const errorMatcherWithMessage = {
        ...errorMatcher,
        message: {
          'case:matcher:type': 'some-matcher',
        } as unknown as AnyCaseMatcherOrData,
      };

      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: describeMessage('"SomeError"'),
      });

      const result = renderToString(FunctionResultMatcherExecutor.describe(
        errorMatcherWithMessage,
        mockMatchContext,
      ));

      // The result should contain both the error class and message
      expect(result).toContain('throwing a SomeError');
      expect(result).toContain('with message');
    });
  });

  describe('check', () => {
    describe('success matcher', () => {
      describe('when actual is a success result', () => {
        beforeEach(() => {
          mockMatchContext = createMockMatchContext({
            descendAndCheckResult: [],
            descendAndStripResult: 'stripped',
            descendAndDescribeResult: describeMessage('"default"'),
          });
        });

        it('checks success result', async () => {
          const actual = { success: JSON.stringify('some-value') };

          const result = await FunctionResultMatcherExecutor.check(
            successMatcher,
            mockMatchContext,
            actual,
          );

          expect(result).toEqual([]);
        });
      });

      describe('when actual is not an object', () => {
        it('throws core error', async () => {
          await expect(
            FunctionResultMatcherExecutor.check(
              successMatcher,
              mockMatchContext,
              'not-an-object',
            ),
          ).rejects.toThrow(CaseCoreError);
        });
      });

      describe('when success property is not a string', () => {
        it('throws core error', async () => {
          const actual = { success: 123 };
          await expect(
            FunctionResultMatcherExecutor.check(
              successMatcher,
              mockMatchContext,
              actual,
            ),
          ).rejects.toThrow(CaseCoreError);
        });
      });

      describe('when success property is not valid JSON', () => {
        it('throws core error', async () => {
          const actual = { success: 'invalid-json' };
          await expect(
            FunctionResultMatcherExecutor.check(
              successMatcher,
              mockMatchContext,
              actual,
            ),
          ).rejects.toThrow(CaseCoreError);
        });
      });

      describe('when actual is a failure result', () => {
        beforeEach(() => {
          mockMatchContext = createMockMatchContext({
            descendAndCheckResult: [],
            descendAndStripResult: 'stripped-expected',
            descendAndDescribeResult: describeMessage('"default"'),
          });
        });

        it('returns error', async () => {
          const actual = { errorClassName: 'SomeError' };

          const result = await FunctionResultMatcherExecutor.check(
            successMatcher,
            mockMatchContext,
            actual,
          );

          expect(result).toHaveLength(1);
          expect(result[0]?.message).toBe(
            'Expected the function to return success, but it failed with an error',
          );
        });
      });

      describe('when actual is invalid response', () => {
        it('throws core error', async () => {
          const actual = { foo: 'bar' };
          await expect(
            FunctionResultMatcherExecutor.check(
              successMatcher,
              mockMatchContext,
              actual,
            ),
          ).rejects.toThrow(CaseCoreError);
        });
      });
    });

    describe('error matcher', () => {
      describe('when actual is an error result', () => {
        beforeEach(() => {
          mockMatchContext = createMockMatchContext({
            descendAndCheckResult: [],
            descendAndStripResult: 'stripped',
            descendAndDescribeResult: describeMessage('"default"'),
          });
        });

        it('checks error result', async () => {
          const actual = { errorClassName: 'SomeError' };

          const result = await FunctionResultMatcherExecutor.check(
            errorMatcher,
            mockMatchContext,
            actual,
          );

          expect(result).toEqual([]);
        });
      });

      describe('when actual is a success result', () => {
        beforeEach(() => {
          mockMatchContext = createMockMatchContext({
            descendAndCheckResult: [],
            descendAndStripResult: 'stripped-expected',
            descendAndDescribeResult: describeMessage('"default"'),
          });
        });

        it('returns error', async () => {
          const actual = { success: 'some-value' };

          const result = await FunctionResultMatcherExecutor.check(
            errorMatcher,
            mockMatchContext,
            actual,
          );

          expect(result).toHaveLength(1);
          expect(result[0]?.message).toBe(
            'Expected the function to throw an error, but it returned successfully',
          );
        });
      });
    });
  });

  describe('strip', () => {
    beforeEach(() => {
      mockMatchContext = createMockMatchContext({
        descendAndCheckResult: [],
        descendAndStripResult: 'stripped',
        descendAndDescribeResult: describeMessage('"default"'),
      });
    });

    it('strips success result', () => {
      expect(
        FunctionResultMatcherExecutor.strip(successMatcher, mockMatchContext),
      ).toEqual({ success: JSON.stringify('stripped') });
    });

    it('strips error result', () => {
      expect(
        FunctionResultMatcherExecutor.strip(errorMatcher, mockMatchContext),
      ).toEqual({ errorClassName: 'stripped' });
    });

    it('strips error result with message', () => {
      const errorMatcherWithMessage = {
        ...errorMatcher,
        message: {
          'case:matcher:type': 'some-matcher',
        } as unknown as AnyCaseMatcherOrData,
      };
      expect(
        FunctionResultMatcherExecutor.strip(
          errorMatcherWithMessage,
          mockMatchContext,
        ),
      ).toEqual({ errorClassName: 'stripped', message: 'stripped' });
    });
  });

  describe('validate', () => {
    describe('when matcher is valid', () => {
      it('validates success matcher', async () => {
        await expect(
          FunctionResultMatcherExecutor.validate(
            successMatcher,
            mockMatchContext,
          ),
        ).resolves.not.toThrow();
      });

      it('validates error matcher', async () => {
        await expect(
          FunctionResultMatcherExecutor.validate(
            errorMatcher,
            mockMatchContext,
          ),
        ).resolves.not.toThrow();
      });

      it('validates error matcher with message', async () => {
        const errorMatcherWithMessage = {
          ...errorMatcher,
          message: {
            'case:matcher:type': 'some-matcher',
          } as unknown as AnyCaseMatcherOrData,
        };
        await expect(
          FunctionResultMatcherExecutor.validate(
            errorMatcherWithMessage,
            mockMatchContext,
          ),
        ).resolves.not.toThrow();
      });
    });

    describe('when matcher is invalid', () => {
      it('throws configuration error', async () => {
        const invalidMatcher = {
          'case:matcher:type': FUNCTION_RESULT_MATCHER_TYPE,
        } as unknown as CoreFunctionSuccessResultMatcher;
        await expect(
          FunctionResultMatcherExecutor.validate(
            invalidMatcher,
            mockMatchContext,
          ),
        ).rejects.toThrow(CaseConfigurationError);
      });
    });
  });
});
