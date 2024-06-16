import { Token, TokenType } from "../token/token";

export enum SYNTAX_EXCEPTION {
  UNEXPECTED_TOKEN = 'UNEXPECTED_TOKEN',
  EXPECTED_TOKEN = 'EXPECTED_TOKEN',
};

interface SyntaxExceptionProps {
  message: string,
  error: SYNTAX_EXCEPTION,
  token: Token,
  tokenType: TokenType
}

export class SyntaxException extends Error {
  public readonly error: SYNTAX_EXCEPTION;
  public readonly token: Token;
  public readonly tokenType: TokenType;
  
  constructor({
    message,
    token,
    error,
    tokenType,
  }: SyntaxExceptionProps
  ) {
    super(message);
    this.message = message;
    this.error = error;
    this.token = token;
    this.tokenType = tokenType
  }

  getBody() {
    return {
      message: this.message,
      error: this.error,
      token: this.token,
      tokenType: this
    };
  }
}