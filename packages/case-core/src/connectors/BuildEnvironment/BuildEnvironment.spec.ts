import { EMPTY_DATA_CONTEXT } from '../../__tests__/testContext';
import { makeEnvironment } from './BuildEnvironment';

describe('build environment', () => {
  const buildEnvironment = makeEnvironment();

  describe('version', () => {
    describe('with defaults', () => {
      it('starts with a semver tag (this repository always will)', () => {
        expect(buildEnvironment.version(EMPTY_DATA_CONTEXT)).toMatch(
          /^\d+\.\d+\.\d+/,
        );
      });
    });

    describe('with GIT_SHA', () => {
      it('should be the right length for a full git sha', () => {
        expect(
          buildEnvironment.version({
            ...EMPTY_DATA_CONTEXT,
            '_case:currentRun:context:autoVersionFrom': 'GIT_SHA',
          }),
        ).toHaveLength(40);
      });
    });
  });
});
