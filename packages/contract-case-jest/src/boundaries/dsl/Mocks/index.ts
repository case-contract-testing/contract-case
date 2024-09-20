import { mocks } from '@contract-case/case-definition-dsl';
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-base';
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

type FunctionExecutionExample = {
  arguments: AnyCaseMatcherOrData[];
  returnValue: AnyCaseMatcherOrData;
};

export const willCallFunction = (
  example: FunctionExecutionExample,
): mocks.functions.WillCallFunction =>
  new mocks.functions.WillCallFunction(example);

export const willReceiveFunctionCall = (
  example: FunctionExecutionExample,
): mocks.functions.WillReceiveFunctionCall =>
  new mocks.functions.WillReceiveFunctionCall(example);
