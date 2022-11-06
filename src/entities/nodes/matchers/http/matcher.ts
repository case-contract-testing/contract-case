import {
  CoreHttpRequestMatcher,
  CoreHttpResponseMatcher,
  CoreHttpStatusCodeMatcher,
  HttpInteractionRequest,
  HttpInteractionResponse,
  HTTP_REQUEST_MATCHER_TYPE,
  HTTP_RESPONSE_MATCHER_TYPE,
  HTTP_STATUS_CODE_MATCHER_TYPE,
} from './types';
import { validateCodes } from './validator';

export const httpStatusCodeMatcher = (
  codes: number | string | Array<number | string>,
  example?: number
): CoreHttpStatusCodeMatcher => {
  const impliedExample = validateCodes(codes);
  return {
    'case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
    'case:matcher:example': example ?? impliedExample,
    'case:matcher:rule': codes,
    'case:matcher:resolvesTo': 'HttpStatusCode',
  };
};

export const httpRequestMatcher = (
  request: HttpInteractionRequest
): CoreHttpRequestMatcher => ({
  ...request,
  'case:matcher:type': HTTP_REQUEST_MATCHER_TYPE,
});

export const httpResponseMatcher = (
  request: HttpInteractionResponse
): CoreHttpResponseMatcher => ({
  ...request,
  'case:matcher:type': HTTP_RESPONSE_MATCHER_TYPE,
});
