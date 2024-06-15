import { LEXICAL_EXCEPTION, LexicalException } from "../exceptions/LexicalException"
import { Token, TokenType } from "../token/token"

const ID_REGEX = /[a-zA-Z0-9_]/;
const ID_INIT_REGEX = /[a-zA-Z_]/;
const DIGIT_REGEX = /\d/;
const OPERATOR_REGEX = /[+\-*%/]/;
const WHITESPACE_REGEX = /\s/;

export class Lexer {

    content: string
    position: number = 0
    line: number = 1
    column: number = 0
    term: string = ""

    constructor(content: string) {
        this.content = content;
    }

    public tokenize(): Token[] {
        const tokens: Token[] = [];
        let token: Token;

        do {
            token = this.nextToken();
            console.log(token)
            tokens.push(token);
        } while (token.type !== TokenType.EOF);

        return tokens;
    }

    public nextToken(): Token {

        while (this.currentChar()) {
            if (this.isWhitespace(this.currentChar()!)) {
                this.skipWhitespace();
                continue;
            }

            if (this.isChar(this.currentChar()!)) {
                return this.getIdentifier();
            }

            if (this.isDigit(this.currentChar()!)) {
                return this.getNumber();
            }

            if (this.isOperator(this.currentChar()!)) {
                return this.getOperator();
            }

            if (/[\(\)=;]/.test(this.currentChar()!)) {
                // return this.getSymbol();
            }

            // return this.forgeToken(TokenType.EOF);
            throw new LexicalException(`Unexpected character: ${this.currentChar()}`, LEXICAL_EXCEPTION.UNEXPECTED_CHARACTER);
        }

        return this.forgeToken(TokenType.EOF);
    }


    private currentChar(): string | null {
        if (this.position >= this.content.length) {
            return null;
        }
        return this.content[this.position];
    }

    private advance(): void {
        this.position++;
        this.column++;
    }

    private back(): void {
        this.position--;
        this.column--;
    }

    private forgeToken(type: TokenType): Token {
        return {
            type,
            value: type === TokenType.EOF ? '' : this.term,
            line: this.line,
            column: this.column - this.term.length + 1
        }
    }

    private skipWhitespace(): void {
        while (this.currentChar() && this.isWhitespace(this.currentChar()!)) {
            this.advance();
        }
    }

    private getIdentifier(): Token {
        let result = '';
        while (this.currentChar() && this.isIdentifier(this.currentChar()!)) {
            result += this.currentChar();
            this.advance();
        }
        this.term = result;

        switch (result) {
            case 'int':
                return this.forgeToken(TokenType.INT);
            case 'double':
                return this.forgeToken(TokenType.DOUBLE);
            case 'boolean':
                return this.forgeToken(TokenType.BOOLEAN);
            case 'string':
                return this.forgeToken(TokenType.STRING);
            case 'if':
                return this.forgeToken(TokenType.IF);
            case 'else':
                return this.forgeToken(TokenType.ELSE);
            case 'return':
                return this.forgeToken(TokenType.RETURN);
            case 'function':
                return this.forgeToken(TokenType.FUNCTION);
            case 'true':
                return this.forgeToken(TokenType.TRUE);
            case 'false':
                return this.forgeToken(TokenType.FALSE);
            case 'null':
                return this.forgeToken(TokenType.NULL);
            case 'print':
                return this.forgeToken(TokenType.PRINT);
            default:
                return this.forgeToken(TokenType.ID);
        }
    }

    private getOperator(): Token {
        const result = this.currentChar()!;
        this.advance();
        this.term = result;

        switch (result) {
            case '+':
                return this.forgeToken(TokenType.PLUS);
            case '-':
                return this.forgeToken(TokenType.MINUS);
            case '*':
                return this.forgeToken(TokenType.MULTIPLY);
            case '/':
                return this.forgeToken(TokenType.DIVIDE);
            case '%':
                return this.forgeToken(TokenType.MOD);
            default:
                throw new LexicalException(`Unrecognized operator: ${result}`, LEXICAL_EXCEPTION.UNEXPECTED_OPERATOR);
        }
    }

    private getNumber(): Token {
        let result = '';
        let hasDecimalPoint = false;
        while (this.currentChar() && (/\d/.test(this.currentChar()!) || this.currentChar() === '.')) {
            if (this.currentChar() === '.') {
                if (hasDecimalPoint) {
                    break;
                }
                hasDecimalPoint = true;
            }
            result += this.currentChar();
            this.advance();
        }
        this.term = result;
        const tokenType = hasDecimalPoint ? TokenType.DECIMAL : TokenType.INTEGER;
        return this.forgeToken(tokenType);
    }

    private isDigit(value: string): boolean {
        return DIGIT_REGEX.test(value);
    }

    private isChar(value: string): boolean {
        return ID_INIT_REGEX.test(value);
    }

    private isOperator(value: string): boolean {
        return OPERATOR_REGEX.test(value);
    }

    private isWhitespace(value: string): boolean {
        return WHITESPACE_REGEX.test(value);
    }

    private isIdentifier(value: string): boolean {
        return ID_REGEX.test(value);
    }

    private nextChar(): string {
        if (this.isEOF()) {
            return '\0';
        }
        return this.content[this.position++];
    }


    private isEOFL(value: string): boolean {
        return value == '\0';
    }

    private isEOF(): boolean {
        return this.position >= this.content.length;
    }
}