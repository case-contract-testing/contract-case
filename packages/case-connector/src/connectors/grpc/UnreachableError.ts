export class UnreachableError extends Error {
  constructor(value: never) {
    super(
      `The unreachable error should never be called, but it was called with: ${value}`,
    );
  }
}
