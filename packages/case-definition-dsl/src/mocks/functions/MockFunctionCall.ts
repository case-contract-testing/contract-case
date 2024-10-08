import {
  functionArgumentsMatcher,
  MOCK_FUNCTION_EXECUTION,
  MOCK_FUNCTION_CALLER,
} from '@contract-case/case-core-plugin-function-dsl';
import { AnyMockDescriptor } from '../base/AnyMockDescriptor';
import { AnyMatcherOrData } from '../../types';
import { FunctionExecutionExample } from './types';

/**
 * Defines an example that expects a function to be called with specific arguments
 *
 * @public
 */
export class WillReceiveFunctionCall extends AnyMockDescriptor {
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
  constructor(example: FunctionExecutionExample) {
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
    this.request = functionArgumentsMatcher(example.arguments);
    this.response = example.returnValue;
    this.functionName = example.functionName;
  }
}
