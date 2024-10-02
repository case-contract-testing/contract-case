import {
  AnyCaseMatcher,
  HasTypeForMockDescriptor,
} from '@contract-case/case-plugin-dsl-types';
import { MOCK_HTTP_SERVER, MOCK_HTTP_CLIENT } from './constants.types';

export interface CoreHttpRequestResponseMatcherPair {
  request: AnyCaseMatcher;
  response: AnyCaseMatcher;
}

export interface ConsumeHttpResponse
  extends HasTypeForMockDescriptor<typeof MOCK_HTTP_SERVER>,
    CoreHttpRequestResponseMatcherPair {
  '_case:run:context:setup': {
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
}

export interface ProduceHttpResponse
  extends HasTypeForMockDescriptor<typeof MOCK_HTTP_CLIENT>,
    CoreHttpRequestResponseMatcherPair {
  '_case:run:context:setup': {
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
}
