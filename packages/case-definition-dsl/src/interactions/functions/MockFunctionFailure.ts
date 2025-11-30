import {
  functionArgumentsMatcher,
  functionThrowsErrorMatcher,
  MOCK_FUNCTION_EXECUTION,
  MOCK_FUNCTION_CALLER,
} from '@contract-case/case-core-plugin-function-dsl';
import { AnyInteractionDescriptor } from '../base/AnyInteractionDescriptor';
import { AnyMatcherOrData } from '../../types';
import { ThrowingFunctionExecutionExample } from './types';

/**
 * Defines an interaction that executes a registered function with specific arguments,
 * expecting that function to throw an error
 *
 * @public
 */
export class WillCallThrowingFunction extends AnyInteractionDescriptor {
  /** @internal */
  readonly '_case:mock:type': typeof MOCK_FUNCTION_EXECUTION;

  /** @internal */
  readonly '_case:run:context:setup': {
    write: {
      type: typeof MOCK_FUNCTION_EXECUTION;
      stateVariables: 'default';
      triggers: 'provided';
    };
    read: {
      type: typeof MOCK_FUNCTION_CALLER;
      stateVariables: 'state';
      triggers: 'generated';
    };
  };

  readonly request: AnyMatcherOrData;

  readonly response: AnyMatcherOrData;

  readonly functionName: string;

  /**
   * Defines an example that executes a registered function with specific arguments
   *
   * @param example - a {@link mocks.functions.FunctionExecutionExample}
   */
  constructor(example: ThrowingFunctionExecutionExample) {
    super(MOCK_FUNCTION_EXECUTION, {
      write: {
        mockType: MOCK_FUNCTION_EXECUTION,
        stateVariables: 'default',
        triggers: 'provided',
      },
      read: {
        mockType: MOCK_FUNCTION_CALLER,
        stateVariables: 'state',
        triggers: 'generated',
      },
    });
    this.request = functionArgumentsMatcher(
      example.arguments,
      example.invocationName,
    );
    this.response = functionThrowsErrorMatcher(
      example.errorClassName,
      example.message,
    );

    this.functionName = example.functionName;
  }
}
