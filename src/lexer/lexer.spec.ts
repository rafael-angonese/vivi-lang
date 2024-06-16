

import { describe, expect, test } from 'vitest';
import { TokenType } from '../token/token';
import { Lexer } from './lexer';
import { LEXICAL_EXCEPTION, LexicalException } from '../exceptions/LexicalException';

describe('Lexer', () => {
    test("should tokenize a simple ID declaration", () => {
        const lexer = new Lexer('value');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.ID);
        expect(token.value).toEqual('value');
    })

    test("should tokenize a simple INTEGER declaration", () => {
        const lexer = new Lexer('123');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.INTEGER);
        expect(token.value).toEqual('123');
    })

    test("should tokenize a simple DECIMAL declaration", () => {
        const lexer = new Lexer('123.123');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.DECIMAL);
        expect(token.value).toEqual('123.123');
    })

    test("should tokenize a simple INT declaration", () => {
        const lexer = new Lexer('int');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.INT);
        expect(token.value).toEqual('int');
    })

    test("should tokenize a simple DOUBLE declaration", () => {
        const lexer = new Lexer('double');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.DOUBLE);
        expect(token.value).toEqual('double');
    })

    test("should tokenize a simple BOOLEAN declaration", () => {
        const lexer = new Lexer('boolean');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.BOOLEAN);
        expect(token.value).toEqual('boolean');
    })

    test("should tokenize a simple IF declaration", () => {
        const lexer = new Lexer('if');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.IF);
        expect(token.value).toEqual('if');
    })

    test("should tokenize a simple ELSE declaration", () => {
        const lexer = new Lexer('else');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.ELSE);
        expect(token.value).toEqual('else');
    })

    test("should tokenize a simple RETURN declaration", () => {
        const lexer = new Lexer('return');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.RETURN);
        expect(token.value).toEqual('return');
    })

    test("should tokenize a simple FUNCTION declaration", () => {
        const lexer = new Lexer('function');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.FUNCTION);
        expect(token.value).toEqual('function');
    })

    test("should tokenize a simple TRUE declaration", () => {
        const lexer = new Lexer('true');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.TRUE);
        expect(token.value).toEqual('true');
    })

    test("should tokenize a simple FALSE declaration", () => {
        const lexer = new Lexer('false');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.FALSE);
        expect(token.value).toEqual('false');
    })

    test("should tokenize a simple NULL declaration", () => {
        const lexer = new Lexer('null');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.NULL);
        expect(token.value).toEqual('null');
    })

    test("should tokenize a simple PRINT declaration", () => {
        const lexer = new Lexer('print');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.PRINT);
        expect(token.value).toEqual('print');
    })

    test("should tokenize a simple PLUS declaration", () => {
        const lexer = new Lexer('+');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.PLUS);
        expect(token.value).toEqual('+');
    })

    test("should tokenize a simple MINUS declaration", () => {
        const lexer = new Lexer('-');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.MINUS);
        expect(token.value).toEqual('-');
    })

    test("should tokenize a simple MULTIPLY declaration", () => {
        const lexer = new Lexer('*');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.MULTIPLY);
        expect(token.value).toEqual('*');
    })

    test("should tokenize a simple DIVIDE declaration", () => {
        const lexer = new Lexer('/');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.DIVIDE);
        expect(token.value).toEqual('/');
    })

    test("should throw LEXICAL_EXCEPTION.UNEXPECTED_CHARACTER for invalid character", () => {
        const lexer = new Lexer('#');
        expect(() => lexer.tokenize()).toThrow(new LexicalException(`Unexpected character: #`, LEXICAL_EXCEPTION.UNEXPECTED_CHARACTER));
    })

    test("should tokenize a simple AND declaration", () => {
        const lexer = new Lexer('&&');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.AND);
        expect(token.value).toEqual('&&');
    })

    test("should tokenize a simple OR declaration", () => {
        const lexer = new Lexer('||');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.OR);
        expect(token.value).toEqual('||');
    })

    test("should tokenize a simple GREATER_THAN declaration", () => {
        const lexer = new Lexer('>');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.GREATER_THAN);
        expect(token.value).toEqual('>');
    })

    test("should tokenize a simple GREATER_THAN_OR_EQUAL declaration", () => {
        const lexer = new Lexer('>=');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.GREATER_THAN_OR_EQUAL);
        expect(token.value).toEqual('>=');
    })

    test("should tokenize a simple LESS_THAN declaration", () => {
        const lexer = new Lexer('<');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.LESS_THAN);
        expect(token.value).toEqual('<');
    })

    test("should tokenize a simple LESS_THAN_OR_EQUAL declaration", () => {
        const lexer = new Lexer('<=');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.LESS_THAN_OR_EQUAL);
        expect(token.value).toEqual('<=');
    })

    test("should tokenize a simple ASSIGN declaration", () => {
        const lexer = new Lexer('=');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.ASSIGN);
        expect(token.value).toEqual('=');
    })

    test("should tokenize a simple EQUAL declaration", () => {
        const lexer = new Lexer('==');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.EQUAL);
        expect(token.value).toEqual('==');
    })

    test("should tokenize a simple NOT declaration", () => {
        const lexer = new Lexer('!');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.NOT);
        expect(token.value).toEqual('!');
    })

    test("should tokenize a simple NOT_EQUAL declaration", () => {
        const lexer = new Lexer('!=');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.NOT_EQUAL);
        expect(token.value).toEqual('!=');
    })

    test("should tokenize a simple OPEN_PARENTHESIS declaration", () => {
        const lexer = new Lexer('(');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.OPEN_PARENTHESIS);
        expect(token.value).toEqual('(');
    })

    test("should tokenize a simple CLOSE_PARENTHESIS declaration", () => {
        const lexer = new Lexer(')');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.CLOSE_PARENTHESIS);
        expect(token.value).toEqual(')');
    })

    test("should tokenize a simple OPEN_BRACKET declaration", () => {
        const lexer = new Lexer('[');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.OPEN_BRACKET);
        expect(token.value).toEqual('[');
    })

    test("should tokenize a simple CLOSE_BRACKET declaration", () => {
        const lexer = new Lexer(']');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.CLOSE_BRACKET);
        expect(token.value).toEqual(']');
    })

    test("should tokenize a simple OPEN_BRACE declaration", () => {
        const lexer = new Lexer('{');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.OPEN_BRACE);
        expect(token.value).toEqual('{');
    })

    test("should tokenize a simple CLOSE_BRACE declaration", () => {
        const lexer = new Lexer('}');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.CLOSE_BRACE);
        expect(token.value).toEqual('}');
    })

    test("should tokenize a simple COLON declaration", () => {
        const lexer = new Lexer(':');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.COLON);
        expect(token.value).toEqual(':');
    })

    test("should tokenize a simple SEMICOLON declaration", () => {
        const lexer = new Lexer(';');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.SEMICOLON);
        expect(token.value).toEqual(';');
    })

    test("should tokenize a simple START declaration", () => {
        const lexer = new Lexer('$<vivi>');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.START);
        expect(token.value).toEqual('$<vivi>');
    })

    test("should tokenize a simple END declaration", () => {
        const lexer = new Lexer('$</vivi>');
        const [token] = lexer.tokenize();

        expect(token.type).toEqual(TokenType.END);
        expect(token.value).toEqual('$</vivi>');
    })
});
