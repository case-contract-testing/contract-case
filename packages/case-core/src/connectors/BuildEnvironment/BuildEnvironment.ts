import isCi from 'is-ci';
import childProcess from 'child_process';
import { long } from 'git-rev-sync';
import { versionFromGitTag } from 'absolute-version';
import { CaseConfigurationError } from '@contract-case/case-plugin-base';
import { BuildEnvironment } from '../../core/types';

export const makeEnvironment = (): BuildEnvironment => ({
  isCi: () => isCi,
  version: (context) => {
    switch (context['_case:currentRun:context:autoVersionFrom']) {
      case 'TAG':
        return versionFromGitTag();
      case 'GIT_SHA':
        return long();
      default:
        throw new CaseConfigurationError(
          `Unrecognised value for autoVersionFrom: '${context['_case:currentRun:context:autoVersionFrom']}'.
          Understood values are: TAG, GIT_SHA`,
          context,
        );
    }
  },

  branch: () =>
    childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim(),
});
