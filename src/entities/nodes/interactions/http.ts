import {
  type ConsumeHttpResponse,
  CONSUME_HTTP_RESPONSE,
  HttpRequestResponseDescription,
  PRODUCE_HTTP_RESPONSE,
  ProduceHttpResponse,
} from './types';

export const willSendHttpInteraction = (
  interactionDescripton: HttpRequestResponseDescription
): ConsumeHttpResponse => ({
  ...interactionDescripton,
  'case:interaction:uniqueName': '',
  'case:interaction:type': CONSUME_HTTP_RESPONSE,
  'case:run:context:asWritten': 'consume',
});

export const willRecieveHttpInteraction = (
  interactionDescripton: HttpRequestResponseDescription
): ProduceHttpResponse => ({
  ...interactionDescripton,
  'case:interaction:uniqueName': '',
  'case:interaction:type': PRODUCE_HTTP_RESPONSE,
  'case:run:context:asWritten': 'produce',
});
