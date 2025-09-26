import { BoundaryResult } from '@contract-case/case-connector';
import { mapSuccessWithAny } from './boundaryResultToJs';
import {
  ContractCaseCoreError,
  VerificationTestHandle,
} from '../../../entities';

const EXPECTED_FIELDS = {
  filePath: 'string',
  testName: 'string',
  testIndex: 'number',
  contractIndex: 'number',
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
  Object.entries(EXPECTED_FIELDS).forEach(([expectedKey, expectedValue]) => {
    if (!(expectedKey in handle)) {
      throw new ContractCaseCoreError(
        `Bug: One of the verification handles didn't include a key for '${expectedKey}'. Full object: ${handle}`,
        'contract-case-jest',
      );
    }
    if (
      typeof (handle as Record<string, unknown>)[expectedKey] !== expectedValue
    ) {
      throw new ContractCaseCoreError(
        `Bug: One of the verification handles had the wrong type for key '${expectedKey}'. Expected ${expectedValue} Full object: ${handle}`,
        'contract-case-jest',
      );
    }
  });
  return true;
};

export const mapVerificationTestHandles = (
  result: BoundaryResult,
): VerificationTestHandle[] => {
  const array = mapSuccessWithAny(result);
  if (!Array.isArray(array)) {
    throw new ContractCaseCoreError(
      "Bug: The result from the verification test handle call wasn't an array",
      'contract-case-jest',
    );
  }

  return array.filter(isVerificationTestHandle);
};
