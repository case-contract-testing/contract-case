import * as fs from 'fs';
import api from '__tests__/client/http/connector';
import { ApiError } from '__tests__/client/http/connector/internals/apiErrors';
import type {
  CaseExample,
  ContractFile,
} from 'connectors/contract/structure/types';
import type { Verifiable } from 'entities/types';
import { httpStatus, shapedLike } from 'boundaries/dsl/Matchers';
import { willSendHttpInteraction } from 'entities/nodes/interactions/http';
import { endContract } from 'boundaries/dsl/contract';
import { readContract } from 'connectors/contract/writer/fileSystem';
import { CaseConfigurationError } from 'entities';
import { inState, setup, startContract } from '.';

const contractDetails = {
  consumerName: 'http response consumer',
  providerName: 'http response provider',
};

describe('e2e http consumer driven', () => {
  beforeAll(() => {
    try {
      fs.rmSync('temp-contracts', { recursive: true });
    } catch (e) {
      // We don't care if this fails
    }
    fs.mkdirSync('temp-contracts');
  });
  describe('test and write contract', () => {
    beforeAll(() =>
      startContract(contractDetails, {
        'case:currentRun:context:logLevel': 'maintainerDebug',
      })
    );

    afterAll(() =>
      endContract({
        'case:currentRun:context:logLevel': 'maintainerDebug',
      })
    );
    let context: Verifiable<'ConsumeHttpResponse'>;
    describe('health get', () => {
      describe('When the server is up', () => {
        const state = inState('Server is up');
        describe('specific server response', () => {
          beforeEach(async () => {
            context = await setup(
              [state],
              willSendHttpInteraction({
                request: {
                  method: 'GET',
                  path: '/health',
                },
                response: { status: 200, body: { status: 'up' } },
              })
            );
          });

          it('calls server health', async () => {
            const client = api(context.mock.baseUrl);

            const health = await client.health();
            expect(health).toEqual('up');
          });

          afterEach(async () => {
            const res = await context.verify();
            if (res.length !== 0) {
              throw new Error(res.join('\n').toString());
            }
          });
        });
        describe('arbitrary status response string', () => {
          beforeEach(async () => {
            context = await setup(
              [state],
              willSendHttpInteraction({
                request: {
                  method: 'GET',
                  path: '/health',
                },
                response: {
                  status: 200,
                  body: shapedLike({ status: 'whatever' }),
                },
              })
            );
          });

          it('calls server health', async () => {
            const client = api(context.mock.baseUrl);

            const health = await client.health();
            expect(health).toEqual('whatever');
          });

          afterEach(async () => {
            const res = await context.verify();
            if (res.length !== 0) {
              throw new Error(res.join('\n').toString());
            }
          });
        });
      });
    });
    describe('When the server is down', () => {
      const state = inState('Server is down');
      describe('No body server response', () => {
        beforeEach(async () => {
          context = await setup(
            [state],
            willSendHttpInteraction({
              request: {
                method: 'GET',
                path: '/health',
              },
              response: { status: httpStatus(['4XX', '5XX']) },
            })
          );
        });

        it('calls server health', () => {
          const client = api(context.mock.baseUrl);

          return expect(client.health()).rejects.toBeInstanceOf(ApiError);
        });

        afterEach(async () => {
          const res = await context.verify();
          if (res.length !== 0) {
            throw new Error(
              res
                .map((m) => m.toString())
                .join('\n')
                .toString()
            );
          }
        });
      });

      describe('specific server response', () => {
        beforeEach(async () => {
          context = await setup(
            [state],
            willSendHttpInteraction({
              request: {
                method: 'GET',
                path: '/health',
              },
              response: { status: 503, body: { status: 'down' } },
            })
          );
        });

        it('calls server health', async () => {
          const client = api(context.mock.baseUrl);

          return expect(client.health()).rejects.toBeInstanceOf(ApiError);
        });

        afterEach(async () => {
          const res = await context.verify();
          if (res.length !== 0) {
            throw new Error(res.join('\n').toString());
          }
        });
      });
    });
  });
  describe('Reading contract', () => {
    type RunTestCallback = (
      testName: string,
      verify: () => Promise<void>
    ) => void;
    const runTest: RunTestCallback = (
      testName: string,
      verify: () => Promise<void>
    ): void => {
      // eslint-disable-next-line jest/expect-expect
      it(`${testName}`, () => verify());
    };

    type PromiseOrRaw<T> = Promise<T> | T;

    type SetupFunction = () => PromiseOrRaw<Record<string, unknown> | void>;
    type TeardownFunction = () => PromiseOrRaw<void>;
    type SetupTeardown = {
      setup: SetupFunction;
      teardown: TeardownFunction;
    };

    type StateFunctions = Record<string, SetupFunction | SetupTeardown>;

    const nameExample = (
      { states, interaction }: CaseExample,
      index: number
    ) => {
      if (interaction['case:interaction:uniqueName']) {
        return interaction['case:interaction:uniqueName'];
      }
      const stateNames = states.map((state) => state.stateName).join(' and ');
      const requestName =
        'case:matcher:uniqueName' in interaction.request
          ? interaction.request['case:matcher:uniqueName']
          : `Interaction ${index}'s request`;
      const responseName =
        'case:matcher:uniqueName' in interaction.response
          ? interaction.response['case:matcher:uniqueName']
          : `Interaction ${index}'s response`;

      return `${
        stateNames !== '' ? `When ${stateNames}, then ` : ''
      }${requestName} responds with ${responseName}`;
    };

    const isSetupFunction = (
      f: SetupFunction | SetupTeardown | undefined
    ): f is SetupFunction => typeof (f as SetupFunction) === 'function';

    const verifyContract = (
      contractFile: ContractFile,
      stateSetups: StateFunctions,
      runTestCb: RunTestCallback
    ): void => {
      contractFile.examples.forEach((example, index) => {
        runTestCb(nameExample(example, index), () =>
          Promise.all(
            example.states.map((state) => {
              const setupState = stateSetups[state.stateName];
              if (setupState === undefined) {
                throw new CaseConfigurationError(
                  `Missing state '${state.stateName}'`
                );
              }

              return Promise.resolve(
                isSetupFunction(setupState) ? setupState() : setupState.setup()
              );
            })
          ).then(() => {})
        );
      });
    };

    const stateSetups: StateFunctions = {
      'Server is up': () => {},
      'Server is down': () => {},
    };
    describe('it passes verification', () => {
      verifyContract(
        readContract(
          'temp-contracts/http-response-consumer-http-response-provider-12.case.json'
        ),
        stateSetups,
        runTest
      );
    });
  });
});
