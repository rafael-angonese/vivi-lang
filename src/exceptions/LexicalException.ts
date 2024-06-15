export enum LEXICAL_EXCEPTION {
  UNEXPECTED_OPERATOR = 'UNEXPECTED_OPERATOR',
  UNEXPECTED_CHARACTER = 'UNEXPECTED_CHARACTER',
  EXPECTED_CHARACTER = 'EXPECTED_CHARACTER',
  UNRECOGNIZED_SYMBOL = 'UNRECOGNIZED_SYMBOL',
};

// throw new Error("Unrecognized Number");
// throw new Error("Unrecognized SYMBOL");
// throw new Error("Malformed Identifier");

export class LexicalException extends Error {
  public readonly errorCode: LEXICAL_EXCEPTION;

  constructor(
    message: string,
    errorCode: LEXICAL_EXCEPTION,
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
  }

  getBody() {
    return {
      message: this.message,
      errorCode: this.errorCode,
    };
  }
}