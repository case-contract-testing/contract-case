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
  ContractCaseConfig as WireContractCaseConfig,
  DefinitionRequest as WireDefinitionRequest,
  DefinitionResponse as WireDefinitionResponse,
  LogRequest as WireLogRequest,
  PrintMatchErrorRequest as WirePrintMatchErrorRequest,
  PrintMessageErrorRequest as WirePrintMessageErrorRequest,
  PrintTestTitleRequest as WirePrintTestTitleRequest,
  StateHandlerHandle as WireStateHandlerHandle,
} from './proto/contract_case_stream_pb';
import service from './proto/contract_case_stream_grpc_pb';
import { UnreachableError } from './UnreachableError';
import { ConnectorError } from './ConnectorError';
import { beginDefinition } from '../define';
import {
  ConnectorStateHandler,
  ContractCaseConnectorConfig,
} from '../../domain/types';

const promises: Record<
  string,
  { r: (value: BoundaryResult) => void; p: Promise<BoundaryResult> } | undefined
> = {};

/**
 *
 * @param executeCall - the call to execute immediately. Should be a function that takes an ID.
 * @returns an ID that can be used to resolve the promise returned by `waitForResolution`
 */
const makeResolvableId = (
  executeCall: (id: string) => Promise<void>,
): string => {
  const id = 'someID'; // TODO: Make this a uuid

  let r: (value: BoundaryResult) => void = () => {
    // This promise should be immediately overwritten by
    // the resolution function in `immediatePromise` directly below
    throw new ConnectorError(
      "An uninitialised promise resolver was called. This isn't supposed to be possible, as promises that don't do any read/write execute immediately",
    );
  };
  const immediatePromise = new Promise<BoundaryResult>((resolve) => {
    r = (v: BoundaryResult) => {
      promises[id] = undefined;
      resolve(v);
    };
  });

  promises[id] = { r, p: executeCall(id).then(() => immediatePromise) };
  return id;
};

const waitForResolution = (id: string): Promise<BoundaryResult> => {
  const resolvable = promises[id];
  if (resolvable === undefined) {
    return Promise.reject(
      new ConnectorError(
        `When waiting, the promise resolver for a promise with ID '${id}' was missing. This is a programmer error in case-connector.`,
      ),
    );
  }
  return resolvable.p;
};

const resolveById = (id: string, result: BoundaryResult) => {
  const resolvable = promises[id];
  if (resolvable === undefined) {
    throw new ConnectorError(
      `When resolving, the promise resolver for a promise with ID '${id}' was missing. This can happen if a wrapper library misbehaves and responds to the same message more than once`,
    );
  }
  resolvable.r(result);
};

const makeStateHandlerCall =
  (_handle: WireStateHandlerHandle): (() => Promise<BoundaryResult>) =>
  () =>
    Promise.reject(new Error(`Not implemented: ${_handle}`));

const mapStateHandlers = (
  stateHandlers: WireStateHandlerHandle[],
): Record<string, ConnectorStateHandler> =>
  stateHandlers.reduce<Record<string, ConnectorStateHandler>>(
    (acc: Record<string, ConnectorStateHandler>, handler) => ({
      ...acc,
      [handler.getHandle()]: {
        ...(acc[handler.getHandle()] ? acc[handler.getHandle()] : {}),
        ...(handler.getStage() ===
        WireStateHandlerHandle.Stage.STAGE_SETUP_UNSPECIFIED
          ? { setup: makeStateHandlerCall(handler) }
          : {
              setup: makeStateHandlerCall(handler),
              teardown: makeStateHandlerCall(handler),
            }),
      },
    }),
    {} as Record<string, ConnectorStateHandler>,
  );

const mapBasicAuth = (
  basicAuth: WireContractCaseConfig.UsernamePassword | undefined,
): { username: string; password: string } | undefined => {
  if (basicAuth == null) {
    return undefined;
  }

  return {
    username: basicAuth.getUsername(),
    password: basicAuth.getPassword(),
  };
};

type WithUndefined<T> = {
  [P in keyof T]-?: T[P] | undefined;
};

const mapAllConfigFields = (
  config: WireContractCaseConfig,
): WithUndefined<ContractCaseConnectorConfig> => ({
  providerName: config.getProviderName(),
  consumerName: config.getConsumerName(),
  logLevel: config.getLogLevel(),
  contractDir: config.getContractDir(),
  contractFilename: config.getContractFilename(),

  publish: config.getPublish(),
  brokerCiAccessToken: config.getBrokerCiAccessToken(),
  brokerBaseUrl: config.getBrokerBaseUrl(),
  brokerBasicAuth: mapBasicAuth(config.getBrokerBasicAuth()),

  baseUrlUnderTest: config.getBaseUrlUnderTest(),
  printResults: config.getPrintResults(),
  throwOnFail: config.getThrowOnFail(),

  stateHandlers: mapStateHandlers(config.getStateHandlersList()),
  triggerAndTests: {}, // Record<string, ConnectorTriggerFunction>;
  triggerAndTest: {
    trigger: () => Promise.reject(new Error('Not implemented')),
  }, // ConnectorTriggerFunction;
});

const mapConfig = (
  config: WireContractCaseConfig | undefined,
): ContractCaseConnectorConfig => {
  if (config === undefined) {
    throw new ConnectorError('Config object must be provided');
  }

  return Object.entries(
    mapAllConfigFields(config),
  ).reduce<ContractCaseConnectorConfig>(
    // Kill any fields that are empty strings or otherwise undefined
    (acc, [key, value]) => ({
      ...acc,
      ...(value !== '' && value !== undefined ? { [key]: value } : {}),
    }),
    {} as ContractCaseConnectorConfig,
  );
};

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
                      makeResolvableId(
                        (id: string) =>
                          new Promise((resolve) => {
                            call.write(
                              new WireDefinitionResponse()
                                .setLogRequest(
                                  new WireLogRequest()
                                    .setLevel(level)
                                    .setTimestamp(timestamp)
                                    .setVersion(version)
                                    .setTypeString(typeString)
                                    .setLocation(location)
                                    .setMessage(message)
                                    .setAdditional(additional),
                                )
                                .setId(id),
                              () => {
                                resolve();
                              },
                            );
                          }),
                      ),
                    ),
                },
                {
                  printMatchError: async ({
                    kind,
                    message,
                    location,
                    locationTag,
                    errorTypeTag,
                    expected,
                    actual,
                  }: PrintableMatchError): Promise<BoundaryResult> =>
                    waitForResolution(
                      makeResolvableId(
                        (id: string) =>
                          new Promise((resolve) => {
                            call.write(
                              new WireDefinitionResponse()
                                .setPrintMatchErrorRequest(
                                  new WirePrintMatchErrorRequest()
                                    .setActual(actual)
                                    .setKind(kind)
                                    .setLocationTag(locationTag)
                                    .setExpected(expected)
                                    .setLocation(location)
                                    .setMessage(message)
                                    .setErrorTypeTag(errorTypeTag),
                                )
                                .setId(id),
                              () => {
                                resolve();
                              },
                            );
                          }),
                      ),
                    ),
                  printMessageError: async ({
                    kind,
                    message,
                    location,
                    locationTag,
                    errorTypeTag,
                  }: PrintableMessageError): Promise<BoundaryResult> =>
                    waitForResolution(
                      makeResolvableId(
                        (id: string) =>
                          new Promise((resolve) => {
                            call.write(
                              new WireDefinitionResponse()
                                .setPrintMessageErrorRequest(
                                  new WirePrintMessageErrorRequest()
                                    .setErrorTypeTag(errorTypeTag)
                                    .setKind(kind)
                                    .setLocation(location)
                                    .setLocationTag(locationTag)
                                    .setMessage(message),
                                )
                                .setId(id),
                              () => {
                                resolve();
                              },
                            );
                          }),
                      ),
                    ),
                  printTestTitle: async ({
                    kind,
                    icon,
                    title,
                    additionalText,
                  }: PrintableTestTitle): Promise<BoundaryResult> =>
                    waitForResolution(
                      makeResolvableId(
                        (id: string) =>
                          new Promise((resolve) => {
                            call.write(
                              new WireDefinitionResponse()
                                .setPrintTestTitleRequest(
                                  new WirePrintTestTitleRequest()
                                    .setKind(kind)
                                    .setIcon(icon)
                                    .setTitle(title)
                                    .setAdditionalText(additionalText),
                                )
                                .setId(id),
                              () => {
                                resolve();
                              },
                            );
                          }),
                      ),
                    ),
                },
                beginDefinitionRequest.getCallerVersionsList(),
              );

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
