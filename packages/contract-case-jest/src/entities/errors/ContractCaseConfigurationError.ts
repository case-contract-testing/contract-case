export class ContractCaseConfigurationError extends Error {
  readonly location: string;
  readonly contractCaseErrorCode: string;

  constructor(
    message: string,
    location: string | undefined,
    contractCaseErrorCode: string,
  ) {
    super(message);

    this.location =
      location !== undefined ? location : (this.stack ?? 'unknown');

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'ContractCaseConfigurationError';
    this.stack = this.location.startsWith('CaseConfigurationError')
      ? `Contract${this.location}`
      : this.location;

    this.contractCaseErrorCode = contractCaseErrorCode;
  }
}
