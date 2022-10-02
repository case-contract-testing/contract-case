import {
  type DoesSendHttpRequest,
  SEND_HTTP_REQUEST,
  HttpRequestResponseDescription,
} from './types';

export const httpInteraction = (
  interactionDescripton: HttpRequestResponseDescription
): DoesSendHttpRequest => ({
  ...interactionDescripton,
  'case:interaction:type': SEND_HTTP_REQUEST,
  'case:context:expectation': 'does',
});
