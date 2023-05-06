import {
  BoundaryAnyMatcher,
  BoundaryContractDefiner,
  BoundaryMockDefinition,
} from '@contract-case/case-boundary';
import { AnyMockDescriptor } from '@contract-case/case-example-mock-types';

import { defaultPrinter } from './defaultTestPrinter';

import {
  ContractCaseConfig,
  IndividualFailedTestConfig,
  IndividualSuccessTestConfig,
} from '../entities';
import {
  mapSuccess,
  mapConfig,
  mapSuccessConfig,
  mapFailingConfig,
  mapSuccessWithAny,
} from './case-boundary';

const mapDefinition = (
  definition: ExampleDefinition
): BoundaryMockDefinition => ({
  states: Array.isArray(definition.states) ? definition.states : [],
  definition: definition.definition,
});

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

  runExample<OtherR, OtherC extends Record<string, unknown>>(
    definition: ExampleDefinition,
    runConfig: IndividualSuccessTestConfig<OtherR, OtherC> = {}
  ): Promise<unknown> {
    return this.boundaryDefiner
      .runExample(
        mapDefinition(definition),
        mapSuccessConfig({ ...this.config, ...runConfig })
      )
      .then(mapSuccess);
  }

  runRejectingExample<OtherR, OtherC extends Record<string, unknown>>(
    definition: ExampleDefinition,
    runConfig: IndividualFailedTestConfig<OtherR, OtherC> = {}
  ): Promise<unknown> {
    return this.boundaryDefiner
      .runRejectingExample(
        mapDefinition(definition),
        mapFailingConfig({ ...this.config, ...runConfig })
      )
      .then(mapSuccess);
  }

  endRecord(): Promise<unknown> {
    return this.boundaryDefiner.endRecord().then(mapSuccess);
  }

  stripMatchers<T>(matcherOrData: unknown): T {
    return mapSuccessWithAny(
      this.boundaryDefiner.stripMatchers(matcherOrData as BoundaryAnyMatcher)
    );
  }
}
