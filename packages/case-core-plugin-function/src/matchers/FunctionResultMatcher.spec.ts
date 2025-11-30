import {
  CoreFunctionErrorResultMatcher,
  CoreFunctionSuccessResultMatcher,
  FUNCTION_RESULT_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  CaseConfigurationError,
  CaseCoreError,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';
import {
  FunctionResultMatcherExecutor,
  isSuccessResult,
} from './FunctionResultMatcher';

describe('FunctionResultMatcherExecutor', () => {
  const mockMatchContext = {
    descendAndStrip: jest.fn(),
    descendAndDescribe: jest.fn(),
    descendAndCheck: jest.fn(),
    descendAndValidate: jest.fn(),
    logger: {
      maintainerDebug: jest.fn(),
      error: jest.fn(),
    },
  } as unknown as MatchContext;

  const successMatcher: CoreFunctionSuccessResultMatcher = {
    '_case:matcher:type': FUNCTION_RESULT_MATCHER_TYPE,
    success: {
      'case:matcher:type': 'some-matcher',
    } as unknown as AnyCaseMatcherOrData,
  };

  const errorMatcher: CoreFunctionErrorResultMatcher = {
    '_case:matcher:type': FUNCTION_RESULT_MATCHER_TYPE,
    errorClassName: {
      'case:matcher:type': 'some-matcher',
    } as unknown as AnyCaseMatcherOrData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
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
      (mockMatchContext.descendAndDescribe as jest.Mock).mockReturnValue(
        'some description',
      );
      expect(
        FunctionResultMatcherExecutor.describe(
          successMatcher,
          mockMatchContext,
        ),
      ).toBe('returns some description');
    });

    it('describes error result', () => {
      (mockMatchContext.descendAndDescribe as jest.Mock).mockReturnValue(
        '"SomeError"',
      );
      expect(
        FunctionResultMatcherExecutor.describe(errorMatcher, mockMatchContext),
      ).toBe('throwing a "SomeError"');
    });

    it('describes error result with message', () => {
      const errorMatcherWithMessage = {
        ...errorMatcher,
        message: {
          'case:matcher:type': 'some-matcher',
        } as unknown as AnyCaseMatcherOrData,
      };
      (mockMatchContext.descendAndDescribe as jest.Mock)
        .mockReturnValueOnce('"SomeError"')
        .mockReturnValueOnce('some message');

      expect(
        FunctionResultMatcherExecutor.describe(
          errorMatcherWithMessage,
          mockMatchContext,
        ),
      ).toBe('throwing a "SomeError" with message: some message');
    });
  });

  describe('check', () => {
    describe('success matcher', () => {
      it('checks success result', async () => {
        const actual = { success: JSON.stringify('some-value') };
        (mockMatchContext.descendAndCheck as jest.Mock).mockResolvedValue([]);

        const result = await FunctionResultMatcherExecutor.check(
          successMatcher,
          mockMatchContext,
          actual,
        );

        expect(mockMatchContext.descendAndCheck).toHaveBeenCalledWith(
          successMatcher.success,
          expect.anything(),
          'some-value',
        );
        expect(result).toEqual([]);
      });

      it('throws if actual is not an object', async () => {
        await expect(
          FunctionResultMatcherExecutor.check(
            successMatcher,
            mockMatchContext,
            'not-an-object',
          ),
        ).rejects.toThrow(CaseCoreError);
      });

      it('throws if success is not a string', async () => {
        const actual = { success: 123 };
        await expect(
          FunctionResultMatcherExecutor.check(
            successMatcher,
            mockMatchContext,
            actual,
          ),
        ).rejects.toThrow(CaseCoreError);
      });

      it('throws if success is not valid JSON', async () => {
        const actual = { success: 'invalid-json' };
        await expect(
          FunctionResultMatcherExecutor.check(
            successMatcher,
            mockMatchContext,
            actual,
          ),
        ).rejects.toThrow(CaseCoreError);
      });

      it('returns error if actual is a failure', async () => {
        const actual = { errorClassName: 'SomeError' };
        (mockMatchContext.descendAndStrip as jest.Mock).mockReturnValue(
          'stripped-expected',
        );

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

      it('throws if actual is invalid response', async () => {
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

    describe('error matcher', () => {
      it('checks error result', async () => {
        const actual = { errorClassName: 'SomeError' };
        (mockMatchContext.descendAndCheck as jest.Mock).mockResolvedValue([]);

        const result = await FunctionResultMatcherExecutor.check(
          errorMatcher,
          mockMatchContext,
          actual,
        );

        expect(mockMatchContext.descendAndCheck).toHaveBeenCalledWith(
          errorMatcher.errorClassName,
          expect.anything(),
          'SomeError',
        );
        expect(result).toEqual([]);
      });

      it('returns error if actual is a success', async () => {
        const actual = { success: 'some-value' };
        (mockMatchContext.descendAndStrip as jest.Mock).mockReturnValue(
          'stripped-expected',
        );

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

  describe('strip', () => {
    it('strips success result', () => {
      (mockMatchContext.descendAndStrip as jest.Mock).mockReturnValue(
        'stripped',
      );
      expect(
        FunctionResultMatcherExecutor.strip(successMatcher, mockMatchContext),
      ).toEqual({ success: JSON.stringify('stripped') });
    });

    it('strips error result', () => {
      (mockMatchContext.descendAndStrip as jest.Mock).mockReturnValue(
        'stripped',
      );
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
      (mockMatchContext.descendAndStrip as jest.Mock).mockReturnValue(
        'stripped',
      );
      expect(
        FunctionResultMatcherExecutor.strip(
          errorMatcherWithMessage,
          mockMatchContext,
        ),
      ).toEqual({ errorClassName: 'stripped', message: 'stripped' });
    });
  });

  describe('validate', () => {
    it('validates success matcher', async () => {
      await FunctionResultMatcherExecutor.validate(
        successMatcher,
        mockMatchContext,
      );
      expect(mockMatchContext.descendAndValidate).toHaveBeenCalledWith(
        successMatcher.success,
        expect.anything(),
      );
    });

    it('validates error matcher', async () => {
      await FunctionResultMatcherExecutor.validate(
        errorMatcher,
        mockMatchContext,
      );
      expect(mockMatchContext.descendAndValidate).toHaveBeenCalledWith(
        errorMatcher.errorClassName,
        expect.anything(),
      );
    });

    it('validates error matcher with message', async () => {
      const errorMatcherWithMessage = {
        ...errorMatcher,
        message: {
          'case:matcher:type': 'some-matcher',
        } as unknown as AnyCaseMatcherOrData,
      };
      await FunctionResultMatcherExecutor.validate(
        errorMatcherWithMessage,
        mockMatchContext,
      );
      expect(mockMatchContext.descendAndValidate).toHaveBeenCalledTimes(2);
    });

    it('throws if matcher is invalid', async () => {
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
