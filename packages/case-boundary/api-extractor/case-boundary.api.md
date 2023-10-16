## API Report File for "@contract-case/case-boundary"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { base } from '@contract-case/test-equivalence-matchers';

// @public
export type BoundaryAnyMatcher = any;

// @public
export class BoundaryContractDefiner {
    constructor(config: ContractCaseBoundaryConfig, logPrinter: ILogPrinter, resultPrinter: IResultPrinter, parentVersions: string[]);
    // (undocumented)
    endRecord(): Promise<BoundaryResult>;
    // (undocumented)
    runExample(definition: BoundaryMockDefinition, runConfig: ContractCaseBoundaryConfig): Promise<BoundaryResult>;
    // (undocumented)
    runRejectingExample(definition: BoundaryMockDefinition, runConfig: ContractCaseBoundaryConfig): Promise<BoundaryResult>;
    // (undocumented)
    stripMatchers(matcherOrData: base.AnyMatcher): BoundaryResult;
}

// @public
export class BoundaryContractVerifier {
    constructor(config: ContractCaseBoundaryConfig, callback: IRunTestCallback, logPrinter: ILogPrinter, resultPrinter: IResultPrinter, parentVersions: string[]);
    availableContractDescriptions(): BoundaryResult;
    runVerification(configOverrides: ContractCaseBoundaryConfig): BoundaryResult;
}

// @public
export class BoundaryCrashMessage {
    // (undocumented)
    static readonly CRASH_MESSAGE_END = "\n\nPlease open a bug report here:\nhttps://github.com/case-contract-testing/case/issues/new\n\nIt would be great if you could include:\n\n* What you were doing when it failed\n* The results of re-running with logLevel: \"maintainerDebug\"\n\nFor bonus points and internet karma, a reproducible \ncode sample would be very helpful.\n\nSorry about this.\n\n---------------------------------------------------\n!!!!\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8 ContractCase Crashed \uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8!!!!\n---------------------------------------------------\n";
    // (undocumented)
    static readonly CRASH_MESSAGE_START = "\n---------------------------------------------------\n!!!!\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8 ContractCase Crashed \uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8!!!!\n---------------------------------------------------\n\nThe ContractCase core has failed in an unexpected\nway. This is almost certainly a bug in ContractCase.\n\nThe details are:\n";
}

// @public
export class BoundaryFailure extends BoundaryResult {
    constructor(kind: string, message: string, location: string);
    // (undocumented)
    readonly kind: string;
    // (undocumented)
    readonly location: string;
    // (undocumented)
    readonly message: string;
    // Warning: (ae-incompatible-release-tags) The symbol "resultType" is marked as @public, but its signature references "RESULT_FAILURE" which is marked as @internal
    //
    // (undocumented)
    readonly resultType: typeof RESULT_FAILURE;
}

// @public
export class BoundaryFailureKindConstants {
    static readonly CASE_BROKER_ERROR: string;
    static readonly CASE_CONFIGURATION_ERROR: string;
    static readonly CASE_CORE_ERROR: string;
    static readonly CASE_FAILED_ASSERTION_ERROR: string;
    static readonly CASE_TRIGGER_ERROR: string;
    static readonly CASE_VERIFY_RETURN_ERROR: string;
}

// @public
export interface BoundaryMockDefinition {
    // (undocumented)
    readonly definition: any;
    // (undocumented)
    readonly states: Array<any>;
}

// @public
export abstract class BoundaryResult {
    constructor(result: BoundaryResultType);
    // Warning: (ae-forgotten-export) The symbol "BoundaryResultType" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    readonly resultType: BoundaryResultType;
}

// @public
export class BoundaryResultTypeConstants {
    static readonly RESULT_FAILURE = "Failure";
    static readonly RESULT_SUCCESS = "Success";
    static readonly RESULT_SUCCESS_HAS_ANY_PAYLOAD = "SuccessAny";
    static readonly RESULT_SUCCESS_HAS_MAP_PAYLOAD = "SuccessMap";
}

// @public
export abstract class BoundaryStateHandler {
    setup(): Promise<BoundaryResult>;
}

// @public
export abstract class BoundaryStateHandlerWithTeardown extends BoundaryStateHandler {
    teardown(): Promise<BoundaryResult>;
}

// @public
export class BoundarySuccess extends BoundaryResult {
    constructor();
    // Warning: (ae-incompatible-release-tags) The symbol "resultType" is marked as @public, but its signature references "RESULT_SUCCESS" which is marked as @internal
    //
    // (undocumented)
    readonly resultType: typeof RESULT_SUCCESS;
}

// @public
export class BoundarySuccessWithAny extends BoundaryResult {
    constructor(payload: unknown);
    // (undocumented)
    readonly payload: unknown;
    // Warning: (ae-incompatible-release-tags) The symbol "resultType" is marked as @public, but its signature references "RESULT_SUCCESS_HAS_ANY_PAYLOAD" which is marked as @internal
    //
    // (undocumented)
    readonly resultType: typeof RESULT_SUCCESS_HAS_ANY_PAYLOAD;
}

// @public
export class BoundarySuccessWithMap extends BoundaryResult {
    constructor(payload: Record<string, unknown>);
    // (undocumented)
    readonly payload: Record<string, unknown>;
    // Warning: (ae-incompatible-release-tags) The symbol "resultType" is marked as @public, but its signature references "RESULT_SUCCESS_HAS_MAP_PAYLOAD" which is marked as @internal
    //
    // (undocumented)
    readonly resultType: typeof RESULT_SUCCESS_HAS_MAP_PAYLOAD;
}

// @public
export class ConfigLogLevelConstants {
    static readonly DEBUG = "debug";
    static readonly DEEP_MAINTAINER_DEBUG = "deepMaintainerDebug";
    static readonly ERROR = "error";
    static readonly MAINTAINER_DEBUG = "maintainerDebug";
    static readonly NONE = "none";
    static readonly WARN = "warn";
}

// @public
export class ConfigPublishConstants {
    static readonly ALWAYS = "ALWAYS";
    static readonly NEVER = "NEVER";
    static readonly ONLY_IN_CI = "ONLY_IN_CI";
}

// @public
export interface ContractCaseBoundaryConfig {
    // @deprecated
    readonly baseUrlUnderTest?: string;
    readonly brokerBaseUrl?: string;
    readonly brokerBasicAuth?: UserNamePassword;
    readonly brokerCiAccessToken?: string;
    readonly consumerName?: string;
    readonly contractDir?: string;
    readonly contractFilename?: string;
    readonly logLevel?: string;
    readonly printResults?: boolean;
    readonly providerName: string;
    readonly publish?: string | undefined;
    readonly stateHandlers?: Record<string, BoundaryStateHandler>;
    readonly testRunId: string;
    readonly throwOnFail?: boolean;
    readonly triggerAndTest?: ITriggerFunction;
    readonly triggerAndTests?: Record<string, ITriggerFunction>;
}

// @public
export interface ICombinedPrinter extends IResultPrinter, ILogPrinter {
}

// @public
export interface IInvokeCoreTest {
    verify(): Promise<BoundaryResult>;
}

// @public
export interface ILogPrinter {
    log(level: string, timestamp: string, version: string, typeString: string, location: string, message: string, additional: string): BoundaryResult;
}

// @public
export interface IResultPrinter {
    printMatchError(MatchErrorDescription: PrintableMatchError): BoundaryResult;
    printMessageError(messageErrorDetails: PrintableMessageError): BoundaryResult;
    printTestTitle(titleDetails: PrintableTestTitle): BoundaryResult;
}

// @public
export interface IRunTestCallback {
    runTest(testName: string, invoker: IInvokeCoreTest): BoundaryResult;
}

// @public
export interface ITriggerFunction {
    trigger(config: Record<string, unknown>): Promise<BoundaryResult>;
}

// @public
export interface PrintableMatchError {
    readonly actual: string;
    readonly errorTypeTag: string;
    readonly expected: string;
    readonly kind: string;
    readonly location: string;
    readonly locationTag: string;
    readonly message: string;
}

// @public
export interface PrintableMessageError {
    readonly errorTypeTag: string;
    readonly kind: string;
    readonly location: string;
    readonly locationTag: string;
    readonly message: string;
}

// @public
export interface PrintableTestTitle {
    readonly additionalText: string;
    readonly icon: string;
    readonly kind: string;
    readonly title: string;
}

// Warning: (ae-internal-missing-underscore) The name "RESULT_FAILURE" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const RESULT_FAILURE = "Failure";

// Warning: (ae-internal-missing-underscore) The name "RESULT_SUCCESS" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const RESULT_SUCCESS = "Success";

// Warning: (ae-internal-missing-underscore) The name "RESULT_SUCCESS_HAS_ANY_PAYLOAD" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const RESULT_SUCCESS_HAS_ANY_PAYLOAD = "SuccessAny";

// Warning: (ae-internal-missing-underscore) The name "RESULT_SUCCESS_HAS_MAP_PAYLOAD" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const RESULT_SUCCESS_HAS_MAP_PAYLOAD = "SuccessMap";

// @public
export interface UserNamePassword {
    readonly password: string;
    readonly username: string;
}

```