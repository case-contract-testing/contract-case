import grpc, { ServerDuplexStream } from '@grpc/grpc-js';

import {
  BoundaryFailure,
  BoundaryResult,
  BoundarySuccess,
  BoundarySuccessWithMap,
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
} from '@contract-case/case-boundary';
import {
  BoundaryResult as WireBoundaryResult,
  DefinitionRequest as WireDefinitionRequest,
  DefinitionResponse as WireDefinitionResponse,
} from './proto/contract_case_stream_pb';
import service from './proto/contract_case_stream_grpc_pb';
import { UnreachableError } from './UnreachableError';
import { ConnectorError } from '../../domain/errors/ConnectorError';
import { beginDefinition } from '../define';
import { mapConfig } from './requestMappers';
import {
  makeResolvableId,
  resolveById,
  waitForResolution,
} from './promiseHandler/promiseHandler';
import {
  makeLogRequest,
  makePrintMatchErrorRequest,
  makePrintTestTitleRequest,
  makePrintableMessageErrorRequest,
} from './responseMappers';
import { makeExecuteCall } from './executeCall';

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  const server = new grpc.Server();

  server.addService(service.ContractCaseService, {
    ContractDefinition: (
      call: ServerDuplexStream<WireDefinitionRequest, WireDefinitionResponse>,
    ) => {
      const executeCall = makeExecuteCall(call);

      call.on('data', (request: WireDefinitionRequest) => {
        const type = request.getKindCase();
        switch (type) {
          case WireDefinitionRequest.KindCase.KIND_NOT_SET:
            throw new ConnectorError(
              "Create contract was called with a request type it didn't understand",
            );
          case WireDefinitionRequest.KindCase.BEGIN_DEFINITION:
            {
              const beginDefinitionRequest = request.getBeginDefinition();
              if (beginDefinitionRequest == null) {
                throw new ConnectorError(
                  'Begin definition was called with something that returned an undefined getBeginDefinition',
                );
              }
              const definition = beginDefinition(
                mapConfig(beginDefinitionRequest.getConfig()),
                {
                  log: async (
                    level: string,
                    timestamp: string,
                    version: string,
                    typeString: string,
                    location: string,
                    message: string,
                    additional: string,
                  ): Promise<BoundaryResult> =>
                    waitForResolution(
                      makeResolvableId((id: string) =>
                        executeCall(
                          id,
                          makeLogRequest({
                            level,
                            timestamp,
                            version,
                            typeString,
                            location,
                            message,
                            additional,
                          }),
                        ),
                      ),
                    ),
                },
                {
                  printMatchError: async (
                    matchError: PrintableMatchError,
                  ): Promise<BoundaryResult> =>
                    waitForResolution(
                      makeResolvableId((id: string) =>
                        executeCall(id, makePrintMatchErrorRequest(matchError)),
                      ),
                    ),
                  printMessageError: async (
                    messageError: PrintableMessageError,
                  ): Promise<BoundaryResult> =>
                    waitForResolution(
                      makeResolvableId((id) =>
                        executeCall(
                          id,
                          makePrintableMessageErrorRequest(messageError),
                        ),
                      ),
                    ),
                  printTestTitle: async (
                    testTitle: PrintableTestTitle,
                  ): Promise<BoundaryResult> =>
                    waitForResolution(
                      makeResolvableId((id: string) =>
                        executeCall(id, makePrintTestTitleRequest(testTitle)),
                      ),
                    ),
                },
                beginDefinitionRequest.getCallerVersionsList(),
              );

              // TODO: Don't do this
              // eslint-disable-next-line no-console
              console.log(definition);
            }
            break;
          case WireDefinitionRequest.KindCase.END_DEFINITION:
            // TODO
            break;
          case WireDefinitionRequest.KindCase.RUN_EXAMPLE:
            // TODO
            break;
          case WireDefinitionRequest.KindCase.RUN_REJECTING_EXAMPLE:
            // TODO
            break;
          case WireDefinitionRequest.KindCase.STRIP_MATCHERS:
            // TODO
            break;
          case WireDefinitionRequest.KindCase.STATE_HANDLER_RESPONSE:
            // TODO
            break;
          case WireDefinitionRequest.KindCase.LOG_PRINTER_RESPONSE: {
            const logPrinterResponse = request.getLogPrinterResponse();
            if (logPrinterResponse == null) {
              throw new ConnectorError(
                'Log printer response was called with something that returned an undefined logPrinterResponse',
              );
            }
            const mapResult = (
              wireBoundaryResult: WireBoundaryResult | undefined,
            ): BoundaryResult => {
              if (wireBoundaryResult == null) {
                throw new ConnectorError(
                  'Log printer response was called with something that returned an undefined wireBoundaryResult',
                );
              }
              const resultType = wireBoundaryResult.getValueCase();
              switch (resultType) {
                case WireBoundaryResult.ValueCase.VALUE_NOT_SET:
                  throw new ConnectorError(
                    'Log printer response was called with something that returned an unset wireBoundaryResult. This is probably an error in the wrapper library',
                  );
                case WireBoundaryResult.ValueCase.SUCCESS:
                  return new BoundarySuccess();

                case WireBoundaryResult.ValueCase.SUCCES_HAS_MAP: {
                  const wireWithMap = wireBoundaryResult.getSuccesHasMap();
                  if (wireWithMap == null) {
                    throw new ConnectorError(
                      'undefined wire with map in a boundary result. This is probably an error in the wrapper library.',
                    );
                  }
                  // TOOD: Map this map
                  return new BoundarySuccessWithMap(wireWithMap.getMap());
                }
                case WireBoundaryResult.ValueCase.SUCCESS_HAS_ANY: {
                  const wireWithAny = wireBoundaryResult.getSuccessHasAny();
                  if (wireWithAny == null) {
                    throw new ConnectorError(
                      'undefined wire with any p in a boundary result. This is probably an error in the wrapper library.',
                    );
                  }
                  // TOOD: Map this object
                  return new BoundarySuccessWithMap(wireWithAny.getPayload());
                }
                case WireBoundaryResult.ValueCase.FAILURE: {
                  const wireFailure = wireBoundaryResult.getFailure();
                  if (wireFailure == null) {
                    throw new ConnectorError(
                      'undefined wire with any p in a boundary result. This is probably an error in the wrapper library.',
                    );
                  }
                  return new BoundaryFailure(
                    wireFailure.getKind(),
                    wireFailure.getMessage(),
                    wireFailure.getLocation(),
                  );
                }
                default:
                  throw new UnreachableError(resultType);
              }
            };
            const respondingId = request.getId();

            const boundaryResult = mapResult(logPrinterResponse.getResult());

            resolveById(respondingId, boundaryResult);
            break;
          }

          case WireDefinitionRequest.KindCase.RESULT_PRINTER_RESPONSE:
          case WireDefinitionRequest.KindCase.TRIGGER_FUNCTION_RESPONSE:
            break;
          default:
            throw new UnreachableError(type);
        }
      });
      call.on('end', () => {
        call.end();
      });
    },
  });
  server.bindAsync(
    '0.0.0.0:200400',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    },
  );
}

main();
