import {
  AnyData,
  AnyCaseMatcherOrData,
} from '@contract-case/case-entities-internal';
import {
  ContractDefinerConnector,
  DefinitionFailingExample,
  DefinitionSuccessExample,
  TestPrinter,
} from '../connectors';
import { MultiTestInvoker } from '../core/executeExample/types';
import { CaseConfig } from '../core/types';
import {
  AnyMockDescriptorType,
  CaseContractDescription,
} from '../entities/types';
import { defaultPrinter } from './defaultTestPrinter';

export class ContractDefiner<M extends AnyMockDescriptorType> {
  coreDefiner: ContractDefinerConnector<M>;

  constructor(
    description: CaseContractDescription,
    config: CaseConfig,
    invoker: MultiTestInvoker<M>,
    printer: TestPrinter = defaultPrinter
  ) {
    this.coreDefiner = new ContractDefinerConnector(
      description,
      config,
      invoker,
      printer
    );
  }

  runExample<T extends AnyMockDescriptorType, R>(
    definition: DefinitionSuccessExample<T, R>,
    runConfig: CaseConfig = {}
  ): Promise<unknown> {
    return this.coreDefiner.runExample(definition, runConfig);
  }

  runRejectingExample<T extends AnyMockDescriptorType, R>(
    definition: DefinitionFailingExample<T, R>,
    runConfig: CaseConfig = {}
  ): Promise<unknown> {
    return this.coreDefiner.runRejectingExample(definition, runConfig);
  }

  endRecord(): Promise<unknown> {
    return this.coreDefiner.endRecord();
  }

  stripMatchers(matcherOrData: AnyCaseMatcherOrData): AnyData {
    return this.coreDefiner.stripMatchers(matcherOrData);
  }
}
