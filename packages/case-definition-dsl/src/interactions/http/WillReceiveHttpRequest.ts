import {
  MOCK_HTTP_CLIENT,
  MOCK_HTTP_SERVER,
} from '@contract-case/case-core-plugin-http-dsl';
import { AnyInteractionDescriptor } from '../base/AnyInteractionDescriptor';
import { HttpExample } from './types';
import { AnyMatcherOrData } from '../../types';

/**
 * Defines an example that expects to receive an HTTP request. Use this to define a contract at an HTTP client.
 *
 * @public
 */
export class WillReceiveHttpRequest extends AnyInteractionDescriptor {
  /** @internal */
  readonly '_case:mock:type': typeof MOCK_HTTP_CLIENT;

  /** @internal */
  readonly '_case:run:context:setup': {
    write: {
      type: typeof MOCK_HTTP_CLIENT;
      stateVariables: 'state';
      triggers: 'generated';
    };
    read: {
      type: typeof MOCK_HTTP_SERVER;
      stateVariables: 'default';
      triggers: 'provided';
    };
  };

  readonly request: AnyMatcherOrData;

  readonly response: AnyMatcherOrData;

  /**
   * Defines an example that expects to receive an HTTP request. Use this to define a contract at an HTTP client.
   *
   * @param httpExample - an {@link mocks.http.HttpExample}
   */
  constructor(httpExample: HttpExample) {
    super(MOCK_HTTP_CLIENT, {
      write: {
        mockType: MOCK_HTTP_CLIENT,
        stateVariables: 'state',
        triggers: 'generated',
      },
      read: {
        mockType: MOCK_HTTP_SERVER,
        stateVariables: 'default',
        triggers: 'provided',
      },
    });
    this.request = httpExample.request;
    this.response = httpExample.response;
  }
}
