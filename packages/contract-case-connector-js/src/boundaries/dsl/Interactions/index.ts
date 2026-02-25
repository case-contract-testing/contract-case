import { interactions } from '@contract-case/case-definition-dsl';
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';
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
}: HttpRequestResponseDescription): interactions.http.WillSendHttpRequest =>
  new interactions.http.WillSendHttpRequest({
    request: httpRequestMatcher(request),
    response: httpResponseMatcher(response),
  });

export const willReceiveHttpRequest = ({
  request,
  response,
}: HttpRequestResponseDescription): interactions.http.WillReceiveHttpRequest =>
  new interactions.http.WillReceiveHttpRequest({
    request: httpRequestMatcher(request),
    response: httpResponseMatcher(response),
  });

type FunctionExecutionExample = {
  arguments: AnyCaseMatcherOrData[];
  returnValue: AnyCaseMatcherOrData;
  functionName: string;
};

export const willCallFunction = (
  example: FunctionExecutionExample,
): interactions.functions.WillCallFunction =>
  new interactions.functions.WillCallFunction(example);

export const willReceiveFunctionCall = (
  example: FunctionExecutionExample,
): interactions.functions.WillReceiveFunctionCall =>
  new interactions.functions.WillReceiveFunctionCall(example);
