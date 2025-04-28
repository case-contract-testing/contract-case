import { ServerDuplexStream } from '@grpc/grpc-js';

import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb.js';
import {
  VerificationRequest as WireVerificationRequest,
  ContractResponse as WireContractResponse,
  StartTestEvent as WireStartTestEvent,
} from '@contract-case/case-connector-proto';
import { UnreachableError } from './UnreachableError.js';
import {
  BoundaryFailure,
  BoundaryFailureKindConstants,
  BoundaryResult,
  BoundarySuccess,
  BoundarySuccessWithAny,
  IInvokeCoreTest,
} from '../../entities/types.js';
import { ConnectorError } from '../../domain/errors/ConnectorError.js';
import {
  availableContractDescriptions,
  beginVerification,
  registerFunction,
  runVerification,
} from '../../domain/verify.js';
import { maintainerLog } from '../../domain/maintainerLog.js';

import {
  makeInvokeFunction,
  mapConfig,
  mapResult,
} from './requestMappers/index.js';
import {
  makeResolvableId,
  resolveById,
  waitForResolution,
} from './promiseHandler/promiseHandler.js';
import { makeSendContractResponse } from './sendContractResponse.js';
import { makeLogPrinter, makeResultPrinter } from './printers.js';
import { makeResultResponse } from './responseMappers/index.js';
import { loadPlugin } from '../../domain/loadPlugin.js';
import { makeFunctionRegistry } from './functionRegistry/index.js';

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
  const sendUnexpectedError = (
    request: WireVerificationRequest,
    e: Error,
    location: string,
  ) => {
    // This should never happen, so we log a lot
    maintainerLog(
      `!!!Unexpected error!!! At ${location}`,
      e,
      '!!!During request',
      request,
    );
    sendContractResponse(
      'maintainerDebug',
      request.getId()?.getValue() || '',
      makeResultResponse(
        new BoundaryFailure(
          BoundaryFailureKindConstants.CASE_CORE_ERROR,
          `[${e.name}] ${e.message}`,
          e.stack ?? 'ContractCase Connector',
          e.stack ?? 'ContractCase Connector',
          'UNDOCUMENTED',
        ),
      ),
    );
  };

  let verificationId: string | undefined;

  const functionRegistry = makeFunctionRegistry();

  call.on('data', (request: WireVerificationRequest) => {
    maintainerLog('[RECEIVED]', JSON.stringify(request.toObject(), null, 2));
    const type = request.getKindCase();
    try {
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
                  functionRegistry,
                ),
                {
                  runTest: (testName: string, invoker: IInvokeCoreTest) => {
                    const invokerId = makeResolvableId(
                      async () => {},
                      (result: BoundaryResult): BoundaryResult => {
                        // TODO: Replace this with a nice 'isBoundarySuccessWithAny' function
                        if (result.resultType === 'SuccessAny') {
                          const id = `${
                            (result as BoundarySuccessWithAny).payload
                          }`;
                          invoker.verify().then((verificationResult) => {
                            sendContractResponse(
                              'maintainerDebug',
                              id,
                              makeResultResponse(verificationResult),
                            );
                          });
                        }
                        return result;
                      },
                    );

                    return waitForResolution(
                      makeResolvableId((id: string) =>
                        sendContractResponse(
                          'maintainerDebug',
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
                'maintainerDebug',
                getId(request),
                makeResultResponse(
                  new BoundaryFailure(
                    BoundaryFailureKindConstants.CASE_CORE_ERROR,
                    `Unable to create verifier: ${(e as Error).message}`,
                    'ContractCase Connector',
                    (e as Error).stack ?? 'ContractCase Connector',
                    'UNDOCUMENTED',
                  ),
                ),
              );
              return;
            }

            sendContractResponse(
              'maintainerDebug',
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

          availableContractDescriptions(verificationId)
            .then((result) =>
              sendContractResponse(
                'maintainerDebug',
                getId(request),
                makeResultResponse(result),
              ),
            )
            .catch((e) => {
              sendUnexpectedError(
                request,
                e as Error,
                'Available contract descriptions',
              );
            });
          break;
        }
        case WireVerificationRequest.KindCase.RUN_VERIFICATION: {
          const runVerificationRequest = request.getRunVerification();
          if (runVerificationRequest == null) {
            throw new ConnectorError(
              'runVerification called with something that returned an undefined request',
            );
          }
          if (verificationId === undefined) {
            throw new ConnectorError(
              'runVerification was called before beginVerification',
            );
          }

          runVerification(
            verificationId,
            mapConfig(
              runVerificationRequest.getConfig(),
              sendContractResponse,
              functionRegistry,
            ),
          )
            .then((result) =>
              sendContractResponse(
                'maintainerDebug',
                getId(request),
                makeResultResponse(result),
              ),
            )
            .catch((e) => {
              sendUnexpectedError(request, e as Error, 'Run verification');
            });
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

            const id = request.getId()?.getValue();
            resolveById(
              wrappedInvokerId.getValue(),
              // TODO: This should probably explode, there should always be an ID
              new BoundarySuccessWithAny(id ?? '!!NO_ID!!'),
            );
            //     sendContractResponse(getId(request), makeResultResponse(result));
          }
          break;
        case WireVerificationRequest.KindCase.LOAD_PLUGIN:
          {
            const loadPluginRequest = request.getLoadPlugin();
            if (loadPluginRequest == null) {
              throw new ConnectorError(
                'loadPlugin called with something that returned an undefined request',
              );
            }

            Promise.resolve()
              .then(() =>
                loadPlugin(
                  mapConfig(
                    loadPluginRequest.getConfig(),
                    sendContractResponse,
                    functionRegistry,
                  ),
                  makeLogPrinter(sendContractResponse),
                  makeResultPrinter(sendContractResponse),
                  loadPluginRequest
                    .getCallerVersionsList()
                    .map((s) =>
                      s != null ? s.getValue() : 'missing-version-value',
                    ),
                  loadPluginRequest.getModuleNamesList().map((s, index) => {
                    if (s == null) {
                      throw new ConnectorError(
                        `loadPlugin called with a null module name at position '${index}'`,
                      );
                    }
                    return s.getValue();
                  }),
                ),
              )
              .then((result) =>
                sendContractResponse(
                  'maintainerDebug',
                  getId(request),
                  makeResultResponse(result),
                ),
              )
              .catch((e) => {
                sendUnexpectedError(request, e as Error, 'load plugin');
              });
          }
          break;
        case WireVerificationRequest.KindCase.REGISTER_FUNCTION:
          {
            const registerFunctionRequest = request.getRegisterFunction();
            if (registerFunctionRequest == null) {
              throw new ConnectorError(
                'registerFunction called with something that returned an undefined request',
              );
            }
            if (verificationId === undefined) {
              throw new ConnectorError(
                'runVerification was called before beginVerification',
              );
            }
            const handle = registerFunctionRequest.getHandle()?.getValue();
            if (handle == null) {
              throw new ConnectorError('Handle was missing a value');
            }
            registerFunction(
              verificationId,
              handle,
              makeInvokeFunction(handle, sendContractResponse),
            )
              .then((result) =>
                sendContractResponse(
                  'maintainerDebug',
                  getId(request),
                  makeResultResponse(result),
                ),
              )
              .catch((e) => {
                sendUnexpectedError(request, e as Error, 'load plugin');
              });
          }
          break;
        case WireVerificationRequest.KindCase.INVOKE_FUNCTION:
          {
            const invokeFunctionRequest = request.getInvokeFunction();
            if (invokeFunctionRequest == null) {
              throw new ConnectorError(
                'invokeFunction called with something that returned an undefined request',
              );
            }
            const handle = invokeFunctionRequest.getHandle()?.getValue();
            if (handle == null) {
              throw new ConnectorError('Handle was missing a value');
            }
            const args = invokeFunctionRequest
              .getArgumentsList()
              .map((s) => s.getValue());

            Promise.resolve(
              functionRegistry.getCoreFunction(handle)(...args),
            ).then((result) => {
              sendContractResponse(
                'maintainerDebug',
                getId(request),
                makeResultResponse(result),
              );
            });
          }
          break;
        default:
          throw new UnreachableError(type);
      }
    } catch (e) {
      sendUnexpectedError(request, e as Error, 'Overall catch');
    }
  });
  call.on('end', () => {
    call.end();
  });
};
