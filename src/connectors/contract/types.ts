export type RunTestCallback = (
  testName: string,
  verify: () => Promise<void>
) => void;
