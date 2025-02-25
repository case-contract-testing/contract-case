/* eslint-disable jest/no-export */
import { AnyCaseMatcher } from '@contract-case/case-entities-internal';
import { AnyLeafOrStructure } from '@contract-case/case-plugin-dsl-types';
import { WritingCaseContract } from '../core';

export const makeExpectErrorContaining =
  (contract: WritingCaseContract) =>
  (
    matcher: AnyCaseMatcher | AnyLeafOrStructure,
    example: unknown,
    expectedContent: string,
  ): void => {
    describe(`when given ${example}`, () => {
      it(`returns an error containing '${expectedContent}'`, async () => {
        const matchResult = await contract.checkMatch(matcher, example);

        expect(
          matchResult
            .map((m) => m.toString())
            .reduce((acc, m) => `${acc} ${m}`, ''),
        ).toContain(expectedContent);
      });
    });
  };
