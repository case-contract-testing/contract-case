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
export class WillCallFunction extends AnyMockDescriptor {
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

  constructor(example: FunctionExecutionExample) {
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
    this.request = functionArgumentsMatcher(example.arguments);
    this.response = example.returnValue;

    this.functionName = example.functionName;
  }
}
