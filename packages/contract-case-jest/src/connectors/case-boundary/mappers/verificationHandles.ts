import { BoundaryResult } from '@contract-case/case-connector';
import { mapSuccessWithAny } from './boundaryResultToJs';
import {
  ContractCaseCoreError,
  VerificationHandle,
  VerificationTestHandle,
} from '../../../entities';

const TEST_HANDLE_EXPECTED_FIELDS = {
  filePath: 'string',
  testName: 'string',
  testIndex: 'number',
  contractIndex: 'number',
} as const;

const CONTRACT_HANDLE_EXPECTED_FIELDS = {
  filePath: 'string',
  contractIndex: 'number',
  metadata: 'object',
  description: 'object',
} as const;

const isVerificationTestHandle = (
  handle: unknown,
): handle is VerificationTestHandle => {
  if (typeof handle !== 'object' || handle == null) {
    throw new ContractCaseCoreError(
      `Bug: The verification test handle array had a non-object or null. Full item: ${handle}`,
      'contract-case-jest',
    );
  }
  Object.entries(TEST_HANDLE_EXPECTED_FIELDS).forEach(
    ([expectedKey, expectedValue]) => {
      if (!(expectedKey in handle)) {
        throw new ContractCaseCoreError(
          `Bug: One of the verification handles didn't include a key for '${expectedKey}'. Full object: ${handle}`,
          'contract-case-jest',
        );
      }
      if (
        typeof (handle as Record<string, unknown>)[expectedKey] !==
        expectedValue
      ) {
        throw new ContractCaseCoreError(
          `Bug: One of the verification handles had the wrong type for key '${expectedKey}'. Expected ${expectedValue} Full object: ${handle}`,
          'contract-case-jest',
        );
      }
    },
  );
  return true;
};

const checkContractVerificationHandle = (
  handle: unknown,
): handle is VerificationHandle => {
  if (typeof handle !== 'object' || handle == null) {
    throw new ContractCaseCoreError(
      `Bug: The contract verification handle array had a non-object or null. Full item: ${handle}`,
      'contract-case-jest',
    );
  }
  Object.entries(CONTRACT_HANDLE_EXPECTED_FIELDS).forEach(
    ([expectedKey, expectedValue]) => {
      if (!(expectedKey in handle)) {
        throw new ContractCaseCoreError(
          `Bug: One of the verification handles didn't include a key for '${expectedKey}'. Full object: ${handle}`,
          'contract-case-jest',
        );
      }
      if (
        typeof (handle as Record<string, unknown>)[expectedKey] !==
        expectedValue
      ) {
        throw new ContractCaseCoreError(
          `Bug: One of the verification handles had the wrong type for key '${expectedKey}'. Expected ${expectedValue} Full object: ${handle}`,
          'contract-case-jest',
        );
      }
    },
  );
  if (!('testHandles' in handle && Array.isArray(handle.testHandles))) {
    throw new ContractCaseCoreError(
      `Bug: One of the verification handles didn't include a key for 'testHandles' or it wasn't an array. Full object: ${JSON.stringify(handle)}`,
      'contract-case-jest',
    );
  }
  return handle.testHandles.every(isVerificationTestHandle);
};

export const mapContractVerificationHandles = (
  result: BoundaryResult,
): VerificationHandle[] => {
  const array = mapSuccessWithAny(result);
  if (!Array.isArray(array)) {
    throw new ContractCaseCoreError(
      "Bug: The result from the contract verification call wasn't an array",
      'contract-case-jest',
    );
  }

  // The filter here is a shortcut to tell the compiler
  // that the type is correct. The check will throw
  // if the type is incorrect.
  return array.filter(checkContractVerificationHandle);
};
