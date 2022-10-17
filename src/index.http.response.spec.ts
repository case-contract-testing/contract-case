import type { Verifiable } from 'entities/types';
import { willRecieveHttpInteraction } from 'entities/nodes/interactions/http';
import { CaseConfigurationError } from 'entities';
import { setup } from '.';

describe('simple get endpoint', () => {
  const interaction = willRecieveHttpInteraction({
    request: {
      method: 'GET',
      path: '/health',
    },
    response: { status: 200, body: { status: 'up' } },
  });

  let context: Verifiable<'ConsumeHttpRequest'>;
  describe('without a URL', () => {
    it('fails to setup', () =>
      expect(setup(interaction)).rejects.toBeInstanceOf(
        CaseConfigurationError
      ));
  });

  describe('with a URL', () => {
    describe('but no running server', () => {
      beforeEach(async () => {
        context = await setup(interaction, {
          'case:run:context:baseurl': 'http://localhost',
        });
      });

      it('fails to start', () =>
        expect(context.verify()).rejects.toBeInstanceOf(
          CaseConfigurationError
        ));
      /*        const res = await context.verify();
        if (res.length !== 0) {
          throw new Error(res.join('\n').toString());
        }
        expect(res).not.toEqual([]); */
    });
  });
});
