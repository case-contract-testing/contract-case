import grpc, { ServerDuplexStream } from '@grpc/grpc-js';

import {
  BoundaryResult,
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
} from '@contract-case/case-boundary';
import {
  RunExampleResponse,
  RunRejectingExampleResponse,
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
                new RunExampleResponse().setResult(makeResult(result)),
              );

            runExample(
              request.getId(),
              mapJson(runExampleRequest.getExampleDefinition()),
              mapConfig(runExampleRequest.getConfig()),
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
                new RunRejectingExampleResponse().setResult(makeResult(result)),
              );

            runRejectingExample(
              request.getId(),
              mapJson(runRejectingExampleRequest.getExampleDefinition()),
              mapConfig(runRejectingExampleRequest.getConfig()),
            ).then((result) =>
              executeCall(
                request.getId(),
                makeRunRejectingExampleResponse(result),
              ),
            );
            break;
          }
          case WireDefinitionRequest.KindCase.STRIP_MATCHERS:
            // TODO
            break;
          case WireDefinitionRequest.KindCase.STATE_HANDLER_RESPONSE:
            // TODO
            break;

          case WireDefinitionRequest.KindCase.RESULT_PRINTER_RESPONSE:
            // TODO
            break;
          case WireDefinitionRequest.KindCase.TRIGGER_FUNCTION_RESPONSE:
            // TODO
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
