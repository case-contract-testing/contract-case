import { httpRequestMatcher, httpResponseMatcher } from '../../../entities';
import type {
  HttpMockRequest,
  HttpMockResponse,
} from '../../../entities/types';

import {
  type ConsumeHttpResponse,
  MOCK_HTTP_SERVER,
  MOCK_HTTP_CLIENT,
  ProduceHttpResponse,
} from './types';

type HttpRequestResponseDescription = {
  request: HttpMockRequest;
  response: HttpMockResponse;
};

export const willSendHttpRequest = ({
  request,
  response,
}: HttpRequestResponseDescription): ConsumeHttpResponse => ({
  request: httpRequestMatcher(request),
  response: httpResponseMatcher(response),
  '_case:mock:type': MOCK_HTTP_SERVER,
  '_case:run:context:setup': {
    write: {
      type: MOCK_HTTP_SERVER,
      stateVariables: 'default',
      triggers: 'provided',
    },
    read: {
      type: MOCK_HTTP_CLIENT,
      stateVariables: 'state',
      triggers: 'generated',
    },
  },
});

export const willReceiveHttpRequest = ({
  request,
  response,
}: HttpRequestResponseDescription): ProduceHttpResponse => ({
  request: httpRequestMatcher(request),
  response: httpResponseMatcher(response),
  '_case:mock:type': MOCK_HTTP_CLIENT,
  '_case:run:context:setup': {
    write: {
      type: MOCK_HTTP_CLIENT,
      stateVariables: 'state',
      triggers: 'generated',
    },
    read: {
      type: MOCK_HTTP_SERVER,
      stateVariables: 'default',
      triggers: 'provided',
    },
  },
});
