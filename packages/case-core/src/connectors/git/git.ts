/*!
 * Derived from git-rev-sync (https://github.com/kurttheviking/git-rev-sync-js)
 * Copyright (c) 2014 - Present Kurt Ericson
 * MIT licensed - see the LICENSE file in this directory.
 */
import fs from 'fs';
import path from 'path';
import { command } from './command';
import { escapeRegExp } from './escapeRegExp';
import { getGitDirectory } from './gitDirectory';

const RE_BRANCH = /^ref: refs\/heads\/(.*)\n/;
const DETACHED_PREFIX = 'Detached: ';

/**
 * Reads the name of the currently checked out branch.
 *
 * @param dir - a path inside the repository. Defaults to the current working
 *              directory.
 * @returns the branch name, or `Detached: &lt;sha&gt;` if HEAD is detached
 */
export const branch = (dir?: string): string => {
  const gitDir = getGitDirectory(dir);

  const head = fs.readFileSync(path.resolve(gitDir, 'HEAD'), 'utf8');
  const matched = RE_BRANCH.exec(head);

  if (matched !== null && matched[1] !== undefined) {
    return matched[1];
  }

  return `${DETACHED_PREFIX}${head.trim()}`;
};

/**
 * Reads the full sha of the current commit.
 *
 * @param dir - a path inside the repository. Defaults to the current working
 *              directory.
 * @returns the forty character commit sha
 */
export const long = (dir?: string): string => {
  const currentBranch = branch(dir);

  if (currentBranch.startsWith(DETACHED_PREFIX)) {
    return currentBranch.slice(DETACHED_PREFIX.length);
  }

  const gitDir = getGitDirectory(dir);
  const gitRootDir =
    gitDir.indexOf('.git/worktrees/') > 0
      ? gitDir.replace(/\.git\/worktrees\/.+$/, '.git')
      : gitDir;
  const refsFilePath = path.resolve(gitRootDir, 'refs', 'heads', currentBranch);

  if (fs.existsSync(refsFilePath)) {
    return fs.readFileSync(refsFilePath, 'utf8').trim();
  }

  // If there isn't an entry in /refs/heads for this branch, it may be that
  // the ref is stored in the packfile (.git/packed-refs). Fall back to
  // looking up the hash here.
  const refToFind = ['refs', 'heads', currentBranch].join('/');
  const packfileContents = fs.readFileSync(
    path.resolve(gitDir, 'packed-refs'),
    'utf8',
  );
  const packfileRegex = new RegExp(`(.*) ${escapeRegExp(refToFind)}`);
  const ref = packfileRegex.exec(packfileContents);

  if (ref === null || ref[1] === undefined) {
    throw new Error(
      `[git] could not find a ref for '${refToFind}' in refs/heads or packed-refs`,
    );
  }

  return ref[1].trim();
};

/**
 * Reads an abbreviated sha of the current commit.
 *
 * @param dir - a path inside the repository. Defaults to the current working
 *              directory.
 * @param len - how many characters to return. Defaults to 7.
 * @returns the abbreviated commit sha
 */
export const short = (dir?: string, len?: number): string =>
  long(dir).slice(0, len ?? 7);

/**
 * Reads the commit message of the current commit.
 *
 * @returns the full commit message
 */
export const message = (): string =>
  command('git', ['log', '-1', '--pretty=%B']);

/**
 * Reads the most recent tag reachable from the current commit.
 *
 * @param markDirty - if true, append `-dirty` when the working tree has
 *                    uncommitted changes
 * @returns the tag name, or the commit sha if there is no tag
 */
export const tag = (markDirty?: boolean): string =>
  command(
    'git',
    markDirty === true
      ? ['describe', '--always', '--tag', '--dirty', '--abbrev=0']
      : ['describe', '--always', '--tag', '--abbrev=0'],
  );

/**
 * Reads the most recent tag reachable from the current commit, following only
 * the first parent of each merge.
 *
 * @param markDirty - if true, append `-dirty` when the working tree has
 *                    uncommitted changes
 * @returns the tag name, or the commit sha if there is no tag
 */
export const tagFirstParent = (markDirty?: boolean): string =>
  command(
    'git',
    markDirty === true
      ? [
          'describe',
          '--always',
          '--tag',
          '--dirty',
          '--abbrev=0',
          '--first-parent',
        ]
      : ['describe', '--always', '--tag', '--abbrev=0', '--first-parent'],
  );

/**
 * Tests whether the working tree has changes that have not been staged.
 *
 * @returns true if there are unstaged changes
 */
export const hasUnstagedChanges = (): boolean => {
  const writeTree = command('git', ['write-tree']);
  return command('git', ['diff-index', writeTree, '--']).length > 0;
};

/**
 * Tests whether the working tree differs from HEAD.
 *
 * @returns true if there are uncommitted changes
 */
export const isDirty = (): boolean =>
  command('git', ['diff-index', 'HEAD', '--']).length > 0;

/**
 * Tests whether the current commit is something other than an exact tag.
 *
 * @returns true if HEAD is not exactly at a tag
 */
export const isTagDirty = (): boolean => {
  try {
    command('git', ['describe', '--exact-match', '--tags']);
  } catch (e) {
    if (e instanceof Error && e.message.includes('no tag exactly matches')) {
      return true;
    }

    throw e;
  }
  return false;
};

/**
 * Reads the url of the remote that the current branch tracks.
 *
 * @returns the remote url
 */
export const remoteUrl = (): string =>
  command('git', ['ls-remote', '--get-url']);

/**
 * Reads the author date of the current commit.
 *
 * @returns the commit date
 */
export const date = (): Date =>
  new Date(
    command('git', ['log', '--no-color', '-n', '1', '--pretty=format:%ad']),
  );

/**
 * Counts every commit in the repository, across all refs.
 *
 * @returns the total number of commits
 */
export const count = (): number =>
  parseInt(command('git', ['rev-list', '--all', '--count']), 10);
