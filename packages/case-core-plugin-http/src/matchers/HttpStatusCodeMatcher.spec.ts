import {
  CoreHttpStatusCodeMatcher,
  HTTP_STATUS_CODE_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  CaseConfigurationError,
  CaseCoreError,
  DataContext,
  Logger,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { HttpStatusCodeMatcher } from './HttpStatusCodeMatcher';

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

describe('HttpStatusCodeMatcher', () => {
  let mockMatchContext: MatchContext;

  const matcher: CoreHttpStatusCodeMatcher = {
    '_case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
    '_case:matcher:rule': '200',
    '_case:matcher:example': 200,
    '_case:matcher:resolvesTo': 'HttpStatusCode',
  };

  beforeEach(() => {
    mockMatchContext = createMockMatchContext({
      descendAndCheckResult: [],
      descendAndStripResult: 'stripped',
      descendAndDescribeResult: '"default description"',
    });
  });

  describe('describe()', () => {
    describe('with a single status code', () => {
      it('returns formatted status code', () => {
        expect(HttpStatusCodeMatcher.describe(matcher, mockMatchContext)).toBe(
          'httpStatus 200',
        );
      });
    });

    describe('with an array of status codes', () => {
      it('returns pipe-separated status codes', () => {
        const arrayMatcher: CoreHttpStatusCodeMatcher = {
          ...matcher,
          '_case:matcher:rule': ['200', '201'],
        };
        expect(
          HttpStatusCodeMatcher.describe(arrayMatcher, mockMatchContext),
        ).toBe('httpStatus 200 | 201');
      });
    });
  });

  describe('check()', () => {
    describe('when actual is not a number', () => {
      it('returns an error', () => {
        const result = HttpStatusCodeMatcher.check(
          matcher,
          mockMatchContext,
          'not-a-number',
        ) as Array<any>;
        expect(result).toHaveLength(1);
        expect(result[0]?.message).toContain('Inappropriate type');
      });
    });

    describe('when checking against a string rule', () => {
      describe('when actual matches', () => {
        it('returns no errors', () => {
          const result = HttpStatusCodeMatcher.check(
            matcher,
            mockMatchContext,
            200,
          );
          expect(result).toEqual([]);
        });
      });

      describe('when actual does not match', () => {
        it('returns an error', () => {
          const result = HttpStatusCodeMatcher.check(
            matcher,
            mockMatchContext,
            404,
          ) as Array<any>;
          expect(result).toHaveLength(1);
          expect(result[0]?.message).toContain('does not match');
        });
      });
    });

    describe('when checking against a pattern', () => {
      describe('when actual matches pattern', () => {
        it('returns no errors', () => {
          const patternMatcher = {
            ...matcher,
            '_case:matcher:rule': '2xx',
          };
          const result = HttpStatusCodeMatcher.check(
            patternMatcher,
            mockMatchContext,
            201,
          );
          expect(result).toEqual([]);
        });
      });

      describe('when actual does not match pattern', () => {
        it('returns an error', () => {
          const patternMatcher = {
            ...matcher,
            '_case:matcher:rule': '2xx',
          };
          const result = HttpStatusCodeMatcher.check(
            patternMatcher,
            mockMatchContext,
            404,
          ) as Array<any>;
          expect(result).toHaveLength(1);
          expect(result[0]?.message).toContain('does not match');
        });
      });

      describe('when pattern is shorter than 3 characters', () => {
        it('matches the first N characters', () => {
          const patternMatcher = {
            ...matcher,
            '_case:matcher:rule': '2x',
          };
          const result = HttpStatusCodeMatcher.check(
            patternMatcher,
            mockMatchContext,
            200,
          ) as Array<any>;
          expect(result).toEqual([]);
        });
      });
    });

    describe('when checking against an array of rules', () => {
      describe('when actual matches one of the rules', () => {
        it('returns no errors', () => {
          const arrayMatcher: CoreHttpStatusCodeMatcher = {
            ...matcher,
            '_case:matcher:rule': ['200', '404'],
          };
          expect(
            HttpStatusCodeMatcher.check(arrayMatcher, mockMatchContext, 200),
          ).toEqual([]);
          expect(
            HttpStatusCodeMatcher.check(arrayMatcher, mockMatchContext, 404),
          ).toEqual([]);
        });
      });

      describe('when actual matches none of the rules', () => {
        it('returns an error', () => {
          const arrayMatcher: CoreHttpStatusCodeMatcher = {
            ...matcher,
            '_case:matcher:rule': ['200', '404'],
          };
          const result = HttpStatusCodeMatcher.check(
            arrayMatcher,
            mockMatchContext,
            500,
          ) as Array<any>;
          expect(result).toHaveLength(1);
          expect(result[0]?.message).toContain(
            'did not match any of the following status codes',
          );
        });
      });
    });

    describe('when rule is invalid type', () => {
      it('throws an error', () => {
        const invalidMatcher = {
          ...matcher,
          '_case:matcher:rule': {} as any,
        };
        expect(() =>
          HttpStatusCodeMatcher.check(invalidMatcher, mockMatchContext, 200),
        ).toThrow(CaseCoreError);
      });
    });
  });

  describe('strip()', () => {
    describe('when example is present', () => {
      it('returns the example', () => {
        expect(HttpStatusCodeMatcher.strip(matcher, mockMatchContext)).toBe(
          200,
        );
      });
    });

    describe('when example is missing', () => {
      describe('when rule is valid', () => {
        it('returns the validated rule', () => {
          const matcherNoExample: CoreHttpStatusCodeMatcher = {
            '_case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
            '_case:matcher:rule': '200',
            '_case:matcher:resolvesTo': 'HttpStatusCode',
          };

          expect(
            HttpStatusCodeMatcher.strip(matcherNoExample, mockMatchContext),
          ).toBe(200);
        });
      });

      describe('when rule is invalid', () => {
        it('throws a configuration error', () => {
          const matcherInvalidRule: CoreHttpStatusCodeMatcher = {
            '_case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
            '_case:matcher:rule': '99',
            '_case:matcher:resolvesTo': 'HttpStatusCode',
          };

          expect(() =>
            HttpStatusCodeMatcher.strip(matcherInvalidRule, mockMatchContext),
          ).toThrow(CaseConfigurationError);
        });
      });
    });
  });

  describe('validate()', () => {
    describe('when matcher is valid', () => {
      it('does not throw', async () => {
        await expect(
          HttpStatusCodeMatcher.validate(matcher, mockMatchContext),
        ).resolves.not.toThrow();
      });
    });

    describe('when status code is less than 100', () => {
      it('throws an error', async () => {
        const invalidMatcher: CoreHttpStatusCodeMatcher = {
          '_case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
          '_case:matcher:rule': '99',
          '_case:matcher:resolvesTo': 'HttpStatusCode',
        };
        await expect(
          HttpStatusCodeMatcher.validate(invalidMatcher, mockMatchContext),
        ).rejects.toThrow('outside the valid range');
      });
    });

    describe('when status code is 600 or greater', () => {
      it('throws an error', async () => {
        const invalidMatcher: CoreHttpStatusCodeMatcher = {
          '_case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
          '_case:matcher:rule': '600',
          '_case:matcher:resolvesTo': 'HttpStatusCode',
        };
        await expect(
          HttpStatusCodeMatcher.validate(invalidMatcher, mockMatchContext),
        ).rejects.toThrow('outside the valid range');
      });
    });

    describe('when rule is a decimal string', () => {
      it('parses it to an integer', async () => {
        const decimalMatcher: CoreHttpStatusCodeMatcher = {
          '_case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
          '_case:matcher:rule': '200.5',
          '_case:matcher:resolvesTo': 'HttpStatusCode',
        };
        await expect(
          HttpStatusCodeMatcher.validate(decimalMatcher, mockMatchContext),
        ).resolves.not.toThrow();
      });
    });

    describe('when rule is an empty array', () => {
      it('throws an error', async () => {
        const invalidMatcher: CoreHttpStatusCodeMatcher = {
          '_case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
          '_case:matcher:rule': [],
          '_case:matcher:resolvesTo': 'HttpStatusCode',
        };
        await expect(
          HttpStatusCodeMatcher.validate(invalidMatcher, mockMatchContext),
        ).rejects.toThrow("An empty array isn't a valid list");
      });
    });

    describe('when rule is an invalid type', () => {
      it('throws an error', async () => {
        const invalidMatcher: CoreHttpStatusCodeMatcher = {
          '_case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
          '_case:matcher:rule': {} as any,
          '_case:matcher:resolvesTo': 'HttpStatusCode',
        };
        await expect(
          HttpStatusCodeMatcher.validate(invalidMatcher, mockMatchContext),
        ).rejects.toThrow('is not a valid type');
      });
    });
  });
});
