// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_contract_case_stream_pb = require('../proto/contract_case_stream_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

function serialize_io_contract_testing_contractcase_grpc_DefinitionRequest(arg) {
  if (!(arg instanceof proto_contract_case_stream_pb.DefinitionRequest)) {
    throw new Error('Expected argument of type io.contract_testing.contractcase.grpc.DefinitionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_contract_testing_contractcase_grpc_DefinitionRequest(buffer_arg) {
  return proto_contract_case_stream_pb.DefinitionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_contract_testing_contractcase_grpc_DefinitionResponse(arg) {
  if (!(arg instanceof proto_contract_case_stream_pb.DefinitionResponse)) {
    throw new Error('Expected argument of type io.contract_testing.contractcase.grpc.DefinitionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_contract_testing_contractcase_grpc_DefinitionResponse(buffer_arg) {
  return proto_contract_case_stream_pb.DefinitionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ContractCaseService = exports.ContractCaseService = {
  contractDefinition: {
    path: '/io.contract_testing.contractcase.grpc.ContractCase/ContractDefinition',
    requestStream: true,
    responseStream: true,
    requestType: proto_contract_case_stream_pb.DefinitionRequest,
    responseType: proto_contract_case_stream_pb.DefinitionResponse,
    requestSerialize: serialize_io_contract_testing_contractcase_grpc_DefinitionRequest,
    requestDeserialize: deserialize_io_contract_testing_contractcase_grpc_DefinitionRequest,
    responseSerialize: serialize_io_contract_testing_contractcase_grpc_DefinitionResponse,
    responseDeserialize: deserialize_io_contract_testing_contractcase_grpc_DefinitionResponse,
  },
};

exports.ContractCaseClient = grpc.makeGenericClientConstructor(ContractCaseService);
