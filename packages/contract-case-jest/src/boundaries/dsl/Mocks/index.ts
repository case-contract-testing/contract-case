import { mocks } from '@contract-case/case-definition-dsl';
import {
  HttpMockRequest,
  HttpMockResponse,
} from '../Matchers/core/http/types.js';
import {
  httpRequestMatcher,
  httpResponseMatcher,
} from '../Matchers/core/http/index.js';

type HttpRequestResponseDescription = {
  request: HttpMockRequest;
  response: HttpMockResponse;
};

export const willSendHttpRequest = ({
  request,
  response,
}: HttpRequestResponseDescription): mocks.http.WillSendHttpRequest =>
  new mocks.http.WillSendHttpRequest({
    request: httpRequestMatcher(request),
    response: httpResponseMatcher(response),
  });

export const willReceiveHttpRequest = ({
  request,
  response,
}: HttpRequestResponseDescription): mocks.http.WillReceiveHttpRequest =>
  new mocks.http.WillReceiveHttpRequest({
    request: httpRequestMatcher(request),
    response: httpResponseMatcher(response),
  });
