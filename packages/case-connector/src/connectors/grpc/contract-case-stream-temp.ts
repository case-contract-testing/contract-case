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
  ContractCaseConfig,
  DefinitionRequest,
  DefinitionResponse,
  LogRequest,
  PrintMatchErrorRequest,
  PrintMessageErrorRequest,
  PrintTestTitleRequest,
  StateHandlerHandle,
} from './generated/contract-case-stream_pb';
import service from './generated/contract-case-stream_grpc_pb';
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
  (_handle: StateHandlerHandle): (() => Promise<BoundaryResult>) =>
  () =>
    Promise.reject(new Error(`Not implemented: ${_handle}`));

const mapStateHandlers = (
  stateHandlers: StateHandlerHandle[],
): Record<string, ConnectorStateHandler> =>
  stateHandlers.reduce<Record<string, ConnectorStateHandler>>(
    (acc: Record<string, ConnectorStateHandler>, handler) => ({
      ...acc,
      [handler.getHandle()]: {
        ...(acc[handler.getHandle()] ? acc[handler.getHandle()] : {}),
        ...(handler.getStage() === StateHandlerHandle.Stage.SETUP
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
  basicAuth: ContractCaseConfig.UsernamePassword | undefined,
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
  config: ContractCaseConfig,
): WithUndefined<ContractCaseConnectorConfig> => ({
  providerName: config.getProvidername(),
  consumerName: config.getConsumername(),
  logLevel: config.getLoglevel(),
  contractDir: config.getContractdir(),
  contractFilename: config.getContractfilename(),

  publish: config.getPublish(),
  brokerCiAccessToken: config.getBrokerciaccesstoken(),
  brokerBaseUrl: config.getBrokerbaseurl(),
  brokerBasicAuth: mapBasicAuth(config.getBrokerbasicauth()),

  baseUrlUnderTest: config.getBaseurlundertest(),
  printResults: config.getPrintresults(),
  throwOnFail: config.getThrowonfail(),

  stateHandlers: mapStateHandlers(config.getStatehandlersList()),
  triggerAndTests: {}, // Record<string, ConnectorTriggerFunction>;
  triggerAndTest: {
    trigger: () => Promise.reject(new Error('Not implemented')),
  }, // ConnectorTriggerFunction;
});

const mapConfig = (
  config: ContractCaseConfig | undefined,
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
      call: ServerDuplexStream<DefinitionRequest, DefinitionResponse>,
    ) => {
      call.on('data', (request: DefinitionRequest) => {
        const type = request.getKindCase();
        switch (type) {
          case DefinitionRequest.KindCase.KIND_NOT_SET:
            throw new ConnectorError(
              "Create contract was called with a request type it didn't understand",
            );
          case DefinitionRequest.KindCase.BEGINDEFINITION:
            {
              const beginDefinitionRequest = request.getBegindefinition();
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
                              new DefinitionResponse()
                                .setLogrequest(
                                  new LogRequest()
                                    .setLevel(level)
                                    .setTimestamp(timestamp)
                                    .setVersion(version)
                                    .setTypestring(typeString)
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
                              new DefinitionResponse()
                                .setPrintmatcherrorrequest(
                                  new PrintMatchErrorRequest()
                                    .setActual(actual)
                                    .setKind(kind)
                                    .setLocationtag(locationTag)
                                    .setExpected(expected)
                                    .setLocation(location)
                                    .setMessage(message)
                                    .setErrortypetag(errorTypeTag),
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
                              new DefinitionResponse()
                                .setPrintmessageerrorrequest(
                                  new PrintMessageErrorRequest()
                                    .setErrortypetag(errorTypeTag)
                                    .setKind(kind)
                                    .setLocation(location)
                                    .setLocationtag(locationTag)
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
                              new DefinitionResponse()
                                .setPrinttesttitlerequest(
                                  new PrintTestTitleRequest()
                                    .setKind(kind)
                                    .setIcon(icon)
                                    .setTitle(title)
                                    .setAdditionaltext(additionalText),
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
                beginDefinitionRequest.getCallerversionsList(),
              );

              // eslint-disable-next-line no-console
              console.log(definition);
            }
            break;
          case DefinitionRequest.KindCase.RUNEXAMPLE:
          case DefinitionRequest.KindCase.RUNREJECTINGEXAMPLE:
          case DefinitionRequest.KindCase.STRIPMATCHERS:
          case DefinitionRequest.KindCase.DEFINITION:
          case DefinitionRequest.KindCase.STATEHANDLERRESPONSE:
          case DefinitionRequest.KindCase.LOGPRINTERRESPONSE: {
            const logPrinterResponse = request.getLogprinterresponse();
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

                case WireBoundaryResult.ValueCase.SUCCESHASMAP: {
                  const wireWithMap = wireBoundaryResult.getSucceshasmap();
                  if (wireWithMap == null) {
                    throw new ConnectorError(
                      'undefined wire with map in a boundary result. This is probably an error in the wrapper library.',
                    );
                  }
                  // TOOD: Map this map
                  return new BoundarySuccessWithMap(wireWithMap.getMap());
                }
                case WireBoundaryResult.ValueCase.SUCCESSHASANY: {
                  const wireWithAny = wireBoundaryResult.getSuccesshasany();
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

          case DefinitionRequest.KindCase.RESULTPRINTERRESPONSE:
          case DefinitionRequest.KindCase.TRIGGERFUNCTIONRESPONSE:
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
