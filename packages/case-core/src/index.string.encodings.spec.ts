import {
  anyString,
  arrayEachEntryMatches,
  encodedStringBase64,
  stringifiedJson,
} from './boundaries/dsl/Matchers';

import { makeNoErrorResult } from './entities/results';
import { makeExpectErrorContaining } from './__tests__/expectErrorContaining';
import { MAINTAINER_TEST_CONTEXT } from './__tests__/testContext';
import { WritingCaseContract } from './core';
import { writerDependencies } from './connectors/dependencies';
import { defaultPrinter } from './__tests__/jest/defaultTestPrinter';

describe('string matchers', () => {
  const contract = new WritingCaseContract(
    {
      consumerName: 'test string consumer',
      providerName: 'test string provider',
    },
    writerDependencies(defaultPrinter),
    MAINTAINER_TEST_CONTEXT
  );

  const expectErrorContaining = makeExpectErrorContaining(contract);

  describe('json stringified matcher', () => {
    const matcher = stringifiedJson({
      contractType: '_case::contract',
      description: {
        consumerName: anyString('Case'),
        providerName: anyString('Pact Broker'),
      },
    });

    expectErrorContaining(
      matcher,
      {
        contractType: 'case::contract',
        description: {
          consumerName: 'Yep',
          providerName: 'It works',
        },
      },
      "is not a string; so it can't match a json stringified string"
    );

    expectErrorContaining(matcher, '{', 'failed to parse as json');
  });
  describe('Base64 encoding matcher', () => {
    describe('with nested json', () => {
      const matcher = {
        body: {
          contracts: arrayEachEntryMatches({
            content: encodedStringBase64(
              stringifiedJson({
                contractType: 'case::contract',
                description: {
                  consumerName: anyString('Case'),
                  providerName: anyString('Pact Broker'),
                },
              })
            ),
          }),
        },
      };

      it('matches an exact object', async () => {
        await expect(
          contract.checkMatch(matcher, {
            body: {
              contracts: [
                {
                  content:
                    'eyJjb250cmFjdFR5cGUiOiJjYXNlOjpjb250cmFjdCIsImRlc2NyaXB0aW9uIjp7ImNvbnN1bWVyTmFtZSI6IkNhc2UiLCJwcm92aWRlck5hbWUiOiJQYWN0IEJyb2tlciJ9fQ==',
                },
              ],
            },
          })
        ).resolves.toEqual(makeNoErrorResult());
      });

      it('matches a vague object', async () => {
        await expect(
          contract.checkMatch(matcher, {
            body: {
              contracts: [
                {
                  content:
                    'eyJjb250cmFjdFR5cGUiOiJjYXNlOjpjb250cmFjdCIsImRlc2NyaXB0aW9uIjp7ImNvbnN1bWVyTmFtZSI6IkJvb20iLCJwcm92aWRlck5hbWUiOiJDaGljayJ9fQ==',
                },
              ],
            },
          })
        ).resolves.toEqual(makeNoErrorResult());
      });

      it('matches a vague object with extra properties', async () => {
        await expect(
          contract.checkMatch(matcher, {
            body: {
              contracts: [
                {
                  content:
                    'eyJjb250cmFjdFR5cGUiOiJjYXNlOjpjb250cmFjdCIsImRlc2NyaXB0aW9uIjp7ImNvbnN1bWVyTmFtZSI6IkJvb20iLCJwcm92aWRlck5hbWUiOiJDaGljayIsImV4dHJhIjoicHJvcGVydHkifSwibW9kZSI6Mn0=',
                },
              ],
            },
          })
        ).resolves.toEqual(makeNoErrorResult());
      });

      expectErrorContaining(
        matcher,
        {
          body: { contracts: [{ content: 'bad string' }] },
        },
        'is not a base64 encoded string'
      );
      expectErrorContaining(
        matcher,
        {
          body: { contracts: [{ content: 2 }] },
        },
        "is not a string; so it can't match a base64 encoded string"
      );
    });
  });
});
