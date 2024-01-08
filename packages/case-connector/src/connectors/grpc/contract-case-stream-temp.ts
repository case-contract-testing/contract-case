import { Server, ServerCredentials, ServerDuplexStream } from '@grpc/grpc-js';

import {
  BoundaryFailure,
  BoundaryFailureKindConstants,
  BoundaryResult,
  BoundarySuccess,
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
} from '@contract-case/case-boundary';
import {
  ResultResponse as WireResultResponse,
  DefinitionRequest as WireDefinitionRequest,
  DefinitionResponse as WireDefinitionResponse,
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
import { maintainerLog } from '../../domain/maintainerLog';

const getId = (request: WireDefinitionRequest): string => {
  const id = request.getId();
  if (id === undefined) {
    throw new ConnectorError('Request had no id, but we were expecting one');
  }
  return id.getValue();
};

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
export function main(): void {
  const server = new Server();

  server.bindAsync(
    '0.0.0.0:50200',
    ServerCredentials.createInsecure(),
    (error, port) => {
      if (error != null) {
        maintainerLog('[SERVER]', `Unable to start: ${error}`);
      } else {
        maintainerLog('[SERVER]', `Started on port: ${port}`);
        server.start();
      }
    },
  );

  server.addService(service.ContractCaseService, {
    contractDefinition: (
      call: ServerDuplexStream<WireDefinitionRequest, WireDefinitionResponse>,
    ) => {
      const executeCall = makeExecuteCall(call);

      let definitionId: string | undefined;

      call.on('data', (request: WireDefinitionRequest) => {
        maintainerLog(
          '[RECEIVED]',
          JSON.stringify(request.toObject(), null, 2),
        );
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
              const makeBeginDefinitionResponse = (result: BoundaryResult) =>
                new WireDefinitionResponse().setResultResponse(
                  new WireResultResponse().setResult(makeResult(result)),
                );
              try {
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
                          executeCall(
                            id,
                            makePrintMatchErrorRequest(matchError),
                          ),
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
                  beginDefinitionRequest
                    .getCallerVersionsList()
                    .map((s) =>
                      s != null ? s.getValue() : 'missing-version-value',
                    ),
                );
              } catch (e) {
                executeCall(
                  getId(request),
                  makeBeginDefinitionResponse(
                    new BoundaryFailure(
                      BoundaryFailureKindConstants.CASE_CORE_ERROR,
                      `Unable to create definer: ${(e as Error).message}`,
                      'ContractCase Connector',
                    ),
                  ),
                );
                return;
              }

              executeCall(
                getId(request),
                makeBeginDefinitionResponse(new BoundarySuccess()),
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
              new WireDefinitionResponse().setResultResponse(
                new WireResultResponse().setResult(makeResult(result)),
              );

            endRecord(definitionId).then((result) =>
              executeCall(getId(request), makeEndDefinitionResponse(result)),
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
              new WireDefinitionResponse().setResultResponse(
                new WireResultResponse().setResult(makeResult(result)),
              );

            runExample(
              definitionId,
              mapJson(runExampleRequest.getExampleDefinition()),
              mapConfig(runExampleRequest.getConfig(), executeCall),
            ).then((result) =>
              executeCall(getId(request), makeRunExampleResponse(result)),
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
              new WireDefinitionResponse().setResultResponse(
                new WireResultResponse().setResult(makeResult(result)),
              );

            runRejectingExample(
              definitionId,
              mapJson(runRejectingExampleRequest.getExampleDefinition()),
              mapConfig(runRejectingExampleRequest.getConfig(), executeCall),
            ).then((result) =>
              executeCall(
                getId(request),
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
              new WireDefinitionResponse().setResultResponse(
                new WireResultResponse().setResult(makeResult(result)),
              );

            executeCall(
              getId(request),
              makeStripMatchersResponse(
                stripMatchers(
                  definitionId,
                  mapJson(stripMatchersRequest.getMatcherOrData()),
                ),
              ),
            );
            break;
          }
          case WireDefinitionRequest.KindCase.RESULT_RESPONSE:
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
          default:
            throw new UnreachableError(type);
        }
      });
      call.on('end', () => {
        call.end();
      });
    },
  });
}
