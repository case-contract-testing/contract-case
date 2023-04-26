import {
  MOCK_HTTP_CLIENT,
  MOCK_HTTP_SERVER,
} from '@contract-case/case-entities-internal';
import { AnyMatcherOrData } from '@contract-case/test-equivalence-matchers';

import { AnyMockDescriptor } from '../base/AnyMockDescriptor';
import { HttpExample } from './types';

export class WillSendHttpRequest extends AnyMockDescriptor {
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
