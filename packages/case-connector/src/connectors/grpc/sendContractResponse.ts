import { ServerDuplexStream } from '@grpc/grpc-js';
import { format } from 'pretty-format';

import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb.js';
import { ContractResponse as WireContractResponse } from '@contract-case/case-connector-proto';

import { maintainerLog } from '../../domain/maintainerLog.js';

const sendContractResponse = <T>(
  call: ServerDuplexStream<T, WireContractResponse>,
  id: string,
  response: WireContractResponse,
) =>
  new Promise<void>((resolve) => {
    const responseWithId = response.setId(new StringValue().setValue(id));
    maintainerLog(`[SENDING] (${id})`, format(responseWithId.toObject()));
    call.write(responseWithId, () => {
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
