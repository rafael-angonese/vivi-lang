

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

    test("should interpreter function declarations", () => {
        const input = getInput(`
            function fibonacci (n: int): int {
                if(n == 1) {
                    return 1;
                }
                if(n == 2) {
                    return 2;
                }
                return value;
            };`
        );
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        const tree = parser.parse();
        expect(tree).toBeDefined();
    });

    test("should interpreter nested if statement", () => {
        const input = getInput(`
            if(n == 1) {
                if(n == 2) {
                    return 2;
                }
                return 1;
            }`
        );
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        const tree = parser.parse();
        expect(tree).toBeDefined();
    });

    test("should interpreter if else statement", () => {
        const input = getInput(`
            if(n == 1) {
                return 1;
            } else {
                return 2;
            }`
        );
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        const tree = parser.parse();
        expect(tree).toBeDefined();
    });

    test("should interpreter for statement", () => {
        const input = getInput(`
            for(n: int = 1; a < 10; n) {
                return 1;
            }`
        );
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        const tree = parser.parse();
        expect(tree).toBeDefined();
    });

        test("should interpreter print statement", () => {
        const input = getInput(`
            print(name);
            print(10);
            print(name + 20);
            `
        );
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        const tree = parser.parse();
        expect(tree).toBeDefined();
    });
});
