import {
  coreCanReceiveHttpResponse,
  coreWillSendHttpGet,
} from 'core/matchers/http';
import type { WillSendHttpRequest } from 'core/matchers/types';
import type { HttpRequestDescription } from './types';

export const willSendHttpGet = ({
  path,
  response,
}: HttpRequestDescription): WillSendHttpRequest =>
  coreWillSendHttpGet(
    path,
    coreCanReceiveHttpResponse(response.status, response.body)
  );
