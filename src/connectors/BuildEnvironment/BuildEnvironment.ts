// I don't know why this error is triggering - I suspect a bug in import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import isCi from 'is-ci';
// eslint-disable-next-line import/no-extraneous-dependencies
import branchName from 'current-git-branch';
import { versionFromGitTag } from 'absolute-version';
import { BuildEnvironment } from '../../core/types';

export const makeEnvironment = (): BuildEnvironment => ({
  isCi: () => isCi,
  version: () => versionFromGitTag(),
  branch: () => branchName(),
});
