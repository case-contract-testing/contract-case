// package: io.contract_testing.contractcase.grpc
// file: proto/contract_case_stream.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from '@grpc/grpc-js';
import * as proto_contract_case_stream_pb from '../proto/contract_case_stream_pb';
import * as google_protobuf_struct_pb from 'google-protobuf/google/protobuf/struct_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';

interface IContractCaseService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  contractDefinition: IContractCaseService_IContractDefinition;
  contractVerification: IContractCaseService_IContractVerification;
}

interface IContractCaseService_IContractDefinition
  extends grpc.MethodDefinition<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.ContractResponse
  > {
  path: '/io.contract_testing.contractcase.grpc.ContractCase/ContractDefinition';
  requestStream: true;
  responseStream: true;
  requestSerialize: grpc.serialize<proto_contract_case_stream_pb.DefinitionRequest>;
  requestDeserialize: grpc.deserialize<proto_contract_case_stream_pb.DefinitionRequest>;
  responseSerialize: grpc.serialize<proto_contract_case_stream_pb.ContractResponse>;
  responseDeserialize: grpc.deserialize<proto_contract_case_stream_pb.ContractResponse>;
}
interface IContractCaseService_IContractVerification
  extends grpc.MethodDefinition<
    proto_contract_case_stream_pb.VerificationRequest,
    proto_contract_case_stream_pb.ContractResponse
  > {
  path: '/io.contract_testing.contractcase.grpc.ContractCase/ContractVerification';
  requestStream: true;
  responseStream: true;
  requestSerialize: grpc.serialize<proto_contract_case_stream_pb.VerificationRequest>;
  requestDeserialize: grpc.deserialize<proto_contract_case_stream_pb.VerificationRequest>;
  responseSerialize: grpc.serialize<proto_contract_case_stream_pb.ContractResponse>;
  responseDeserialize: grpc.deserialize<proto_contract_case_stream_pb.ContractResponse>;
}

export const ContractCaseService: IContractCaseService;

export interface IContractCaseServer extends grpc.UntypedServiceImplementation {
  contractDefinition: grpc.handleBidiStreamingCall<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
  contractVerification: grpc.handleBidiStreamingCall<
    proto_contract_case_stream_pb.VerificationRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
}

export interface IContractCaseClient {
  contractDefinition(): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
  contractDefinition(
    options: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
  contractDefinition(
    metadata: grpc.Metadata,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
  contractVerification(): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.VerificationRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
  contractVerification(
    options: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.VerificationRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
  contractVerification(
    metadata: grpc.Metadata,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.VerificationRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
}

export class ContractCaseClient
  extends grpc.Client
  implements IContractCaseClient
{
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: Partial<grpc.ClientOptions>,
  );
  public contractDefinition(
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
  public contractDefinition(
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
  public contractVerification(
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.VerificationRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
  public contractVerification(
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.VerificationRequest,
    proto_contract_case_stream_pb.ContractResponse
  >;
}
