import isCi from 'is-ci';
import childProcess from 'child_process';
import { versionFromGitTag } from 'absolute-version';
import { BuildEnvironment } from '../../core/types';

export const makeEnvironment = (): BuildEnvironment => ({
  isCi: () => isCi,
  version: () => versionFromGitTag(),
  branch: () =>
    childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim(),
});
