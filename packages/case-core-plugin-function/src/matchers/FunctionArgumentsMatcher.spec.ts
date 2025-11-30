import {
  CoreFunctionArgumentsMatcher,
  FUNCTION_ARGUMENTS_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  CaseConfigurationError,
  CaseCoreError,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { FunctionArgumentMatcherExecutor } from './FunctionArgumentsMatcher';

describe('FunctionArgumentMatcherExecutor', () => {
  interface MockState {
    descendAndStripResult: any;
    descendAndDescribeResult: string;
    descendAndCheckResult: any[];
  }

  const createMockMatchContext = (state: MockState): MatchContext =>
    ({
      descendAndStrip: () => state.descendAndStripResult,
      descendAndDescribe: () => state.descendAndDescribeResult,
      descendAndCheck: () => Promise.resolve(state.descendAndCheckResult),
      descendAndValidate: () => Promise.resolve(),
      logger: {
        maintainerDebug: () => Promise.resolve(),
        error: () => Promise.resolve(),
      },
      makeLogger: () => ({
        maintainerDebug: () => Promise.resolve(),
        error: () => Promise.resolve(),
      }),
      makeLookup: () => ({
        lookupMatcher: () => [],
        saveLookupableMatcher: () => {},
        addDefaultVariable: () => ['name', 'value'] as [string, string],
        addStateVariable: () => ['name', 'value'] as [string, string],
        lookupVariable: () => 'TEST VALUE',
        invokeFunctionByHandle: () => Promise.resolve('returnValue'),
      }),
      '_case:currentRun:context:location': ['DURING_TESTS'],
      '_case:currentRun:context:pluginProvided': {
        functionName: 'mockFunction',
      },
    }) as unknown as MatchContext;

  let mockMatchContext: MatchContext;

  const matcher: CoreFunctionArgumentsMatcher = {
    '_case:matcher:type': FUNCTION_ARGUMENTS_MATCHER_TYPE,
    arguments: [],
  };

  beforeEach(() => {
    mockMatchContext = createMockMatchContext({
      descendAndStripResult: [],
      descendAndDescribeResult: 'default description',
      descendAndCheckResult: [],
    });
  });

  describe('description function', () => {
    it('describes an invocation with no arguments', () => {
      expect(
        FunctionArgumentMatcherExecutor.describe(matcher, mockMatchContext),
      ).toBe('An invocation of mockFunction()');
    });

    describe('describes an invocation with arguments', () => {
      beforeEach(() => {
        mockMatchContext = createMockMatchContext({
          descendAndStripResult: [],
          descendAndDescribeResult: 'some description',
          descendAndCheckResult: [],
        });
      });

      it('describes an invocation with arguments', () => {
        const argsMatcher = {
          ...matcher,
          arguments: [{ 'case:matcher:type': 'some-matcher' }],
        };

        expect(
          FunctionArgumentMatcherExecutor.describe(
            argsMatcher,
            mockMatchContext,
          ),
        ).toBe('An invocation of mockFunction( some description )');
      });
    });
  });

  describe('check', () => {
    describe('when actual is missing', () => {
      it('throws configuration error', async () => {
        await expect(
          FunctionArgumentMatcherExecutor.check(
            matcher,
            mockMatchContext,
            undefined,
          ),
        ).rejects.toThrow(CaseConfigurationError);
      });
    });

    describe('when actual is not an array', () => {
      it('throws core error', async () => {
        await expect(
          FunctionArgumentMatcherExecutor.check(
            matcher,
            mockMatchContext,
            'not-an-array',
          ),
        ).rejects.toThrow(CaseCoreError);
      });
    });

    describe('when actual is an array', () => {
      describe('and lengths match', () => {
        beforeEach(() => {
          mockMatchContext = createMockMatchContext({
            descendAndStripResult: [],
            descendAndDescribeResult: 'default description',
            descendAndCheckResult: [],
          });
        });

        it('checks arguments', async () => {
          const argsMatcher = {
            ...matcher,
            arguments: [{ 'case:matcher:type': 'some-matcher' }],
          };
          const actual = ['some-arg'];

          const result = await FunctionArgumentMatcherExecutor.check(
            argsMatcher,
            mockMatchContext,
            actual,
          );

          expect(result).toEqual([]);
        });
      });

      describe('and lengths do not match', () => {
        beforeEach(() => {
          mockMatchContext = createMockMatchContext({
            descendAndStripResult: 'stripped-expected',
            descendAndDescribeResult: 'default description',
            descendAndCheckResult: [],
          });
        });

        it('returns error', async () => {
          const argsMatcher = {
            ...matcher,
            arguments: [{ 'case:matcher:type': 'some-matcher' }],
          };
          const actual: unknown[] = [];

          const result = await FunctionArgumentMatcherExecutor.check(
            argsMatcher,
            mockMatchContext,
            actual,
          );

          expect(result).toHaveLength(1);
          expect(result[0]?.message).toContain(
            'The function expected 1 argument, but received 0 arguments',
          );
        });
      });
    });
  });

  describe('strip', () => {
    beforeEach(() => {
      mockMatchContext = createMockMatchContext({
        descendAndStripResult: ['stripped'],
        descendAndDescribeResult: 'default description',
        descendAndCheckResult: [],
      });
    });

    it('strips arguments', () => {
      expect(
        FunctionArgumentMatcherExecutor.strip(matcher, mockMatchContext),
      ).toEqual(['stripped']);
    });
  });

  describe('validate', () => {
    describe('when arguments are valid', () => {
      it('validates arguments', async () => {
        await expect(
          FunctionArgumentMatcherExecutor.validate(matcher, mockMatchContext),
        ).resolves.not.toThrow();
      });
    });

    describe('when arguments are missing', () => {
      it('throws configuration error', async () => {
        const invalidMatcher = {
          ...matcher,
          arguments: undefined,
        } as unknown as CoreFunctionArgumentsMatcher;
        await expect(
          FunctionArgumentMatcherExecutor.validate(
            invalidMatcher,
            mockMatchContext,
          ),
        ).rejects.toThrow(CaseConfigurationError);
      });
    });

    describe('when arguments are not an array', () => {
      it('throws configuration error', async () => {
        const invalidMatcher = {
          ...matcher,
          arguments: 'not-an-array',
        } as unknown as CoreFunctionArgumentsMatcher;
        await expect(
          FunctionArgumentMatcherExecutor.validate(
            invalidMatcher,
            mockMatchContext,
          ),
        ).rejects.toThrow(CaseConfigurationError);
      });
    });
  });
});
