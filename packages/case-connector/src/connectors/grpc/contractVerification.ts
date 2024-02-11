import { ServerDuplexStream } from '@grpc/grpc-js';

import {
  BoundaryFailure,
  BoundaryFailureKindConstants,
  BoundarySuccess,
  IInvokeCoreTest,
} from '@contract-case/case-boundary';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import {
  VerificationRequest as WireVerificationRequest,
  ContractResponse as WireContractResponse,
  StartTestEvent as WireStartTestEvent,
} from './proto/contract_case_stream_pb';
import { UnreachableError } from './UnreachableError';

import { ConnectorError } from '../../domain/errors/ConnectorError';
import {
  availableContractDescriptions,
  beginVerification,
  runVerification,
} from '../../domain/verify';
import { maintainerLog } from '../../domain/maintainerLog';

import { mapConfig, mapResult } from './requestMappers';
import {
  makeResolvableId,
  resolveById,
  waitForResolution,
} from './promiseHandler/promiseHandler';
import { makeSendContractResponse } from './sendContractResponse';
import { makeLogPrinter, makeResultPrinter } from './printers';
import { makeResultResponse } from './responseMappers';

const getId = (request: WireVerificationRequest): string => {
  const id = request.getId();
  if (id === undefined) {
    throw new ConnectorError('Request had no id, but we were expecting one');
  }
  return id.getValue();
};

export const contractVerification = (
  call: ServerDuplexStream<WireVerificationRequest, WireContractResponse>,
): void => {
  const sendContractResponse = makeSendContractResponse(call);

  let verificationId: string | undefined;

  call.on('data', (request: WireVerificationRequest) => {
    maintainerLog('[RECEIVED]', JSON.stringify(request.toObject(), null, 2));
    const type = request.getKindCase();
    switch (type) {
      case WireVerificationRequest.KindCase.KIND_NOT_SET:
        throw new ConnectorError(
          `Verify contract was called with a request type it didn't understand (${type})`,
        );
      case WireVerificationRequest.KindCase.BEGIN_VERIFICATION:
        {
          const beginVerificationRequest = request.getBeginVerification();
          if (beginVerificationRequest == null) {
            throw new ConnectorError(
              'Begin definition was called with something that returned an undefined getBeginDefinition',
            );
          }

          try {
            verificationId = beginVerification(
              mapConfig(
                beginVerificationRequest.getConfig(),
                sendContractResponse,
              ),
              {
                runTest: (testName: string, invoker: IInvokeCoreTest) => {
                  const invokerId = makeResolvableId((id: string) =>
                    invoker.verify().then((result) => {
                      sendContractResponse(id, makeResultResponse(result));
                    }),
                  );

                  return waitForResolution(
                    makeResolvableId((id: string) =>
                      sendContractResponse(
                        id,
                        new WireContractResponse().setStartTestEvent(
                          new WireStartTestEvent()
                            .setTestName(new StringValue().setValue(testName))
                            .setInvokerId(
                              new StringValue().setValue(invokerId),
                            ),
                        ),
                      ),
                    ),
                  );
                },
              },
              makeLogPrinter(sendContractResponse),
              makeResultPrinter(sendContractResponse),
              beginVerificationRequest
                .getCallerVersionsList()
                .map((s) =>
                  s != null ? s.getValue() : 'missing-version-value',
                ),
            );
          } catch (e) {
            sendContractResponse(
              getId(request),
              makeResultResponse(
                new BoundaryFailure(
                  BoundaryFailureKindConstants.CASE_CORE_ERROR,
                  `Unable to create verifier: ${(e as Error).message}`,
                  'ContractCase Connector',
                ),
              ),
            );
            return;
          }

          sendContractResponse(
            getId(request),
            makeResultResponse(new BoundarySuccess()),
          );
        }
        break;
      case WireVerificationRequest.KindCase.AVAILABLE_CONTRACT_DEFINITIONS: {
        if (verificationId === undefined) {
          throw new ConnectorError(
            'availableContractDefinitions was called before beginVerification',
          );
        }

        availableContractDescriptions(verificationId).then((result) =>
          sendContractResponse(getId(request), makeResultResponse(result)),
        );
        break;
      }
      case WireVerificationRequest.KindCase.RUN_VERIFICATION: {
        const runVerificationRequest = request.getRunVerification();
        if (runVerificationRequest == null) {
          throw new ConnectorError(
            'run rejecting example called with something that returned an undefined request',
          );
        }
        if (verificationId === undefined) {
          throw new ConnectorError(
            'runVerification was called before beginVerification',
          );
        }

        runVerification(
          verificationId,
          mapConfig(runVerificationRequest.getConfig(), sendContractResponse),
        ).then((result) =>
          sendContractResponse(getId(request), makeResultResponse(result)),
        );
        break;
      }
      case WireVerificationRequest.KindCase.RESULT_RESPONSE:
        {
          const resultPrinterResponse = request.getResultResponse();
          if (resultPrinterResponse == null) {
            throw new ConnectorError(
              'Result response was called with an undefined request',
            );
          }

          resolveById(
            getId(request),
            mapResult(resultPrinterResponse.getResult()),
          );
        }
        break;
      case WireVerificationRequest.KindCase.INVOKE_TEST:
        {
          const invokeTestResponse = request.getInvokeTest();
          if (invokeTestResponse == null) {
            throw new ConnectorError(
              'Invoke test was called with an undefined invokeTest',
            );
          }
          const wrappedInvokerId = invokeTestResponse.getInvokerId();
          if (wrappedInvokerId == null) {
            throw new ConnectorError(
              'Invoke test was called with an undefined invoker ID',
            );
          }

          resolveById(wrappedInvokerId.getValue(), new BoundarySuccess());
        }
        break;
      default:
        throw new UnreachableError(type);
    }
  });
  call.on('end', () => {
    call.end();
  });
};
