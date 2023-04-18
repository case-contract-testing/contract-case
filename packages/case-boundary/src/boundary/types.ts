/** Supertype for all methods that return results */
export abstract class Result {}

export class Success extends Result {}

export class Failure extends Result {
  readonly kind: string;

  readonly message: string;

  readonly location: string;

  constructor(kind: string, message: string, location: string) {
    super();
    this.kind = kind;
    this.message = message;
    this.location = location;
  }
}
