import { PRODUCE_HTTP_RESPONSE, CONSUME_HTTP_RESPONSE } from 'entities/types';

import type { SetupFns } from './types';
import { setupHttpResponseProducer } from './connectors/produceHttpResponse';
import { setupHttpResponseConsumer } from './connectors/consumeHttpResponse';

export const SetupExecutors: SetupFns = {
  [PRODUCE_HTTP_RESPONSE]: setupHttpResponseConsumer,
  [CONSUME_HTTP_RESPONSE]: setupHttpResponseProducer,
};
