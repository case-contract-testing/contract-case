// I don't know why this error is triggering - I suspect a bug in import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import isCi from 'is-ci';
import { Environment } from '../../core/types';

export const makeEnvironment = (): Environment => ({
  isCi: () => isCi,
});
