

import { describe, expect, test } from 'vitest';
import { SyntaxException } from '../exceptions/SyntaxException';
import { Lexer } from '../lexer/lexer';
import { Parser } from './parser';

const getInput = (value: string) => {
    return `$<vivi> ${value} $</vivi>`;
}

describe('Parser', () => {
    test("should parse a variable declaration", () => {
        const input = getInput('x: int = 10;');
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        const tree = parser.parse();
        expect(tree).toBeDefined();
    });
    
    test("should parse an assignment", () => {
        const input = getInput('x = 20;');
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        const tree = parser.parse();
        expect(tree).toBeDefined();
    });
    
    test("should parse an arithmetic expression", () => {
        const input = getInput('x = 5 + 3;');
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        const tree = parser.parse();
        expect(tree).toBeDefined();
    });
    
    test("should throw an exception for syntax error", () => {
        const input = getInput('x = ;');
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        expect(() => parser.parse()).toThrow(SyntaxException);
    });

});
