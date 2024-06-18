import { Grammar, GrammarProps } from "./grammar/grammar";

// GLC Operadores relacionais:
// const input: GrammarProps = {
//     startSymbol: 'S',
//     terminals: new Set(['id', '(', ')', '>', '>=', '<', '<=', '==', '!=']),
//     nonTerminals: new Set(['S', 'O', 'F']),
//     productionRules: [
//         { nonTerminal: 'S', production: ['F', 'O', 'F'] },
//         { nonTerminal: 'O', production: ['>'] },
//         { nonTerminal: 'O', production: ['>='] },
//         { nonTerminal: 'O', production: ['<'] },
//         { nonTerminal: 'O', production: ['<='] },
//         { nonTerminal: 'O', production: ['<='] },
//         { nonTerminal: 'O', production: ['!='] },
//         { nonTerminal: 'F', production: ['(', 'S', ')'] },
//         { nonTerminal: 'F', production: ['id'] }
//     ],
// };

// // GLC Operadores lógicos:
// const input: GrammarProps = {
//     startSymbol: 'S',
//     terminals: new Set(['id', '(', ')', 'not', 'and', 'or', 'ε']),
//     nonTerminals: new Set(['S', 'E', 'EL', 'T', 'TL', 'F']),
//     productionRules: [
//         { nonTerminal: 'S', production: ['E'] },
//         { nonTerminal: 'E', production: ['T', 'EL'] },
//         { nonTerminal: 'EL', production: ['or', 'T', 'EL'] },
//         { nonTerminal: 'EL', production: ['ε'] },
//         { nonTerminal: 'T', production: ['F', 'TL'] },
//         { nonTerminal: 'TL', production: ['and', 'F', 'TL'] },
//         { nonTerminal: 'TL', production: ['ε'] },
//         { nonTerminal: 'F', production: ['not', 'F'] },
//         { nonTerminal: 'F', production: ['(', 'E', ')'] },
//         { nonTerminal: 'F', production: ['id'] },
//     ],
// };

// GLC if:
const input: GrammarProps = {
    startSymbol: 'S',
    terminals: new Set(['if', '(', ')', '{', '}', 'else', 'condition', 'command', 'ε']),
    nonTerminals: new Set(['S', 'SL', 'CONDITION', 'BLOCK', 'COMMANDS', 'COMMANDSL']),
    productionRules: [
        { nonTerminal: 'S', production: ['if', '(', 'CONDITION', ')', 'BLOCK', 'SL'] },
        { nonTerminal: 'SL', production: ['else', 'BLOCK'] },
        { nonTerminal: 'SL', production: ['ε'] },
        { nonTerminal: 'CONDITION', production: ['condition'] },
        { nonTerminal: 'BLOCK', production: ['{', 'COMMANDS', '}'] },
        { nonTerminal: 'COMMANDS', production: ['command', 'COMMANDSL'] },
        { nonTerminal: 'COMMANDSL', production: ['command', 'COMMANDSL'] },
        { nonTerminal: 'COMMANDSL', production: ['ε'] },
    ],
};

const grammar = new Grammar(input);

const first = grammar.calculateFirst();
const follow = grammar.calculateFollow(first);

console.log("--------")
console.log('First Sets:');
console.log(first)
console.log('Follow Sets:');
console.log(follow)
console.log("--------")

// console.log('First Sets:');
// first.forEach((set, symbol) => {
//     console.log(`${symbol}: ${Array.from(set).join(', ')}`);
// });

// console.log('Follow Sets:');
// follow.forEach((set, symbol) => {
//     console.log(`${symbol}: ${Array.from(set).join(', ')}`);
// });
