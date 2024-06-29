import { LEXICAL_EXCEPTION, LexicalException } from "../exceptions/LexicalException";
import { Token, TokenType } from "../token/token";

const START_REGEX = /\$<vivi>/;
const END_REGEX = /\$<\/vivi>/;
const ID_REGEX = /[a-zA-Z0-9_]/;
const ID_INIT_REGEX = /[a-zA-Z_]/;
const DIGIT_REGEX = /\d/;
const OPERATOR_REGEX = /[+\-*%/]/;
const WHITESPACE_REGEX = /[ \t]/;
const AND_REGEX = /\&/;
const OR_REGEX = /\|/;
const GREATER_THAN_REGEX = /\>/;
const LESS_THAN_REGEX = /\</;
const EQUAL_REGEX = /\=/;
const NOT_REGEX = /\!/;
const DOLLAR_REGEX = /\$/;
const OPEN_PARENTHESIS_REGEX = /\(/;
const CLOSE_PARENTHESIS_REGEX = /\)/;
const OPEN_BRACKET_REGEX = /\[/;
const CLOSE_BRACKET_REGEX = /\]/;
const OPEN_BRACE_REGEX = /\{/;
const CLOSE_BRACE_REGEX = /\}/;
const COLON_REGEX = /\:/;
const SEMICOLON_REGEX = /\;/;
const COMMA_REGEX = /\,/;
const LINE_BREAK_REGEX = /\r?\n|\r/;

export class Lexer {

    content: string
    position: number = 0
    line: number = 1
    column: number = 1
    term: string = ""

    constructor(content: string) {
        this.content = content;
    }

    public tokenize(): Token[] {
        const tokens: Token[] = [];
        let token: Token;

        do {
            token = this.nextToken();
            tokens.push(token);
        } while (token.type !== TokenType.EOF);

        return tokens;
    }

    public nextToken(): Token {

        while (this.currentChar()) {
            if (this.isLineBreak(this.currentChar()!)) {
                this.skipLineBreak();
                continue;
            }

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

            if (this.isAnd(this.currentChar()!)) {
                return this.getAnd();
            }

            if (this.isOr(this.currentChar()!)) {
                return this.getOr();
            }

            if (this.isGreaterThan(this.currentChar()!)) {
                return this.getGreaterThan();
            }

            if (this.isLessThan(this.currentChar()!)) {
                return this.getLessThan();
            }

            if (this.isEqual(this.currentChar()!)) {
                return this.getEqual();
            }

            if (this.isNot(this.currentChar()!)) {
                return this.getNot();
            }

            if (this.isOpenParenthesis(this.currentChar()!)) {
                return this.getOpenParenthesis();
            }

            if (this.isCloseParenthesis(this.currentChar()!)) {
                return this.getCloseParenthesis();
            }

            if (this.isOpenBrace(this.currentChar()!)) {
                return this.getOpenBrace();
            }

            if (this.isCloseBrace(this.currentChar()!)) {
                return this.getCloseBrace();
            }

            if (this.isOpenBracket(this.currentChar()!)) {
                return this.getOpenBracket();
            }

            if (this.isCloseBracket(this.currentChar()!)) {
                return this.getCloseBracket();
            }

            if (this.isColon(this.currentChar()!)) {
                return this.getColon();
            }

            if (this.isSemicolon(this.currentChar()!)) {
                return this.getSemicolon();
            }

            if (this.isComma(this.currentChar()!)) {
                return this.getComma();
            }

            if (this.isDollar(this.currentChar()!)) {
                return this.getDollar();
            }

            if (this.isEOF()) {
                return this.forgeToken(TokenType.EOF);
            }

            throw new LexicalException({
                message: `Unexpected character: ${this.currentChar()}`,
                error: LEXICAL_EXCEPTION.UNEXPECTED_CHARACTER,
                line: this.line,
                column: this.column
            });
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

    private skipLineBreak(): void {
        while (this.currentChar() && this.isLineBreak(this.currentChar()!)) {
            this.line++;
            this.column = -1
            this.advance();
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
            case 'for':
                return this.forgeToken(TokenType.FOR);
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
                throw new LexicalException({
                    message: `Unrecognized operator: ${result}`,
                    error: LEXICAL_EXCEPTION.UNEXPECTED_OPERATOR,
                    line: this.line,
                    column: this.column,
                });
        }
    }

    private getNumber(): Token {
        let result = '';
        let hasDecimalPoint = false;
        while (this.currentChar() && (this.isDigit(this.currentChar()!) || this.currentChar() === '.')) {
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

    private getAnd(): Token {
        if (this.isAnd(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            if (this.isAnd(this.currentChar()!)) {
                this.term += this.currentChar()!
                this.advance();
                return this.forgeToken(TokenType.AND);
            } else {
                throw new LexicalException({
                    message: `Expected '&' after '&'`,
                    error: LEXICAL_EXCEPTION.EXPECTED_CHARACTER,
                    line: this.line,
                    column: this.column,
                });
            }
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getOr(): Token {
        if (this.isOr(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            if (this.isOr(this.currentChar()!)) {
                this.term += this.currentChar()!
                this.advance();
                return this.forgeToken(TokenType.OR);
            } else {
                throw new LexicalException({
                    message: `Expected '|' after '|'`,
                    error: LEXICAL_EXCEPTION.EXPECTED_CHARACTER,
                    line: this.line,
                    column: this.column,
                });
            }
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getGreaterThan(): Token {
        if (this.isGreaterThan(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            if (this.isEqual(this.currentChar()!)) {
                this.term += this.currentChar()!
                this.advance();
                return this.forgeToken(TokenType.GREATER_THAN_OR_EQUAL);
            } else {
                return this.forgeToken(TokenType.GREATER_THAN);
            }
        }

        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getLessThan(): Token {
        if (this.isLessThan(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            if (this.isEqual(this.currentChar()!)) {
                this.term += this.currentChar()!
                this.advance();
                return this.forgeToken(TokenType.LESS_THAN_OR_EQUAL);
            } else {
                return this.forgeToken(TokenType.LESS_THAN);
            }
        }

        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getEqual(): Token {
        if (this.isEqual(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            if (this.isEqual(this.currentChar()!)) {
                this.term += this.currentChar()!
                this.advance();
                return this.forgeToken(TokenType.EQUAL);
            } else {
                return this.forgeToken(TokenType.ASSIGN);
            }
        }

        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getNot(): Token {
        if (this.isNot(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            if (this.isEqual(this.currentChar()!)) {
                this.term += this.currentChar()!
                this.advance();
                return this.forgeToken(TokenType.NOT_EQUAL);
            } else {
                return this.forgeToken(TokenType.NOT);
            }
        }

        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getOpenParenthesis(): Token {
        if (this.isOpenParenthesis(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            return this.forgeToken(TokenType.OPEN_PARENTHESIS);
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getCloseParenthesis(): Token {
        if (this.isCloseParenthesis(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            return this.forgeToken(TokenType.CLOSE_PARENTHESIS);
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getOpenBrace(): Token {
        if (this.isOpenBrace(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            return this.forgeToken(TokenType.OPEN_BRACE);
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getCloseBrace(): Token {
        if (this.isCloseBrace(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            return this.forgeToken(TokenType.CLOSE_BRACE);
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getOpenBracket(): Token {
        if (this.isOpenBracket(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            return this.forgeToken(TokenType.OPEN_BRACKET);
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getCloseBracket(): Token {
        if (this.isCloseBracket(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            return this.forgeToken(TokenType.CLOSE_BRACKET);
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getColon(): Token {
        if (this.isColon(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            return this.forgeToken(TokenType.COLON);
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getSemicolon(): Token {
        if (this.isSemicolon(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            return this.forgeToken(TokenType.SEMICOLON);
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getComma(): Token {
        if (this.isComma(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            return this.forgeToken(TokenType.COMMA);
        }
        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
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

    private isStart(value: string): boolean {
        return START_REGEX.test(value);
    }

    private isEnd(value: string): boolean {
        return END_REGEX.test(value);
    }

    private isDollar(value: string): boolean {
        return DOLLAR_REGEX.test(value);
    }

    private getViviKeywords(): void {
        if (this.currentChar()! === 'v') {
            this.term += this.currentChar()!
            this.advance();
            if (this.currentChar()! === 'i') {
                this.term += this.currentChar()!
                this.advance();
                if (this.currentChar()! === 'v') {
                    this.term += this.currentChar()!
                    this.advance();
                    if (this.currentChar()! === 'i') {
                        this.term += this.currentChar()!
                        this.advance();
                        if (this.isGreaterThan(this.currentChar()!)) {
                            this.term += this.currentChar()!
                            this.advance();
                            return
                        }
                    }
                }
            }
        }

        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private getDollar(): Token {
        if (this.isDollar(this.currentChar()!)) {
            this.term = this.currentChar()!
            this.advance();
            if (this.isLessThan(this.currentChar()!)) {
                this.term += this.currentChar()!
                this.advance();

                if (this.currentChar()! === '/') {
                    this.term += this.currentChar()!
                    this.advance();
                    this.getViviKeywords();
                } else {
                    this.getViviKeywords();
                }

            }
        }

        if (this.isStart(this.term)) {
            return this.forgeToken(TokenType.START);
        }

        if (this.isEnd(this.term)) {
            return this.forgeToken(TokenType.END);
        }

        throw new LexicalException({
            message: `Unrecognized SYMBOL ${this.currentChar()}`,
            error: LEXICAL_EXCEPTION.UNRECOGNIZED_SYMBOL,
            line: this.line,
            column: this.column,
        });
    }

    private isAnd(value: string): boolean {
        return AND_REGEX.test(value);
    }

    private isOr(value: string): boolean {
        return OR_REGEX.test(value);
    }

    private isGreaterThan(value: string): boolean {
        return GREATER_THAN_REGEX.test(value);
    }

    private isLessThan(value: string): boolean {
        return LESS_THAN_REGEX.test(value);
    }

    private isEqual(value: string): boolean {
        return EQUAL_REGEX.test(value);
    }

    private isNot(value: string): boolean {
        return NOT_REGEX.test(value);
    }

    private isOpenParenthesis(value: string): boolean {
        return OPEN_PARENTHESIS_REGEX.test(value);
    }

    private isCloseParenthesis(value: string): boolean {
        return CLOSE_PARENTHESIS_REGEX.test(value);
    }

    private isOpenBracket(value: string): boolean {
        return OPEN_BRACKET_REGEX.test(value);
    }

    private isCloseBracket(value: string): boolean {
        return CLOSE_BRACKET_REGEX.test(value);
    }

    private isOpenBrace(value: string): boolean {
        return OPEN_BRACE_REGEX.test(value);
    }

    private isCloseBrace(value: string): boolean {
        return CLOSE_BRACE_REGEX.test(value);
    }

    private isColon(value: string): boolean {
        return COLON_REGEX.test(value);
    }

    private isSemicolon(value: string): boolean {
        return SEMICOLON_REGEX.test(value);
    }

    private isComma(value: string): boolean {
        return COMMA_REGEX.test(value);
    }

    private nextChar(): string {
        if (this.isEOF()) {
            return '\0';
        }
        return this.content[this.position++];
    }

    private isLineBreak(value: string): boolean {
        return LINE_BREAK_REGEX.test(value);
    }

    private isEOF(): boolean {
        return this.position >= this.content.length;
    }
}