export interface PrintableMatchError {
  kind: string;
  message: string;
  location: string;
  expected: string;
  actual: string;
  locationTag: string;
  errorTypeTag: string;
}

export interface PrintableMessageError {
  kind: string;
  message: string;
  location: string;
  locationTag: string;
  errorTypeTag: string;
}

export interface PrintableTestTitle {
  kind: string;
  icon: string;
  title: string;
  additionalText: string;
}

export interface ResultPrinter {
  printMatchError(MatchErrorDescription: PrintableMatchError): void;
  printMessageError(messageErrorDetails: PrintableMessageError): void;
  printTestTitle(titleDetails: PrintableTestTitle): void;
}
