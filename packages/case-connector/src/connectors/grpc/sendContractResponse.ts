import { ServerDuplexStream } from '@grpc/grpc-js';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import { ContractResponse as WireContractResponse } from './proto/contract_case_stream_pb';
import { maintainerLog } from '../../domain/maintainerLog';

const sendContractResponse = <T>(
  call: ServerDuplexStream<T, WireContractResponse>,
  id: string,
  response: WireContractResponse,
) =>
  new Promise<void>((resolve) => {
    maintainerLog(`[SENDING] (${id})`, response.toObject());
    call.write(response.setId(new StringValue().setValue(id)), () => {
      resolve();
    });
  });

export type SendContractResponse = (
  id: string,
  response: WireContractResponse,
) => Promise<void>;

export const makeSendContractResponse =
  <T>(
    call: ServerDuplexStream<T, WireContractResponse>,
  ): SendContractResponse =>
  (id: string, response: WireContractResponse) =>
    sendContractResponse(call, id, response);
