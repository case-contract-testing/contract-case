import {
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
} from '@contract-case/case-boundary';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
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
      .setLevel(new StringValue().setValue(level))
      .setTimestamp(new StringValue().setValue(timestamp))
      .setVersion(new StringValue().setValue(version))
      .setTypeString(new StringValue().setValue(typeString))
      .setLocation(new StringValue().setValue(location))
      .setMessage(new StringValue().setValue(message))
      .setAdditional(new StringValue().setValue(additional)),
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
      .setActual(new StringValue().setValue(actual))
      .setKind(new StringValue().setValue(kind))
      .setLocationTag(new StringValue().setValue(locationTag))
      .setExpected(new StringValue().setValue(expected))
      .setLocation(new StringValue().setValue(location))
      .setMessage(new StringValue().setValue(message))
      .setErrorTypeTag(new StringValue().setValue(errorTypeTag)),
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
      .setErrorTypeTag(new StringValue().setValue(errorTypeTag))
      .setKind(new StringValue().setValue(kind))
      .setLocation(new StringValue().setValue(location))
      .setLocationTag(new StringValue().setValue(locationTag))
      .setMessage(new StringValue().setValue(message)),
  );

export const makePrintTestTitleRequest = ({
  kind,
  icon,
  title,
  additionalText,
}: PrintableTestTitle): WireDefinitionResponse =>
  new WireDefinitionResponse().setPrintTestTitleRequest(
    new WirePrintTestTitleRequest()
      .setKind(new StringValue().setValue(kind))
      .setIcon(new StringValue().setValue(icon))
      .setTitle(new StringValue().setValue(title))
      .setAdditionalText(new StringValue().setValue(additionalText)),
  );
