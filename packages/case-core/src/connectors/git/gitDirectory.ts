/*!
 * Derived from git-rev-sync (https://github.com/kurttheviking/git-rev-sync-js)
 * Copyright (c) 2014 - Present Kurt Ericson
 * MIT licensed - see the LICENSE file in this directory.
 */
import fs from 'fs';
import path from 'path';

/**
 * Finds the `.git` directory for a repository, by walking up from `start`
 * until one is found.
 *
 * If the `.git` entry is a file rather than a directory (as it is for
 * worktrees and submodules), the path it points at is resolved and returned
 * instead.
 *
 * @param start - the path to begin searching from. Defaults to the current
 *                working directory.
 * @returns the absolute path to the git directory
 * @throws if no git repository can be found above `start`
 */
export const getGitDirectory = (start: string = process.cwd()): string => {
  const segments = start.split(path.sep);
  const gitRepoPath = segments.join(path.sep);

  if (!gitRepoPath.length) {
    throw new Error('[git] no git repository found');
  }

  const testPath = path.resolve(gitRepoPath, '.git');

  if (fs.existsSync(testPath)) {
    if (!fs.statSync(testPath).isDirectory()) {
      const pointer = fs.readFileSync(testPath, 'utf8').trim().split(' ').pop();

      if (pointer === undefined) {
        throw new Error(
          `[git] could not read repository path from ${testPath}`,
        );
      }

      const parentRepoPath = path.isAbsolute(pointer)
        ? pointer
        : path.resolve(gitRepoPath, pointer);

      if (fs.existsSync(parentRepoPath)) {
        return path.resolve(parentRepoPath);
      }

      throw new Error(
        `[git] could not find repository from path ${parentRepoPath}`,
      );
    }

    return testPath;
  }

  segments.pop();

  return getGitDirectory(segments.join(path.sep));
};
