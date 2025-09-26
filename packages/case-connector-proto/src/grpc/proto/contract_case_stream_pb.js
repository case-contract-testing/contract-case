// source: proto/contract_case_stream.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
goog.object.extend(proto, google_protobuf_struct_pb);
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
goog.object.extend(proto, google_protobuf_wrappers_pb);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.BoundaryResult', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.BoundaryResult.ValueCase', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.ContractCaseConfig', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.ContractResponse', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.ContractResponse.KindCase', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.DefinitionRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.DefinitionRequest.KindCase', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.InvokeFunction', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.InvokeTest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.InvokeTest.TestCase', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.LoadPluginRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.LogRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.PreparedTestHandle', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.RegisterFunction', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.ResultFailure', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.ResultResponse', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.ResultSuccess', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.RunInteractionRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.SetupInfo', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.StateHandlerHandle', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.Stage', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.StripMatchersRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.VerificationRequest', null, global);
goog.exportSymbol('proto.io.contract_testing.contractcase.grpc.VerificationRequest.KindCase', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.repeatedFields_, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.ContractCaseConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.displayName = 'proto.io.contract_testing.contractcase.grpc.ContractCaseConfig';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.displayName = 'proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccess = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.ResultSuccess, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.ResultSuccess.displayName = 'proto.io.contract_testing.contractcase.grpc.ResultSuccess';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.displayName = 'proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.displayName = 'proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.ResultFailure, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.ResultFailure.displayName = 'proto.io.contract_testing.contractcase.grpc.ResultFailure';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.contract_testing.contractcase.grpc.BoundaryResult.oneofGroups_);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.BoundaryResult, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.BoundaryResult.displayName = 'proto.io.contract_testing.contractcase.grpc.BoundaryResult';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.StateHandlerHandle, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.displayName = 'proto.io.contract_testing.contractcase.grpc.StateHandlerHandle';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.displayName = 'proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.repeatedFields_, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.RunInteractionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.RunInteractionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.StripMatchersRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.StripMatchersRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.repeatedFields_, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.LoadPluginRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.LoadPluginRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.displayName = 'proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.SetupInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.SetupInfo.displayName = 'proto.io.contract_testing.contractcase.grpc.SetupInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.LogRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.LogRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.LogRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.LogRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.ResultResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.ResultResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.ResultResponse.displayName = 'proto.io.contract_testing.contractcase.grpc.ResultResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.repeatedFields_, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.displayName = 'proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.PreparedTestHandle, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.displayName = 'proto.io.contract_testing.contractcase.grpc.PreparedTestHandle';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.contract_testing.contractcase.grpc.InvokeTest.oneofGroups_);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.InvokeTest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.InvokeTest.displayName = 'proto.io.contract_testing.contractcase.grpc.InvokeTest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.RegisterFunction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.RegisterFunction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.RegisterFunction.displayName = 'proto.io.contract_testing.contractcase.grpc.RegisterFunction';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.contract_testing.contractcase.grpc.InvokeFunction.repeatedFields_, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.InvokeFunction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.InvokeFunction.displayName = 'proto.io.contract_testing.contractcase.grpc.InvokeFunction';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.displayName = 'proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.DefinitionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.DefinitionRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.DefinitionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.VerificationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.VerificationRequest.displayName = 'proto.io.contract_testing.contractcase.grpc.VerificationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_);
};
goog.inherits(proto.io.contract_testing.contractcase.grpc.ContractResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.io.contract_testing.contractcase.grpc.ContractResponse.displayName = 'proto.io.contract_testing.contractcase.grpc.ContractResponse';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.repeatedFields_ = [12,20];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    providerName: (f = msg.getProviderName()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    consumerName: (f = msg.getConsumerName()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    logLevel: (f = msg.getLogLevel()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    contractDir: (f = msg.getContractDir()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    contractFilename: (f = msg.getContractFilename()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    publish: (f = msg.getPublish()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    brokerCiAccessToken: (f = msg.getBrokerCiAccessToken()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    brokerBaseUrl: (f = msg.getBrokerBaseUrl()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    brokerBasicAuth: (f = msg.getBrokerBasicAuth()) && proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.toObject(includeInstance, f),
    printResults: (f = msg.getPrintResults()) && google_protobuf_wrappers_pb.BoolValue.toObject(includeInstance, f),
    throwOnFail: (f = msg.getThrowOnFail()) && google_protobuf_wrappers_pb.BoolValue.toObject(includeInstance, f),
    stateHandlersList: jspb.Message.toObjectList(msg.getStateHandlersList(),
    proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.toObject, includeInstance),
    triggerAndTestsMap: (f = msg.getTriggerAndTestsMap()) ? f.toObject(includeInstance, proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.toObject) : [],
    triggerAndTest: (f = msg.getTriggerAndTest()) && proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.toObject(includeInstance, f),
    baseUrlUnderTest: (f = msg.getBaseUrlUnderTest()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    mockConfigMap: (f = msg.getMockConfigMap()) ? f.toObject(includeInstance, undefined) : [],
    autoVersionFrom: (f = msg.getAutoVersionFrom()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    changedContracts: (f = msg.getChangedContracts()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    adviceOverridesMap: (f = msg.getAdviceOverridesMap()) ? f.toObject(includeInstance, undefined) : [],
    contractsToWriteList: jspb.Message.toObjectList(msg.getContractsToWriteList(),
    google_protobuf_wrappers_pb.StringValue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.ContractCaseConfig;
  return proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setProviderName(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setConsumerName(value);
      break;
    case 3:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setLogLevel(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setContractDir(value);
      break;
    case 5:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setContractFilename(value);
      break;
    case 6:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setPublish(value);
      break;
    case 7:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setBrokerCiAccessToken(value);
      break;
    case 8:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setBrokerBaseUrl(value);
      break;
    case 9:
      var value = new proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.deserializeBinaryFromReader);
      msg.setBrokerBasicAuth(value);
      break;
    case 10:
      var value = new google_protobuf_wrappers_pb.BoolValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.BoolValue.deserializeBinaryFromReader);
      msg.setPrintResults(value);
      break;
    case 11:
      var value = new google_protobuf_wrappers_pb.BoolValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.BoolValue.deserializeBinaryFromReader);
      msg.setThrowOnFail(value);
      break;
    case 12:
      var value = new proto.io.contract_testing.contractcase.grpc.StateHandlerHandle;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.deserializeBinaryFromReader);
      msg.addStateHandlers(value);
      break;
    case 13:
      var value = msg.getTriggerAndTestsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.deserializeBinaryFromReader, "", new proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle());
         });
      break;
    case 14:
      var value = new proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.deserializeBinaryFromReader);
      msg.setTriggerAndTest(value);
      break;
    case 15:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setBaseUrlUnderTest(value);
      break;
    case 16:
      var value = msg.getMockConfigMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    case 17:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setAutoVersionFrom(value);
      break;
    case 18:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setChangedContracts(value);
      break;
    case 19:
      var value = msg.getAdviceOverridesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    case 20:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.addContractsToWrite(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProviderName();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getConsumerName();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getLogLevel();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getContractDir();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getContractFilename();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getPublish();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getBrokerCiAccessToken();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getBrokerBaseUrl();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getBrokerBasicAuth();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.serializeBinaryToWriter
    );
  }
  f = message.getPrintResults();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      google_protobuf_wrappers_pb.BoolValue.serializeBinaryToWriter
    );
  }
  f = message.getThrowOnFail();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      google_protobuf_wrappers_pb.BoolValue.serializeBinaryToWriter
    );
  }
  f = message.getStateHandlersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      12,
      f,
      proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.serializeBinaryToWriter
    );
  }
  f = message.getTriggerAndTestsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(13, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.serializeBinaryToWriter);
  }
  f = message.getTriggerAndTest();
  if (f != null) {
    writer.writeMessage(
      14,
      f,
      proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.serializeBinaryToWriter
    );
  }
  f = message.getBaseUrlUnderTest();
  if (f != null) {
    writer.writeMessage(
      15,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getMockConfigMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(16, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
  f = message.getAutoVersionFrom();
  if (f != null) {
    writer.writeMessage(
      17,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getChangedContracts();
  if (f != null) {
    writer.writeMessage(
      18,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getAdviceOverridesMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(19, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
  f = message.getContractsToWriteList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      20,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.toObject = function(includeInstance, msg) {
  var f, obj = {
    username: (f = msg.getUsername()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    password: (f = msg.getPassword()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword;
  return proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setUsername(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setPassword(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsername();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getPassword();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue username = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.prototype.getUsername = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.prototype.setUsername = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.prototype.clearUsername = function() {
  return this.setUsername(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.prototype.hasUsername = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.StringValue password = 2;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.prototype.getPassword = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.prototype.setPassword = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.prototype.clearPassword = function() {
  return this.setPassword(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword.prototype.hasPassword = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.StringValue provider_name = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getProviderName = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setProviderName = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearProviderName = function() {
  return this.setProviderName(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasProviderName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.StringValue consumer_name = 2;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getConsumerName = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setConsumerName = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearConsumerName = function() {
  return this.setConsumerName(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasConsumerName = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.StringValue log_level = 3;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getLogLevel = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 3));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setLogLevel = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearLogLevel = function() {
  return this.setLogLevel(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasLogLevel = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.StringValue contract_dir = 4;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getContractDir = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 4));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setContractDir = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearContractDir = function() {
  return this.setContractDir(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasContractDir = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.StringValue contract_filename = 5;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getContractFilename = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 5));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setContractFilename = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearContractFilename = function() {
  return this.setContractFilename(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasContractFilename = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional google.protobuf.StringValue publish = 6;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getPublish = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 6));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setPublish = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearPublish = function() {
  return this.setPublish(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasPublish = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional google.protobuf.StringValue broker_ci_access_token = 7;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getBrokerCiAccessToken = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 7));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setBrokerCiAccessToken = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearBrokerCiAccessToken = function() {
  return this.setBrokerCiAccessToken(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasBrokerCiAccessToken = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional google.protobuf.StringValue broker_base_url = 8;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getBrokerBaseUrl = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 8));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setBrokerBaseUrl = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearBrokerBaseUrl = function() {
  return this.setBrokerBaseUrl(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasBrokerBaseUrl = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional UsernamePassword broker_basic_auth = 9;
 * @return {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getBrokerBasicAuth = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword, 9));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.UsernamePassword|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setBrokerBasicAuth = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearBrokerBasicAuth = function() {
  return this.setBrokerBasicAuth(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasBrokerBasicAuth = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional google.protobuf.BoolValue print_results = 10;
 * @return {?proto.google.protobuf.BoolValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getPrintResults = function() {
  return /** @type{?proto.google.protobuf.BoolValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.BoolValue, 10));
};


/**
 * @param {?proto.google.protobuf.BoolValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setPrintResults = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearPrintResults = function() {
  return this.setPrintResults(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasPrintResults = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional google.protobuf.BoolValue throw_on_fail = 11;
 * @return {?proto.google.protobuf.BoolValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getThrowOnFail = function() {
  return /** @type{?proto.google.protobuf.BoolValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.BoolValue, 11));
};


/**
 * @param {?proto.google.protobuf.BoolValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setThrowOnFail = function(value) {
  return jspb.Message.setWrapperField(this, 11, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearThrowOnFail = function() {
  return this.setThrowOnFail(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasThrowOnFail = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * repeated StateHandlerHandle state_handlers = 12;
 * @return {!Array<!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle>}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getStateHandlersList = function() {
  return /** @type{!Array<!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.contract_testing.contractcase.grpc.StateHandlerHandle, 12));
};


/**
 * @param {!Array<!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle>} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setStateHandlersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 12, value);
};


/**
 * @param {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle=} opt_value
 * @param {number=} opt_index
 * @return {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.addStateHandlers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 12, opt_value, proto.io.contract_testing.contractcase.grpc.StateHandlerHandle, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearStateHandlersList = function() {
  return this.setStateHandlersList([]);
};


/**
 * map<string, TriggerFunctionHandle> trigger_and_tests = 13;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle>}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getTriggerAndTestsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle>} */ (
      jspb.Message.getMapField(this, 13, opt_noLazyCreate,
      proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearTriggerAndTestsMap = function() {
  this.getTriggerAndTestsMap().clear();
  return this;};


/**
 * optional TriggerFunctionHandle trigger_and_test = 14;
 * @return {?proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getTriggerAndTest = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle, 14));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setTriggerAndTest = function(value) {
  return jspb.Message.setWrapperField(this, 14, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearTriggerAndTest = function() {
  return this.setTriggerAndTest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasTriggerAndTest = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional google.protobuf.StringValue base_url_under_test = 15;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getBaseUrlUnderTest = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 15));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setBaseUrlUnderTest = function(value) {
  return jspb.Message.setWrapperField(this, 15, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearBaseUrlUnderTest = function() {
  return this.setBaseUrlUnderTest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasBaseUrlUnderTest = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * map<string, string> mock_config = 16;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getMockConfigMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 16, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearMockConfigMap = function() {
  this.getMockConfigMap().clear();
  return this;};


/**
 * optional google.protobuf.StringValue auto_version_from = 17;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getAutoVersionFrom = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 17));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setAutoVersionFrom = function(value) {
  return jspb.Message.setWrapperField(this, 17, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearAutoVersionFrom = function() {
  return this.setAutoVersionFrom(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasAutoVersionFrom = function() {
  return jspb.Message.getField(this, 17) != null;
};


/**
 * optional google.protobuf.StringValue changed_contracts = 18;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getChangedContracts = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 18));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setChangedContracts = function(value) {
  return jspb.Message.setWrapperField(this, 18, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearChangedContracts = function() {
  return this.setChangedContracts(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.hasChangedContracts = function() {
  return jspb.Message.getField(this, 18) != null;
};


/**
 * map<string, string> advice_overrides = 19;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getAdviceOverridesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 19, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearAdviceOverridesMap = function() {
  this.getAdviceOverridesMap().clear();
  return this;};


/**
 * repeated google.protobuf.StringValue contracts_to_write = 20;
 * @return {!Array<!proto.google.protobuf.StringValue>}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.getContractsToWriteList = function() {
  return /** @type{!Array<!proto.google.protobuf.StringValue>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_wrappers_pb.StringValue, 20));
};


/**
 * @param {!Array<!proto.google.protobuf.StringValue>} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.setContractsToWriteList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 20, value);
};


/**
 * @param {!proto.google.protobuf.StringValue=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.addContractsToWrite = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 20, opt_value, proto.google.protobuf.StringValue, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.prototype.clearContractsToWriteList = function() {
  return this.setContractsToWriteList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccess.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.ResultSuccess.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultSuccess} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccess.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultSuccess}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccess.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.ResultSuccess;
  return proto.io.contract_testing.contractcase.grpc.ResultSuccess.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultSuccess} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultSuccess}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccess.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccess.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.ResultSuccess.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultSuccess} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccess.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.toObject = function(includeInstance, msg) {
  var f, obj = {
    map: (f = msg.getMap()) && google_protobuf_struct_pb.Struct.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload;
  return proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Struct;
      reader.readMessage(value,google_protobuf_struct_pb.Struct.deserializeBinaryFromReader);
      msg.setMap(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMap();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Struct.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Struct map = 1;
 * @return {?proto.google.protobuf.Struct}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.prototype.getMap = function() {
  return /** @type{?proto.google.protobuf.Struct} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Struct, 1));
};


/**
 * @param {?proto.google.protobuf.Struct|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload} returns this
*/
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.prototype.setMap = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload} returns this
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.prototype.clearMap = function() {
  return this.setMap(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.prototype.hasMap = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.toObject = function(includeInstance, msg) {
  var f, obj = {
    payload: (f = msg.getPayload()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload;
  return proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setPayload(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPayload();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue payload = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.prototype.getPayload = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload} returns this
*/
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.prototype.setPayload = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload} returns this
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.prototype.clearPayload = function() {
  return this.setPayload(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.prototype.hasPayload = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.ResultFailure.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultFailure} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.toObject = function(includeInstance, msg) {
  var f, obj = {
    kind: (f = msg.getKind()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    message: (f = msg.getMessage()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    location: (f = msg.getLocation()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    contractCaseErrorCode: (f = msg.getContractCaseErrorCode()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    userFacingStackTrace: (f = msg.getUserFacingStackTrace()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.ResultFailure;
  return proto.io.contract_testing.contractcase.grpc.ResultFailure.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultFailure} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setKind(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setMessage(value);
      break;
    case 3:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setLocation(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setContractCaseErrorCode(value);
      break;
    case 5:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setUserFacingStackTrace(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.ResultFailure.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultFailure} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKind();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getLocation();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getContractCaseErrorCode();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getUserFacingStackTrace();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue kind = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.getKind = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure} returns this
*/
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.setKind = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure} returns this
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.clearKind = function() {
  return this.setKind(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.hasKind = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.StringValue message = 2;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.getMessage = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure} returns this
*/
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.setMessage = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure} returns this
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.clearMessage = function() {
  return this.setMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.hasMessage = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.StringValue location = 3;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.getLocation = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 3));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure} returns this
*/
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.setLocation = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure} returns this
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.clearLocation = function() {
  return this.setLocation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.hasLocation = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.StringValue contract_case_error_code = 4;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.getContractCaseErrorCode = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 4));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure} returns this
*/
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.setContractCaseErrorCode = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure} returns this
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.clearContractCaseErrorCode = function() {
  return this.setContractCaseErrorCode(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.hasContractCaseErrorCode = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.StringValue user_facing_stack_trace = 5;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.getUserFacingStackTrace = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 5));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure} returns this
*/
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.setUserFacingStackTrace = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultFailure} returns this
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.clearUserFacingStackTrace = function() {
  return this.setUserFacingStackTrace(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ResultFailure.prototype.hasUserFacingStackTrace = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.oneofGroups_ = [[1,2,3,4]];

/**
 * @enum {number}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.ValueCase = {
  VALUE_NOT_SET: 0,
  SUCCESS: 1,
  SUCCESS_HAS_MAP: 2,
  SUCCESS_HAS_ANY: 3,
  FAILURE: 4
};

/**
 * @return {proto.io.contract_testing.contractcase.grpc.BoundaryResult.ValueCase}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.getValueCase = function() {
  return /** @type {proto.io.contract_testing.contractcase.grpc.BoundaryResult.ValueCase} */(jspb.Message.computeOneofCase(this, proto.io.contract_testing.contractcase.grpc.BoundaryResult.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.BoundaryResult.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: (f = msg.getSuccess()) && proto.io.contract_testing.contractcase.grpc.ResultSuccess.toObject(includeInstance, f),
    successHasMap: (f = msg.getSuccessHasMap()) && proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.toObject(includeInstance, f),
    successHasAny: (f = msg.getSuccessHasAny()) && proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.toObject(includeInstance, f),
    failure: (f = msg.getFailure()) && proto.io.contract_testing.contractcase.grpc.ResultFailure.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.BoundaryResult}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.BoundaryResult;
  return proto.io.contract_testing.contractcase.grpc.BoundaryResult.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.BoundaryResult}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.contract_testing.contractcase.grpc.ResultSuccess;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ResultSuccess.deserializeBinaryFromReader);
      msg.setSuccess(value);
      break;
    case 2:
      var value = new proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.deserializeBinaryFromReader);
      msg.setSuccessHasMap(value);
      break;
    case 3:
      var value = new proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.deserializeBinaryFromReader);
      msg.setSuccessHasAny(value);
      break;
    case 4:
      var value = new proto.io.contract_testing.contractcase.grpc.ResultFailure;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ResultFailure.deserializeBinaryFromReader);
      msg.setFailure(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.BoundaryResult.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.contract_testing.contractcase.grpc.ResultSuccess.serializeBinaryToWriter
    );
  }
  f = message.getSuccessHasMap();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload.serializeBinaryToWriter
    );
  }
  f = message.getSuccessHasAny();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload.serializeBinaryToWriter
    );
  }
  f = message.getFailure();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.io.contract_testing.contractcase.grpc.ResultFailure.serializeBinaryToWriter
    );
  }
};


/**
 * optional ResultSuccess success = 1;
 * @return {?proto.io.contract_testing.contractcase.grpc.ResultSuccess}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.getSuccess = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ResultSuccess} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ResultSuccess, 1));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ResultSuccess|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} returns this
*/
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.setSuccess = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.io.contract_testing.contractcase.grpc.BoundaryResult.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} returns this
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.clearSuccess = function() {
  return this.setSuccess(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.hasSuccess = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional ResultSuccessHasMapPayload success_has_map = 2;
 * @return {?proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.getSuccessHasMap = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload, 2));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ResultSuccessHasMapPayload|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} returns this
*/
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.setSuccessHasMap = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.io.contract_testing.contractcase.grpc.BoundaryResult.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} returns this
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.clearSuccessHasMap = function() {
  return this.setSuccessHasMap(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.hasSuccessHasMap = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ResultSuccessHasAnyPayload success_has_any = 3;
 * @return {?proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.getSuccessHasAny = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload, 3));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ResultSuccessHasAnyPayload|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} returns this
*/
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.setSuccessHasAny = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.io.contract_testing.contractcase.grpc.BoundaryResult.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} returns this
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.clearSuccessHasAny = function() {
  return this.setSuccessHasAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.hasSuccessHasAny = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional ResultFailure failure = 4;
 * @return {?proto.io.contract_testing.contractcase.grpc.ResultFailure}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.getFailure = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ResultFailure} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ResultFailure, 4));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ResultFailure|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} returns this
*/
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.setFailure = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.io.contract_testing.contractcase.grpc.BoundaryResult.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.BoundaryResult} returns this
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.clearFailure = function() {
  return this.setFailure(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.BoundaryResult.prototype.hasFailure = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.toObject = function(includeInstance, msg) {
  var f, obj = {
    handle: (f = msg.getHandle()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    stage: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle}
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.StateHandlerHandle;
  return proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle}
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setHandle(value);
      break;
    case 2:
      var value = /** @type {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.Stage} */ (reader.readEnum());
      msg.setStage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHandle();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getStage();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.Stage = {
  STAGE_SETUP_UNSPECIFIED: 0,
  STAGE_TEARDOWN: 1
};

/**
 * optional google.protobuf.StringValue handle = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.prototype.getHandle = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle} returns this
*/
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.prototype.setHandle = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle} returns this
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.prototype.clearHandle = function() {
  return this.setHandle(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.prototype.hasHandle = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Stage stage = 2;
 * @return {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.Stage}
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.prototype.getStage = function() {
  return /** @type {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.Stage} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.Stage} value
 * @return {!proto.io.contract_testing.contractcase.grpc.StateHandlerHandle} returns this
 */
proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.prototype.setStage = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.toObject = function(includeInstance, msg) {
  var f, obj = {
    handle: (f = msg.getHandle()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle;
  return proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setHandle(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHandle();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue handle = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.prototype.getHandle = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle} returns this
*/
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.prototype.setHandle = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle} returns this
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.prototype.clearHandle = function() {
  return this.setHandle(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.prototype.hasHandle = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.toObject(includeInstance, f),
    callerVersionsList: jspb.Message.toObjectList(msg.getCallerVersionsList(),
    google_protobuf_wrappers_pb.StringValue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest}
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest;
  return proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest}
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.contract_testing.contractcase.grpc.ContractCaseConfig;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.addCallerVersions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.serializeBinaryToWriter
    );
  }
  f = message.getCallerVersionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional ContractCaseConfig config = 1;
 * @return {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig}
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.prototype.getConfig = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ContractCaseConfig, 1));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated google.protobuf.StringValue caller_versions = 4;
 * @return {!Array<!proto.google.protobuf.StringValue>}
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.prototype.getCallerVersionsList = function() {
  return /** @type{!Array<!proto.google.protobuf.StringValue>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_wrappers_pb.StringValue, 4));
};


/**
 * @param {!Array<!proto.google.protobuf.StringValue>} value
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.prototype.setCallerVersionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.google.protobuf.StringValue=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.prototype.addCallerVersions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.google.protobuf.StringValue, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.prototype.clearCallerVersionsList = function() {
  return this.setCallerVersionsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.RunInteractionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    exampleDefinition: (f = msg.getExampleDefinition()) && google_protobuf_struct_pb.Struct.toObject(includeInstance, f),
    config: (f = msg.getConfig()) && proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunInteractionRequest}
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.RunInteractionRequest;
  return proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.RunInteractionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunInteractionRequest}
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = new google_protobuf_struct_pb.Struct;
      reader.readMessage(value,google_protobuf_struct_pb.Struct.deserializeBinaryFromReader);
      msg.setExampleDefinition(value);
      break;
    case 3:
      var value = new proto.io.contract_testing.contractcase.grpc.ContractCaseConfig;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.RunInteractionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getExampleDefinition();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_struct_pb.Struct.serializeBinaryToWriter
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Struct example_definition = 2;
 * @return {?proto.google.protobuf.Struct}
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.prototype.getExampleDefinition = function() {
  return /** @type{?proto.google.protobuf.Struct} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Struct, 2));
};


/**
 * @param {?proto.google.protobuf.Struct|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.RunInteractionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.prototype.setExampleDefinition = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunInteractionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.prototype.clearExampleDefinition = function() {
  return this.setExampleDefinition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.prototype.hasExampleDefinition = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ContractCaseConfig config = 3;
 * @return {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig}
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.prototype.getConfig = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ContractCaseConfig, 3));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.RunInteractionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunInteractionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    exampleDefinition: (f = msg.getExampleDefinition()) && google_protobuf_struct_pb.Struct.toObject(includeInstance, f),
    config: (f = msg.getConfig()) && proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest}
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest;
  return proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest}
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = new google_protobuf_struct_pb.Struct;
      reader.readMessage(value,google_protobuf_struct_pb.Struct.deserializeBinaryFromReader);
      msg.setExampleDefinition(value);
      break;
    case 3:
      var value = new proto.io.contract_testing.contractcase.grpc.ContractCaseConfig;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getExampleDefinition();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_struct_pb.Struct.serializeBinaryToWriter
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Struct example_definition = 2;
 * @return {?proto.google.protobuf.Struct}
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.prototype.getExampleDefinition = function() {
  return /** @type{?proto.google.protobuf.Struct} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Struct, 2));
};


/**
 * @param {?proto.google.protobuf.Struct|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.prototype.setExampleDefinition = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.prototype.clearExampleDefinition = function() {
  return this.setExampleDefinition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.prototype.hasExampleDefinition = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ContractCaseConfig config = 3;
 * @return {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig}
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.prototype.getConfig = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ContractCaseConfig, 3));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.StripMatchersRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    matcherOrData: (f = msg.getMatcherOrData()) && google_protobuf_struct_pb.Struct.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.StripMatchersRequest}
 */
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.StripMatchersRequest;
  return proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.StripMatchersRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.StripMatchersRequest}
 */
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = new google_protobuf_struct_pb.Struct;
      reader.readMessage(value,google_protobuf_struct_pb.Struct.deserializeBinaryFromReader);
      msg.setMatcherOrData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.StripMatchersRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMatcherOrData();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_struct_pb.Struct.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Struct matcher_or_data = 2;
 * @return {?proto.google.protobuf.Struct}
 */
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.prototype.getMatcherOrData = function() {
  return /** @type{?proto.google.protobuf.Struct} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Struct, 2));
};


/**
 * @param {?proto.google.protobuf.Struct|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.StripMatchersRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.prototype.setMatcherOrData = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.StripMatchersRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.prototype.clearMatcherOrData = function() {
  return this.setMatcherOrData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.prototype.hasMatcherOrData = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest}
 */
proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest;
  return proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest}
 */
proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.repeatedFields_ = [1,3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    moduleNamesList: jspb.Message.toObjectList(msg.getModuleNamesList(),
    google_protobuf_wrappers_pb.StringValue.toObject, includeInstance),
    config: (f = msg.getConfig()) && proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.toObject(includeInstance, f),
    callerVersionsList: jspb.Message.toObjectList(msg.getCallerVersionsList(),
    google_protobuf_wrappers_pb.StringValue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest}
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.LoadPluginRequest;
  return proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest}
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.addModuleNames(value);
      break;
    case 2:
      var value = new proto.io.contract_testing.contractcase.grpc.ContractCaseConfig;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
      break;
    case 3:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.addCallerVersions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getModuleNamesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.serializeBinaryToWriter
    );
  }
  f = message.getCallerVersionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * repeated google.protobuf.StringValue module_names = 1;
 * @return {!Array<!proto.google.protobuf.StringValue>}
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.getModuleNamesList = function() {
  return /** @type{!Array<!proto.google.protobuf.StringValue>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {!Array<!proto.google.protobuf.StringValue>} value
 * @return {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.setModuleNamesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.google.protobuf.StringValue=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.addModuleNames = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.google.protobuf.StringValue, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.clearModuleNamesList = function() {
  return this.setModuleNamesList([]);
};


/**
 * optional ContractCaseConfig config = 2;
 * @return {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig}
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.getConfig = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ContractCaseConfig, 2));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated google.protobuf.StringValue caller_versions = 3;
 * @return {!Array<!proto.google.protobuf.StringValue>}
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.getCallerVersionsList = function() {
  return /** @type{!Array<!proto.google.protobuf.StringValue>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_wrappers_pb.StringValue, 3));
};


/**
 * @param {!Array<!proto.google.protobuf.StringValue>} value
 * @return {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.setCallerVersionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.google.protobuf.StringValue=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.addCallerVersions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.google.protobuf.StringValue, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.prototype.clearCallerVersionsList = function() {
  return this.setCallerVersionsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    stateHandlerHandle: (f = msg.getStateHandlerHandle()) && proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest}
 */
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest;
  return proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest}
 */
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.contract_testing.contractcase.grpc.StateHandlerHandle;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.deserializeBinaryFromReader);
      msg.setStateHandlerHandle(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStateHandlerHandle();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.contract_testing.contractcase.grpc.StateHandlerHandle.serializeBinaryToWriter
    );
  }
};


/**
 * optional StateHandlerHandle state_handler_handle = 1;
 * @return {?proto.io.contract_testing.contractcase.grpc.StateHandlerHandle}
 */
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.prototype.getStateHandlerHandle = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.StateHandlerHandle} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.StateHandlerHandle, 1));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.StateHandlerHandle|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.prototype.setStateHandlerHandle = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.prototype.clearStateHandlerHandle = function() {
  return this.setStateHandlerHandle(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.prototype.hasStateHandlerHandle = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    triggerFunction: (f = msg.getTriggerFunction()) && proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.toObject(includeInstance, f),
    setup: (f = msg.getSetup()) && proto.io.contract_testing.contractcase.grpc.SetupInfo.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest;
  return proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.deserializeBinaryFromReader);
      msg.setTriggerFunction(value);
      break;
    case 3:
      var value = new proto.io.contract_testing.contractcase.grpc.SetupInfo;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.SetupInfo.deserializeBinaryFromReader);
      msg.setSetup(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTriggerFunction();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle.serializeBinaryToWriter
    );
  }
  f = message.getSetup();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.contract_testing.contractcase.grpc.SetupInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional TriggerFunctionHandle trigger_function = 1;
 * @return {?proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.prototype.getTriggerFunction = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle, 1));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.TriggerFunctionHandle|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.prototype.setTriggerFunction = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.prototype.clearTriggerFunction = function() {
  return this.setTriggerFunction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.prototype.hasTriggerFunction = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional SetupInfo setup = 3;
 * @return {?proto.io.contract_testing.contractcase.grpc.SetupInfo}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.prototype.getSetup = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.SetupInfo} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.SetupInfo, 3));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.SetupInfo|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.prototype.setSetup = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.prototype.clearSetup = function() {
  return this.setSetup(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.prototype.hasSetup = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.toObject = function(includeInstance, msg) {
  var f, obj = {
    handle: (f = msg.getHandle()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle}
 */
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle;
  return proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle}
 */
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setHandle(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHandle();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue handle = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.prototype.getHandle = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle} returns this
*/
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.prototype.setHandle = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle} returns this
 */
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.prototype.clearHandle = function() {
  return this.setHandle(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.prototype.hasHandle = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.SetupInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.SetupInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    stateVariablesMap: (f = msg.getStateVariablesMap()) ? f.toObject(includeInstance, proto.google.protobuf.StringValue.toObject) : [],
    mockMap: (f = msg.getMockMap()) ? f.toObject(includeInstance, proto.google.protobuf.StringValue.toObject) : [],
    functionsMap: (f = msg.getFunctionsMap()) ? f.toObject(includeInstance, proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.toObject) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.SetupInfo}
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.SetupInfo;
  return proto.io.contract_testing.contractcase.grpc.SetupInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.SetupInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.SetupInfo}
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = msg.getStateVariablesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.StringValue.deserializeBinaryFromReader, "", new proto.google.protobuf.StringValue());
         });
      break;
    case 2:
      var value = msg.getMockMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.StringValue.deserializeBinaryFromReader, "", new proto.google.protobuf.StringValue());
         });
      break;
    case 3:
      var value = msg.getFunctionsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.deserializeBinaryFromReader, "", new proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle());
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.SetupInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.SetupInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStateVariablesMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(1, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.StringValue.serializeBinaryToWriter);
  }
  f = message.getMockMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.StringValue.serializeBinaryToWriter);
  }
  f = message.getFunctionsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(3, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle.serializeBinaryToWriter);
  }
};


/**
 * map<string, google.protobuf.StringValue> state_variables = 1;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.StringValue>}
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.prototype.getStateVariablesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.StringValue>} */ (
      jspb.Message.getMapField(this, 1, opt_noLazyCreate,
      proto.google.protobuf.StringValue));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.SetupInfo} returns this
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.prototype.clearStateVariablesMap = function() {
  this.getStateVariablesMap().clear();
  return this;};


/**
 * map<string, google.protobuf.StringValue> mock = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.StringValue>}
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.prototype.getMockMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.StringValue>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      proto.google.protobuf.StringValue));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.SetupInfo} returns this
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.prototype.clearMockMap = function() {
  this.getMockMap().clear();
  return this;};


/**
 * map<string, CoreFunctionHandle> functions = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle>}
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.prototype.getFunctionsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle>} */ (
      jspb.Message.getMapField(this, 3, opt_noLazyCreate,
      proto.io.contract_testing.contractcase.grpc.CoreFunctionHandle));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.SetupInfo} returns this
 */
proto.io.contract_testing.contractcase.grpc.SetupInfo.prototype.clearFunctionsMap = function() {
  this.getFunctionsMap().clear();
  return this;};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.LogRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.LogRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    level: (f = msg.getLevel()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    timestamp: (f = msg.getTimestamp()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    version: (f = msg.getVersion()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    typeString: (f = msg.getTypeString()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    location: (f = msg.getLocation()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    message: (f = msg.getMessage()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    additional: (f = msg.getAdditional()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.LogRequest;
  return proto.io.contract_testing.contractcase.grpc.LogRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.LogRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setLevel(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setTimestamp(value);
      break;
    case 3:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setVersion(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setTypeString(value);
      break;
    case 5:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setLocation(value);
      break;
    case 6:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setMessage(value);
      break;
    case 7:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setAdditional(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.LogRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.LogRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLevel();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getTimestamp();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getVersion();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getTypeString();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getLocation();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getAdditional();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue level = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.getLevel = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.setLevel = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.clearLevel = function() {
  return this.setLevel(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.hasLevel = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.StringValue timestamp = 2;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.getTimestamp = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.setTimestamp = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.clearTimestamp = function() {
  return this.setTimestamp(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.hasTimestamp = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.StringValue version = 3;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.getVersion = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 3));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.setVersion = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.clearVersion = function() {
  return this.setVersion(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.hasVersion = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.StringValue type_string = 4;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.getTypeString = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 4));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.setTypeString = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.clearTypeString = function() {
  return this.setTypeString(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.hasTypeString = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.StringValue location = 5;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.getLocation = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 5));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.setLocation = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.clearLocation = function() {
  return this.setLocation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.hasLocation = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional google.protobuf.StringValue message = 6;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.getMessage = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 6));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.setMessage = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.clearMessage = function() {
  return this.setMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.hasMessage = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional google.protobuf.StringValue additional = 7;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.getAdditional = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 7));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.setAdditional = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.LogRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.clearAdditional = function() {
  return this.setAdditional(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.LogRequest.prototype.hasAdditional = function() {
  return jspb.Message.getField(this, 7) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    kind: (f = msg.getKind()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    message: (f = msg.getMessage()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    location: (f = msg.getLocation()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    locationTag: (f = msg.getLocationTag()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    errorTypeTag: (f = msg.getErrorTypeTag()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    expected: (f = msg.getExpected()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    actual: (f = msg.getActual()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest;
  return proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setKind(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setMessage(value);
      break;
    case 3:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setLocation(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setLocationTag(value);
      break;
    case 5:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setErrorTypeTag(value);
      break;
    case 6:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setExpected(value);
      break;
    case 7:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setActual(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKind();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getLocation();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getLocationTag();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getErrorTypeTag();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getExpected();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getActual();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue kind = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.getKind = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.setKind = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.clearKind = function() {
  return this.setKind(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.hasKind = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.StringValue message = 2;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.getMessage = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.setMessage = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.clearMessage = function() {
  return this.setMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.hasMessage = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.StringValue location = 3;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.getLocation = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 3));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.setLocation = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.clearLocation = function() {
  return this.setLocation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.hasLocation = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.StringValue location_tag = 4;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.getLocationTag = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 4));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.setLocationTag = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.clearLocationTag = function() {
  return this.setLocationTag(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.hasLocationTag = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.StringValue error_type_tag = 5;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.getErrorTypeTag = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 5));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.setErrorTypeTag = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.clearErrorTypeTag = function() {
  return this.setErrorTypeTag(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.hasErrorTypeTag = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional google.protobuf.StringValue expected = 6;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.getExpected = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 6));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.setExpected = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.clearExpected = function() {
  return this.setExpected(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.hasExpected = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional google.protobuf.StringValue actual = 7;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.getActual = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 7));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.setActual = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.clearActual = function() {
  return this.setActual(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.prototype.hasActual = function() {
  return jspb.Message.getField(this, 7) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    kind: (f = msg.getKind()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    message: (f = msg.getMessage()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    location: (f = msg.getLocation()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    locationTag: (f = msg.getLocationTag()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    errorTypeTag: (f = msg.getErrorTypeTag()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest;
  return proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setKind(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setMessage(value);
      break;
    case 3:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setLocation(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setLocationTag(value);
      break;
    case 5:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setErrorTypeTag(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKind();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getLocation();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getLocationTag();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getErrorTypeTag();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue kind = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.getKind = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.setKind = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.clearKind = function() {
  return this.setKind(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.hasKind = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.StringValue message = 2;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.getMessage = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.setMessage = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.clearMessage = function() {
  return this.setMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.hasMessage = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.StringValue location = 3;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.getLocation = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 3));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.setLocation = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.clearLocation = function() {
  return this.setLocation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.hasLocation = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.StringValue location_tag = 4;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.getLocationTag = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 4));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.setLocationTag = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.clearLocationTag = function() {
  return this.setLocationTag(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.hasLocationTag = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.StringValue error_type_tag = 5;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.getErrorTypeTag = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 5));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.setErrorTypeTag = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.clearErrorTypeTag = function() {
  return this.setErrorTypeTag(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.prototype.hasErrorTypeTag = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    kind: (f = msg.getKind()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    icon: (f = msg.getIcon()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    title: (f = msg.getTitle()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    additionalText: (f = msg.getAdditionalText()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest;
  return proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setKind(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setIcon(value);
      break;
    case 3:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setTitle(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setAdditionalText(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKind();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getIcon();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getTitle();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getAdditionalText();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue kind = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.getKind = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.setKind = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.clearKind = function() {
  return this.setKind(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.hasKind = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.StringValue icon = 2;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.getIcon = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.setIcon = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.clearIcon = function() {
  return this.setIcon(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.hasIcon = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.StringValue title = 3;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.getTitle = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 3));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.setTitle = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.clearTitle = function() {
  return this.setTitle(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.hasTitle = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.StringValue additional_text = 4;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.getAdditionalText = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 4));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.setAdditionalText = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.clearAdditionalText = function() {
  return this.setAdditionalText(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.prototype.hasAdditionalText = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.ResultResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.ResultResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ResultResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    result: (f = msg.getResult()) && proto.io.contract_testing.contractcase.grpc.BoundaryResult.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultResponse}
 */
proto.io.contract_testing.contractcase.grpc.ResultResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.ResultResponse;
  return proto.io.contract_testing.contractcase.grpc.ResultResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultResponse}
 */
proto.io.contract_testing.contractcase.grpc.ResultResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.contract_testing.contractcase.grpc.BoundaryResult;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.BoundaryResult.deserializeBinaryFromReader);
      msg.setResult(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.ResultResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.ResultResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.ResultResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ResultResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResult();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.contract_testing.contractcase.grpc.BoundaryResult.serializeBinaryToWriter
    );
  }
};


/**
 * optional BoundaryResult result = 1;
 * @return {?proto.io.contract_testing.contractcase.grpc.BoundaryResult}
 */
proto.io.contract_testing.contractcase.grpc.ResultResponse.prototype.getResult = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.BoundaryResult} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.BoundaryResult, 1));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.BoundaryResult|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultResponse} returns this
*/
proto.io.contract_testing.contractcase.grpc.ResultResponse.prototype.setResult = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ResultResponse} returns this
 */
proto.io.contract_testing.contractcase.grpc.ResultResponse.prototype.clearResult = function() {
  return this.setResult(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ResultResponse.prototype.hasResult = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.toObject(includeInstance, f),
    callerVersionsList: jspb.Message.toObjectList(msg.getCallerVersionsList(),
    google_protobuf_wrappers_pb.StringValue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest}
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest;
  return proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest}
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.contract_testing.contractcase.grpc.ContractCaseConfig;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.addCallerVersions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.serializeBinaryToWriter
    );
  }
  f = message.getCallerVersionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional ContractCaseConfig config = 1;
 * @return {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig}
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.prototype.getConfig = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ContractCaseConfig, 1));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated google.protobuf.StringValue caller_versions = 4;
 * @return {!Array<!proto.google.protobuf.StringValue>}
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.prototype.getCallerVersionsList = function() {
  return /** @type{!Array<!proto.google.protobuf.StringValue>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_wrappers_pb.StringValue, 4));
};


/**
 * @param {!Array<!proto.google.protobuf.StringValue>} value
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.prototype.setCallerVersionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.google.protobuf.StringValue=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.prototype.addCallerVersions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.google.protobuf.StringValue, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.prototype.clearCallerVersionsList = function() {
  return this.setCallerVersionsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions}
 */
proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions;
  return proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions}
 */
proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.PreparedTestHandle} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.toObject = function(includeInstance, msg) {
  var f, obj = {
    contractIndex: jspb.Message.getFieldWithDefault(msg, 2, 0),
    testIndex: jspb.Message.getFieldWithDefault(msg, 3, 0),
    testName: (f = msg.getTestName()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.PreparedTestHandle}
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.PreparedTestHandle;
  return proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.PreparedTestHandle} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.PreparedTestHandle}
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setContractIndex(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTestIndex(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setTestName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.PreparedTestHandle} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContractIndex();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getTestIndex();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getTestName();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 contract_index = 2;
 * @return {number}
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.prototype.getContractIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PreparedTestHandle} returns this
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.prototype.setContractIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 test_index = 3;
 * @return {number}
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.prototype.getTestIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PreparedTestHandle} returns this
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.prototype.setTestIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional google.protobuf.StringValue test_name = 4;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.prototype.getTestName = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 4));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PreparedTestHandle} returns this
*/
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.prototype.setTestName = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PreparedTestHandle} returns this
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.prototype.clearTestName = function() {
  return this.setTestName(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.prototype.hasTestName = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.TestCase = {
  TEST_NOT_SET: 0,
  INVOKER_ID: 1,
  PREPARED_TEST_HANDLE: 2
};

/**
 * @return {proto.io.contract_testing.contractcase.grpc.InvokeTest.TestCase}
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.getTestCase = function() {
  return /** @type {proto.io.contract_testing.contractcase.grpc.InvokeTest.TestCase} */(jspb.Message.computeOneofCase(this, proto.io.contract_testing.contractcase.grpc.InvokeTest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.InvokeTest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.InvokeTest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.toObject = function(includeInstance, msg) {
  var f, obj = {
    invokerId: (f = msg.getInvokerId()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    preparedTestHandle: (f = msg.getPreparedTestHandle()) && proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeTest}
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.InvokeTest;
  return proto.io.contract_testing.contractcase.grpc.InvokeTest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.InvokeTest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeTest}
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setInvokerId(value);
      break;
    case 2:
      var value = new proto.io.contract_testing.contractcase.grpc.PreparedTestHandle;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.deserializeBinaryFromReader);
      msg.setPreparedTestHandle(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.InvokeTest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.InvokeTest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInvokerId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getPreparedTestHandle();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.contract_testing.contractcase.grpc.PreparedTestHandle.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue invoker_id = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.getInvokerId = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeTest} returns this
*/
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.setInvokerId = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.io.contract_testing.contractcase.grpc.InvokeTest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeTest} returns this
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.clearInvokerId = function() {
  return this.setInvokerId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.hasInvokerId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional PreparedTestHandle prepared_test_handle = 2;
 * @return {?proto.io.contract_testing.contractcase.grpc.PreparedTestHandle}
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.getPreparedTestHandle = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.PreparedTestHandle} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.PreparedTestHandle, 2));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.PreparedTestHandle|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeTest} returns this
*/
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.setPreparedTestHandle = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.io.contract_testing.contractcase.grpc.InvokeTest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeTest} returns this
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.clearPreparedTestHandle = function() {
  return this.setPreparedTestHandle(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.InvokeTest.prototype.hasPreparedTestHandle = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.RegisterFunction.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.RegisterFunction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.RegisterFunction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.RegisterFunction.toObject = function(includeInstance, msg) {
  var f, obj = {
    handle: (f = msg.getHandle()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.RegisterFunction}
 */
proto.io.contract_testing.contractcase.grpc.RegisterFunction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.RegisterFunction;
  return proto.io.contract_testing.contractcase.grpc.RegisterFunction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.RegisterFunction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.RegisterFunction}
 */
proto.io.contract_testing.contractcase.grpc.RegisterFunction.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setHandle(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.RegisterFunction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.RegisterFunction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.RegisterFunction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.RegisterFunction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHandle();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue handle = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.RegisterFunction.prototype.getHandle = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.RegisterFunction} returns this
*/
proto.io.contract_testing.contractcase.grpc.RegisterFunction.prototype.setHandle = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.RegisterFunction} returns this
 */
proto.io.contract_testing.contractcase.grpc.RegisterFunction.prototype.clearHandle = function() {
  return this.setHandle(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.RegisterFunction.prototype.hasHandle = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.InvokeFunction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.InvokeFunction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.toObject = function(includeInstance, msg) {
  var f, obj = {
    handle: (f = msg.getHandle()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    argumentsList: jspb.Message.toObjectList(msg.getArgumentsList(),
    google_protobuf_wrappers_pb.StringValue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeFunction}
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.InvokeFunction;
  return proto.io.contract_testing.contractcase.grpc.InvokeFunction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.InvokeFunction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeFunction}
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setHandle(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.addArguments(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.InvokeFunction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.InvokeFunction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHandle();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getArgumentsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue handle = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.prototype.getHandle = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeFunction} returns this
*/
proto.io.contract_testing.contractcase.grpc.InvokeFunction.prototype.setHandle = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeFunction} returns this
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.prototype.clearHandle = function() {
  return this.setHandle(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.prototype.hasHandle = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated google.protobuf.StringValue arguments = 2;
 * @return {!Array<!proto.google.protobuf.StringValue>}
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.prototype.getArgumentsList = function() {
  return /** @type{!Array<!proto.google.protobuf.StringValue>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {!Array<!proto.google.protobuf.StringValue>} value
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeFunction} returns this
*/
proto.io.contract_testing.contractcase.grpc.InvokeFunction.prototype.setArgumentsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.google.protobuf.StringValue=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.prototype.addArguments = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.google.protobuf.StringValue, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.io.contract_testing.contractcase.grpc.InvokeFunction} returns this
 */
proto.io.contract_testing.contractcase.grpc.InvokeFunction.prototype.clearArgumentsList = function() {
  return this.setArgumentsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests}
 */
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests;
  return proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests}
 */
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.contract_testing.contractcase.grpc.ContractCaseConfig;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.contract_testing.contractcase.grpc.ContractCaseConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional ContractCaseConfig config = 1;
 * @return {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig}
 */
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.prototype.getConfig = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ContractCaseConfig, 1));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ContractCaseConfig|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests} returns this
*/
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests} returns this
 */
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_ = [[2,3,4,5,6,7,8,9,11]];

/**
 * @enum {number}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.KindCase = {
  KIND_NOT_SET: 0,
  BEGIN_DEFINITION: 2,
  RUN_INTERACTION: 3,
  RUN_REJECTING_INTERACTION: 4,
  STRIP_MATCHERS: 5,
  END_DEFINITION: 6,
  RESULT_RESPONSE: 7,
  LOAD_PLUGIN: 8,
  REGISTER_FUNCTION: 9,
  INVOKE_FUNCTION: 11
};

/**
 * @return {proto.io.contract_testing.contractcase.grpc.DefinitionRequest.KindCase}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getKindCase = function() {
  return /** @type {proto.io.contract_testing.contractcase.grpc.DefinitionRequest.KindCase} */(jspb.Message.computeOneofCase(this, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.DefinitionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: (f = msg.getId()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    beginDefinition: (f = msg.getBeginDefinition()) && proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.toObject(includeInstance, f),
    runInteraction: (f = msg.getRunInteraction()) && proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.toObject(includeInstance, f),
    runRejectingInteraction: (f = msg.getRunRejectingInteraction()) && proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.toObject(includeInstance, f),
    stripMatchers: (f = msg.getStripMatchers()) && proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.toObject(includeInstance, f),
    endDefinition: (f = msg.getEndDefinition()) && proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.toObject(includeInstance, f),
    resultResponse: (f = msg.getResultResponse()) && proto.io.contract_testing.contractcase.grpc.ResultResponse.toObject(includeInstance, f),
    loadPlugin: (f = msg.getLoadPlugin()) && proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.toObject(includeInstance, f),
    registerFunction: (f = msg.getRegisterFunction()) && proto.io.contract_testing.contractcase.grpc.RegisterFunction.toObject(includeInstance, f),
    invokeFunction: (f = msg.getInvokeFunction()) && proto.io.contract_testing.contractcase.grpc.InvokeFunction.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.DefinitionRequest;
  return proto.io.contract_testing.contractcase.grpc.DefinitionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setId(value);
      break;
    case 2:
      var value = new proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.deserializeBinaryFromReader);
      msg.setBeginDefinition(value);
      break;
    case 3:
      var value = new proto.io.contract_testing.contractcase.grpc.RunInteractionRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.deserializeBinaryFromReader);
      msg.setRunInteraction(value);
      break;
    case 4:
      var value = new proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.deserializeBinaryFromReader);
      msg.setRunRejectingInteraction(value);
      break;
    case 5:
      var value = new proto.io.contract_testing.contractcase.grpc.StripMatchersRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.deserializeBinaryFromReader);
      msg.setStripMatchers(value);
      break;
    case 6:
      var value = new proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.deserializeBinaryFromReader);
      msg.setEndDefinition(value);
      break;
    case 7:
      var value = new proto.io.contract_testing.contractcase.grpc.ResultResponse;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ResultResponse.deserializeBinaryFromReader);
      msg.setResultResponse(value);
      break;
    case 8:
      var value = new proto.io.contract_testing.contractcase.grpc.LoadPluginRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.deserializeBinaryFromReader);
      msg.setLoadPlugin(value);
      break;
    case 9:
      var value = new proto.io.contract_testing.contractcase.grpc.RegisterFunction;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.RegisterFunction.deserializeBinaryFromReader);
      msg.setRegisterFunction(value);
      break;
    case 11:
      var value = new proto.io.contract_testing.contractcase.grpc.InvokeFunction;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.InvokeFunction.deserializeBinaryFromReader);
      msg.setInvokeFunction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.DefinitionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getBeginDefinition();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest.serializeBinaryToWriter
    );
  }
  f = message.getRunInteraction();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.contract_testing.contractcase.grpc.RunInteractionRequest.serializeBinaryToWriter
    );
  }
  f = message.getRunRejectingInteraction();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest.serializeBinaryToWriter
    );
  }
  f = message.getStripMatchers();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.io.contract_testing.contractcase.grpc.StripMatchersRequest.serializeBinaryToWriter
    );
  }
  f = message.getEndDefinition();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest.serializeBinaryToWriter
    );
  }
  f = message.getResultResponse();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.io.contract_testing.contractcase.grpc.ResultResponse.serializeBinaryToWriter
    );
  }
  f = message.getLoadPlugin();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.serializeBinaryToWriter
    );
  }
  f = message.getRegisterFunction();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.io.contract_testing.contractcase.grpc.RegisterFunction.serializeBinaryToWriter
    );
  }
  f = message.getInvokeFunction();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.io.contract_testing.contractcase.grpc.InvokeFunction.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue id = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getId = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.setId = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.clearId = function() {
  return this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional BeginDefinitionRequest begin_definition = 2;
 * @return {?proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getBeginDefinition = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest, 2));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.BeginDefinitionRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.setBeginDefinition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.clearBeginDefinition = function() {
  return this.setBeginDefinition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.hasBeginDefinition = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional RunInteractionRequest run_interaction = 3;
 * @return {?proto.io.contract_testing.contractcase.grpc.RunInteractionRequest}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getRunInteraction = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.RunInteractionRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.RunInteractionRequest, 3));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.RunInteractionRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.setRunInteraction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.clearRunInteraction = function() {
  return this.setRunInteraction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.hasRunInteraction = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional RunRejectingInteractionRequest run_rejecting_interaction = 4;
 * @return {?proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getRunRejectingInteraction = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest, 4));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.RunRejectingInteractionRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.setRunRejectingInteraction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.clearRunRejectingInteraction = function() {
  return this.setRunRejectingInteraction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.hasRunRejectingInteraction = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional StripMatchersRequest strip_matchers = 5;
 * @return {?proto.io.contract_testing.contractcase.grpc.StripMatchersRequest}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getStripMatchers = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.StripMatchersRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.StripMatchersRequest, 5));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.StripMatchersRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.setStripMatchers = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.clearStripMatchers = function() {
  return this.setStripMatchers(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.hasStripMatchers = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional EndDefinitionRequest end_definition = 6;
 * @return {?proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getEndDefinition = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest, 6));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.EndDefinitionRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.setEndDefinition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.clearEndDefinition = function() {
  return this.setEndDefinition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.hasEndDefinition = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional ResultResponse result_response = 7;
 * @return {?proto.io.contract_testing.contractcase.grpc.ResultResponse}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getResultResponse = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ResultResponse} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ResultResponse, 7));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ResultResponse|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.setResultResponse = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.clearResultResponse = function() {
  return this.setResultResponse(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.hasResultResponse = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional LoadPluginRequest load_plugin = 8;
 * @return {?proto.io.contract_testing.contractcase.grpc.LoadPluginRequest}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getLoadPlugin = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.LoadPluginRequest, 8));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.LoadPluginRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.setLoadPlugin = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.clearLoadPlugin = function() {
  return this.setLoadPlugin(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.hasLoadPlugin = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional RegisterFunction register_function = 9;
 * @return {?proto.io.contract_testing.contractcase.grpc.RegisterFunction}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getRegisterFunction = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.RegisterFunction} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.RegisterFunction, 9));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.RegisterFunction|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.setRegisterFunction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 9, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.clearRegisterFunction = function() {
  return this.setRegisterFunction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.hasRegisterFunction = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional InvokeFunction invoke_function = 11;
 * @return {?proto.io.contract_testing.contractcase.grpc.InvokeFunction}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.getInvokeFunction = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.InvokeFunction} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.InvokeFunction, 11));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.InvokeFunction|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.setInvokeFunction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.io.contract_testing.contractcase.grpc.DefinitionRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.DefinitionRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.clearInvokeFunction = function() {
  return this.setInvokeFunction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.DefinitionRequest.prototype.hasInvokeFunction = function() {
  return jspb.Message.getField(this, 11) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_ = [[2,3,5,6,9,10,11,12]];

/**
 * @enum {number}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.KindCase = {
  KIND_NOT_SET: 0,
  BEGIN_VERIFICATION: 2,
  AVAILABLE_CONTRACT_DEFINITIONS: 3,
  RESULT_RESPONSE: 5,
  LOAD_PLUGIN: 6,
  INVOKE_TEST: 9,
  REGISTER_FUNCTION: 10,
  INVOKE_FUNCTION: 11,
  PREPARE_VERIFICATION_TESTS: 12
};

/**
 * @return {proto.io.contract_testing.contractcase.grpc.VerificationRequest.KindCase}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.getKindCase = function() {
  return /** @type {proto.io.contract_testing.contractcase.grpc.VerificationRequest.KindCase} */(jspb.Message.computeOneofCase(this, proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.VerificationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: (f = msg.getId()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    beginVerification: (f = msg.getBeginVerification()) && proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.toObject(includeInstance, f),
    availableContractDefinitions: (f = msg.getAvailableContractDefinitions()) && proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.toObject(includeInstance, f),
    resultResponse: (f = msg.getResultResponse()) && proto.io.contract_testing.contractcase.grpc.ResultResponse.toObject(includeInstance, f),
    loadPlugin: (f = msg.getLoadPlugin()) && proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.toObject(includeInstance, f),
    invokeTest: (f = msg.getInvokeTest()) && proto.io.contract_testing.contractcase.grpc.InvokeTest.toObject(includeInstance, f),
    registerFunction: (f = msg.getRegisterFunction()) && proto.io.contract_testing.contractcase.grpc.RegisterFunction.toObject(includeInstance, f),
    invokeFunction: (f = msg.getInvokeFunction()) && proto.io.contract_testing.contractcase.grpc.InvokeFunction.toObject(includeInstance, f),
    prepareVerificationTests: (f = msg.getPrepareVerificationTests()) && proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.VerificationRequest;
  return proto.io.contract_testing.contractcase.grpc.VerificationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setId(value);
      break;
    case 2:
      var value = new proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.deserializeBinaryFromReader);
      msg.setBeginVerification(value);
      break;
    case 3:
      var value = new proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.deserializeBinaryFromReader);
      msg.setAvailableContractDefinitions(value);
      break;
    case 5:
      var value = new proto.io.contract_testing.contractcase.grpc.ResultResponse;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ResultResponse.deserializeBinaryFromReader);
      msg.setResultResponse(value);
      break;
    case 6:
      var value = new proto.io.contract_testing.contractcase.grpc.LoadPluginRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.deserializeBinaryFromReader);
      msg.setLoadPlugin(value);
      break;
    case 9:
      var value = new proto.io.contract_testing.contractcase.grpc.InvokeTest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.InvokeTest.deserializeBinaryFromReader);
      msg.setInvokeTest(value);
      break;
    case 10:
      var value = new proto.io.contract_testing.contractcase.grpc.RegisterFunction;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.RegisterFunction.deserializeBinaryFromReader);
      msg.setRegisterFunction(value);
      break;
    case 11:
      var value = new proto.io.contract_testing.contractcase.grpc.InvokeFunction;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.InvokeFunction.deserializeBinaryFromReader);
      msg.setInvokeFunction(value);
      break;
    case 12:
      var value = new proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.deserializeBinaryFromReader);
      msg.setPrepareVerificationTests(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.VerificationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getBeginVerification();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest.serializeBinaryToWriter
    );
  }
  f = message.getAvailableContractDefinitions();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions.serializeBinaryToWriter
    );
  }
  f = message.getResultResponse();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.io.contract_testing.contractcase.grpc.ResultResponse.serializeBinaryToWriter
    );
  }
  f = message.getLoadPlugin();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.io.contract_testing.contractcase.grpc.LoadPluginRequest.serializeBinaryToWriter
    );
  }
  f = message.getInvokeTest();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.io.contract_testing.contractcase.grpc.InvokeTest.serializeBinaryToWriter
    );
  }
  f = message.getRegisterFunction();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.io.contract_testing.contractcase.grpc.RegisterFunction.serializeBinaryToWriter
    );
  }
  f = message.getInvokeFunction();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.io.contract_testing.contractcase.grpc.InvokeFunction.serializeBinaryToWriter
    );
  }
  f = message.getPrepareVerificationTests();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue id = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.getId = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.setId = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.clearId = function() {
  return this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional BeginVerificationRequest begin_verification = 2;
 * @return {?proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.getBeginVerification = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest, 2));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.BeginVerificationRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.setBeginVerification = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.clearBeginVerification = function() {
  return this.setBeginVerification(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.hasBeginVerification = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional AvailableContractDefinitions available_contract_definitions = 3;
 * @return {?proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.getAvailableContractDefinitions = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions, 3));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.AvailableContractDefinitions|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.setAvailableContractDefinitions = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.clearAvailableContractDefinitions = function() {
  return this.setAvailableContractDefinitions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.hasAvailableContractDefinitions = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional ResultResponse result_response = 5;
 * @return {?proto.io.contract_testing.contractcase.grpc.ResultResponse}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.getResultResponse = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ResultResponse} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ResultResponse, 5));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ResultResponse|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.setResultResponse = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.clearResultResponse = function() {
  return this.setResultResponse(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.hasResultResponse = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional LoadPluginRequest load_plugin = 6;
 * @return {?proto.io.contract_testing.contractcase.grpc.LoadPluginRequest}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.getLoadPlugin = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.LoadPluginRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.LoadPluginRequest, 6));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.LoadPluginRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.setLoadPlugin = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.clearLoadPlugin = function() {
  return this.setLoadPlugin(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.hasLoadPlugin = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional InvokeTest invoke_test = 9;
 * @return {?proto.io.contract_testing.contractcase.grpc.InvokeTest}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.getInvokeTest = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.InvokeTest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.InvokeTest, 9));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.InvokeTest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.setInvokeTest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 9, proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.clearInvokeTest = function() {
  return this.setInvokeTest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.hasInvokeTest = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional RegisterFunction register_function = 10;
 * @return {?proto.io.contract_testing.contractcase.grpc.RegisterFunction}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.getRegisterFunction = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.RegisterFunction} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.RegisterFunction, 10));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.RegisterFunction|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.setRegisterFunction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.clearRegisterFunction = function() {
  return this.setRegisterFunction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.hasRegisterFunction = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional InvokeFunction invoke_function = 11;
 * @return {?proto.io.contract_testing.contractcase.grpc.InvokeFunction}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.getInvokeFunction = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.InvokeFunction} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.InvokeFunction, 11));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.InvokeFunction|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.setInvokeFunction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.clearInvokeFunction = function() {
  return this.setInvokeFunction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.hasInvokeFunction = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional PrepareVerificationTests prepare_verification_tests = 12;
 * @return {?proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.getPrepareVerificationTests = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests, 12));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.PrepareVerificationTests|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
*/
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.setPrepareVerificationTests = function(value) {
  return jspb.Message.setOneofWrapperField(this, 12, proto.io.contract_testing.contractcase.grpc.VerificationRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.VerificationRequest} returns this
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.clearPrepareVerificationTests = function() {
  return this.setPrepareVerificationTests(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.VerificationRequest.prototype.hasPrepareVerificationTests = function() {
  return jspb.Message.getField(this, 12) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_ = [[2,3,4,5,6,7,8,10]];

/**
 * @enum {number}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.KindCase = {
  KIND_NOT_SET: 0,
  RUN_STATE_HANDLER: 2,
  LOG_REQUEST: 3,
  PRINT_MATCH_ERROR_REQUEST: 4,
  PRINT_MESSAGE_ERROR_REQUEST: 5,
  PRINT_TEST_TITLE_REQUEST: 6,
  TRIGGER_FUNCTION_REQUEST: 7,
  RESULT_RESPONSE: 8,
  INVOKE_FUNCTION: 10
};

/**
 * @return {proto.io.contract_testing.contractcase.grpc.ContractResponse.KindCase}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.getKindCase = function() {
  return /** @type {proto.io.contract_testing.contractcase.grpc.ContractResponse.KindCase} */(jspb.Message.computeOneofCase(this, proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.io.contract_testing.contractcase.grpc.ContractResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.contract_testing.contractcase.grpc.ContractResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: (f = msg.getId()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    runStateHandler: (f = msg.getRunStateHandler()) && proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.toObject(includeInstance, f),
    logRequest: (f = msg.getLogRequest()) && proto.io.contract_testing.contractcase.grpc.LogRequest.toObject(includeInstance, f),
    printMatchErrorRequest: (f = msg.getPrintMatchErrorRequest()) && proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.toObject(includeInstance, f),
    printMessageErrorRequest: (f = msg.getPrintMessageErrorRequest()) && proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.toObject(includeInstance, f),
    printTestTitleRequest: (f = msg.getPrintTestTitleRequest()) && proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.toObject(includeInstance, f),
    triggerFunctionRequest: (f = msg.getTriggerFunctionRequest()) && proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.toObject(includeInstance, f),
    resultResponse: (f = msg.getResultResponse()) && proto.io.contract_testing.contractcase.grpc.ResultResponse.toObject(includeInstance, f),
    invokeFunction: (f = msg.getInvokeFunction()) && proto.io.contract_testing.contractcase.grpc.InvokeFunction.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.contract_testing.contractcase.grpc.ContractResponse;
  return proto.io.contract_testing.contractcase.grpc.ContractResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.contract_testing.contractcase.grpc.ContractResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setId(value);
      break;
    case 2:
      var value = new proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.deserializeBinaryFromReader);
      msg.setRunStateHandler(value);
      break;
    case 3:
      var value = new proto.io.contract_testing.contractcase.grpc.LogRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.LogRequest.deserializeBinaryFromReader);
      msg.setLogRequest(value);
      break;
    case 4:
      var value = new proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.deserializeBinaryFromReader);
      msg.setPrintMatchErrorRequest(value);
      break;
    case 5:
      var value = new proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.deserializeBinaryFromReader);
      msg.setPrintMessageErrorRequest(value);
      break;
    case 6:
      var value = new proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.deserializeBinaryFromReader);
      msg.setPrintTestTitleRequest(value);
      break;
    case 7:
      var value = new proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.deserializeBinaryFromReader);
      msg.setTriggerFunctionRequest(value);
      break;
    case 8:
      var value = new proto.io.contract_testing.contractcase.grpc.ResultResponse;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.ResultResponse.deserializeBinaryFromReader);
      msg.setResultResponse(value);
      break;
    case 10:
      var value = new proto.io.contract_testing.contractcase.grpc.InvokeFunction;
      reader.readMessage(value,proto.io.contract_testing.contractcase.grpc.InvokeFunction.deserializeBinaryFromReader);
      msg.setInvokeFunction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.io.contract_testing.contractcase.grpc.ContractResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.io.contract_testing.contractcase.grpc.ContractResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getRunStateHandler();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest.serializeBinaryToWriter
    );
  }
  f = message.getLogRequest();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.contract_testing.contractcase.grpc.LogRequest.serializeBinaryToWriter
    );
  }
  f = message.getPrintMatchErrorRequest();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest.serializeBinaryToWriter
    );
  }
  f = message.getPrintMessageErrorRequest();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest.serializeBinaryToWriter
    );
  }
  f = message.getPrintTestTitleRequest();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest.serializeBinaryToWriter
    );
  }
  f = message.getTriggerFunctionRequest();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest.serializeBinaryToWriter
    );
  }
  f = message.getResultResponse();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.io.contract_testing.contractcase.grpc.ResultResponse.serializeBinaryToWriter
    );
  }
  f = message.getInvokeFunction();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.io.contract_testing.contractcase.grpc.InvokeFunction.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue id = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.getId = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.setId = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.clearId = function() {
  return this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional RunStateHandlerRequest run_state_handler = 2;
 * @return {?proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.getRunStateHandler = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest, 2));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.RunStateHandlerRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.setRunStateHandler = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.clearRunStateHandler = function() {
  return this.setRunStateHandler(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.hasRunStateHandler = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional LogRequest log_request = 3;
 * @return {?proto.io.contract_testing.contractcase.grpc.LogRequest}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.getLogRequest = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.LogRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.LogRequest, 3));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.LogRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.setLogRequest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.clearLogRequest = function() {
  return this.setLogRequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.hasLogRequest = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional PrintMatchErrorRequest print_match_error_request = 4;
 * @return {?proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.getPrintMatchErrorRequest = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest, 4));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.PrintMatchErrorRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.setPrintMatchErrorRequest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.clearPrintMatchErrorRequest = function() {
  return this.setPrintMatchErrorRequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.hasPrintMatchErrorRequest = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional PrintMessageErrorRequest print_message_error_request = 5;
 * @return {?proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.getPrintMessageErrorRequest = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest, 5));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.PrintMessageErrorRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.setPrintMessageErrorRequest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.clearPrintMessageErrorRequest = function() {
  return this.setPrintMessageErrorRequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.hasPrintMessageErrorRequest = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional PrintTestTitleRequest print_test_title_request = 6;
 * @return {?proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.getPrintTestTitleRequest = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest, 6));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.PrintTestTitleRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.setPrintTestTitleRequest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.clearPrintTestTitleRequest = function() {
  return this.setPrintTestTitleRequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.hasPrintTestTitleRequest = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional TriggerFunctionRequest trigger_function_request = 7;
 * @return {?proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.getTriggerFunctionRequest = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest, 7));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.TriggerFunctionRequest|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.setTriggerFunctionRequest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.clearTriggerFunctionRequest = function() {
  return this.setTriggerFunctionRequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.hasTriggerFunctionRequest = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional ResultResponse result_response = 8;
 * @return {?proto.io.contract_testing.contractcase.grpc.ResultResponse}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.getResultResponse = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.ResultResponse} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.ResultResponse, 8));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.ResultResponse|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.setResultResponse = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.clearResultResponse = function() {
  return this.setResultResponse(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.hasResultResponse = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional InvokeFunction invoke_function = 10;
 * @return {?proto.io.contract_testing.contractcase.grpc.InvokeFunction}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.getInvokeFunction = function() {
  return /** @type{?proto.io.contract_testing.contractcase.grpc.InvokeFunction} */ (
    jspb.Message.getWrapperField(this, proto.io.contract_testing.contractcase.grpc.InvokeFunction, 10));
};


/**
 * @param {?proto.io.contract_testing.contractcase.grpc.InvokeFunction|undefined} value
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
*/
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.setInvokeFunction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.io.contract_testing.contractcase.grpc.ContractResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.io.contract_testing.contractcase.grpc.ContractResponse} returns this
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.clearInvokeFunction = function() {
  return this.setInvokeFunction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.io.contract_testing.contractcase.grpc.ContractResponse.prototype.hasInvokeFunction = function() {
  return jspb.Message.getField(this, 10) != null;
};


goog.object.extend(exports, proto.io.contract_testing.contractcase.grpc);
