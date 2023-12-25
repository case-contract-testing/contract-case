// package: contractcase
// file: proto/contract_case_stream.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from '@grpc/grpc-js';
import * as proto_contract_case_stream_pb from '../proto/contract_case_stream_pb';
import * as google_protobuf_struct_pb from 'google-protobuf/google/protobuf/struct_pb';

interface IContractCaseService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  contractDefinition: IContractCaseService_IContractDefinition;
}

interface IContractCaseService_IContractDefinition
  extends grpc.MethodDefinition<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.DefinitionResponse
  > {
  path: '/contractcase.ContractCase/ContractDefinition';
  requestStream: true;
  responseStream: true;
  requestSerialize: grpc.serialize<proto_contract_case_stream_pb.DefinitionRequest>;
  requestDeserialize: grpc.deserialize<proto_contract_case_stream_pb.DefinitionRequest>;
  responseSerialize: grpc.serialize<proto_contract_case_stream_pb.DefinitionResponse>;
  responseDeserialize: grpc.deserialize<proto_contract_case_stream_pb.DefinitionResponse>;
}

export const ContractCaseService: IContractCaseService;

export interface IContractCaseServer extends grpc.UntypedServiceImplementation {
  contractDefinition: grpc.handleBidiStreamingCall<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.DefinitionResponse
  >;
}

export interface IContractCaseClient {
  contractDefinition(): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.DefinitionResponse
  >;
  contractDefinition(
    options: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.DefinitionResponse
  >;
  contractDefinition(
    metadata: grpc.Metadata,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.DefinitionResponse
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
    proto_contract_case_stream_pb.DefinitionResponse
  >;
  public contractDefinition(
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    proto_contract_case_stream_pb.DefinitionRequest,
    proto_contract_case_stream_pb.DefinitionResponse
  >;
}
