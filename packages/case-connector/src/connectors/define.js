"use strict";
/**
 * Begin define
 *   - Begin define
 *      - Config
 *          - Statehandlers need to be callbacks
 *          - triggerAndTest needs to be a callback
 *      - LogPrinter is a callback
 *      - resultPrinter is a callback
 *      - Parent Versions
 *      - Returns ID
 *   - runExample
 *      Define ID
 *      json definition
 *      and config
 *   - runRejectingExample
 *      Define ID
 *      json definition
 *      and config
 *   - endRecord
 *      Define ID
 *      invalidates ID
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endRecord = exports.runRejectingExample = exports.runExample = exports.beginDefinition = void 0;
var uuid_1 = require("uuid");
var case_boundary_1 = require("@contract-case/case-boundary");
var versionString_1 = require("../versionString");
var ENDED_DEFINER = 'CLOSED';
var DEFINING_CONTRACTS = {};
var mapConfig = function (config, testRunId) { return (__assign(__assign({}, config), { testRunId: testRunId })); };
var beginDefinition = function (config, callbackPrinter, resultPrinter, callerVersions) {
    var id = (0, uuid_1.v4)();
    var definer = {
        id: id,
        definer: new case_boundary_1.BoundaryContractDefiner(mapConfig(config, id), callbackPrinter, resultPrinter, __spreadArray(__spreadArray([], callerVersions, true), [versionString_1.versionString], false)),
    };
    DEFINING_CONTRACTS[id] = definer;
    return id;
};
exports.beginDefinition = beginDefinition;
var makeCoreError = function (message, location) {
    return new case_boundary_1.BoundaryFailure(case_boundary_1.BoundaryFailureKindConstants.CASE_CORE_ERROR, message, location);
};
var makeConfigurationError = function (message, location) {
    return new case_boundary_1.BoundaryFailure(case_boundary_1.BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR, message, location);
};
var getDefiner = function (defineId, methodName) {
    var definerHandle = DEFINING_CONTRACTS[defineId];
    if (definerHandle === undefined) {
        return makeCoreError("The defineId '".concat(defineId, "' doesn't have an associated handle.\n\nThis might happen if the case-connector methods are called out of order, or the wrong connector is contacted"), "case-connector::".concat(methodName));
    }
    if (definerHandle === ENDED_DEFINER) {
        return makeConfigurationError('runRejectingExample was called after endRecord was called', "case-connector::".concat(methodName));
    }
    return definerHandle;
};
var runExample = function (defineId, definition, config) {
    return Promise.resolve().then(function () {
        var definerHandle = getDefiner(defineId, 'runExample');
        if (!('id' in definerHandle)) {
            return definerHandle;
        }
        return definerHandle.definer.runExample(definition, mapConfig(config, defineId));
    });
};
exports.runExample = runExample;
var runRejectingExample = function (defineId, definition, config) {
    return Promise.resolve().then(function () {
        var definerHandle = getDefiner(defineId, 'runRejectingExample');
        if (!('id' in definerHandle)) {
            return definerHandle;
        }
        return definerHandle.definer.runRejectingExample(definition, mapConfig(config, defineId));
    });
};
exports.runRejectingExample = runRejectingExample;
var endRecord = function (defineId) {
    return Promise.resolve().then(function () {
        var definerHandle = getDefiner(defineId, 'runExample');
        if (!('id' in definerHandle)) {
            return definerHandle;
        }
        return definerHandle.definer.endRecord();
    });
};
exports.endRecord = endRecord;
