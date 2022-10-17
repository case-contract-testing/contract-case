import type { SetupFns } from 'core/types';
import {
  CONSUME_HTTP_REQUEST,
  PRODUCE_HTTP_REQUEST,
} from 'entities/nodes/interactions/types';
import { setupHttpRequestConsumer } from './consumeHttpRequest';
import { setupHttpRequestProducer } from './produceHttpRequest';

export const SetupFunctions: SetupFns = {
  [CONSUME_HTTP_REQUEST]: setupHttpRequestProducer,
  [PRODUCE_HTTP_REQUEST]: setupHttpRequestConsumer,
};
