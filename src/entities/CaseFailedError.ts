export class CaseFailedError extends Error {
  constructor() {
    super('Case test failed');
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseFailedError.name;
  }
}
