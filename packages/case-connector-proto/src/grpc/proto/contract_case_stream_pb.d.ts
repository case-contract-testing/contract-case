// package: io.contract_testing.contractcase.grpc
// file: proto/contract_case_stream.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf';
import * as google_protobuf_struct_pb from 'google-protobuf/google/protobuf/struct_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';

export class ContractCaseConfig extends jspb.Message {
  hasProviderName(): boolean;
  clearProviderName(): void;
  getProviderName(): google_protobuf_wrappers_pb.StringValue | undefined;
  setProviderName(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  hasConsumerName(): boolean;
  clearConsumerName(): void;
  getConsumerName(): google_protobuf_wrappers_pb.StringValue | undefined;
  setConsumerName(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  hasLogLevel(): boolean;
  clearLogLevel(): void;
  getLogLevel(): google_protobuf_wrappers_pb.StringValue | undefined;
  setLogLevel(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  hasContractDir(): boolean;
  clearContractDir(): void;
  getContractDir(): google_protobuf_wrappers_pb.StringValue | undefined;
  setContractDir(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  hasContractFilename(): boolean;
  clearContractFilename(): void;
  getContractFilename(): google_protobuf_wrappers_pb.StringValue | undefined;
  setContractFilename(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  hasPublish(): boolean;
  clearPublish(): void;
  getPublish(): google_protobuf_wrappers_pb.StringValue | undefined;
  setPublish(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  hasBrokerCiAccessToken(): boolean;
  clearBrokerCiAccessToken(): void;
  getBrokerCiAccessToken(): google_protobuf_wrappers_pb.StringValue | undefined;
  setBrokerCiAccessToken(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  hasBrokerBaseUrl(): boolean;
  clearBrokerBaseUrl(): void;
  getBrokerBaseUrl(): google_protobuf_wrappers_pb.StringValue | undefined;
  setBrokerBaseUrl(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  hasBrokerBasicAuth(): boolean;
  clearBrokerBasicAuth(): void;
  getBrokerBasicAuth(): ContractCaseConfig.UsernamePassword | undefined;
  setBrokerBasicAuth(
    value?: ContractCaseConfig.UsernamePassword,
  ): ContractCaseConfig;

  hasPrintResults(): boolean;
  clearPrintResults(): void;
  getPrintResults(): google_protobuf_wrappers_pb.BoolValue | undefined;
  setPrintResults(
    value?: google_protobuf_wrappers_pb.BoolValue,
  ): ContractCaseConfig;

  hasThrowOnFail(): boolean;
  clearThrowOnFail(): void;
  getThrowOnFail(): google_protobuf_wrappers_pb.BoolValue | undefined;
  setThrowOnFail(
    value?: google_protobuf_wrappers_pb.BoolValue,
  ): ContractCaseConfig;
  clearStateHandlersList(): void;
  getStateHandlersList(): Array<StateHandlerHandle>;
  setStateHandlersList(value: Array<StateHandlerHandle>): ContractCaseConfig;
  addStateHandlers(
    value?: StateHandlerHandle,
    index?: number,
  ): StateHandlerHandle;

  getTriggerAndTestsMap(): jspb.Map<string, TriggerFunctionHandle>;
  clearTriggerAndTestsMap(): void;

  hasTriggerAndTest(): boolean;
  clearTriggerAndTest(): void;
  getTriggerAndTest(): TriggerFunctionHandle | undefined;
  setTriggerAndTest(value?: TriggerFunctionHandle): ContractCaseConfig;

  hasBaseUrlUnderTest(): boolean;
  clearBaseUrlUnderTest(): void;
  getBaseUrlUnderTest(): google_protobuf_wrappers_pb.StringValue | undefined;
  setBaseUrlUnderTest(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  getMockConfigMap(): jspb.Map<string, string>;
  clearMockConfigMap(): void;

  hasAutoVersionFrom(): boolean;
  clearAutoVersionFrom(): void;
  getAutoVersionFrom(): google_protobuf_wrappers_pb.StringValue | undefined;
  setAutoVersionFrom(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  hasChangedContracts(): boolean;
  clearChangedContracts(): void;
  getChangedContracts(): google_protobuf_wrappers_pb.StringValue | undefined;
  setChangedContracts(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ContractCaseConfig;

  getAdviceOverridesMap(): jspb.Map<string, string>;
  clearAdviceOverridesMap(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractCaseConfig.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ContractCaseConfig,
  ): ContractCaseConfig.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ContractCaseConfig,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): ContractCaseConfig;
  static deserializeBinaryFromReader(
    message: ContractCaseConfig,
    reader: jspb.BinaryReader,
  ): ContractCaseConfig;
}

export namespace ContractCaseConfig {
  export type AsObject = {
    providerName?: google_protobuf_wrappers_pb.StringValue.AsObject;
    consumerName?: google_protobuf_wrappers_pb.StringValue.AsObject;
    logLevel?: google_protobuf_wrappers_pb.StringValue.AsObject;
    contractDir?: google_protobuf_wrappers_pb.StringValue.AsObject;
    contractFilename?: google_protobuf_wrappers_pb.StringValue.AsObject;
    publish?: google_protobuf_wrappers_pb.StringValue.AsObject;
    brokerCiAccessToken?: google_protobuf_wrappers_pb.StringValue.AsObject;
    brokerBaseUrl?: google_protobuf_wrappers_pb.StringValue.AsObject;
    brokerBasicAuth?: ContractCaseConfig.UsernamePassword.AsObject;
    printResults?: google_protobuf_wrappers_pb.BoolValue.AsObject;
    throwOnFail?: google_protobuf_wrappers_pb.BoolValue.AsObject;
    stateHandlersList: Array<StateHandlerHandle.AsObject>;

    triggerAndTestsMap: Array<[string, TriggerFunctionHandle.AsObject]>;
    triggerAndTest?: TriggerFunctionHandle.AsObject;
    baseUrlUnderTest?: google_protobuf_wrappers_pb.StringValue.AsObject;

    mockConfigMap: Array<[string, string]>;
    autoVersionFrom?: google_protobuf_wrappers_pb.StringValue.AsObject;
    changedContracts?: google_protobuf_wrappers_pb.StringValue.AsObject;

    adviceOverridesMap: Array<[string, string]>;
  };

  export class UsernamePassword extends jspb.Message {
    hasUsername(): boolean;
    clearUsername(): void;
    getUsername(): google_protobuf_wrappers_pb.StringValue | undefined;
    setUsername(
      value?: google_protobuf_wrappers_pb.StringValue,
    ): UsernamePassword;

    hasPassword(): boolean;
    clearPassword(): void;
    getPassword(): google_protobuf_wrappers_pb.StringValue | undefined;
    setPassword(
      value?: google_protobuf_wrappers_pb.StringValue,
    ): UsernamePassword;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UsernamePassword.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: UsernamePassword,
    ): UsernamePassword.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: UsernamePassword,
      writer: jspb.BinaryWriter,
    ): void;
    static deserializeBinary(bytes: Uint8Array): UsernamePassword;
    static deserializeBinaryFromReader(
      message: UsernamePassword,
      reader: jspb.BinaryReader,
    ): UsernamePassword;
  }

  export namespace UsernamePassword {
    export type AsObject = {
      username?: google_protobuf_wrappers_pb.StringValue.AsObject;
      password?: google_protobuf_wrappers_pb.StringValue.AsObject;
    };
  }
}

export class ResultSuccess extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultSuccess.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ResultSuccess,
  ): ResultSuccess.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ResultSuccess,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): ResultSuccess;
  static deserializeBinaryFromReader(
    message: ResultSuccess,
    reader: jspb.BinaryReader,
  ): ResultSuccess;
}

export namespace ResultSuccess {
  export type AsObject = {};
}

export class ResultSuccessHasMapPayload extends jspb.Message {
  hasMap(): boolean;
  clearMap(): void;
  getMap(): google_protobuf_struct_pb.Struct | undefined;
  setMap(value?: google_protobuf_struct_pb.Struct): ResultSuccessHasMapPayload;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultSuccessHasMapPayload.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ResultSuccessHasMapPayload,
  ): ResultSuccessHasMapPayload.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ResultSuccessHasMapPayload,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): ResultSuccessHasMapPayload;
  static deserializeBinaryFromReader(
    message: ResultSuccessHasMapPayload,
    reader: jspb.BinaryReader,
  ): ResultSuccessHasMapPayload;
}

export namespace ResultSuccessHasMapPayload {
  export type AsObject = {
    map?: google_protobuf_struct_pb.Struct.AsObject;
  };
}

export class ResultSuccessHasAnyPayload extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): google_protobuf_wrappers_pb.StringValue | undefined;
  setPayload(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ResultSuccessHasAnyPayload;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultSuccessHasAnyPayload.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ResultSuccessHasAnyPayload,
  ): ResultSuccessHasAnyPayload.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ResultSuccessHasAnyPayload,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): ResultSuccessHasAnyPayload;
  static deserializeBinaryFromReader(
    message: ResultSuccessHasAnyPayload,
    reader: jspb.BinaryReader,
  ): ResultSuccessHasAnyPayload;
}

export namespace ResultSuccessHasAnyPayload {
  export type AsObject = {
    payload?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class ResultFailure extends jspb.Message {
  hasKind(): boolean;
  clearKind(): void;
  getKind(): google_protobuf_wrappers_pb.StringValue | undefined;
  setKind(value?: google_protobuf_wrappers_pb.StringValue): ResultFailure;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): google_protobuf_wrappers_pb.StringValue | undefined;
  setMessage(value?: google_protobuf_wrappers_pb.StringValue): ResultFailure;

  hasLocation(): boolean;
  clearLocation(): void;
  getLocation(): google_protobuf_wrappers_pb.StringValue | undefined;
  setLocation(value?: google_protobuf_wrappers_pb.StringValue): ResultFailure;

  hasContractCaseErrorCode(): boolean;
  clearContractCaseErrorCode(): void;
  getContractCaseErrorCode():
    | google_protobuf_wrappers_pb.StringValue
    | undefined;
  setContractCaseErrorCode(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ResultFailure;

  hasUserFacingStackTrace(): boolean;
  clearUserFacingStackTrace(): void;
  getUserFacingStackTrace():
    | google_protobuf_wrappers_pb.StringValue
    | undefined;
  setUserFacingStackTrace(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): ResultFailure;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultFailure.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ResultFailure,
  ): ResultFailure.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ResultFailure,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): ResultFailure;
  static deserializeBinaryFromReader(
    message: ResultFailure,
    reader: jspb.BinaryReader,
  ): ResultFailure;
}

export namespace ResultFailure {
  export type AsObject = {
    kind?: google_protobuf_wrappers_pb.StringValue.AsObject;
    message?: google_protobuf_wrappers_pb.StringValue.AsObject;
    location?: google_protobuf_wrappers_pb.StringValue.AsObject;
    contractCaseErrorCode?: google_protobuf_wrappers_pb.StringValue.AsObject;
    userFacingStackTrace?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class BoundaryResult extends jspb.Message {
  hasSuccess(): boolean;
  clearSuccess(): void;
  getSuccess(): ResultSuccess | undefined;
  setSuccess(value?: ResultSuccess): BoundaryResult;

  hasSuccessHasMap(): boolean;
  clearSuccessHasMap(): void;
  getSuccessHasMap(): ResultSuccessHasMapPayload | undefined;
  setSuccessHasMap(value?: ResultSuccessHasMapPayload): BoundaryResult;

  hasSuccessHasAny(): boolean;
  clearSuccessHasAny(): void;
  getSuccessHasAny(): ResultSuccessHasAnyPayload | undefined;
  setSuccessHasAny(value?: ResultSuccessHasAnyPayload): BoundaryResult;

  hasFailure(): boolean;
  clearFailure(): void;
  getFailure(): ResultFailure | undefined;
  setFailure(value?: ResultFailure): BoundaryResult;

  getValueCase(): BoundaryResult.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BoundaryResult.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: BoundaryResult,
  ): BoundaryResult.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BoundaryResult,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): BoundaryResult;
  static deserializeBinaryFromReader(
    message: BoundaryResult,
    reader: jspb.BinaryReader,
  ): BoundaryResult;
}

export namespace BoundaryResult {
  export type AsObject = {
    success?: ResultSuccess.AsObject;
    successHasMap?: ResultSuccessHasMapPayload.AsObject;
    successHasAny?: ResultSuccessHasAnyPayload.AsObject;
    failure?: ResultFailure.AsObject;
  };

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    SUCCESS = 1,
    SUCCESS_HAS_MAP = 2,
    SUCCESS_HAS_ANY = 3,
    FAILURE = 4,
  }
}

export class StateHandlerHandle extends jspb.Message {
  hasHandle(): boolean;
  clearHandle(): void;
  getHandle(): google_protobuf_wrappers_pb.StringValue | undefined;
  setHandle(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): StateHandlerHandle;
  getStage(): StateHandlerHandle.Stage;
  setStage(value: StateHandlerHandle.Stage): StateHandlerHandle;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StateHandlerHandle.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StateHandlerHandle,
  ): StateHandlerHandle.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StateHandlerHandle,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): StateHandlerHandle;
  static deserializeBinaryFromReader(
    message: StateHandlerHandle,
    reader: jspb.BinaryReader,
  ): StateHandlerHandle;
}

export namespace StateHandlerHandle {
  export type AsObject = {
    handle?: google_protobuf_wrappers_pb.StringValue.AsObject;
    stage: StateHandlerHandle.Stage;
  };

  export enum Stage {
    STAGE_SETUP_UNSPECIFIED = 0,
    STAGE_TEARDOWN = 1,
  }
}

export class TriggerFunctionHandle extends jspb.Message {
  hasHandle(): boolean;
  clearHandle(): void;
  getHandle(): google_protobuf_wrappers_pb.StringValue | undefined;
  setHandle(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): TriggerFunctionHandle;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TriggerFunctionHandle.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: TriggerFunctionHandle,
  ): TriggerFunctionHandle.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: TriggerFunctionHandle,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): TriggerFunctionHandle;
  static deserializeBinaryFromReader(
    message: TriggerFunctionHandle,
    reader: jspb.BinaryReader,
  ): TriggerFunctionHandle;
}

export namespace TriggerFunctionHandle {
  export type AsObject = {
    handle?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class BeginDefinitionRequest extends jspb.Message {
  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): ContractCaseConfig | undefined;
  setConfig(value?: ContractCaseConfig): BeginDefinitionRequest;
  clearCallerVersionsList(): void;
  getCallerVersionsList(): Array<google_protobuf_wrappers_pb.StringValue>;
  setCallerVersionsList(
    value: Array<google_protobuf_wrappers_pb.StringValue>,
  ): BeginDefinitionRequest;
  addCallerVersions(
    value?: google_protobuf_wrappers_pb.StringValue,
    index?: number,
  ): google_protobuf_wrappers_pb.StringValue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeginDefinitionRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: BeginDefinitionRequest,
  ): BeginDefinitionRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BeginDefinitionRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): BeginDefinitionRequest;
  static deserializeBinaryFromReader(
    message: BeginDefinitionRequest,
    reader: jspb.BinaryReader,
  ): BeginDefinitionRequest;
}

export namespace BeginDefinitionRequest {
  export type AsObject = {
    config?: ContractCaseConfig.AsObject;
    callerVersionsList: Array<google_protobuf_wrappers_pb.StringValue.AsObject>;
  };
}

export class RunInteractionRequest extends jspb.Message {
  hasExampleDefinition(): boolean;
  clearExampleDefinition(): void;
  getExampleDefinition(): google_protobuf_struct_pb.Struct | undefined;
  setExampleDefinition(
    value?: google_protobuf_struct_pb.Struct,
  ): RunInteractionRequest;

  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): ContractCaseConfig | undefined;
  setConfig(value?: ContractCaseConfig): RunInteractionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunInteractionRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: RunInteractionRequest,
  ): RunInteractionRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: RunInteractionRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): RunInteractionRequest;
  static deserializeBinaryFromReader(
    message: RunInteractionRequest,
    reader: jspb.BinaryReader,
  ): RunInteractionRequest;
}

export namespace RunInteractionRequest {
  export type AsObject = {
    exampleDefinition?: google_protobuf_struct_pb.Struct.AsObject;
    config?: ContractCaseConfig.AsObject;
  };
}

export class RunRejectingInteractionRequest extends jspb.Message {
  hasExampleDefinition(): boolean;
  clearExampleDefinition(): void;
  getExampleDefinition(): google_protobuf_struct_pb.Struct | undefined;
  setExampleDefinition(
    value?: google_protobuf_struct_pb.Struct,
  ): RunRejectingInteractionRequest;

  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): ContractCaseConfig | undefined;
  setConfig(value?: ContractCaseConfig): RunRejectingInteractionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunRejectingInteractionRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: RunRejectingInteractionRequest,
  ): RunRejectingInteractionRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: RunRejectingInteractionRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): RunRejectingInteractionRequest;
  static deserializeBinaryFromReader(
    message: RunRejectingInteractionRequest,
    reader: jspb.BinaryReader,
  ): RunRejectingInteractionRequest;
}

export namespace RunRejectingInteractionRequest {
  export type AsObject = {
    exampleDefinition?: google_protobuf_struct_pb.Struct.AsObject;
    config?: ContractCaseConfig.AsObject;
  };
}

export class StripMatchersRequest extends jspb.Message {
  hasMatcherOrData(): boolean;
  clearMatcherOrData(): void;
  getMatcherOrData(): google_protobuf_struct_pb.Struct | undefined;
  setMatcherOrData(
    value?: google_protobuf_struct_pb.Struct,
  ): StripMatchersRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripMatchersRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StripMatchersRequest,
  ): StripMatchersRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StripMatchersRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): StripMatchersRequest;
  static deserializeBinaryFromReader(
    message: StripMatchersRequest,
    reader: jspb.BinaryReader,
  ): StripMatchersRequest;
}

export namespace StripMatchersRequest {
  export type AsObject = {
    matcherOrData?: google_protobuf_struct_pb.Struct.AsObject;
  };
}

export class EndDefinitionRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EndDefinitionRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: EndDefinitionRequest,
  ): EndDefinitionRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: EndDefinitionRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): EndDefinitionRequest;
  static deserializeBinaryFromReader(
    message: EndDefinitionRequest,
    reader: jspb.BinaryReader,
  ): EndDefinitionRequest;
}

export namespace EndDefinitionRequest {
  export type AsObject = {};
}

export class LoadPluginRequest extends jspb.Message {
  clearModuleNamesList(): void;
  getModuleNamesList(): Array<google_protobuf_wrappers_pb.StringValue>;
  setModuleNamesList(
    value: Array<google_protobuf_wrappers_pb.StringValue>,
  ): LoadPluginRequest;
  addModuleNames(
    value?: google_protobuf_wrappers_pb.StringValue,
    index?: number,
  ): google_protobuf_wrappers_pb.StringValue;

  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): ContractCaseConfig | undefined;
  setConfig(value?: ContractCaseConfig): LoadPluginRequest;
  clearCallerVersionsList(): void;
  getCallerVersionsList(): Array<google_protobuf_wrappers_pb.StringValue>;
  setCallerVersionsList(
    value: Array<google_protobuf_wrappers_pb.StringValue>,
  ): LoadPluginRequest;
  addCallerVersions(
    value?: google_protobuf_wrappers_pb.StringValue,
    index?: number,
  ): google_protobuf_wrappers_pb.StringValue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadPluginRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: LoadPluginRequest,
  ): LoadPluginRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: LoadPluginRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): LoadPluginRequest;
  static deserializeBinaryFromReader(
    message: LoadPluginRequest,
    reader: jspb.BinaryReader,
  ): LoadPluginRequest;
}

export namespace LoadPluginRequest {
  export type AsObject = {
    moduleNamesList: Array<google_protobuf_wrappers_pb.StringValue.AsObject>;
    config?: ContractCaseConfig.AsObject;
    callerVersionsList: Array<google_protobuf_wrappers_pb.StringValue.AsObject>;
  };
}

export class RunStateHandlerRequest extends jspb.Message {
  hasStateHandlerHandle(): boolean;
  clearStateHandlerHandle(): void;
  getStateHandlerHandle(): StateHandlerHandle | undefined;
  setStateHandlerHandle(value?: StateHandlerHandle): RunStateHandlerRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunStateHandlerRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: RunStateHandlerRequest,
  ): RunStateHandlerRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: RunStateHandlerRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): RunStateHandlerRequest;
  static deserializeBinaryFromReader(
    message: RunStateHandlerRequest,
    reader: jspb.BinaryReader,
  ): RunStateHandlerRequest;
}

export namespace RunStateHandlerRequest {
  export type AsObject = {
    stateHandlerHandle?: StateHandlerHandle.AsObject;
  };
}

export class TriggerFunctionRequest extends jspb.Message {
  hasTriggerFunction(): boolean;
  clearTriggerFunction(): void;
  getTriggerFunction(): TriggerFunctionHandle | undefined;
  setTriggerFunction(value?: TriggerFunctionHandle): TriggerFunctionRequest;

  hasSetup(): boolean;
  clearSetup(): void;
  getSetup(): SetupInfo | undefined;
  setSetup(value?: SetupInfo): TriggerFunctionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TriggerFunctionRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: TriggerFunctionRequest,
  ): TriggerFunctionRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: TriggerFunctionRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): TriggerFunctionRequest;
  static deserializeBinaryFromReader(
    message: TriggerFunctionRequest,
    reader: jspb.BinaryReader,
  ): TriggerFunctionRequest;
}

export namespace TriggerFunctionRequest {
  export type AsObject = {
    triggerFunction?: TriggerFunctionHandle.AsObject;
    setup?: SetupInfo.AsObject;
  };
}

export class CoreFunctionHandle extends jspb.Message {
  hasHandle(): boolean;
  clearHandle(): void;
  getHandle(): google_protobuf_wrappers_pb.StringValue | undefined;
  setHandle(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): CoreFunctionHandle;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoreFunctionHandle.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CoreFunctionHandle,
  ): CoreFunctionHandle.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: CoreFunctionHandle,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CoreFunctionHandle;
  static deserializeBinaryFromReader(
    message: CoreFunctionHandle,
    reader: jspb.BinaryReader,
  ): CoreFunctionHandle;
}

export namespace CoreFunctionHandle {
  export type AsObject = {
    handle?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class SetupInfo extends jspb.Message {
  getStateVariablesMap(): jspb.Map<
    string,
    google_protobuf_wrappers_pb.StringValue
  >;
  clearStateVariablesMap(): void;

  getMockMap(): jspb.Map<string, google_protobuf_wrappers_pb.StringValue>;
  clearMockMap(): void;

  getFunctionsMap(): jspb.Map<string, CoreFunctionHandle>;
  clearFunctionsMap(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetupInfo.AsObject;
  static toObject(includeInstance: boolean, msg: SetupInfo): SetupInfo.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: SetupInfo,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): SetupInfo;
  static deserializeBinaryFromReader(
    message: SetupInfo,
    reader: jspb.BinaryReader,
  ): SetupInfo;
}

export namespace SetupInfo {
  export type AsObject = {
    stateVariablesMap: Array<
      [string, google_protobuf_wrappers_pb.StringValue.AsObject]
    >;

    mockMap: Array<[string, google_protobuf_wrappers_pb.StringValue.AsObject]>;

    functionsMap: Array<[string, CoreFunctionHandle.AsObject]>;
  };
}

export class LogRequest extends jspb.Message {
  hasLevel(): boolean;
  clearLevel(): void;
  getLevel(): google_protobuf_wrappers_pb.StringValue | undefined;
  setLevel(value?: google_protobuf_wrappers_pb.StringValue): LogRequest;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): google_protobuf_wrappers_pb.StringValue | undefined;
  setTimestamp(value?: google_protobuf_wrappers_pb.StringValue): LogRequest;

  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): google_protobuf_wrappers_pb.StringValue | undefined;
  setVersion(value?: google_protobuf_wrappers_pb.StringValue): LogRequest;

  hasTypeString(): boolean;
  clearTypeString(): void;
  getTypeString(): google_protobuf_wrappers_pb.StringValue | undefined;
  setTypeString(value?: google_protobuf_wrappers_pb.StringValue): LogRequest;

  hasLocation(): boolean;
  clearLocation(): void;
  getLocation(): google_protobuf_wrappers_pb.StringValue | undefined;
  setLocation(value?: google_protobuf_wrappers_pb.StringValue): LogRequest;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): google_protobuf_wrappers_pb.StringValue | undefined;
  setMessage(value?: google_protobuf_wrappers_pb.StringValue): LogRequest;

  hasAdditional(): boolean;
  clearAdditional(): void;
  getAdditional(): google_protobuf_wrappers_pb.StringValue | undefined;
  setAdditional(value?: google_protobuf_wrappers_pb.StringValue): LogRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: LogRequest,
  ): LogRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: LogRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): LogRequest;
  static deserializeBinaryFromReader(
    message: LogRequest,
    reader: jspb.BinaryReader,
  ): LogRequest;
}

export namespace LogRequest {
  export type AsObject = {
    level?: google_protobuf_wrappers_pb.StringValue.AsObject;
    timestamp?: google_protobuf_wrappers_pb.StringValue.AsObject;
    version?: google_protobuf_wrappers_pb.StringValue.AsObject;
    typeString?: google_protobuf_wrappers_pb.StringValue.AsObject;
    location?: google_protobuf_wrappers_pb.StringValue.AsObject;
    message?: google_protobuf_wrappers_pb.StringValue.AsObject;
    additional?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class PrintMatchErrorRequest extends jspb.Message {
  hasKind(): boolean;
  clearKind(): void;
  getKind(): google_protobuf_wrappers_pb.StringValue | undefined;
  setKind(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMatchErrorRequest;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): google_protobuf_wrappers_pb.StringValue | undefined;
  setMessage(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMatchErrorRequest;

  hasLocation(): boolean;
  clearLocation(): void;
  getLocation(): google_protobuf_wrappers_pb.StringValue | undefined;
  setLocation(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMatchErrorRequest;

  hasLocationTag(): boolean;
  clearLocationTag(): void;
  getLocationTag(): google_protobuf_wrappers_pb.StringValue | undefined;
  setLocationTag(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMatchErrorRequest;

  hasErrorTypeTag(): boolean;
  clearErrorTypeTag(): void;
  getErrorTypeTag(): google_protobuf_wrappers_pb.StringValue | undefined;
  setErrorTypeTag(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMatchErrorRequest;

  hasExpected(): boolean;
  clearExpected(): void;
  getExpected(): google_protobuf_wrappers_pb.StringValue | undefined;
  setExpected(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMatchErrorRequest;

  hasActual(): boolean;
  clearActual(): void;
  getActual(): google_protobuf_wrappers_pb.StringValue | undefined;
  setActual(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMatchErrorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PrintMatchErrorRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PrintMatchErrorRequest,
  ): PrintMatchErrorRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PrintMatchErrorRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): PrintMatchErrorRequest;
  static deserializeBinaryFromReader(
    message: PrintMatchErrorRequest,
    reader: jspb.BinaryReader,
  ): PrintMatchErrorRequest;
}

export namespace PrintMatchErrorRequest {
  export type AsObject = {
    kind?: google_protobuf_wrappers_pb.StringValue.AsObject;
    message?: google_protobuf_wrappers_pb.StringValue.AsObject;
    location?: google_protobuf_wrappers_pb.StringValue.AsObject;
    locationTag?: google_protobuf_wrappers_pb.StringValue.AsObject;
    errorTypeTag?: google_protobuf_wrappers_pb.StringValue.AsObject;
    expected?: google_protobuf_wrappers_pb.StringValue.AsObject;
    actual?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class PrintMessageErrorRequest extends jspb.Message {
  hasKind(): boolean;
  clearKind(): void;
  getKind(): google_protobuf_wrappers_pb.StringValue | undefined;
  setKind(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMessageErrorRequest;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): google_protobuf_wrappers_pb.StringValue | undefined;
  setMessage(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMessageErrorRequest;

  hasLocation(): boolean;
  clearLocation(): void;
  getLocation(): google_protobuf_wrappers_pb.StringValue | undefined;
  setLocation(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMessageErrorRequest;

  hasLocationTag(): boolean;
  clearLocationTag(): void;
  getLocationTag(): google_protobuf_wrappers_pb.StringValue | undefined;
  setLocationTag(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMessageErrorRequest;

  hasErrorTypeTag(): boolean;
  clearErrorTypeTag(): void;
  getErrorTypeTag(): google_protobuf_wrappers_pb.StringValue | undefined;
  setErrorTypeTag(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintMessageErrorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PrintMessageErrorRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PrintMessageErrorRequest,
  ): PrintMessageErrorRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PrintMessageErrorRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): PrintMessageErrorRequest;
  static deserializeBinaryFromReader(
    message: PrintMessageErrorRequest,
    reader: jspb.BinaryReader,
  ): PrintMessageErrorRequest;
}

export namespace PrintMessageErrorRequest {
  export type AsObject = {
    kind?: google_protobuf_wrappers_pb.StringValue.AsObject;
    message?: google_protobuf_wrappers_pb.StringValue.AsObject;
    location?: google_protobuf_wrappers_pb.StringValue.AsObject;
    locationTag?: google_protobuf_wrappers_pb.StringValue.AsObject;
    errorTypeTag?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class PrintTestTitleRequest extends jspb.Message {
  hasKind(): boolean;
  clearKind(): void;
  getKind(): google_protobuf_wrappers_pb.StringValue | undefined;
  setKind(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintTestTitleRequest;

  hasIcon(): boolean;
  clearIcon(): void;
  getIcon(): google_protobuf_wrappers_pb.StringValue | undefined;
  setIcon(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintTestTitleRequest;

  hasTitle(): boolean;
  clearTitle(): void;
  getTitle(): google_protobuf_wrappers_pb.StringValue | undefined;
  setTitle(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintTestTitleRequest;

  hasAdditionalText(): boolean;
  clearAdditionalText(): void;
  getAdditionalText(): google_protobuf_wrappers_pb.StringValue | undefined;
  setAdditionalText(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PrintTestTitleRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PrintTestTitleRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PrintTestTitleRequest,
  ): PrintTestTitleRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PrintTestTitleRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): PrintTestTitleRequest;
  static deserializeBinaryFromReader(
    message: PrintTestTitleRequest,
    reader: jspb.BinaryReader,
  ): PrintTestTitleRequest;
}

export namespace PrintTestTitleRequest {
  export type AsObject = {
    kind?: google_protobuf_wrappers_pb.StringValue.AsObject;
    icon?: google_protobuf_wrappers_pb.StringValue.AsObject;
    title?: google_protobuf_wrappers_pb.StringValue.AsObject;
    additionalText?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class ResultResponse extends jspb.Message {
  hasResult(): boolean;
  clearResult(): void;
  getResult(): BoundaryResult | undefined;
  setResult(value?: BoundaryResult): ResultResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ResultResponse,
  ): ResultResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ResultResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): ResultResponse;
  static deserializeBinaryFromReader(
    message: ResultResponse,
    reader: jspb.BinaryReader,
  ): ResultResponse;
}

export namespace ResultResponse {
  export type AsObject = {
    result?: BoundaryResult.AsObject;
  };
}

export class BeginVerificationRequest extends jspb.Message {
  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): ContractCaseConfig | undefined;
  setConfig(value?: ContractCaseConfig): BeginVerificationRequest;
  clearCallerVersionsList(): void;
  getCallerVersionsList(): Array<google_protobuf_wrappers_pb.StringValue>;
  setCallerVersionsList(
    value: Array<google_protobuf_wrappers_pb.StringValue>,
  ): BeginVerificationRequest;
  addCallerVersions(
    value?: google_protobuf_wrappers_pb.StringValue,
    index?: number,
  ): google_protobuf_wrappers_pb.StringValue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeginVerificationRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: BeginVerificationRequest,
  ): BeginVerificationRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BeginVerificationRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): BeginVerificationRequest;
  static deserializeBinaryFromReader(
    message: BeginVerificationRequest,
    reader: jspb.BinaryReader,
  ): BeginVerificationRequest;
}

export namespace BeginVerificationRequest {
  export type AsObject = {
    config?: ContractCaseConfig.AsObject;
    callerVersionsList: Array<google_protobuf_wrappers_pb.StringValue.AsObject>;
  };
}

export class AvailableContractDefinitions extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AvailableContractDefinitions.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: AvailableContractDefinitions,
  ): AvailableContractDefinitions.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: AvailableContractDefinitions,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): AvailableContractDefinitions;
  static deserializeBinaryFromReader(
    message: AvailableContractDefinitions,
    reader: jspb.BinaryReader,
  ): AvailableContractDefinitions;
}

export namespace AvailableContractDefinitions {
  export type AsObject = {};
}

export class StartTestEvent extends jspb.Message {
  hasTestName(): boolean;
  clearTestName(): void;
  getTestName(): google_protobuf_wrappers_pb.StringValue | undefined;
  setTestName(value?: google_protobuf_wrappers_pb.StringValue): StartTestEvent;

  hasInvokerId(): boolean;
  clearInvokerId(): void;
  getInvokerId(): google_protobuf_wrappers_pb.StringValue | undefined;
  setInvokerId(value?: google_protobuf_wrappers_pb.StringValue): StartTestEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartTestEvent.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StartTestEvent,
  ): StartTestEvent.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StartTestEvent,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): StartTestEvent;
  static deserializeBinaryFromReader(
    message: StartTestEvent,
    reader: jspb.BinaryReader,
  ): StartTestEvent;
}

export namespace StartTestEvent {
  export type AsObject = {
    testName?: google_protobuf_wrappers_pb.StringValue.AsObject;
    invokerId?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class PreparedTestHandle extends jspb.Message {
  getContractIndex(): number;
  setContractIndex(value: number): PreparedTestHandle;
  getTestIndex(): number;
  setTestIndex(value: number): PreparedTestHandle;

  hasTestName(): boolean;
  clearTestName(): void;
  getTestName(): google_protobuf_wrappers_pb.StringValue | undefined;
  setTestName(
    value?: google_protobuf_wrappers_pb.StringValue,
  ): PreparedTestHandle;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PreparedTestHandle.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PreparedTestHandle,
  ): PreparedTestHandle.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PreparedTestHandle,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): PreparedTestHandle;
  static deserializeBinaryFromReader(
    message: PreparedTestHandle,
    reader: jspb.BinaryReader,
  ): PreparedTestHandle;
}

export namespace PreparedTestHandle {
  export type AsObject = {
    contractIndex: number;
    testIndex: number;
    testName?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class InvokeTest extends jspb.Message {
  hasInvokerId(): boolean;
  clearInvokerId(): void;
  getInvokerId(): google_protobuf_wrappers_pb.StringValue | undefined;
  setInvokerId(value?: google_protobuf_wrappers_pb.StringValue): InvokeTest;

  hasPreparedTestHandle(): boolean;
  clearPreparedTestHandle(): void;
  getPreparedTestHandle(): PreparedTestHandle | undefined;
  setPreparedTestHandle(value?: PreparedTestHandle): InvokeTest;

  getTestCase(): InvokeTest.TestCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InvokeTest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: InvokeTest,
  ): InvokeTest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: InvokeTest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): InvokeTest;
  static deserializeBinaryFromReader(
    message: InvokeTest,
    reader: jspb.BinaryReader,
  ): InvokeTest;
}

export namespace InvokeTest {
  export type AsObject = {
    invokerId?: google_protobuf_wrappers_pb.StringValue.AsObject;
    preparedTestHandle?: PreparedTestHandle.AsObject;
  };

  export enum TestCase {
    TEST_NOT_SET = 0,
    INVOKER_ID = 1,
    PREPARED_TEST_HANDLE = 2,
  }
}

export class RegisterFunction extends jspb.Message {
  hasHandle(): boolean;
  clearHandle(): void;
  getHandle(): google_protobuf_wrappers_pb.StringValue | undefined;
  setHandle(value?: google_protobuf_wrappers_pb.StringValue): RegisterFunction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterFunction.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: RegisterFunction,
  ): RegisterFunction.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: RegisterFunction,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): RegisterFunction;
  static deserializeBinaryFromReader(
    message: RegisterFunction,
    reader: jspb.BinaryReader,
  ): RegisterFunction;
}

export namespace RegisterFunction {
  export type AsObject = {
    handle?: google_protobuf_wrappers_pb.StringValue.AsObject;
  };
}

export class InvokeFunction extends jspb.Message {
  hasHandle(): boolean;
  clearHandle(): void;
  getHandle(): google_protobuf_wrappers_pb.StringValue | undefined;
  setHandle(value?: google_protobuf_wrappers_pb.StringValue): InvokeFunction;
  clearArgumentsList(): void;
  getArgumentsList(): Array<google_protobuf_wrappers_pb.StringValue>;
  setArgumentsList(
    value: Array<google_protobuf_wrappers_pb.StringValue>,
  ): InvokeFunction;
  addArguments(
    value?: google_protobuf_wrappers_pb.StringValue,
    index?: number,
  ): google_protobuf_wrappers_pb.StringValue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InvokeFunction.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: InvokeFunction,
  ): InvokeFunction.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: InvokeFunction,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): InvokeFunction;
  static deserializeBinaryFromReader(
    message: InvokeFunction,
    reader: jspb.BinaryReader,
  ): InvokeFunction;
}

export namespace InvokeFunction {
  export type AsObject = {
    handle?: google_protobuf_wrappers_pb.StringValue.AsObject;
    argumentsList: Array<google_protobuf_wrappers_pb.StringValue.AsObject>;
  };
}

export class PrepareVerificationTests extends jspb.Message {
  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): ContractCaseConfig | undefined;
  setConfig(value?: ContractCaseConfig): PrepareVerificationTests;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PrepareVerificationTests.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PrepareVerificationTests,
  ): PrepareVerificationTests.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PrepareVerificationTests,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): PrepareVerificationTests;
  static deserializeBinaryFromReader(
    message: PrepareVerificationTests,
    reader: jspb.BinaryReader,
  ): PrepareVerificationTests;
}

export namespace PrepareVerificationTests {
  export type AsObject = {
    config?: ContractCaseConfig.AsObject;
  };
}

export class DefinitionRequest extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): google_protobuf_wrappers_pb.StringValue | undefined;
  setId(value?: google_protobuf_wrappers_pb.StringValue): DefinitionRequest;

  hasBeginDefinition(): boolean;
  clearBeginDefinition(): void;
  getBeginDefinition(): BeginDefinitionRequest | undefined;
  setBeginDefinition(value?: BeginDefinitionRequest): DefinitionRequest;

  hasRunInteraction(): boolean;
  clearRunInteraction(): void;
  getRunInteraction(): RunInteractionRequest | undefined;
  setRunInteraction(value?: RunInteractionRequest): DefinitionRequest;

  hasRunRejectingInteraction(): boolean;
  clearRunRejectingInteraction(): void;
  getRunRejectingInteraction(): RunRejectingInteractionRequest | undefined;
  setRunRejectingInteraction(
    value?: RunRejectingInteractionRequest,
  ): DefinitionRequest;

  hasStripMatchers(): boolean;
  clearStripMatchers(): void;
  getStripMatchers(): StripMatchersRequest | undefined;
  setStripMatchers(value?: StripMatchersRequest): DefinitionRequest;

  hasEndDefinition(): boolean;
  clearEndDefinition(): void;
  getEndDefinition(): EndDefinitionRequest | undefined;
  setEndDefinition(value?: EndDefinitionRequest): DefinitionRequest;

  hasResultResponse(): boolean;
  clearResultResponse(): void;
  getResultResponse(): ResultResponse | undefined;
  setResultResponse(value?: ResultResponse): DefinitionRequest;

  hasLoadPlugin(): boolean;
  clearLoadPlugin(): void;
  getLoadPlugin(): LoadPluginRequest | undefined;
  setLoadPlugin(value?: LoadPluginRequest): DefinitionRequest;

  hasRegisterFunction(): boolean;
  clearRegisterFunction(): void;
  getRegisterFunction(): RegisterFunction | undefined;
  setRegisterFunction(value?: RegisterFunction): DefinitionRequest;

  hasInvokeFunction(): boolean;
  clearInvokeFunction(): void;
  getInvokeFunction(): InvokeFunction | undefined;
  setInvokeFunction(value?: InvokeFunction): DefinitionRequest;

  getKindCase(): DefinitionRequest.KindCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DefinitionRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: DefinitionRequest,
  ): DefinitionRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: DefinitionRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): DefinitionRequest;
  static deserializeBinaryFromReader(
    message: DefinitionRequest,
    reader: jspb.BinaryReader,
  ): DefinitionRequest;
}

export namespace DefinitionRequest {
  export type AsObject = {
    id?: google_protobuf_wrappers_pb.StringValue.AsObject;
    beginDefinition?: BeginDefinitionRequest.AsObject;
    runInteraction?: RunInteractionRequest.AsObject;
    runRejectingInteraction?: RunRejectingInteractionRequest.AsObject;
    stripMatchers?: StripMatchersRequest.AsObject;
    endDefinition?: EndDefinitionRequest.AsObject;
    resultResponse?: ResultResponse.AsObject;
    loadPlugin?: LoadPluginRequest.AsObject;
    registerFunction?: RegisterFunction.AsObject;
    invokeFunction?: InvokeFunction.AsObject;
  };

  export enum KindCase {
    KIND_NOT_SET = 0,
    BEGIN_DEFINITION = 2,
    RUN_INTERACTION = 3,
    RUN_REJECTING_INTERACTION = 4,
    STRIP_MATCHERS = 5,
    END_DEFINITION = 6,
    RESULT_RESPONSE = 7,
    LOAD_PLUGIN = 8,
    REGISTER_FUNCTION = 9,
    INVOKE_FUNCTION = 11,
  }
}

export class VerificationRequest extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): google_protobuf_wrappers_pb.StringValue | undefined;
  setId(value?: google_protobuf_wrappers_pb.StringValue): VerificationRequest;

  hasBeginVerification(): boolean;
  clearBeginVerification(): void;
  getBeginVerification(): BeginVerificationRequest | undefined;
  setBeginVerification(value?: BeginVerificationRequest): VerificationRequest;

  hasAvailableContractDefinitions(): boolean;
  clearAvailableContractDefinitions(): void;
  getAvailableContractDefinitions(): AvailableContractDefinitions | undefined;
  setAvailableContractDefinitions(
    value?: AvailableContractDefinitions,
  ): VerificationRequest;

  hasResultResponse(): boolean;
  clearResultResponse(): void;
  getResultResponse(): ResultResponse | undefined;
  setResultResponse(value?: ResultResponse): VerificationRequest;

  hasLoadPlugin(): boolean;
  clearLoadPlugin(): void;
  getLoadPlugin(): LoadPluginRequest | undefined;
  setLoadPlugin(value?: LoadPluginRequest): VerificationRequest;

  hasInvokeTest(): boolean;
  clearInvokeTest(): void;
  getInvokeTest(): InvokeTest | undefined;
  setInvokeTest(value?: InvokeTest): VerificationRequest;

  hasRegisterFunction(): boolean;
  clearRegisterFunction(): void;
  getRegisterFunction(): RegisterFunction | undefined;
  setRegisterFunction(value?: RegisterFunction): VerificationRequest;

  hasInvokeFunction(): boolean;
  clearInvokeFunction(): void;
  getInvokeFunction(): InvokeFunction | undefined;
  setInvokeFunction(value?: InvokeFunction): VerificationRequest;

  hasPrepareVerificationTests(): boolean;
  clearPrepareVerificationTests(): void;
  getPrepareVerificationTests(): PrepareVerificationTests | undefined;
  setPrepareVerificationTests(
    value?: PrepareVerificationTests,
  ): VerificationRequest;

  getKindCase(): VerificationRequest.KindCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerificationRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: VerificationRequest,
  ): VerificationRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: VerificationRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): VerificationRequest;
  static deserializeBinaryFromReader(
    message: VerificationRequest,
    reader: jspb.BinaryReader,
  ): VerificationRequest;
}

export namespace VerificationRequest {
  export type AsObject = {
    id?: google_protobuf_wrappers_pb.StringValue.AsObject;
    beginVerification?: BeginVerificationRequest.AsObject;
    availableContractDefinitions?: AvailableContractDefinitions.AsObject;
    resultResponse?: ResultResponse.AsObject;
    loadPlugin?: LoadPluginRequest.AsObject;
    invokeTest?: InvokeTest.AsObject;
    registerFunction?: RegisterFunction.AsObject;
    invokeFunction?: InvokeFunction.AsObject;
    prepareVerificationTests?: PrepareVerificationTests.AsObject;
  };

  export enum KindCase {
    KIND_NOT_SET = 0,
    BEGIN_VERIFICATION = 2,
    AVAILABLE_CONTRACT_DEFINITIONS = 3,
    RESULT_RESPONSE = 5,
    LOAD_PLUGIN = 6,
    INVOKE_TEST = 9,
    REGISTER_FUNCTION = 10,
    INVOKE_FUNCTION = 11,
    PREPARE_VERIFICATION_TESTS = 12,
  }
}

export class ContractResponse extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): google_protobuf_wrappers_pb.StringValue | undefined;
  setId(value?: google_protobuf_wrappers_pb.StringValue): ContractResponse;

  hasRunStateHandler(): boolean;
  clearRunStateHandler(): void;
  getRunStateHandler(): RunStateHandlerRequest | undefined;
  setRunStateHandler(value?: RunStateHandlerRequest): ContractResponse;

  hasLogRequest(): boolean;
  clearLogRequest(): void;
  getLogRequest(): LogRequest | undefined;
  setLogRequest(value?: LogRequest): ContractResponse;

  hasPrintMatchErrorRequest(): boolean;
  clearPrintMatchErrorRequest(): void;
  getPrintMatchErrorRequest(): PrintMatchErrorRequest | undefined;
  setPrintMatchErrorRequest(value?: PrintMatchErrorRequest): ContractResponse;

  hasPrintMessageErrorRequest(): boolean;
  clearPrintMessageErrorRequest(): void;
  getPrintMessageErrorRequest(): PrintMessageErrorRequest | undefined;
  setPrintMessageErrorRequest(
    value?: PrintMessageErrorRequest,
  ): ContractResponse;

  hasPrintTestTitleRequest(): boolean;
  clearPrintTestTitleRequest(): void;
  getPrintTestTitleRequest(): PrintTestTitleRequest | undefined;
  setPrintTestTitleRequest(value?: PrintTestTitleRequest): ContractResponse;

  hasTriggerFunctionRequest(): boolean;
  clearTriggerFunctionRequest(): void;
  getTriggerFunctionRequest(): TriggerFunctionRequest | undefined;
  setTriggerFunctionRequest(value?: TriggerFunctionRequest): ContractResponse;

  hasResultResponse(): boolean;
  clearResultResponse(): void;
  getResultResponse(): ResultResponse | undefined;
  setResultResponse(value?: ResultResponse): ContractResponse;

  hasStartTestEvent(): boolean;
  clearStartTestEvent(): void;
  getStartTestEvent(): StartTestEvent | undefined;
  setStartTestEvent(value?: StartTestEvent): ContractResponse;

  hasInvokeFunction(): boolean;
  clearInvokeFunction(): void;
  getInvokeFunction(): InvokeFunction | undefined;
  setInvokeFunction(value?: InvokeFunction): ContractResponse;

  getKindCase(): ContractResponse.KindCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ContractResponse,
  ): ContractResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ContractResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): ContractResponse;
  static deserializeBinaryFromReader(
    message: ContractResponse,
    reader: jspb.BinaryReader,
  ): ContractResponse;
}

export namespace ContractResponse {
  export type AsObject = {
    id?: google_protobuf_wrappers_pb.StringValue.AsObject;
    runStateHandler?: RunStateHandlerRequest.AsObject;
    logRequest?: LogRequest.AsObject;
    printMatchErrorRequest?: PrintMatchErrorRequest.AsObject;
    printMessageErrorRequest?: PrintMessageErrorRequest.AsObject;
    printTestTitleRequest?: PrintTestTitleRequest.AsObject;
    triggerFunctionRequest?: TriggerFunctionRequest.AsObject;
    resultResponse?: ResultResponse.AsObject;
    startTestEvent?: StartTestEvent.AsObject;
    invokeFunction?: InvokeFunction.AsObject;
  };

  export enum KindCase {
    KIND_NOT_SET = 0,
    RUN_STATE_HANDLER = 2,
    LOG_REQUEST = 3,
    PRINT_MATCH_ERROR_REQUEST = 4,
    PRINT_MESSAGE_ERROR_REQUEST = 5,
    PRINT_TEST_TITLE_REQUEST = 6,
    TRIGGER_FUNCTION_REQUEST = 7,
    RESULT_RESPONSE = 8,
    START_TEST_EVENT = 9,
    INVOKE_FUNCTION = 10,
  }
}
