import {
  BoundaryResult,
  ILogPrinter,
  IResultPrinter,
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
} from '../../entities/types.js';

import {
  makeResolvableId,
  waitForResolution,
} from './promiseHandler/promiseHandler.js';
import {
  makeLogRequest,
  makePrintMatchErrorRequest,
  makePrintTestTitleRequest,
  makePrintableMessageErrorRequest,
} from './responseMappers/index.js';
import { SendContractResponse } from './sendContractResponse.js';

export const makeResultPrinter = (
  sendContractResponse: SendContractResponse,
): IResultPrinter => ({
  printMatchError: async (
    matchError: PrintableMatchError,
  ): Promise<BoundaryResult> =>
    waitForResolution(
      makeResolvableId((id: string) =>
        sendContractResponse(
          'deepMaintainerDebug',
          id,
          makePrintMatchErrorRequest(matchError),
        ),
      ),
    ),
  printMessageError: async (
    messageError: PrintableMessageError,
  ): Promise<BoundaryResult> =>
    waitForResolution(
      makeResolvableId((id) =>
        sendContractResponse(
          'deepMaintainerDebug',
          id,
          makePrintableMessageErrorRequest(messageError),
        ),
      ),
    ),
  printTestTitle: async (
    testTitle: PrintableTestTitle,
  ): Promise<BoundaryResult> =>
    waitForResolution(
      makeResolvableId((id: string) =>
        sendContractResponse(
          'deepMaintainerDebug',
          id,
          makePrintTestTitleRequest(testTitle),
        ),
      ),
    ),
});

export const makeLogPrinter = (
  sendContractResponse: SendContractResponse,
): ILogPrinter => ({
  log: async (
    level: string,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string,
  ): Promise<BoundaryResult> =>
    waitForResolution(
      makeResolvableId((id: string) =>
        sendContractResponse(
          'deepMaintainerDebug',
          id,
          makeLogRequest({
            level,
            timestamp,
            version,
            typeString,
            location,
            message,
            additional,
          }),
        ),
      ),
    ),
});
