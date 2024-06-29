// import { getInput } from "./input/get-input";
import { Lexer } from "./lexer/lexer";
import { Parser, Tree } from "./parser/parser";
import { Grammar, GrammarProps } from "./grammar/grammar";
import { LexicalException } from "./exceptions/LexicalException";
import { SyntaxException } from "./exceptions/SyntaxException";

// const input = getInput({ fileName: 'input.txt' });
// const input = '$<vivi> idade : int = 3; function lala ( name: int ) : int { return name ; } $</vivi>';

// const lexer = new Lexer(input);

// const tokens = lexer.tokenize();
// console.log(tokens)

// const parser = new Parser(lexer);

// const tree = parser.parse();

// console.log(tree)

function compile(sourceCode: string): Tree {
    const lexer = new Lexer(sourceCode);

    const parser = new Parser(lexer);

    const tree = parser.parse();

    return tree
}

function generateLL1ParsingTable(input: GrammarProps) {
    const grammar = new Grammar(input);

    const first = grammar.calculateFirst();
    const follow = grammar.calculateFollow(first);
    const parsingTable = grammar.createParsingTable(first, follow);

    return {
        first,
        follow,
        parsingTable,
    }
}

export {
    compile,
    generateLL1ParsingTable,
    GrammarProps,
    Tree,
    LexicalException,
    SyntaxException,
}