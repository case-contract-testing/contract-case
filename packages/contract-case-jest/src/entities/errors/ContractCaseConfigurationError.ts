export class ContractCaseConfigurationError extends Error {
  readonly location: string;

  constructor(message: string, location: string) {
    super(message);
    this.location = location;

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ContractCaseConfigurationError.name;
  }
}