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

type ThrowingFunctionExecutionExample = {
  /** The expected arguments (or matchers) for the function call */
  arguments: AnyCaseMatcherOrData[];
  /** A matcher for the class name of the thrown error */
  errorClassName: AnyCaseMatcherOrData;
  /**
   * A matcher for the message of the thrown error, if any. In general, it's
   * best to rely on the class of the error instead of the specific message.
   */
  message?: AnyCaseMatcherOrData;
  /**
   * A matcher for the serialised content of the thrown error, if any. In
   * Typescript, this is the error's own enumerable properties (excluding the
   * standard `name`, `message`, `stack` and `cause`).
   *
   * This should generally be a last resort - it is usually better to have
   * explicit, distinct error types for each kind of error that callers might
   * care about, and to match on `errorClassName` instead.
   */
  payload?: AnyCaseMatcherOrData;
  /**
   * A name for this specific error response - must be unique in this
   * contract. Useful for identifying the error response in verification
   * trigger groups, especially when the error has a payload.
   */
  responseName?: string;
  functionName: string;
};

export const willCallThrowingFunction = (
  example: ThrowingFunctionExecutionExample,
): interactions.functions.WillCallThrowingFunction =>
  new interactions.functions.WillCallThrowingFunction(example);

export const willReceiveFunctionCallAndThrow = (
  example: ThrowingFunctionExecutionExample,
): interactions.functions.WillReceiveFunctionCallAndThrow =>
  new interactions.functions.WillReceiveFunctionCallAndThrow(example);
