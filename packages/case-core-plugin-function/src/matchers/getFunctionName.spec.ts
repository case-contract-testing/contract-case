import {
  CaseConfigurationError,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { getFunctionName } from './getFunctionName';

describe('getFunctionName', () => {
  const mockMatchContext = {
    logger: {
      maintainerDebug: jest.fn(),
      error: jest.fn(),
    },
  } as unknown as MatchContext;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns function name from context', () => {
    const context = {
      ...mockMatchContext,
      '_case:currentRun:context:pluginProvided': {
        functionName: 'mockFunction',
      },
    } as unknown as MatchContext;

    expect(getFunctionName(context)).toBe('mockFunction');
  });

  it('throws if plugin provided context is missing', () => {
    expect(() => getFunctionName(mockMatchContext)).toThrow(
      CaseConfigurationError,
    );
  });

  it('throws if function name is missing', () => {
    const context = {
      ...mockMatchContext,
      '_case:currentRun:context:pluginProvided': {},
    } as unknown as MatchContext;

    expect(() => getFunctionName(context)).toThrow(CaseConfigurationError);
  });

  it('throws if function name is not a string', () => {
    const context = {
      ...mockMatchContext,
      '_case:currentRun:context:pluginProvided': {
        functionName: 123,
      },
    } as unknown as MatchContext;

    expect(() => getFunctionName(context)).toThrow(CaseConfigurationError);
  });
});
