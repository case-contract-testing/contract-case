import childProcess from 'child_process';
import {
  branch,
  count,
  date,
  isDirty,
  isTagDirty,
  long,
  message,
  remoteUrl,
  short,
  tag,
  tagFirstParent,
} from './git';

describe('git boundary', () => {
  describe('long', () => {
    it('returns the full sha of the current commit', () => {
      expect(long()).toMatch(/^[0-9a-f]{40}$/);
    });

    it('agrees with git rev-parse', () => {
      expect(long()).toEqual(
        childProcess.execSync('git rev-parse HEAD').toString().trim(),
      );
    });
  });

  describe('short', () => {
    it('defaults to seven characters', () => {
      expect(short()).toHaveLength(7);
    });

    it('returns the requested number of characters', () => {
      expect(short(undefined, 8)).toHaveLength(8);
    });

    it('is a prefix of the long sha', () => {
      expect(long().startsWith(short())).toBe(true);
    });
  });

  describe('branch', () => {
    it('returns a non-empty string', () => {
      expect(branch().length).toBeGreaterThan(0);
    });
  });

  describe('count', () => {
    it('returns a positive number of commits', () => {
      expect(count()).toBeGreaterThan(0);
    });
  });

  describe('date', () => {
    it('returns a valid date', () => {
      expect(date().getTime()).not.toBeNaN();
    });
  });

  describe('message', () => {
    it('returns a non-empty commit message', () => {
      expect(message().length).toBeGreaterThan(0);
    });
  });

  describe('tag', () => {
    it('returns a non-empty string', () => {
      expect(tag().length).toBeGreaterThan(0);
    });
  });

  describe('tagFirstParent', () => {
    it('returns a non-empty string', () => {
      expect(tagFirstParent().length).toBeGreaterThan(0);
    });
  });

  describe('remoteUrl', () => {
    it('returns the url of a remote', () => {
      expect(remoteUrl()).toContain('github.com');
    });
  });

  describe('isDirty', () => {
    it('returns a boolean', () => {
      expect(typeof isDirty()).toEqual('boolean');
    });
  });

  describe('isTagDirty', () => {
    it('returns a boolean', () => {
      expect(typeof isTagDirty()).toEqual('boolean');
    });
  });
});
