export class CaseConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseConfigurationError.name;
  }
}
