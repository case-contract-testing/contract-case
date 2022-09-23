import {
  AnyCaseNodeOrData,
  CanReceiveHttpResponse,
  CAN_RECEIVE_HTTP_RESPONSE,
  WillSendHttpRequest,
  WILL_SEND_HTTP_REQUEST,
} from './types';

export const coreWillSendHttpGet = (
  path: string,
  responseMatcher: CanReceiveHttpResponse
): WillSendHttpRequest => ({
  'case:matcher:type': WILL_SEND_HTTP_REQUEST,
  'case:context:expectation': 'will',
  method: 'get',
  path,
  responseMatcher,
});

export const coreCanReceiveHttpResponse = (
  status: number,
  body?: AnyCaseNodeOrData
): CanReceiveHttpResponse => ({
  'case:matcher:type': CAN_RECEIVE_HTTP_RESPONSE,
  'case:context:expectation': 'can',
  status,
  body,
});
