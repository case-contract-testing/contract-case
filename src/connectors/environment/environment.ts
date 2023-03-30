// I don't know why this error is triggering - I suspect a bug in import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import isCi from 'is-ci';

interface Environment {
  /**
   * Do we think the current environment is running in a CI server?
   */
  isCi(): boolean;
}

export const makeEnvironment = (): Environment => ({
  isCi: () => isCi,
});
