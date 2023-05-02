import {
  BoundaryAnyMatcher,
  BoundaryContractDefiner,
  BoundaryFailure,
  BoundaryMockDefinition,
  BoundaryResult,
  BoundarySuccessWithAny,
  ResultTypeConstants,
} from '@contract-case/case-boundary';
import { AnyMockDescriptor } from '@contract-case/case-example-mock-types';

import { defaultPrinter } from './defaultTestPrinter';

import {
  ContractCaseConfig,
  IndividualFailedTestConfig,
  IndividualSuccessTestConfig,
} from '../entities/config';
import { mapConfig, mapSuccessConfig, mapFailingConfig } from './case-boundary';

const mapFailureToJsError = (failure: BoundaryFailure) =>
  new Error(failure.message);

const mapDefinition = (
  definition: ExampleDefinition
): BoundaryMockDefinition => ({
  states: Array.isArray(definition.states) ? definition.states : [],
  definition: definition.definition,
});

const handleSuccess = (result: BoundaryResult) => {
  switch (result.resultType) {
    case ResultTypeConstants.RESULT_FAILURE:
      throw mapFailureToJsError(result as BoundaryFailure);
    case ResultTypeConstants.RESULT_SUCCESS:
      return;
    case ResultTypeConstants.RESULT_SUCCESS_HAS_MAP_PAYLOAD:
    case ResultTypeConstants.RESULT_SUCCESS_HAS_ANY_PAYLOAD:
      throw new Error("TODO: This shouldn't happen");
    default:
      throw new Error(`TODO: unexpected result type ${result.resultType}`);
  }
};

export type ExampleDefinition = {
  // TODO types for states
  states?: Array<unknown>;
  definition: AnyMockDescriptor;
};

export class ContractCaseDefiner {
  private boundaryDefiner: BoundaryContractDefiner;

  private config: ContractCaseConfig;

  constructor(config: ContractCaseConfig) {
    this.config = config;
    this.boundaryDefiner = new BoundaryContractDefiner(
      mapConfig({ ...config }),
      defaultPrinter,
      defaultPrinter
    );
  }

  runExample<R, C>(
    definition: ExampleDefinition,
    runConfig: IndividualSuccessTestConfig<R, C> = {}
  ): Promise<unknown> {
    return this.boundaryDefiner
      .runExample(
        mapDefinition(definition),
        mapSuccessConfig({ ...this.config, ...runConfig })
      )
      .then(handleSuccess);
  }

  runRejectingExample<R, C>(
    definition: ExampleDefinition,
    runConfig: IndividualFailedTestConfig<R, C> = {}
  ): Promise<unknown> {
    return this.boundaryDefiner
      .runRejectingExample(
        mapDefinition(definition),
        mapFailingConfig({ ...this.config, ...runConfig })
      )
      .then(handleSuccess);
  }

  endRecord(): Promise<unknown> {
    return this.boundaryDefiner.endRecord().then(handleSuccess);
  }

  stripMatchers<T>(matcherOrData: unknown): T {
    const result = this.boundaryDefiner.stripMatchers(
      matcherOrData as BoundaryAnyMatcher
    );

    switch (result.resultType) {
      case ResultTypeConstants.RESULT_FAILURE:
        throw mapFailureToJsError(result as BoundaryFailure);
      case ResultTypeConstants.RESULT_SUCCESS:
      case ResultTypeConstants.RESULT_SUCCESS_HAS_MAP_PAYLOAD:
        throw new Error("TODO: This shouldn't happen");
      case ResultTypeConstants.RESULT_SUCCESS_HAS_ANY_PAYLOAD:
        return (result as BoundarySuccessWithAny).payload as T;
      default:
        throw new Error(`TODO: unexpected result type ${result.resultType}`);
    }
  }
}
