export enum LEXICAL_EXCEPTION {
  UNEXPECTED_OPERATOR = 'UNEXPECTED_OPERATOR',
  UNEXPECTED_CHARACTER = 'UNEXPECTED_CHARACTER',
  EXPECTED_CHARACTER = 'EXPECTED_CHARACTER',
  UNRECOGNIZED_SYMBOL = 'UNRECOGNIZED_SYMBOL',
};

interface LexicalExceptionProps {
  message: string,
  error: LEXICAL_EXCEPTION,
  line: number,
  column: number,
}

export class LexicalException extends Error {
  public readonly error: LEXICAL_EXCEPTION;
  public readonly line: number;
  public readonly column: number;

  constructor({
    message,
    line,
    column,
    error,
  }: LexicalExceptionProps
  ) {
    super(message);
    this.message = message;
    this.error = error;
    this.line = line;
    this.column = column;
  }

  getBody() {
    return {
      message: this.message,
      error: this.error,
      line: this.line,
      column: this.column,
    };
  }
}