import { getInput } from "./input/get-input";
import { Lexer } from "./lexer/lexer";
import { Parser } from "./parser/parser";

const input = getInput({ fileName: 'input.vivi' });
// const input = '$<vivi> idade : int = 3; function lala ( name: int ) : int { return name ; } $</vivi>';

const lexer = new Lexer(input);

// const tokens = lexer.tokenize();
// console.log(tokens)

const parser = new Parser(lexer);

const tree = parser.parse();

console.log(tree)