import {
  CaseConfigurationError,
  MatchContext,
} from '@contract-case/case-plugin-base';

const validateCodeNumber = (
  code: number,
  matchContext: MatchContext,
): number => {
  if (code < 100 || code >= 600) {
    throw new CaseConfigurationError(
      `HTTP status code '${code}' is outside the valid range (100-599) for status codes`,
      matchContext,
    );
  }
  if (Math.abs(code) !== code) {
    throw new CaseConfigurationError(
      `HTTP status code '${code}' must be a whole integer`,
      matchContext,
    );
  }
  return code;
};

const validateCode = (
  code: number | string,
  matchContext: MatchContext,
): number => {
  switch (typeof code) {
    case 'number':
      return validateCodeNumber(code, matchContext);
    case 'string':
      return validateCodeNumber(
        Number.parseInt(code.replace(/X|x/g, '0'), 10),
        matchContext,
      );
    default:
      throw new CaseConfigurationError(
        `'${typeof code}' is not a valid type for an HTTP status code`,
        matchContext,
      );
  }
};

export const validateCodes = (
  codes: number | string | Array<number | string>,
  matchContext: MatchContext,
): number => {
  if (Array.isArray(codes)) {
    if (codes.length === 0) {
      throw new CaseConfigurationError(
        `An empty array isn't a valid list of HTTP status codes`,
        matchContext,
      );
    }
    return codes.map((c) => validateCode(c, matchContext))[0] as number;
  }
  return validateCode(codes, matchContext);
};
