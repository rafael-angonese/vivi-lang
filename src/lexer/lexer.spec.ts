

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
        const lexer = new Lexer('$');
        expect(() => lexer.tokenize()).toThrow(new LexicalException(`Unexpected character: $`, LEXICAL_EXCEPTION.UNEXPECTED_CHARACTER));
    })
});
