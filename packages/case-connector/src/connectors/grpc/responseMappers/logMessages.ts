import {
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
} from '@contract-case/case-boundary';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import {
  ContractResponse as WireContractResponse,
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
}): WireContractResponse =>
  new WireContractResponse().setLogRequest(
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
}: PrintableMatchError): WireContractResponse =>
  new WireContractResponse().setPrintMatchErrorRequest(
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
}: PrintableMessageError): WireContractResponse =>
  new WireContractResponse().setPrintMessageErrorRequest(
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
}: PrintableTestTitle): WireContractResponse =>
  new WireContractResponse().setPrintTestTitleRequest(
    new WirePrintTestTitleRequest()
      .setKind(new StringValue().setValue(kind))
      .setIcon(new StringValue().setValue(icon))
      .setTitle(new StringValue().setValue(title))
      .setAdditionalText(new StringValue().setValue(additionalText)),
  );
