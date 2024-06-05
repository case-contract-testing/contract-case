import { httpRequestMatcher, httpResponseMatcher } from './matchers';
import { HttpMockRequest, HttpMockResponse } from './matchers/http.types';
import { MOCK_HTTP_SERVER, MOCK_HTTP_CLIENT } from './constants.types';
import { ConsumeHttpResponse, ProduceHttpResponse } from './definitions.types';

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
