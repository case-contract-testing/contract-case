export interface Environment {
  /**
   * Do we think the current environment is running in a CI server?
   */
  isCi(): boolean;
}

export type MakeEnvironment = () => Environment;
