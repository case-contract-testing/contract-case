import { ServerDuplexStream } from '@grpc/grpc-js';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import {
  DefinitionRequest as WireDefinitionRequest,
  DefinitionResponse as WireDefinitionResponse,
} from './proto/contract_case_stream_pb';
import { maintainerLog } from '../../domain/maintainerLog';

const executeCall = (
  call: ServerDuplexStream<WireDefinitionRequest, WireDefinitionResponse>,
  id: string,
  response: WireDefinitionResponse,
) =>
  new Promise<void>((resolve) => {
    maintainerLog(`[SENDING] (${id})`, response.toObject());
    call.write(response.setId(new StringValue().setValue(id)), () => {
      resolve();
    });
  });

export type ExecuteCall = (
  id: string,
  response: WireDefinitionResponse,
) => Promise<void>;

export const makeExecuteCall =
  (
    call: ServerDuplexStream<WireDefinitionRequest, WireDefinitionResponse>,
  ): ExecuteCall =>
  (id: string, response: WireDefinitionResponse) =>
    executeCall(call, id, response);
