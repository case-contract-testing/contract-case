import type { CaseContract } from 'boundaries';
import type { AnyCaseNodeOrData } from 'entities/types';

export const makeExpectErrorContaining =
  (contract: CaseContract) =>
  (
    matcher: AnyCaseNodeOrData,
    example: unknown,
    expectedContent: string
  ): void => {
    describe(`when given ${example}`, () => {
      it(`returns an error containing '${expectedContent}'`, async () => {
        const matchResult = await contract.checkMatch(matcher, example);

        expect(
          matchResult
            .map((m) => m.toString())
            .reduce((acc, m) => `${acc} ${m}`, '')
        ).toContain(expectedContent);
      });
    });
  };

export const MAINTAINER_TEST_CONTEXT = {
  testRunId: 'MAINTAINER',
};
