import * as fs from 'node:fs';

import {
  and,
  anyBoolean,
  anyString,
  arrayContains,
  arrayEachEntryMatches,
  basicAuth,
  bearerToken,
  inState,
  objectEachValueMatches,
  shapedLike,
  stateVariable,
  stringPrefix,
  stringStateVariable,
  stringSuffix,
  uriEncodedString,
  willSendHttpRequest,
  withExample,
} from '../../boundaries';
import { defineContract } from '../../boundaries/jest/jest';
import { CaseConfigurationError } from '../../entities';
import type { DataContext } from '../../entities/types';
import { readContract } from '../contract/writer';
import { API_NOT_AUTHORISED } from './axios/apiErrors';
import { makeBrokerApi } from './broker';
import { makeLogger } from '../logger';

const emptyContext = {
  logger: makeLogger({
    'case:currentRun:context:location': ['DURING_TESTING'],
    'case:currentRun:context:logLevel': 'none',
  }),
  resultPrinter: {
    printError(): void {},
    printSuccessTitle(): void {},
    printFailureTitle(): void {},
  },
  makeLogger,
};

const contractFilename = 'case-contracts/case-pact-broker.case.json';
const uploadingContract = readContract(
  'case-contracts/contract-for-broker-upload-test.json'
);

const makeBrokerApiForTest = (
  url: string | undefined,
  token: string | undefined
) =>
  makeBrokerApi({
    'case:currentRun:context:brokerCiAccessToken': token,
    'case:currentRun:context:brokerBaseUrl': url,
  } as DataContext);

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
      expect(() => makeBrokerApiForTest('http://localhost', '')).toThrow(
        CaseConfigurationError
      );
    });
    it('fails with no baseUrl', () => {
      expect(() => makeBrokerApiForTest('', 'TOKEN')).toThrow(
        CaseConfigurationError
      );
    });

    it('fails with a non-string baseUrl', () => {
      expect(() =>
        makeBrokerApiForTest(3 as unknown as string, 'TOKEN')
      ).toThrow(CaseConfigurationError);
    });

    it('fails with a non-string token', () => {
      expect(() => makeBrokerApiForTest('s', 3 as unknown as string)).toThrow(
        CaseConfigurationError
      );
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
                    config.baseUrl,
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
                    'case:currentRun:context:brokerBasicAuth': {
                      username: config.variables['username'] as string,
                      password: config.variables['password'] as string,
                    },
                    'case:currentRun:context:brokerBaseUrl': config.baseUrl,
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
        describe('with a valid auth token', () => {
          it('will be successful', () =>
            contract.runExample({
              states: [stateAuthTokenValid],
              definition: willSendHttpRequest({
                request: {
                  method: 'PUT',
                  path: stringPrefix(
                    `/pacts/provider/http%20request%20provider/consumer/http%20request%20consumer/version/`,
                    anyString()
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
                ).publishContract(uploadingContract, emptyContext),
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
                    anyString()
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
                ).publishContract(uploadingContract, emptyContext),
              testErrorResponse: (error) => {
                expect(error.name).toBe(API_NOT_AUTHORISED);
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
                    pacticipantVersionNumber: anyString(),
                    branch: anyString(),
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
                response: {
                  status: 200,
                  body: {
                    notices: withExample(
                      and(
                        arrayContains({
                          level: 'debug',
                          text: anyString(
                            'Created Foo version dc5eb529230038a4673b8c971395bd2922d8b240 with branch main and tags main'
                          ),
                        }),
                        arrayContains({
                          level: 'info',
                          text: anyString(
                            'Pact published for Foo version dc5eb529230038a4673b8c971395bd2922d8b240 and provider Bar.'
                          ),
                        })
                      ),
                      {
                        notices: [
                          {
                            level: 'debug',
                            text: 'Created Foo version dc5eb529230038a4673b8c971395bd2922d8b240 with branch main and tags main',
                          },
                          {
                            level: 'info',
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
                ).publishContractAdvanced(uploadingContract, emptyContext),
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
                    pacticipantVersionNumber: anyString(),
                    branch: anyString(),
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
                ).publishContractAdvanced(uploadingContract, emptyContext),
              testErrorResponse: (error) => {
                expect(error.name).toBe(API_NOT_AUTHORISED);
              },
            }));
        });
      });
    }
  );

  describe('Broker contract', () => {});
});
