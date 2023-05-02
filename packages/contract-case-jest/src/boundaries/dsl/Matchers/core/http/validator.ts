import { ContractCaseConfigurationError } from '../../../../../entities/errors/ContractCaseConfigurationError';

const validateCodeNumber = (code: number): number => {
  if (code < 100 || code >= 600) {
    throw new ContractCaseConfigurationError(
      `HTTP status code '${code}' is outside the valid range (100-599) for status codes`,
      'validateCodeNumber'
    );
  }
  if (Math.abs(code) !== code) {
    throw new ContractCaseConfigurationError(
      `HTTP status code '${code}' must be a whole integer`,
      'validateCodeNumber'
    );
  }
  return code;
};

const validateCode = (code: number | string): number => {
  switch (typeof code) {
    case 'number':
      return validateCodeNumber(code);
    case 'string':
      return validateCodeNumber(Number.parseInt(code.replace(/X|x/g, '0'), 10));
    default:
      throw new ContractCaseConfigurationError(
        `'${typeof code}' is not a valid type for an HTTP status code`,
        'validateCode'
      );
  }
};

export const validateCodes = (
  codes: number | string | Array<number | string>
): number => {
  if (Array.isArray(codes)) {
    if (codes.length === 0) {
      throw new ContractCaseConfigurationError(
        `An empty array isn't a valid list of HTTP status codes`,
        'validateCodes'
      );
    }
    return codes.map(validateCode)[0] as number;
  }
  return validateCode(codes);
};
