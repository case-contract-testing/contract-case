import { DataContext } from '@contract-case/case-plugin-base';

export interface BuildEnvironment {
  /**
   * What branch of the git repository is under test in this run
   *
   * @returns The branch name, or false if we
   *     are unable to determine the branch (eg, if
   *     we're not running in a git repository).
   */
  branch(): string | false;

  /**
   * Do we think the current environment is running in a CI server?
   */
  isCi(): boolean;

  /**
   * Get the version for the service under test
   *
   * @param context - the {@link DataContext} for this run
   */
  version(context: DataContext): string;
}

export type MakeEnvironment = () => BuildEnvironment;
