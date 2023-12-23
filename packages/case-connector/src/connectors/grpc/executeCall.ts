import { ServerDuplexStream } from '@grpc/grpc-js';
import {
  DefinitionRequest as WireDefinitionRequest,
  DefinitionResponse as WireDefinitionResponse,
} from './proto/contract_case_stream_pb';

const executeCall = (
  call: ServerDuplexStream<WireDefinitionRequest, WireDefinitionResponse>,
  id: string,
  response: WireDefinitionResponse,
) =>
  new Promise<void>((resolve) => {
    call.write(response.setId(id), () => {
      resolve();
    });
  });

type ExecuteCall = (
  id: string,
  response: WireDefinitionResponse,
) => Promise<void>;

export const makeExecuteCall =
  (
    call: ServerDuplexStream<WireDefinitionRequest, WireDefinitionResponse>,
  ): ExecuteCall =>
  (id: string, response: WireDefinitionResponse) =>
    executeCall(call, id, response);
