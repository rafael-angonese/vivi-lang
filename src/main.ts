import { getInput } from "./input/get-input";
import { Lexer } from "./lexer/lexer";

const input = getInput({ fileName: 'input.vivi' });

const lexer = new Lexer(input);

console.log(lexer)
console.log(lexer.nextToken())
console.log(lexer)
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())
console.log(lexer.nextToken())