import { willSendHttpRequest } from '@contract-case/case-core-plugin-http-dsl';
import { HasContractFileConfig } from '@contract-case/case-plugin-base';
import { EMPTY_MATCH_CONTEXT } from '../../../../__tests__/testContext';
import { addExample, makeContract } from '../../../../core/structure';
import { contractsEqual } from './contractNormaliser';

describe('Contract equality', () => {
  const consumerName = 'contractEquality Test (Consumer)';
  const providerName = 'contractEquality Test (Provider)';

  const CONTEXT = {
    ...EMPTY_MATCH_CONTEXT,
    '_case:currentRun:context:testRunId': 'contractEqualitySpec',
    '_case:currentRun:context:contractDir': '/dev/null',
    '_case:currentRun:context:contractsToWrite': ['hash', 'main'],
  } satisfies HasContractFileConfig;

  const EMPTY_CONTRACT = makeContract({ consumerName, providerName });
  it('sees equal contracts as equal', () => {
    expect(contractsEqual(EMPTY_CONTRACT, EMPTY_CONTRACT, CONTEXT)).toBe(true);
  });

  it('sees contracts with different metadata as equal', () => {
    const hasMetadata = { ...EMPTY_CONTRACT, metadata: { foo: 'wheee' } };
    expect(contractsEqual(hasMetadata, EMPTY_CONTRACT, CONTEXT)).toBe(true);
    expect(contractsEqual(EMPTY_CONTRACT, hasMetadata, CONTEXT)).toBe(true);
  });

  it('sees contracts where one is downloaded as equal', () => {
    const hasDownloadedLinks = {
      ...EMPTY_CONTRACT,
      createdAt: 'Some Time',
      _links: {
        'pb:pact-version': {
          name: 'Yep',
        },
        'pb:publish-verification-results': {
          title: 'This is a thing',
          href: 'This is probably a URL',
        },
      },
    };
    expect(contractsEqual(hasDownloadedLinks, EMPTY_CONTRACT, CONTEXT)).toBe(
      true,
    );
    expect(contractsEqual(EMPTY_CONTRACT, hasDownloadedLinks, CONTEXT)).toBe(
      true,
    );
  });

  it('sees contracts with different examples as not equal', () => {
    const hasExample = addExample(
      EMPTY_CONTRACT,
      {
        states: [],
        mock: willSendHttpRequest({
          request: {
            method: 'GET',
            path: '/health',
            headers: { accept: 'application/json' },
          },
          response: { status: 200, body: { status: 'up' } },
        }),
        result: 'VERIFIED',
      },
      CONTEXT,
    );
    expect(contractsEqual(hasExample, EMPTY_CONTRACT, CONTEXT)).toBe(false);
    expect(contractsEqual(EMPTY_CONTRACT, hasExample, CONTEXT)).toBe(false);
  });
});
