import * as fs from 'node:fs';

import {
  and,
  anyBoolean,
  anyString,
  arrayContains,
  arrayEachEntryMatches,
  basicAuth,
  bearerToken,
  encodedStringBase64,
  inState,
  objectEachValueMatches,
  shapedLike,
  stateVariable,
  stringPrefix,
  stringStateVariable,
  stringSuffix,
  stringifiedJson,
  uriEncodedString,
  willSendHttpRequest,
  withExample,
} from '../../boundaries';
import { defineContract } from '../../__tests__/jest/jest';
import { CaseConfigurationError } from '../../entities';
import type {
  DataContext,
  LogLevelContext,
  MatchContext,
} from '../../entities/types';
import { makeBrokerApi } from './broker';
import { makeLogger } from '../logger';
import { makeContractStore } from '../contractStore/contractReader';
import { defaultPrinter } from '../../__tests__/jest/defaultTestPrinter';
import { EMPTY_DATA_CONTEXT } from '../../__tests__/testContext';
import { API_NOT_AUTHORISED } from './axios/apiErrors';
import { BrokerError } from '../../core/BrokerService/BrokerError';

const emptyContext: DataContext = {
  logger: makeLogger(
    {
      '_case:currentRun:context:location': ['DURING_TESTING'],
      '_case:currentRun:context:logLevel': 'none',
    },
    defaultPrinter
  ),
  resultPrinter: {
    printError(): void {},
    printSuccessTitle(): void {},
    printFailureTitle(): void {},
    printDownloadedContract(): string[] {
      return [];
    },
  },
  makeLogger: (context: LogLevelContext) => makeLogger(context, defaultPrinter),
  '_case:currentRun:context:location': ['DURING_TESTING'],
  '_case:currentRun:context:testName': 'mock in broker tests',
  '_case:currentRun:context:logLevel': 'none',
  '_case:context:matchBy': 'type',
  '_case:context:serialisableTo': 'json',
  '_case:currentRun:context:contractMode': 'read',
  '_case:currentRun:context:printResults': false,
  '_case:currentRun:context:variables': {},
  '_case:currentRun:context:defaultConfig': {},
};

const contractFilename = 'case-contracts/case-pact-broker.case.json';
const uploadingContract = makeContractStore(emptyContext).readContract(
  'case-contracts/contract-for-broker-upload-test.json'
).contents;

const makeBrokerApiForTest = (
  url: string | undefined,
  token: string | undefined
) =>
  makeBrokerApi({
    '_case:currentRun:context:brokerCiAccessToken': token,
    '_case:currentRun:context:brokerBaseUrl': url,
  } as MatchContext);

describe('broker client', () => {
  beforeAll(() => {
    // Delete the contract file first
    try {
      fs.rmSync(contractFilename);
      fs.mkdirSync('case-contracts');
    } catch (e) {
      // Ignore any errors deleting the file and making the directory
    }
  });

  describe('with missing configuration', () => {
    it('fails with no token', () => {
      expect(() =>
        makeBrokerApiForTest('http://localhost', '').downloadContract(
          'example.com',
          EMPTY_DATA_CONTEXT
        )
      ).toThrow(CaseConfigurationError);
    });
    it('fails with no baseUrl', () => {
      expect(() =>
        makeBrokerApiForTest('', 'TOKEN').downloadContract(
          'example.com',
          EMPTY_DATA_CONTEXT
        )
      ).toThrow(CaseConfigurationError);
    });

    it('fails with a non-string baseUrl', () => {
      expect(() =>
        makeBrokerApiForTest(3 as unknown as string, 'TOKEN').downloadContract(
          'example.com',
          EMPTY_DATA_CONTEXT
        )
      ).toThrow(CaseConfigurationError);
    });

    it('fails with a non-string token', () => {
      expect(() =>
        makeBrokerApiForTest('s', 3 as unknown as string).downloadContract(
          'example.com',
          EMPTY_DATA_CONTEXT
        )
      ).toThrow(CaseConfigurationError);
    });
  });

  defineContract(
    {
      consumerName: 'Case',
      providerName: 'Pact Broker',
      config: {
        contractFilename,
      },
    },
    (contract) => {
      const stateAuthTokenValid = inState('auth token is valid', {
        token: 'TOKEN',
      });

      const validBasicAuth = inState('valid basic auth credentials', {
        username: 'someUsername',
        password: 'somePassword',
      });

      const stateProvider = inState('with provider name', {
        providerName: 'http request provider',
      });

      describe('find contracts for verification', () => {
        const request = {
          method: 'POST',
          path: uriEncodedString(
            stringPrefix(
              `/pacts/provider/`,
              stringSuffix(stateVariable('providerName'), '/for-verification')
            )
          ),
          body: {
            consumerVersionSelectors: arrayEachEntryMatches(
              objectEachValueMatches(anyBoolean())
            ),
            providerVersionTags: ['main'],
          },
        };

        describe('token auth', () => {
          describe('with a valid auth token', () => {
            it('will be successful', () =>
              contract.runExample({
                states: [stateAuthTokenValid, stateProvider],
                definition: willSendHttpRequest({
                  request: {
                    ...request,
                    headers: {
                      accept: 'application/hal+json',
                      authorization: bearerToken(stringStateVariable('token')),
                    },
                  },
                  response: {
                    status: 200,
                    body: {
                      _embedded: {
                        pacts: arrayEachEntryMatches({
                          verificationProperties: {
                            notices: arrayEachEntryMatches(
                              shapedLike({
                                text: "This pact is being verified because it is the pact for the latest version of Foo tagged with 'dev'",
                              })
                            ),
                          },
                          _links: shapedLike({
                            self: {
                              href: 'http://localhost:9292/pacts/provider/Bar/consumer/Foo/pact-version/0e3369199f4008231946e0245474537443ccda2a',
                              name: 'Pact between Foo (v1.0.0) and Bar',
                            },
                          }),
                        }),
                      },
                      _links: shapedLike({
                        self: {
                          href: 'http://localhost:9292/pacts/provider/Bar/for-verification',
                          title: 'Pacts to be verified',
                        },
                      }),
                    },
                  },
                }),
                trigger: (config) =>
                  makeBrokerApiForTest(
                    config.baseUrl as string,
                    config.variables['token'] as string
                  ).urlsForVerification(
                    config.variables['providerName'] as string,
                    emptyContext
                  ),
                testResponse: (data) => {
                  expect(data).not.toBeNull();
                },
              }));
          });
        });

        describe('basic auth', () => {
          describe('with valid basic auth', () => {
            it('will be successful', () =>
              contract.runExample({
                states: [validBasicAuth, stateProvider],
                definition: willSendHttpRequest({
                  request: {
                    ...request,
                    headers: {
                      accept: 'application/hal+json',
                      authorization: basicAuth(
                        stringStateVariable('username'),
                        stringStateVariable('password')
                      ),
                    },
                  },
                  response: {
                    status: 200,
                    body: {
                      _embedded: {
                        pacts: arrayEachEntryMatches({
                          verificationProperties: {
                            notices: arrayEachEntryMatches(
                              shapedLike({
                                text: "This pact is being verified because it is the pact for the latest version of Foo tagged with 'dev'",
                              })
                            ),
                          },
                          _links: shapedLike({
                            self: {
                              href: 'http://localhost:9292/pacts/provider/Bar/consumer/Foo/pact-version/0e3369199f4008231946e0245474537443ccda2a',
                              name: 'Pact between Foo (v1.0.0) and Bar',
                            },
                          }),
                        }),
                      },
                      _links: shapedLike({
                        self: {
                          href: 'http://localhost:9292/pacts/provider/Bar/for-verification',
                          title: 'Pacts to be verified',
                        },
                      }),
                    },
                  },
                }),
                trigger: (config) =>
                  makeBrokerApi({
                    '_case:currentRun:context:brokerBasicAuth': {
                      username: config.variables['username'] as string,
                      password: config.variables['password'] as string,
                    },
                    '_case:currentRun:context:brokerBaseUrl': config.baseUrl,
                  } as DataContext).urlsForVerification(
                    config.variables['providerName'] as string,
                    emptyContext
                  ),
                testResponse: (data) => {
                  expect(data).not.toBeNull();
                },
              }));
          });
        });
      });

      describe('publish contract', () => {
        const someVersion = '1.2.3';
        const branchName = 'main';
        describe('publish contract old endpoint', () => {
          describe('with a valid auth token', () => {
            it('will be successful', () =>
              contract.runExample({
                states: [stateAuthTokenValid],
                definition: willSendHttpRequest({
                  request: {
                    method: 'PUT',
                    path: stringPrefix(
                      `/pacts/provider/http%20request%20provider/consumer/http%20request%20consumer/version/`,
                      anyString(someVersion)
                    ),
                    headers: {
                      accept: 'application/json',
                      authorization: stringPrefix(
                        'Bearer ',
                        stateVariable('token')
                      ),
                    },
                  },
                  response: { status: 200 },
                }),
                trigger: (config) =>
                  makeBrokerApiForTest(
                    config.baseUrl,
                    config.variables['token'] as string
                  ).publishContract(
                    uploadingContract,
                    someVersion,
                    emptyContext
                  ),
                testResponse: (data) => {
                  expect(data).not.toBeNull();
                },
              }));
          });

          describe('with an invalid auth token', () => {
            it('will be unsuccessful', () =>
              contract.runRejectingExample({
                states: [
                  inState('auth token is not valid', {
                    invalidToken: 'TOKEN',
                  }),
                ],
                definition: willSendHttpRequest({
                  request: {
                    method: 'PUT',
                    path: stringPrefix(
                      `/pacts/provider/http%20request%20provider/consumer/http%20request%20consumer/version/`,
                      anyString(someVersion)
                    ),
                    headers: {
                      accept: 'application/json',
                      authorization: stringPrefix(
                        'Bearer ',
                        stateVariable('invalidToken')
                      ),
                    },
                  },
                  response: { status: 403 },
                }),
                trigger: (config) =>
                  makeBrokerApiForTest(
                    config.baseUrl,
                    config.variables['invalidToken'] as string
                  ).publishContract(
                    uploadingContract,
                    someVersion,
                    emptyContext
                  ),
                testErrorResponse: (error) => {
                  expect((error as BrokerError).code).toBe(API_NOT_AUTHORISED);
                },
              }));
          });
        });

        describe('publish contract advanced endpoint', () => {
          describe('with a valid auth token', () => {
            it('will be successful', () =>
              contract.runExample({
                states: [stateAuthTokenValid],
                definition: willSendHttpRequest({
                  request: {
                    method: 'POST',
                    path: '/contracts/publish',
                    headers: {
                      accept: 'application/hal+json',
                      authorization: stringPrefix(
                        'Bearer ',
                        stateVariable('token')
                      ),
                    },
                    body: {
                      pacticipantName: anyString(),
                      pacticipantVersionNumber: anyString(someVersion),
                      branch: anyString(branchName),
                      tags: [],
                      contracts: [
                        {
                          consumerName: anyString(),
                          providerName: anyString(),
                          specification: 'pact',
                          contentType: 'application/json',
                          content: encodedStringBase64(
                            stringifiedJson({
                              contractType: '_case::contract',
                              description: {
                                consumerName: anyString('Case'),
                                providerName: anyString('Pact Broker'),
                              },
                            })
                          ),
                        },
                      ],
                    },
                  },
                  response: {
                    status: 200,
                    body: {
                      notices: withExample(
                        and(
                          arrayContains({
                            type: 'debug',
                            text: anyString(
                              'Created Foo version dc5eb529230038a4673b8c971395bd2922d8b240 with branch main and tags main'
                            ),
                          }),
                          arrayContains({
                            type: 'info',
                            text: anyString(
                              'Pact published for Foo version dc5eb529230038a4673b8c971395bd2922d8b240 and provider Bar.'
                            ),
                          })
                        ),
                        {
                          notices: [
                            {
                              type: 'debug',
                              text: 'Created Foo version dc5eb529230038a4673b8c971395bd2922d8b240 with branch main and tags main',
                            },
                            {
                              type: 'info',
                              text: 'Pact published for Foo version dc5eb529230038a4673b8c971395bd2922d8b240 and provider Bar.',
                            },
                          ],
                        }
                      ),
                    },
                  },
                }),
                trigger: (config) =>
                  makeBrokerApiForTest(
                    config.baseUrl,
                    config.variables['token'] as string
                  ).publishContractAdvanced(
                    uploadingContract,
                    someVersion,
                    branchName,
                    emptyContext
                  ),
                testResponse: (data) => {
                  expect(data).not.toBeNull();
                },
              }));
          });
          describe('with an invalid auth token', () => {
            it('will be unsuccessful', () =>
              contract.runRejectingExample({
                states: [
                  inState('auth token is not valid', {
                    invalidToken: 'TOKEN',
                  }),
                ],
                definition: willSendHttpRequest({
                  request: {
                    method: 'POST',
                    path: '/contracts/publish',
                    headers: {
                      accept: 'application/hal+json',
                      authorization: stringPrefix(
                        'Bearer ',
                        stateVariable('token')
                      ),
                    },
                    body: {
                      pacticipantName: anyString(),
                      pacticipantVersionNumber: anyString(someVersion),
                      branch: anyString(branchName),
                      tags: [],
                      contracts: [
                        {
                          consumerName: anyString(),
                          providerName: anyString(),
                          specification: 'pact',
                          contentType: 'application/json',
                          content: anyString(
                            Buffer.from(
                              JSON.stringify(uploadingContract)
                            ).toString('base64')
                          ),
                        },
                      ],
                    },
                  },
                  response: { status: 403 },
                }),
                trigger: (config) =>
                  makeBrokerApiForTest(
                    config.baseUrl,
                    config.variables['invalidToken'] as string
                  ).publishContractAdvanced(
                    uploadingContract,
                    someVersion,
                    branchName,
                    emptyContext
                  ),
                testErrorResponse: (error) => {
                  expect((error as BrokerError).code).toBe(API_NOT_AUTHORISED);
                },
              }));
          });
        });
      });
    }
  );

  describe('Broker contract', () => {});
});
