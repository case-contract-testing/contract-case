// package: contractcase
// file: proto/contract_case_stream.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

export class ContractCaseConfig extends jspb.Message { 
    getProviderName(): string;
    setProviderName(value: string): ContractCaseConfig;
    getConsumerName(): string;
    setConsumerName(value: string): ContractCaseConfig;
    getLogLevel(): string;
    setLogLevel(value: string): ContractCaseConfig;
    getContractDir(): string;
    setContractDir(value: string): ContractCaseConfig;
    getContractFilename(): string;
    setContractFilename(value: string): ContractCaseConfig;
    getPublish(): string;
    setPublish(value: string): ContractCaseConfig;
    getBrokerCiAccessToken(): string;
    setBrokerCiAccessToken(value: string): ContractCaseConfig;
    getBrokerBaseUrl(): string;
    setBrokerBaseUrl(value: string): ContractCaseConfig;

    hasBrokerBasicAuth(): boolean;
    clearBrokerBasicAuth(): void;
    getBrokerBasicAuth(): ContractCaseConfig.UsernamePassword | undefined;
    setBrokerBasicAuth(value?: ContractCaseConfig.UsernamePassword): ContractCaseConfig;
    getPrintResults(): boolean;
    setPrintResults(value: boolean): ContractCaseConfig;
    getThrowOnFail(): boolean;
    setThrowOnFail(value: boolean): ContractCaseConfig;
    clearStateHandlersList(): void;
    getStateHandlersList(): Array<StateHandlerHandle>;
    setStateHandlersList(value: Array<StateHandlerHandle>): ContractCaseConfig;
    addStateHandlers(value?: StateHandlerHandle, index?: number): StateHandlerHandle;

    getTriggerFunctionMap(): jspb.Map<string, TriggerFunctionHandle>;
    clearTriggerFunctionMap(): void;

    hasTriggerAndTest(): boolean;
    clearTriggerAndTest(): void;
    getTriggerAndTest(): TriggerFunctionHandle | undefined;
    setTriggerAndTest(value?: TriggerFunctionHandle): ContractCaseConfig;
    getBaseUrlUnderTest(): string;
    setBaseUrlUnderTest(value: string): ContractCaseConfig;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContractCaseConfig.AsObject;
    static toObject(includeInstance: boolean, msg: ContractCaseConfig): ContractCaseConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContractCaseConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContractCaseConfig;
    static deserializeBinaryFromReader(message: ContractCaseConfig, reader: jspb.BinaryReader): ContractCaseConfig;
}

export namespace ContractCaseConfig {
    export type AsObject = {
        providerName: string,
        consumerName: string,
        logLevel: string,
        contractDir: string,
        contractFilename: string,
        publish: string,
        brokerCiAccessToken: string,
        brokerBaseUrl: string,
        brokerBasicAuth?: ContractCaseConfig.UsernamePassword.AsObject,
        printResults: boolean,
        throwOnFail: boolean,
        stateHandlersList: Array<StateHandlerHandle.AsObject>,

        triggerFunctionMap: Array<[string, TriggerFunctionHandle.AsObject]>,
        triggerAndTest?: TriggerFunctionHandle.AsObject,
        baseUrlUnderTest: string,
    }


    export class UsernamePassword extends jspb.Message { 
        getUsername(): string;
        setUsername(value: string): UsernamePassword;
        getPassword(): string;
        setPassword(value: string): UsernamePassword;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): UsernamePassword.AsObject;
        static toObject(includeInstance: boolean, msg: UsernamePassword): UsernamePassword.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: UsernamePassword, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): UsernamePassword;
        static deserializeBinaryFromReader(message: UsernamePassword, reader: jspb.BinaryReader): UsernamePassword;
    }

    export namespace UsernamePassword {
        export type AsObject = {
            username: string,
            password: string,
        }
    }

}

export class DefinitionHandle extends jspb.Message { 
    getDefinitionId(): string;
    setDefinitionId(value: string): DefinitionHandle;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DefinitionHandle.AsObject;
    static toObject(includeInstance: boolean, msg: DefinitionHandle): DefinitionHandle.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DefinitionHandle, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DefinitionHandle;
    static deserializeBinaryFromReader(message: DefinitionHandle, reader: jspb.BinaryReader): DefinitionHandle;
}

export namespace DefinitionHandle {
    export type AsObject = {
        definitionId: string,
    }
}

export class ResultSuccess extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResultSuccess.AsObject;
    static toObject(includeInstance: boolean, msg: ResultSuccess): ResultSuccess.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResultSuccess, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResultSuccess;
    static deserializeBinaryFromReader(message: ResultSuccess, reader: jspb.BinaryReader): ResultSuccess;
}

export namespace ResultSuccess {
    export type AsObject = {
    }
}

export class ResultSuccessHasMapPayload extends jspb.Message { 

    hasMap(): boolean;
    clearMap(): void;
    getMap(): google_protobuf_struct_pb.Struct | undefined;
    setMap(value?: google_protobuf_struct_pb.Struct): ResultSuccessHasMapPayload;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResultSuccessHasMapPayload.AsObject;
    static toObject(includeInstance: boolean, msg: ResultSuccessHasMapPayload): ResultSuccessHasMapPayload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResultSuccessHasMapPayload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResultSuccessHasMapPayload;
    static deserializeBinaryFromReader(message: ResultSuccessHasMapPayload, reader: jspb.BinaryReader): ResultSuccessHasMapPayload;
}

export namespace ResultSuccessHasMapPayload {
    export type AsObject = {
        map?: google_protobuf_struct_pb.Struct.AsObject,
    }
}

export class ResultSuccessHasAnyPayload extends jspb.Message { 

    hasPayload(): boolean;
    clearPayload(): void;
    getPayload(): google_protobuf_struct_pb.Value | undefined;
    setPayload(value?: google_protobuf_struct_pb.Value): ResultSuccessHasAnyPayload;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResultSuccessHasAnyPayload.AsObject;
    static toObject(includeInstance: boolean, msg: ResultSuccessHasAnyPayload): ResultSuccessHasAnyPayload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResultSuccessHasAnyPayload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResultSuccessHasAnyPayload;
    static deserializeBinaryFromReader(message: ResultSuccessHasAnyPayload, reader: jspb.BinaryReader): ResultSuccessHasAnyPayload;
}

export namespace ResultSuccessHasAnyPayload {
    export type AsObject = {
        payload?: google_protobuf_struct_pb.Value.AsObject,
    }
}

export class ResultFailure extends jspb.Message { 
    getKind(): string;
    setKind(value: string): ResultFailure;
    getMessage(): string;
    setMessage(value: string): ResultFailure;
    getLocation(): string;
    setLocation(value: string): ResultFailure;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResultFailure.AsObject;
    static toObject(includeInstance: boolean, msg: ResultFailure): ResultFailure.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResultFailure, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResultFailure;
    static deserializeBinaryFromReader(message: ResultFailure, reader: jspb.BinaryReader): ResultFailure;
}

export namespace ResultFailure {
    export type AsObject = {
        kind: string,
        message: string,
        location: string,
    }
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
    static toObject(includeInstance: boolean, msg: BoundaryResult): BoundaryResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BoundaryResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BoundaryResult;
    static deserializeBinaryFromReader(message: BoundaryResult, reader: jspb.BinaryReader): BoundaryResult;
}

export namespace BoundaryResult {
    export type AsObject = {
        success?: ResultSuccess.AsObject,
        successHasMap?: ResultSuccessHasMapPayload.AsObject,
        successHasAny?: ResultSuccessHasAnyPayload.AsObject,
        failure?: ResultFailure.AsObject,
    }

    export enum ValueCase {
        VALUE_NOT_SET = 0,
        SUCCESS = 1,
        SUCCESS_HAS_MAP = 2,
        SUCCESS_HAS_ANY = 3,
        FAILURE = 4,
    }

}

export class StateHandlerHandle extends jspb.Message { 
    getHandle(): string;
    setHandle(value: string): StateHandlerHandle;
    getStage(): StateHandlerHandle.Stage;
    setStage(value: StateHandlerHandle.Stage): StateHandlerHandle;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StateHandlerHandle.AsObject;
    static toObject(includeInstance: boolean, msg: StateHandlerHandle): StateHandlerHandle.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StateHandlerHandle, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StateHandlerHandle;
    static deserializeBinaryFromReader(message: StateHandlerHandle, reader: jspb.BinaryReader): StateHandlerHandle;
}

export namespace StateHandlerHandle {
    export type AsObject = {
        handle: string,
        stage: StateHandlerHandle.Stage,
    }

    export enum Stage {
    STAGE_SETUP_UNSPECIFIED = 0,
    STAGE_TEARDOWN = 1,
    }

}

export class TriggerFunctionHandle extends jspb.Message { 
    getHandle(): string;
    setHandle(value: string): TriggerFunctionHandle;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TriggerFunctionHandle.AsObject;
    static toObject(includeInstance: boolean, msg: TriggerFunctionHandle): TriggerFunctionHandle.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TriggerFunctionHandle, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TriggerFunctionHandle;
    static deserializeBinaryFromReader(message: TriggerFunctionHandle, reader: jspb.BinaryReader): TriggerFunctionHandle;
}

export namespace TriggerFunctionHandle {
    export type AsObject = {
        handle: string,
    }
}

export class BeginDefinitionRequest extends jspb.Message { 

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): ContractCaseConfig | undefined;
    setConfig(value?: ContractCaseConfig): BeginDefinitionRequest;
    clearCallerVersionsList(): void;
    getCallerVersionsList(): Array<string>;
    setCallerVersionsList(value: Array<string>): BeginDefinitionRequest;
    addCallerVersions(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BeginDefinitionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BeginDefinitionRequest): BeginDefinitionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BeginDefinitionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BeginDefinitionRequest;
    static deserializeBinaryFromReader(message: BeginDefinitionRequest, reader: jspb.BinaryReader): BeginDefinitionRequest;
}

export namespace BeginDefinitionRequest {
    export type AsObject = {
        config?: ContractCaseConfig.AsObject,
        callerVersionsList: Array<string>,
    }
}

export class RunExampleRequest extends jspb.Message { 

    hasExampleDefinition(): boolean;
    clearExampleDefinition(): void;
    getExampleDefinition(): google_protobuf_struct_pb.Struct | undefined;
    setExampleDefinition(value?: google_protobuf_struct_pb.Struct): RunExampleRequest;

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): ContractCaseConfig | undefined;
    setConfig(value?: ContractCaseConfig): RunExampleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunExampleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RunExampleRequest): RunExampleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunExampleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunExampleRequest;
    static deserializeBinaryFromReader(message: RunExampleRequest, reader: jspb.BinaryReader): RunExampleRequest;
}

export namespace RunExampleRequest {
    export type AsObject = {
        exampleDefinition?: google_protobuf_struct_pb.Struct.AsObject,
        config?: ContractCaseConfig.AsObject,
    }
}

export class RunRejectingExampleRequest extends jspb.Message { 

    hasExampleDefinition(): boolean;
    clearExampleDefinition(): void;
    getExampleDefinition(): google_protobuf_struct_pb.Struct | undefined;
    setExampleDefinition(value?: google_protobuf_struct_pb.Struct): RunRejectingExampleRequest;

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): ContractCaseConfig | undefined;
    setConfig(value?: ContractCaseConfig): RunRejectingExampleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunRejectingExampleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RunRejectingExampleRequest): RunRejectingExampleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunRejectingExampleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunRejectingExampleRequest;
    static deserializeBinaryFromReader(message: RunRejectingExampleRequest, reader: jspb.BinaryReader): RunRejectingExampleRequest;
}

export namespace RunRejectingExampleRequest {
    export type AsObject = {
        exampleDefinition?: google_protobuf_struct_pb.Struct.AsObject,
        config?: ContractCaseConfig.AsObject,
    }
}

export class StripMatchersRequest extends jspb.Message { 

    hasMatcherOrData(): boolean;
    clearMatcherOrData(): void;
    getMatcherOrData(): google_protobuf_struct_pb.Struct | undefined;
    setMatcherOrData(value?: google_protobuf_struct_pb.Struct): StripMatchersRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StripMatchersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StripMatchersRequest): StripMatchersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StripMatchersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StripMatchersRequest;
    static deserializeBinaryFromReader(message: StripMatchersRequest, reader: jspb.BinaryReader): StripMatchersRequest;
}

export namespace StripMatchersRequest {
    export type AsObject = {
        matcherOrData?: google_protobuf_struct_pb.Struct.AsObject,
    }
}

export class EndDefinitionRequest extends jspb.Message { 

    hasHandle(): boolean;
    clearHandle(): void;
    getHandle(): DefinitionHandle | undefined;
    setHandle(value?: DefinitionHandle): EndDefinitionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EndDefinitionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EndDefinitionRequest): EndDefinitionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EndDefinitionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EndDefinitionRequest;
    static deserializeBinaryFromReader(message: EndDefinitionRequest, reader: jspb.BinaryReader): EndDefinitionRequest;
}

export namespace EndDefinitionRequest {
    export type AsObject = {
        handle?: DefinitionHandle.AsObject,
    }
}

export class StateHandlerResponse extends jspb.Message { 

    hasStateHandlerHandle(): boolean;
    clearStateHandlerHandle(): void;
    getStateHandlerHandle(): StateHandlerHandle | undefined;
    setStateHandlerHandle(value?: StateHandlerHandle): StateHandlerResponse;

    hasResult(): boolean;
    clearResult(): void;
    getResult(): BoundaryResult | undefined;
    setResult(value?: BoundaryResult): StateHandlerResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StateHandlerResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StateHandlerResponse): StateHandlerResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StateHandlerResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StateHandlerResponse;
    static deserializeBinaryFromReader(message: StateHandlerResponse, reader: jspb.BinaryReader): StateHandlerResponse;
}

export namespace StateHandlerResponse {
    export type AsObject = {
        stateHandlerHandle?: StateHandlerHandle.AsObject,
        result?: BoundaryResult.AsObject,
    }
}

export class LogPrinterResponse extends jspb.Message { 

    hasResult(): boolean;
    clearResult(): void;
    getResult(): BoundaryResult | undefined;
    setResult(value?: BoundaryResult): LogPrinterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogPrinterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LogPrinterResponse): LogPrinterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LogPrinterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogPrinterResponse;
    static deserializeBinaryFromReader(message: LogPrinterResponse, reader: jspb.BinaryReader): LogPrinterResponse;
}

export namespace LogPrinterResponse {
    export type AsObject = {
        result?: BoundaryResult.AsObject,
    }
}

export class ResultPrinterResponse extends jspb.Message { 

    hasResult(): boolean;
    clearResult(): void;
    getResult(): BoundaryResult | undefined;
    setResult(value?: BoundaryResult): ResultPrinterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResultPrinterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ResultPrinterResponse): ResultPrinterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResultPrinterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResultPrinterResponse;
    static deserializeBinaryFromReader(message: ResultPrinterResponse, reader: jspb.BinaryReader): ResultPrinterResponse;
}

export namespace ResultPrinterResponse {
    export type AsObject = {
        result?: BoundaryResult.AsObject,
    }
}

export class RunStateHandlerRequest extends jspb.Message { 

    hasStateHandlerHandle(): boolean;
    clearStateHandlerHandle(): void;
    getStateHandlerHandle(): StateHandlerHandle | undefined;
    setStateHandlerHandle(value?: StateHandlerHandle): RunStateHandlerRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunStateHandlerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RunStateHandlerRequest): RunStateHandlerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunStateHandlerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunStateHandlerRequest;
    static deserializeBinaryFromReader(message: RunStateHandlerRequest, reader: jspb.BinaryReader): RunStateHandlerRequest;
}

export namespace RunStateHandlerRequest {
    export type AsObject = {
        stateHandlerHandle?: StateHandlerHandle.AsObject,
    }
}

export class TriggerFunctionRequest extends jspb.Message { 

    hasTriggerFunction(): boolean;
    clearTriggerFunction(): void;
    getTriggerFunction(): TriggerFunctionHandle | undefined;
    setTriggerFunction(value?: TriggerFunctionHandle): TriggerFunctionRequest;

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): google_protobuf_struct_pb.Struct | undefined;
    setConfig(value?: google_protobuf_struct_pb.Struct): TriggerFunctionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TriggerFunctionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TriggerFunctionRequest): TriggerFunctionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TriggerFunctionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TriggerFunctionRequest;
    static deserializeBinaryFromReader(message: TriggerFunctionRequest, reader: jspb.BinaryReader): TriggerFunctionRequest;
}

export namespace TriggerFunctionRequest {
    export type AsObject = {
        triggerFunction?: TriggerFunctionHandle.AsObject,
        config?: google_protobuf_struct_pb.Struct.AsObject,
    }
}

export class LogRequest extends jspb.Message { 
    getLevel(): string;
    setLevel(value: string): LogRequest;
    getTimestamp(): string;
    setTimestamp(value: string): LogRequest;
    getVersion(): string;
    setVersion(value: string): LogRequest;
    getTypeString(): string;
    setTypeString(value: string): LogRequest;
    getLocation(): string;
    setLocation(value: string): LogRequest;
    getMessage(): string;
    setMessage(value: string): LogRequest;
    getAdditional(): string;
    setAdditional(value: string): LogRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LogRequest): LogRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LogRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogRequest;
    static deserializeBinaryFromReader(message: LogRequest, reader: jspb.BinaryReader): LogRequest;
}

export namespace LogRequest {
    export type AsObject = {
        level: string,
        timestamp: string,
        version: string,
        typeString: string,
        location: string,
        message: string,
        additional: string,
    }
}

export class PrintMatchErrorRequest extends jspb.Message { 
    getKind(): string;
    setKind(value: string): PrintMatchErrorRequest;
    getMessage(): string;
    setMessage(value: string): PrintMatchErrorRequest;
    getLocation(): string;
    setLocation(value: string): PrintMatchErrorRequest;
    getLocationTag(): string;
    setLocationTag(value: string): PrintMatchErrorRequest;
    getErrorTypeTag(): string;
    setErrorTypeTag(value: string): PrintMatchErrorRequest;
    getExpected(): string;
    setExpected(value: string): PrintMatchErrorRequest;
    getActual(): string;
    setActual(value: string): PrintMatchErrorRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PrintMatchErrorRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PrintMatchErrorRequest): PrintMatchErrorRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PrintMatchErrorRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PrintMatchErrorRequest;
    static deserializeBinaryFromReader(message: PrintMatchErrorRequest, reader: jspb.BinaryReader): PrintMatchErrorRequest;
}

export namespace PrintMatchErrorRequest {
    export type AsObject = {
        kind: string,
        message: string,
        location: string,
        locationTag: string,
        errorTypeTag: string,
        expected: string,
        actual: string,
    }
}

export class PrintMessageErrorRequest extends jspb.Message { 
    getKind(): string;
    setKind(value: string): PrintMessageErrorRequest;
    getMessage(): string;
    setMessage(value: string): PrintMessageErrorRequest;
    getLocation(): string;
    setLocation(value: string): PrintMessageErrorRequest;
    getLocationTag(): string;
    setLocationTag(value: string): PrintMessageErrorRequest;
    getErrorTypeTag(): string;
    setErrorTypeTag(value: string): PrintMessageErrorRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PrintMessageErrorRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PrintMessageErrorRequest): PrintMessageErrorRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PrintMessageErrorRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PrintMessageErrorRequest;
    static deserializeBinaryFromReader(message: PrintMessageErrorRequest, reader: jspb.BinaryReader): PrintMessageErrorRequest;
}

export namespace PrintMessageErrorRequest {
    export type AsObject = {
        kind: string,
        message: string,
        location: string,
        locationTag: string,
        errorTypeTag: string,
    }
}

export class PrintTestTitleRequest extends jspb.Message { 
    getKind(): string;
    setKind(value: string): PrintTestTitleRequest;
    getIcon(): string;
    setIcon(value: string): PrintTestTitleRequest;
    getTitle(): string;
    setTitle(value: string): PrintTestTitleRequest;
    getAdditionalText(): string;
    setAdditionalText(value: string): PrintTestTitleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PrintTestTitleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PrintTestTitleRequest): PrintTestTitleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PrintTestTitleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PrintTestTitleRequest;
    static deserializeBinaryFromReader(message: PrintTestTitleRequest, reader: jspb.BinaryReader): PrintTestTitleRequest;
}

export namespace PrintTestTitleRequest {
    export type AsObject = {
        kind: string,
        icon: string,
        title: string,
        additionalText: string,
    }
}

export class BeginDefinitionResponse extends jspb.Message { 

    hasResult(): boolean;
    clearResult(): void;
    getResult(): BoundaryResult | undefined;
    setResult(value?: BoundaryResult): BeginDefinitionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BeginDefinitionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BeginDefinitionResponse): BeginDefinitionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BeginDefinitionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BeginDefinitionResponse;
    static deserializeBinaryFromReader(message: BeginDefinitionResponse, reader: jspb.BinaryReader): BeginDefinitionResponse;
}

export namespace BeginDefinitionResponse {
    export type AsObject = {
        result?: BoundaryResult.AsObject,
    }
}

export class RunExampleResponse extends jspb.Message { 

    hasResult(): boolean;
    clearResult(): void;
    getResult(): BoundaryResult | undefined;
    setResult(value?: BoundaryResult): RunExampleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunExampleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RunExampleResponse): RunExampleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunExampleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunExampleResponse;
    static deserializeBinaryFromReader(message: RunExampleResponse, reader: jspb.BinaryReader): RunExampleResponse;
}

export namespace RunExampleResponse {
    export type AsObject = {
        result?: BoundaryResult.AsObject,
    }
}

export class RunRejectingExampleResponse extends jspb.Message { 

    hasResult(): boolean;
    clearResult(): void;
    getResult(): BoundaryResult | undefined;
    setResult(value?: BoundaryResult): RunRejectingExampleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunRejectingExampleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RunRejectingExampleResponse): RunRejectingExampleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunRejectingExampleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunRejectingExampleResponse;
    static deserializeBinaryFromReader(message: RunRejectingExampleResponse, reader: jspb.BinaryReader): RunRejectingExampleResponse;
}

export namespace RunRejectingExampleResponse {
    export type AsObject = {
        result?: BoundaryResult.AsObject,
    }
}

export class StripMatchersResponse extends jspb.Message { 

    hasResult(): boolean;
    clearResult(): void;
    getResult(): BoundaryResult | undefined;
    setResult(value?: BoundaryResult): StripMatchersResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StripMatchersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StripMatchersResponse): StripMatchersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StripMatchersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StripMatchersResponse;
    static deserializeBinaryFromReader(message: StripMatchersResponse, reader: jspb.BinaryReader): StripMatchersResponse;
}

export namespace StripMatchersResponse {
    export type AsObject = {
        result?: BoundaryResult.AsObject,
    }
}

export class EndDefinitionResponse extends jspb.Message { 

    hasResult(): boolean;
    clearResult(): void;
    getResult(): BoundaryResult | undefined;
    setResult(value?: BoundaryResult): EndDefinitionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EndDefinitionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: EndDefinitionResponse): EndDefinitionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EndDefinitionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EndDefinitionResponse;
    static deserializeBinaryFromReader(message: EndDefinitionResponse, reader: jspb.BinaryReader): EndDefinitionResponse;
}

export namespace EndDefinitionResponse {
    export type AsObject = {
        result?: BoundaryResult.AsObject,
    }
}

export class TriggerFunctionResponse extends jspb.Message { 

    hasResult(): boolean;
    clearResult(): void;
    getResult(): BoundaryResult | undefined;
    setResult(value?: BoundaryResult): TriggerFunctionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TriggerFunctionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: TriggerFunctionResponse): TriggerFunctionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TriggerFunctionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TriggerFunctionResponse;
    static deserializeBinaryFromReader(message: TriggerFunctionResponse, reader: jspb.BinaryReader): TriggerFunctionResponse;
}

export namespace TriggerFunctionResponse {
    export type AsObject = {
        result?: BoundaryResult.AsObject,
    }
}

export class DefinitionRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): DefinitionRequest;

    hasBeginDefinition(): boolean;
    clearBeginDefinition(): void;
    getBeginDefinition(): BeginDefinitionRequest | undefined;
    setBeginDefinition(value?: BeginDefinitionRequest): DefinitionRequest;

    hasRunExample(): boolean;
    clearRunExample(): void;
    getRunExample(): RunExampleRequest | undefined;
    setRunExample(value?: RunExampleRequest): DefinitionRequest;

    hasRunRejectingExample(): boolean;
    clearRunRejectingExample(): void;
    getRunRejectingExample(): RunRejectingExampleRequest | undefined;
    setRunRejectingExample(value?: RunRejectingExampleRequest): DefinitionRequest;

    hasStripMatchers(): boolean;
    clearStripMatchers(): void;
    getStripMatchers(): StripMatchersRequest | undefined;
    setStripMatchers(value?: StripMatchersRequest): DefinitionRequest;

    hasEndDefinition(): boolean;
    clearEndDefinition(): void;
    getEndDefinition(): EndDefinitionRequest | undefined;
    setEndDefinition(value?: EndDefinitionRequest): DefinitionRequest;

    hasStateHandlerResponse(): boolean;
    clearStateHandlerResponse(): void;
    getStateHandlerResponse(): StateHandlerResponse | undefined;
    setStateHandlerResponse(value?: StateHandlerResponse): DefinitionRequest;

    hasLogPrinterResponse(): boolean;
    clearLogPrinterResponse(): void;
    getLogPrinterResponse(): LogPrinterResponse | undefined;
    setLogPrinterResponse(value?: LogPrinterResponse): DefinitionRequest;

    hasResultPrinterResponse(): boolean;
    clearResultPrinterResponse(): void;
    getResultPrinterResponse(): ResultPrinterResponse | undefined;
    setResultPrinterResponse(value?: ResultPrinterResponse): DefinitionRequest;

    hasTriggerFunctionResponse(): boolean;
    clearTriggerFunctionResponse(): void;
    getTriggerFunctionResponse(): TriggerFunctionResponse | undefined;
    setTriggerFunctionResponse(value?: TriggerFunctionResponse): DefinitionRequest;

    getKindCase(): DefinitionRequest.KindCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DefinitionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DefinitionRequest): DefinitionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DefinitionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DefinitionRequest;
    static deserializeBinaryFromReader(message: DefinitionRequest, reader: jspb.BinaryReader): DefinitionRequest;
}

export namespace DefinitionRequest {
    export type AsObject = {
        id: string,
        beginDefinition?: BeginDefinitionRequest.AsObject,
        runExample?: RunExampleRequest.AsObject,
        runRejectingExample?: RunRejectingExampleRequest.AsObject,
        stripMatchers?: StripMatchersRequest.AsObject,
        endDefinition?: EndDefinitionRequest.AsObject,
        stateHandlerResponse?: StateHandlerResponse.AsObject,
        logPrinterResponse?: LogPrinterResponse.AsObject,
        resultPrinterResponse?: ResultPrinterResponse.AsObject,
        triggerFunctionResponse?: TriggerFunctionResponse.AsObject,
    }

    export enum KindCase {
        KIND_NOT_SET = 0,
        BEGIN_DEFINITION = 2,
        RUN_EXAMPLE = 3,
        RUN_REJECTING_EXAMPLE = 4,
        STRIP_MATCHERS = 5,
        END_DEFINITION = 6,
        STATE_HANDLER_RESPONSE = 7,
        LOG_PRINTER_RESPONSE = 8,
        RESULT_PRINTER_RESPONSE = 9,
        TRIGGER_FUNCTION_RESPONSE = 10,
    }

}

export class DefinitionResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): DefinitionResponse;

    hasRunStateHandler(): boolean;
    clearRunStateHandler(): void;
    getRunStateHandler(): RunStateHandlerRequest | undefined;
    setRunStateHandler(value?: RunStateHandlerRequest): DefinitionResponse;

    hasLogRequest(): boolean;
    clearLogRequest(): void;
    getLogRequest(): LogRequest | undefined;
    setLogRequest(value?: LogRequest): DefinitionResponse;

    hasPrintMatchErrorRequest(): boolean;
    clearPrintMatchErrorRequest(): void;
    getPrintMatchErrorRequest(): PrintMatchErrorRequest | undefined;
    setPrintMatchErrorRequest(value?: PrintMatchErrorRequest): DefinitionResponse;

    hasPrintMessageErrorRequest(): boolean;
    clearPrintMessageErrorRequest(): void;
    getPrintMessageErrorRequest(): PrintMessageErrorRequest | undefined;
    setPrintMessageErrorRequest(value?: PrintMessageErrorRequest): DefinitionResponse;

    hasPrintTestTitleRequest(): boolean;
    clearPrintTestTitleRequest(): void;
    getPrintTestTitleRequest(): PrintTestTitleRequest | undefined;
    setPrintTestTitleRequest(value?: PrintTestTitleRequest): DefinitionResponse;

    hasTriggerFunctionRequest(): boolean;
    clearTriggerFunctionRequest(): void;
    getTriggerFunctionRequest(): TriggerFunctionRequest | undefined;
    setTriggerFunctionRequest(value?: TriggerFunctionRequest): DefinitionResponse;

    hasBeginDefinitionResponse(): boolean;
    clearBeginDefinitionResponse(): void;
    getBeginDefinitionResponse(): BeginDefinitionResponse | undefined;
    setBeginDefinitionResponse(value?: BeginDefinitionResponse): DefinitionResponse;

    hasRunExampleResponse(): boolean;
    clearRunExampleResponse(): void;
    getRunExampleResponse(): RunExampleResponse | undefined;
    setRunExampleResponse(value?: RunExampleResponse): DefinitionResponse;

    hasRunRejectingExampleResponse(): boolean;
    clearRunRejectingExampleResponse(): void;
    getRunRejectingExampleResponse(): RunRejectingExampleResponse | undefined;
    setRunRejectingExampleResponse(value?: RunRejectingExampleResponse): DefinitionResponse;

    hasStripMatchersResponse(): boolean;
    clearStripMatchersResponse(): void;
    getStripMatchersResponse(): StripMatchersResponse | undefined;
    setStripMatchersResponse(value?: StripMatchersResponse): DefinitionResponse;

    hasEndDefinitionResponse(): boolean;
    clearEndDefinitionResponse(): void;
    getEndDefinitionResponse(): EndDefinitionResponse | undefined;
    setEndDefinitionResponse(value?: EndDefinitionResponse): DefinitionResponse;

    getKindCase(): DefinitionResponse.KindCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DefinitionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DefinitionResponse): DefinitionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DefinitionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DefinitionResponse;
    static deserializeBinaryFromReader(message: DefinitionResponse, reader: jspb.BinaryReader): DefinitionResponse;
}

export namespace DefinitionResponse {
    export type AsObject = {
        id: string,
        runStateHandler?: RunStateHandlerRequest.AsObject,
        logRequest?: LogRequest.AsObject,
        printMatchErrorRequest?: PrintMatchErrorRequest.AsObject,
        printMessageErrorRequest?: PrintMessageErrorRequest.AsObject,
        printTestTitleRequest?: PrintTestTitleRequest.AsObject,
        triggerFunctionRequest?: TriggerFunctionRequest.AsObject,
        beginDefinitionResponse?: BeginDefinitionResponse.AsObject,
        runExampleResponse?: RunExampleResponse.AsObject,
        runRejectingExampleResponse?: RunRejectingExampleResponse.AsObject,
        stripMatchersResponse?: StripMatchersResponse.AsObject,
        endDefinitionResponse?: EndDefinitionResponse.AsObject,
    }

    export enum KindCase {
        KIND_NOT_SET = 0,
        RUN_STATE_HANDLER = 2,
        LOG_REQUEST = 3,
        PRINT_MATCH_ERROR_REQUEST = 4,
        PRINT_MESSAGE_ERROR_REQUEST = 5,
        PRINT_TEST_TITLE_REQUEST = 6,
        TRIGGER_FUNCTION_REQUEST = 12,
        BEGIN_DEFINITION_RESPONSE = 7,
        RUN_EXAMPLE_RESPONSE = 8,
        RUN_REJECTING_EXAMPLE_RESPONSE = 9,
        STRIP_MATCHERS_RESPONSE = 10,
        END_DEFINITION_RESPONSE = 11,
    }

}
