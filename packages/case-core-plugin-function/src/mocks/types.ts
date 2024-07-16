import {
  MockFunctionExecutionDescriptor,
  MockFunctionCallerDescriptor,
  FunctionMockSetupInfo,
  FunctionCallerMockSetupInfo,
} from '@contract-case/case-core-plugin-function-dsl';

export type AllDescriptors =
  | MockFunctionExecutionDescriptor
  | MockFunctionCallerDescriptor;
export type AllSetup = FunctionMockSetupInfo | FunctionCallerMockSetupInfo;
