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
  printMatchError(MatchErrorDescription: PrintableMatchError): Promise<void>;
  printMessageError(messageErrorDetails: PrintableMessageError): Promise<void>;
  printTestTitle(titleDetails: PrintableTestTitle): Promise<void>;
}

export interface ResultStringer {
  stringMatchError(MatchErrorDescription: PrintableMatchError): string;
  stringMessageError(messageErrorDetails: PrintableMessageError): string;
  stringTestTitle(titleDetails: PrintableTestTitle): string;
}
