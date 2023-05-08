export class ContractCaseCoreError extends Error {
  readonly location: string;

  constructor(message: string, location: string) {
    super(message);
    this.location = location;

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ContractCaseCoreError.name;
    this.stack = this.location.startsWith('CaseCoreError')
      ? `Contract${this.location}`
      : this.location;
  }
}
