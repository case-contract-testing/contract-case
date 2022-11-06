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
});

export const willRecieveHttpInteraction = ({
  request,
  response,
}: HttpRequestResponseDescription): ProduceHttpResponse => ({
  request: httpRequestMatcher(request),
  response: httpResponseMatcher(response),
  'case:interaction:uniqueName': '',
  'case:interaction:type': PRODUCE_HTTP_RESPONSE,
  'case:run:context:asWritten': 'produce',
});
