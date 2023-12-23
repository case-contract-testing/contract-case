// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_contract_case_stream_pb = require('../proto/contract_case_stream_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');

function serialize_contractcase_DefinitionRequest(arg) {
  if (!(arg instanceof proto_contract_case_stream_pb.DefinitionRequest)) {
    throw new Error('Expected argument of type contractcase.DefinitionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_contractcase_DefinitionRequest(buffer_arg) {
  return proto_contract_case_stream_pb.DefinitionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_contractcase_DefinitionResponse(arg) {
  if (!(arg instanceof proto_contract_case_stream_pb.DefinitionResponse)) {
    throw new Error('Expected argument of type contractcase.DefinitionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_contractcase_DefinitionResponse(buffer_arg) {
  return proto_contract_case_stream_pb.DefinitionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ContractCaseService = exports.ContractCaseService = {
  contractDefinition: {
    path: '/contractcase.ContractCase/ContractDefinition',
    requestStream: true,
    responseStream: true,
    requestType: proto_contract_case_stream_pb.DefinitionRequest,
    responseType: proto_contract_case_stream_pb.DefinitionResponse,
    requestSerialize: serialize_contractcase_DefinitionRequest,
    requestDeserialize: deserialize_contractcase_DefinitionRequest,
    responseSerialize: serialize_contractcase_DefinitionResponse,
    responseDeserialize: deserialize_contractcase_DefinitionResponse,
  },
};

exports.ContractCaseClient = grpc.makeGenericClientConstructor(ContractCaseService);
