import {
  MOCK_HTTP_CLIENT,
  MOCK_HTTP_SERVER,
} from '@contract-case/case-entities-internal';
import { AnyMatcherOrData } from '@contract-case/test-equivalence-matchers';

import { AnyMockDescriptor } from '../base/AnyMockDescriptor';
import { HttpExample } from './types';

/**
 * Defines an example that expects to receive an HTTP request. Use this to test HTTP clients.
 * @public
 */
export class WillReceiveHttpRequest extends AnyMockDescriptor {
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
