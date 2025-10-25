import {
  functionArgumentsMatcher,
  MOCK_FUNCTION_EXECUTION,
  MOCK_FUNCTION_CALLER,
  functionThrowsErrorMatcher,
} from '@contract-case/case-core-plugin-function-dsl';
import { AnyInteractionDescriptor } from '../base/AnyInteractionDescriptor';
import { AnyMatcherOrData } from '../../types';
import { ThrowingFunctionExecutionExample } from './types';

/**
 * Defines an example that expects a function to be called with specific arguments
 *
 * @public
 */
export class WillReceiveFunctionCallAndThrow extends AnyInteractionDescriptor {
  /** @internal */
  readonly '_case:mock:type': typeof MOCK_FUNCTION_CALLER;

  /** @internal */
  readonly '_case:run:context:setup': {
    write: {
      type: typeof MOCK_FUNCTION_CALLER;
      stateVariables: 'state';
      triggers: 'generated';
    };
    read: {
      type: typeof MOCK_FUNCTION_EXECUTION;
      stateVariables: 'default';
      triggers: 'provided';
    };
  };

  readonly request: AnyMatcherOrData;

  readonly response: AnyMatcherOrData;

  readonly functionName: string;

  /**
   * Defines an example that expects a function to be called with specific arguments
   *
   * @param example - a {@link mocks.functions.FunctionExecutionExample}
   */
  constructor(example: ThrowingFunctionExecutionExample) {
    super(MOCK_FUNCTION_CALLER, {
      write: {
        mockType: MOCK_FUNCTION_CALLER,
        stateVariables: 'state',
        triggers: 'generated',
      },
      read: {
        mockType: MOCK_FUNCTION_EXECUTION,
        stateVariables: 'default',
        triggers: 'provided',
      },
    });
    this.request = functionArgumentsMatcher(
      example.arguments,
      example.functionName,
      example.invocationName,
    );
    this.response = functionThrowsErrorMatcher(
      example.errorClassName,
      example.message,
      example.responseName,
    );
    this.functionName = example.functionName;
  }
}
