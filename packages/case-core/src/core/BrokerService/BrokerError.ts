export class BrokerError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = BrokerError.name;

    this.code = code;
  }
}
