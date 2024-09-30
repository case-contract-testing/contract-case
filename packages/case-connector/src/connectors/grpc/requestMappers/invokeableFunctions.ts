import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb.js';
import {
  InvokeFunction,
  ContractResponse as WireContractResponse,
} from '@contract-case/case-connector-proto';
import {
  waitForResolution,
  makeResolvableId,
} from '../promiseHandler/promiseHandler.js';
import { SendContractResponse } from '../sendContractResponse.js';
import { BoundaryResult } from '../../../entities/types.js';

const makeGrpcString = (s: string) => new StringValue().setValue(s);

export const makeInvokeFunction =
  (
    handle: string,
    executeCall: SendContractResponse,
  ): (() => Promise<BoundaryResult>) =>
  (...args: string[]) =>
    waitForResolution(
      makeResolvableId((id: string) =>
        executeCall(
          id,
          new WireContractResponse().setInvokeFunction(
            new InvokeFunction()
              .setHandle(makeGrpcString(handle))
              .setArgumentsList(args.map(makeGrpcString)),
          ),
        ),
      ),
    );
