import { ServerDuplexStream } from '@grpc/grpc-js';
import { format } from 'pretty-format';

import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb.js';
import { ContractResponse as WireContractResponse } from '@contract-case/case-connector-proto';

import { LogLevel } from '@contract-case/case-core';
import { connectorDebugLog } from '../../domain/maintainerLog.js';

const sendContractResponse = <T>(
  logLevel: LogLevel,
  call: ServerDuplexStream<T, WireContractResponse>,
  id: string,
  response: WireContractResponse,
) =>
  new Promise<void>((resolve) => {
    const responseWithId = response.setId(new StringValue().setValue(id));
    connectorDebugLog(
      logLevel,
      `[SENDING] (${id})`,
      format(responseWithId.toObject()),
    );
    call.write(responseWithId, () => {
      resolve();
    });
  });

export type SendContractResponse = (
  logLevel: LogLevel,
  id: string,
  response: WireContractResponse,
) => Promise<void>;

export const makeSendContractResponse =
  <T>(
    call: ServerDuplexStream<T, WireContractResponse>,
  ): SendContractResponse =>
  (logLevel: LogLevel, id: string, response: WireContractResponse) =>
    sendContractResponse(logLevel, call, id, response);
