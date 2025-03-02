import { ServerDuplexStream } from '@grpc/grpc-js';

import {
  DefinitionRequest as WireDefinitionRequest,
  ContractResponse as WireContractResponse,
} from '@contract-case/case-connector-proto';
import {
  BoundaryFailure,
  BoundaryFailureKindConstants,
  BoundarySuccess,
} from '../../entities/types.js';
import { UnreachableError } from './UnreachableError.js';
import { ConnectorError } from '../../domain/errors/ConnectorError.js';
import {
  beginDefinition,
  endRecord,
  registerFunction,
  runInteraction,
  runRejectingInteraction,
  stripMatchers,
} from '../../domain/define.js';
import {
  makeInvokeFunction,
  mapConfig,
  mapJson,
  mapResult,
} from './requestMappers/index.js';
import { resolveById } from './promiseHandler/promiseHandler.js';
import { makeSendContractResponse } from './sendContractResponse.js';
import {
  connectorDebugLog,
  maintainerLog,
} from '../../domain/maintainerLog.js';
import { makeLogPrinter, makeResultPrinter } from './printers.js';
import { makeResultResponse } from './responseMappers/index.js';
import { loadPlugin } from '../../domain/loadPlugin.js';
import { makeFunctionRegistry } from './functionRegistry/index.js';

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

  const sendUnexpectedError = (
    request: WireDefinitionRequest,
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
        ),
      ),
    );
  };

  let definitionId: string | undefined;

  const functionRegistry = makeFunctionRegistry();

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
                functionRegistry,
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
              'maintainerDebug',
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
            'maintainerDebug',
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
          sendContractResponse(
            'maintainerDebug',
            getId(request),
            makeResultResponse(result),
          ),
        );
        break;
      }
      case WireDefinitionRequest.KindCase.RUN_INTERACTION: {
        const runInteractionRequest = request.getRunInteraction();
        if (runInteractionRequest == null) {
          throw new ConnectorError(
            'run example called with something that returned an undefined request',
          );
        }
        if (definitionId === undefined) {
          throw new ConnectorError(
            'runInteraction was called before begin definition',
          );
        }

        runInteraction(
          definitionId,
          mapJson(runInteractionRequest.getExampleDefinition()),
          mapConfig(
            runInteractionRequest.getConfig(),
            sendContractResponse,
            functionRegistry,
          ),
        ).then((result) =>
          sendContractResponse(
            'maintainerDebug',
            getId(request),
            makeResultResponse(result),
          ),
        );
        break;
      }
      case WireDefinitionRequest.KindCase.RUN_REJECTING_INTERACTION: {
        const runRejectingInteractionRequest =
          request.getRunRejectingInteraction();
        if (runRejectingInteractionRequest == null) {
          throw new ConnectorError(
            'run rejecting example called with something that returned an undefined request',
          );
        }
        if (definitionId === undefined) {
          throw new ConnectorError(
            'runInteraction was called before begin definition',
          );
        }

        runRejectingInteraction(
          definitionId,
          mapJson(runRejectingInteractionRequest.getExampleDefinition()),
          mapConfig(
            runRejectingInteractionRequest.getConfig(),
            sendContractResponse,
            functionRegistry,
          ),
        ).then((result) =>
          sendContractResponse(
            'maintainerDebug',
            getId(request),
            makeResultResponse(result),
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

        sendContractResponse(
          'maintainerDebug',
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
        try {
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
        } catch (e) {
          connectorDebugLog('maintainerDebug', 'Exploded with:', e);
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
              .map((s) => (s != null ? s.getValue() : 'missing-version-value')),
            loadPluginRequest.getModuleNamesList().map((s, index) => {
              if (s == null) {
                throw new ConnectorError(
                  `loadPlugin called with a null module name at position '${index}'`,
                );
              }
              return s.getValue();
            }),
          ).then((result) =>
            sendContractResponse(
              'maintainerDebug',
              getId(request),
              makeResultResponse(result),
            ),
          );
        }
        break;
      case WireDefinitionRequest.KindCase.REGISTER_FUNCTION:
        {
          const registerFunctionRequest = request.getRegisterFunction();
          if (registerFunctionRequest == null) {
            throw new ConnectorError(
              'registerFunction called with something that returned an undefined request',
            );
          }
          if (definitionId === undefined) {
            throw new ConnectorError(
              'runVerification was called before beginVerification',
            );
          }
          const handle = registerFunctionRequest.getHandle()?.getValue();
          if (handle == null) {
            throw new ConnectorError('Handle was missing a value');
          }
          registerFunction(
            definitionId,
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
      case WireDefinitionRequest.KindCase.INVOKE_FUNCTION:
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
  });
  call.on('end', () => {
    call.end();
  });
};
