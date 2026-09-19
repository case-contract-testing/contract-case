/*!
 * Derived from git-rev-sync (https://github.com/kurttheviking/git-rev-sync-js)
 * Copyright (c) 2014 - Present Kurt Ericson
 * MIT licensed - see the LICENSE file in this directory.
 */
import childProcess from 'child_process';

/**
 * Synchronously runs a command, returning its trimmed standard output.
 *
 * @param cmd - the executable to run
 * @param args - the arguments to pass to it
 * @returns the trimmed contents of the command's standard output
 * @throws if the command exits with a non-zero status
 */
export const command = (cmd: string, args: string[]): string => {
  const result = childProcess.spawnSync(cmd, args);

  if (result.status !== 0) {
    throw new Error(
      `[git] failed to execute command: ${String(result.stderr)}/${String(
        result.error,
      )}`,
    );
  }

  return result.stdout.toString('utf8').replace(/^\s+|\s+$/g, '');
};
