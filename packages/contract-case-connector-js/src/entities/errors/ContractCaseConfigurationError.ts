export class ContractCaseConfigurationError extends Error {
  readonly location: string | undefined;
  readonly userFacingStacktrace: string | undefined;
  readonly contractCaseErrorCode: string;

  constructor(
    message: string,
    location: string | undefined,
    userFacingStacktrace: string | undefined,
    contractCaseErrorCode: string,
  ) {
    super(message);

    if (userFacingStacktrace !== '') {
      this.userFacingStacktrace = userFacingStacktrace;
    }

    if (location !== '') {
      this.location = location;
    }

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'ContractCaseConfigurationError';
    if (this.userFacingStacktrace != null && this.userFacingStacktrace !== '') {
      this.stack = this.userFacingStacktrace.startsWith(
        'CaseConfigurationError',
      )
        ? `Contract${this.userFacingStacktrace}`
        : this.userFacingStacktrace;
    }

    this.contractCaseErrorCode = contractCaseErrorCode;
  }
}
