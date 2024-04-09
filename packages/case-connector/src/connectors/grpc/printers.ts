import {
  BoundaryResult,
  ILogPrinter,
  IResultPrinter,
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
} from '../../entities/types';

import {
  makeResolvableId,
  waitForResolution,
} from './promiseHandler/promiseHandler';
import {
  makeLogRequest,
  makePrintMatchErrorRequest,
  makePrintTestTitleRequest,
  makePrintableMessageErrorRequest,
} from './responseMappers';
import { SendContractResponse } from './sendContractResponse';

export const makeResultPrinter = (
  sendContractResponse: SendContractResponse,
): IResultPrinter => ({
  printMatchError: async (
    matchError: PrintableMatchError,
  ): Promise<BoundaryResult> =>
    waitForResolution(
      makeResolvableId((id: string) =>
        sendContractResponse(id, makePrintMatchErrorRequest(matchError)),
      ),
    ),
  printMessageError: async (
    messageError: PrintableMessageError,
  ): Promise<BoundaryResult> =>
    waitForResolution(
      makeResolvableId((id) =>
        sendContractResponse(
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
        sendContractResponse(id, makePrintTestTitleRequest(testTitle)),
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
