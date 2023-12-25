import grpc, { ServerDuplexStream } from '@grpc/grpc-js';

import {
  BoundaryResult,
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
} from '@contract-case/case-boundary';
import {
  RunExampleResponse as WireRunExampleResponse,
  RunRejectingExampleResponse as WireRunRejectingExampleResponse,
  StripMatchersResponse as WireStripMatchersResponse,
  DefinitionRequest as WireDefinitionRequest,
  DefinitionResponse as WireDefinitionResponse,
  EndDefinitionResponse as WireEndDefinitionResponse,
} from './proto/contract_case_stream_pb';
import service from './proto/contract_case_stream_grpc_pb';
import { UnreachableError } from './UnreachableError';
import { ConnectorError } from '../../domain/errors/ConnectorError';
import {
  beginDefinition,
  endRecord,
  runExample,
  runRejectingExample,
  stripMatchers,
} from '../define';
import { mapConfig, mapJson, mapResult } from './requestMappers';
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
  makeResult,
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

      let definitionId: string | undefined;

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
              definitionId = beginDefinition(
                mapConfig(beginDefinitionRequest.getConfig(), executeCall),
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
            }
            break;
          case WireDefinitionRequest.KindCase.END_DEFINITION: {
            const endDefinitionRequest = request.getEndDefinition();
            if (endDefinitionRequest == null) {
              throw new ConnectorError(
                'end definition was called with something that returned an undefined getBeginDefinition',
              );
            }
            if (definitionId === undefined) {
              throw new ConnectorError(
                'end definition was called before begin definition',
              );
            }

            const makeEndDefinitionResponse = (result: BoundaryResult) =>
              new WireDefinitionResponse().setEndDefinitionResponse(
                new WireEndDefinitionResponse().setResult(makeResult(result)),
              );

            endRecord(definitionId).then((result) =>
              executeCall(request.getId(), makeEndDefinitionResponse(result)),
            );
            break;
          }
          case WireDefinitionRequest.KindCase.RUN_EXAMPLE: {
            const runExampleRequest = request.getRunExample();
            if (runExampleRequest == null) {
              throw new ConnectorError(
                'run example called with something that returned an undefined request',
              );
            }
            if (definitionId === undefined) {
              throw new ConnectorError(
                'runExample was called before begin definition',
              );
            }

            const makeRunExampleResponse = (result: BoundaryResult) =>
              new WireDefinitionResponse().setRunExampleResponse(
                new WireRunExampleResponse().setResult(makeResult(result)),
              );

            runExample(
              request.getId(),
              mapJson(runExampleRequest.getExampleDefinition()),
              mapConfig(runExampleRequest.getConfig(), executeCall),
            ).then((result) =>
              executeCall(request.getId(), makeRunExampleResponse(result)),
            );
            break;
          }
          case WireDefinitionRequest.KindCase.RUN_REJECTING_EXAMPLE: {
            const runRejectingExampleRequest = request.getRunRejectingExample();
            if (runRejectingExampleRequest == null) {
              throw new ConnectorError(
                'run rejecting example called with something that returned an undefined request',
              );
            }
            if (definitionId === undefined) {
              throw new ConnectorError(
                'runExample was called before begin definition',
              );
            }
            const makeRunRejectingExampleResponse = (result: BoundaryResult) =>
              new WireDefinitionResponse().setRunExampleResponse(
                new WireRunRejectingExampleResponse().setResult(
                  makeResult(result),
                ),
              );

            runRejectingExample(
              request.getId(),
              mapJson(runRejectingExampleRequest.getExampleDefinition()),
              mapConfig(runRejectingExampleRequest.getConfig(), executeCall),
            ).then((result) =>
              executeCall(
                request.getId(),
                makeRunRejectingExampleResponse(result),
              ),
            );
            break;
          }
          case WireDefinitionRequest.KindCase.STRIP_MATCHERS: {
            const stripMatchersRequest = request.getStripMatchers();
            if (stripMatchersRequest == null) {
              throw new ConnectorError(
                'strip matchers called with something that returned an undefined request',
              );
            }
            if (definitionId === undefined) {
              throw new ConnectorError(
                'stripMatchers was called before begin definition',
              );
            }
            const makeStripMatchersResponse = (result: BoundaryResult) =>
              new WireDefinitionResponse().setStripMatchersResponse(
                new WireStripMatchersResponse().setResult(makeResult(result)),
              );

            executeCall(
              request.getId(),
              makeStripMatchersResponse(
                stripMatchers(
                  request.getId(),
                  mapJson(stripMatchersRequest.getMatcherOrData()),
                ),
              ),
            );
            break;
          }
          case WireDefinitionRequest.KindCase.STATE_HANDLER_RESPONSE:
            {
              const stateHandlerResponse = request.getStateHandlerResponse();
              if (stateHandlerResponse == null) {
                throw new ConnectorError(
                  'Result printer response was called with an undefined request',
                );
              }

              resolveById(
                request.getId(),
                mapResult(stateHandlerResponse.getResult()),
              );
            }
            break;
          case WireDefinitionRequest.KindCase.RESULT_PRINTER_RESPONSE:
            {
              const resultPrinterResponse = request.getResultPrinterResponse();
              if (resultPrinterResponse == null) {
                throw new ConnectorError(
                  'Result printer response was called with an undefined request',
                );
              }

              resolveById(
                request.getId(),
                mapResult(resultPrinterResponse.getResult()),
              );
            }
            break;
          case WireDefinitionRequest.KindCase.TRIGGER_FUNCTION_RESPONSE:
            {
              const triggerFunctionResponse =
                request.getTriggerFunctionResponse();
              if (triggerFunctionResponse == null) {
                throw new ConnectorError(
                  'Trigger function response was called with an undefined request',
                );
              }

              resolveById(
                request.getId(),
                mapResult(triggerFunctionResponse.getResult()),
              );
            }
            break;
          case WireDefinitionRequest.KindCase.LOG_PRINTER_RESPONSE: {
            const logPrinterResponse = request.getLogPrinterResponse();
            if (logPrinterResponse == null) {
              throw new ConnectorError(
                'Log printer response was called with something that returned an undefined logPrinterResponse',
              );
            }

            resolveById(
              request.getId(),
              mapResult(logPrinterResponse.getResult()),
            );
            break;
          }
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
