import {
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
} from '@contract-case/case-boundary';
import {
  DefinitionResponse as WireDefinitionResponse,
  LogRequest as WireLogRequest,
  PrintMatchErrorRequest as WirePrintMatchErrorRequest,
  PrintMessageErrorRequest as WirePrintMessageErrorRequest,
  PrintTestTitleRequest as WirePrintTestTitleRequest,
} from '../proto/contract_case_stream_pb';

export const makeLogRequest = ({
  level,
  timestamp,
  version,
  typeString,
  location,
  message,
  additional,
}: {
  level: string;
  timestamp: string;
  version: string;
  typeString: string;
  location: string;
  message: string;
  additional: string;
}): WireDefinitionResponse =>
  new WireDefinitionResponse().setLogRequest(
    new WireLogRequest()
      .setLevel(level)
      .setTimestamp(timestamp)
      .setVersion(version)
      .setTypeString(typeString)
      .setLocation(location)
      .setMessage(message)
      .setAdditional(additional),
  );

export const makePrintMatchErrorRequest = ({
  kind,
  message,
  location,
  locationTag,
  errorTypeTag,
  expected,
  actual,
}: PrintableMatchError): WireDefinitionResponse =>
  new WireDefinitionResponse().setPrintMatchErrorRequest(
    new WirePrintMatchErrorRequest()
      .setActual(actual)
      .setKind(kind)
      .setLocationTag(locationTag)
      .setExpected(expected)
      .setLocation(location)
      .setMessage(message)
      .setErrorTypeTag(errorTypeTag),
  );

export const makePrintableMessageErrorRequest = ({
  kind,
  message,
  location,
  locationTag,
  errorTypeTag,
}: PrintableMessageError): WireDefinitionResponse =>
  new WireDefinitionResponse().setPrintMessageErrorRequest(
    new WirePrintMessageErrorRequest()
      .setErrorTypeTag(errorTypeTag)
      .setKind(kind)
      .setLocation(location)
      .setLocationTag(locationTag)
      .setMessage(message),
  );

export const makePrintTestTitleRequest = ({
  kind,
  icon,
  title,
  additionalText,
}: PrintableTestTitle): WireDefinitionResponse =>
  new WireDefinitionResponse().setPrintTestTitleRequest(
    new WirePrintTestTitleRequest()
      .setKind(kind)
      .setIcon(icon)
      .setTitle(title)
      .setAdditionalText(additionalText),
  );
