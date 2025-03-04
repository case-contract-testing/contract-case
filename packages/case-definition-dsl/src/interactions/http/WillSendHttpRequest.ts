import {
  MOCK_HTTP_SERVER,
  MOCK_HTTP_CLIENT,
} from '@contract-case/case-core-plugin-http-dsl';
import { AnyInteractionDescriptor } from '../base/AnyInteractionDescriptor';
import { HttpExample } from './types';
import { AnyMatcherOrData } from '../../types';

/**
 * Defines an example that expects to send an HTTP request. Use this to test HTTP servers.
 * @public
 */
export class WillSendHttpRequest extends AnyInteractionDescriptor {
  /** @internal */
  readonly '_case:mock:type': typeof MOCK_HTTP_SERVER;

  /** @internal */
  readonly '_case:run:context:setup': {
    write: {
      type: typeof MOCK_HTTP_SERVER;
      stateVariables: 'default';
      triggers: 'provided';
    };
    read: {
      type: typeof MOCK_HTTP_CLIENT;
      stateVariables: 'state';
      triggers: 'generated';
    };
  };

  readonly request: AnyMatcherOrData;

  readonly response: AnyMatcherOrData;

  /**
   * Defines an example that expects to send an HTTP request. Use this to test HTTP servers.
   * @param httpExample -
   */
  constructor(httpExample: HttpExample) {
    super(MOCK_HTTP_CLIENT, {
      write: {
        mockType: MOCK_HTTP_SERVER,
        stateVariables: 'default',
        triggers: 'provided',
      },
      read: {
        mockType: MOCK_HTTP_CLIENT,
        stateVariables: 'state',
        triggers: 'generated',
      },
    });
    this.request = httpExample.request;
    this.response = httpExample.response;
  }
}
