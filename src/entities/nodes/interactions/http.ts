import {
  type ProduceHttpRequest,
  PRODUCE_HTTP_REQUEST,
  HttpRequestResponseDescription,
  CONSUME_HTTP_REQUEST,
  ConsumeHttpRequest,
} from './types';

export const willSendHttpInteraction = (
  interactionDescripton: HttpRequestResponseDescription
): ProduceHttpRequest => ({
  ...interactionDescripton,
  'case:interaction:type': PRODUCE_HTTP_REQUEST,
  'case:run:context:expectation': 'produce',
});

export const willRecieveHttpInteraction = (
  interactionDescripton: HttpRequestResponseDescription
): ConsumeHttpRequest => ({
  ...interactionDescripton,
  'case:interaction:type': CONSUME_HTTP_REQUEST,
  'case:run:context:expectation': 'consume',
});
