// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_contract_case_stream_pb = require('../proto/contract_case_stream_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

function serialize_io_contract_testing_contractcase_grpc_ContractResponse(arg) {
  if (!(arg instanceof proto_contract_case_stream_pb.ContractResponse)) {
    throw new Error('Expected argument of type io.contract_testing.contractcase.grpc.ContractResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_contract_testing_contractcase_grpc_ContractResponse(buffer_arg) {
  return proto_contract_case_stream_pb.ContractResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_contract_testing_contractcase_grpc_DefinitionRequest(arg) {
  if (!(arg instanceof proto_contract_case_stream_pb.DefinitionRequest)) {
    throw new Error('Expected argument of type io.contract_testing.contractcase.grpc.DefinitionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_contract_testing_contractcase_grpc_DefinitionRequest(buffer_arg) {
  return proto_contract_case_stream_pb.DefinitionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_contract_testing_contractcase_grpc_VerificationRequest(arg) {
  if (!(arg instanceof proto_contract_case_stream_pb.VerificationRequest)) {
    throw new Error('Expected argument of type io.contract_testing.contractcase.grpc.VerificationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_contract_testing_contractcase_grpc_VerificationRequest(buffer_arg) {
  return proto_contract_case_stream_pb.VerificationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ContractCaseService = exports.ContractCaseService = {
  contractDefinition: {
    path: '/io.contract_testing.contractcase.grpc.ContractCase/ContractDefinition',
    requestStream: true,
    responseStream: true,
    requestType: proto_contract_case_stream_pb.DefinitionRequest,
    responseType: proto_contract_case_stream_pb.ContractResponse,
    requestSerialize: serialize_io_contract_testing_contractcase_grpc_DefinitionRequest,
    requestDeserialize: deserialize_io_contract_testing_contractcase_grpc_DefinitionRequest,
    responseSerialize: serialize_io_contract_testing_contractcase_grpc_ContractResponse,
    responseDeserialize: deserialize_io_contract_testing_contractcase_grpc_ContractResponse,
  },
  contractVerification: {
    path: '/io.contract_testing.contractcase.grpc.ContractCase/ContractVerification',
    requestStream: true,
    responseStream: true,
    requestType: proto_contract_case_stream_pb.VerificationRequest,
    responseType: proto_contract_case_stream_pb.ContractResponse,
    requestSerialize: serialize_io_contract_testing_contractcase_grpc_VerificationRequest,
    requestDeserialize: deserialize_io_contract_testing_contractcase_grpc_VerificationRequest,
    responseSerialize: serialize_io_contract_testing_contractcase_grpc_ContractResponse,
    responseDeserialize: deserialize_io_contract_testing_contractcase_grpc_ContractResponse,
  },
};

exports.ContractCaseClient = grpc.makeGenericClientConstructor(ContractCaseService);
