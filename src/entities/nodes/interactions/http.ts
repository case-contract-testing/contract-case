import { httpRequestMatcher, httpResponseMatcher } from 'entities';
import type {
  HttpInteractionRequest,
  HttpInteractionResponse,
} from 'entities/types';
import {
  type ConsumeHttpResponse,
  CONSUME_HTTP_RESPONSE,
  PRODUCE_HTTP_RESPONSE,
  ProduceHttpResponse,
} from './types';

type HttpRequestResponseDescription = {
  request: HttpInteractionRequest;
  response: HttpInteractionResponse;
};

export const willSendHttpInteraction = ({
  request,
  response,
}: HttpRequestResponseDescription): ConsumeHttpResponse => ({
  request: httpRequestMatcher(request),
  response: httpResponseMatcher(response),
  'case:interaction:uniqueName': '',
  'case:interaction:type': CONSUME_HTTP_RESPONSE,
  'case:run:context:asWritten': 'consume',
  'case:run:context:setup': {
    write: {
      type: CONSUME_HTTP_RESPONSE,
      stateVariables: 'default',
      triggers: 'provided',
    },
    read: {
      type: PRODUCE_HTTP_RESPONSE,
      stateVariables: 'state',
      triggers: 'generated',
    },
  },
});

export const willReceiveHttpInteraction = ({
  request,
  response,
}: HttpRequestResponseDescription): ProduceHttpResponse => ({
  request: httpRequestMatcher(request),
  response: httpResponseMatcher(response),
  'case:interaction:uniqueName': '',
  'case:interaction:type': PRODUCE_HTTP_RESPONSE,
  'case:run:context:asWritten': 'consume',
  'case:run:context:setup': {
    write: {
      type: PRODUCE_HTTP_RESPONSE,
      stateVariables: 'state',
      triggers: 'generated',
    },
    read: {
      type: CONSUME_HTTP_RESPONSE,
      stateVariables: 'default',
      triggers: 'provided',
    },
  },
});
