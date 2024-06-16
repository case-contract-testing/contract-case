import { ServerDuplexStream } from '@grpc/grpc-js';

import {
  BoundaryFailure,
  BoundaryFailureKindConstants,
  BoundarySuccess,
} from '../../entities/types';
import {
  DefinitionRequest as WireDefinitionRequest,
  ContractResponse as WireContractResponse,
} from './proto/contract_case_stream_pb';
import { UnreachableError } from './UnreachableError';
import { ConnectorError } from '../../domain/errors/ConnectorError';
import {
  beginDefinition,
  endRecord,
  runExample,
  runRejectingExample,
  stripMatchers,
} from '../../domain/define';
import { mapConfig, mapJson, mapResult } from './requestMappers';
import { resolveById } from './promiseHandler/promiseHandler';
import { makeSendContractResponse } from './sendContractResponse';
import { maintainerLog } from '../../domain/maintainerLog';
import { makeLogPrinter, makeResultPrinter } from './printers';
import { makeResultResponse } from './responseMappers';

const getId = (request: WireDefinitionRequest): string => {
  const id = request.getId();
  if (id === undefined) {
    throw new ConnectorError('Request had no id, but we were expecting one');
  }
  return id.getValue();
};

export const contractDefinition = (
  call: ServerDuplexStream<WireDefinitionRequest, WireContractResponse>,
): void => {
  const sendContractResponse = makeSendContractResponse(call);

  let definitionId: string | undefined;

  call.on('data', (request: WireDefinitionRequest) => {
    maintainerLog('[RECEIVED]', JSON.stringify(request.toObject(), null, 2));
    const type = request.getKindCase();
    switch (type) {
      case WireDefinitionRequest.KindCase.KIND_NOT_SET:
        throw new ConnectorError(
          `Create contract was called with a request type it didn't understand (${type})`,
        );
      case WireDefinitionRequest.KindCase.BEGIN_DEFINITION:
        {
          const beginDefinitionRequest = request.getBeginDefinition();
          if (beginDefinitionRequest == null) {
            throw new ConnectorError(
              'Begin definition was called with something that returned an undefined getBeginDefinition',
            );
          }

          try {
            definitionId = beginDefinition(
              mapConfig(
                beginDefinitionRequest.getConfig(),
                sendContractResponse,
              ),
              makeLogPrinter(sendContractResponse),
              makeResultPrinter(sendContractResponse),
              beginDefinitionRequest
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
                  `Unable to create definer: ${(e as Error).message}`,
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

        endRecord(definitionId).then((result) =>
          sendContractResponse(getId(request), makeResultResponse(result)),
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

        runExample(
          definitionId,
          mapJson(runExampleRequest.getExampleDefinition()),
          mapConfig(runExampleRequest.getConfig(), sendContractResponse),
        ).then((result) =>
          sendContractResponse(getId(request), makeResultResponse(result)),
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

        runRejectingExample(
          definitionId,
          mapJson(runRejectingExampleRequest.getExampleDefinition()),
          mapConfig(
            runRejectingExampleRequest.getConfig(),
            sendContractResponse,
          ),
        ).then((result) =>
          sendContractResponse(getId(request), makeResultResponse(result)),
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

        sendContractResponse(
          getId(request),
          makeResultResponse(
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
      case WireDefinitionRequest.KindCase.LOAD_PLUGIN:
        {
          const loadPluginRequest = request.getLoadPlugin();
          if (loadPluginRequest == null) {
            throw new ConnectorError(
              'loadPlugin called with something that returned an undefined request',
            );
          }

          sendContractResponse(
            getId(request),
            makeResultResponse(
              new BoundaryFailure(
                BoundaryFailureKindConstants.CASE_CORE_ERROR,
                `Plugin loading not implemented`,
                'ContractCase Connector',
              ),
            ),
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
};
