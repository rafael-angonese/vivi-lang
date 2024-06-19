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

// // GLC if:
// const input: GrammarProps = {
//     startSymbol: 'S',
//     terminals: new Set(['if', '(', ')', '{', '}', 'else', 'condition', 'command', 'ε']),
//     nonTerminals: new Set(['S', 'SL', 'CONDITION', 'BLOCK', 'COMMANDS', 'COMMANDSL']),
//     productionRules: [
//         { nonTerminal: 'S', production: ['if', '(', 'CONDITION', ')', 'BLOCK', 'SL'] },
//         { nonTerminal: 'SL', production: ['else', 'BLOCK'] },
//         { nonTerminal: 'SL', production: ['ε'] },
//         { nonTerminal: 'CONDITION', production: ['condition'] },
//         { nonTerminal: 'BLOCK', production: ['{', 'COMMANDS', '}'] },
//         { nonTerminal: 'COMMANDS', production: ['command', 'COMMANDSL'] },
//         { nonTerminal: 'COMMANDSL', production: ['command', 'COMMANDSL'] },
//         { nonTerminal: 'COMMANDSL', production: ['ε'] },
//     ],
// };

// GLC vivi lang:
const input: GrammarProps = {
  startSymbol: "S",
  terminals: new Set([
    "$<vivi>",
    "$</vivi>",
    "ε",
    "function",
    "id",
    "(",
    ")",
    ":",
    "{",
    "}",
    ",",
    ";",
    "=",
    "int",
    "double",
    "boolean",
    "string",
    "if",
    "else",
    "for",
    "==",
    "!=",
    "<",
    "<=",
    ">",
    ">=",
    "return",
    "print",
    "str",
    "+",
    "-",
    "&&",
    "||",
    "*",
    "/",
    "%",
    "integer",
    "decimal",
    "digit",
    "str",
    "true",
    "false",
    "null",
  ]),
  nonTerminals: new Set([
    "S",
    "Script",
    "Statements",
    "FunctionDefinition",
    "FunctionCall",
    "Parameters",
    "ParameterList",
    "MoreParameters",
    "Arguments",
    "ArgumentList",
    "MoreArguments",
    "Statements",
    "Statement",
    "VariableDeclaration",
    "VariableAssignment",
    "Type",
    "IfStatement",
    "ElseClause",
    "ForLoop",
    "Condition",
    "RelationalOp",
    "ReturnStatement",
    "PrintStatement",
    "PrintArgument",
    "Expression",
    "MoreTerms",
    "LogicalOp",
    "Term",
    "MoreFactors",
    "Factor",
  ]),
  productionRules: [
    { nonTerminal: "S", production: ["Script"] },
    {
      nonTerminal: "Script",
      production: ["$<vivi>", "Statements", "$</vivi>"],
    },

    {
      nonTerminal: "FunctionDefinition",
      production: [
        "function",
        "id",
        "(",
        "Parameters",
        ")",
        ":",
        "Type",
        "{",
        "Statements",
        "}",
      ],
    },
    { nonTerminal: "FunctionCall", production: ["id", "(", "Arguments", ")"] },

    { nonTerminal: "Parameters", production: ["ParameterList"] },
    { nonTerminal: "Parameters", production: ["ε"] },
    {
      nonTerminal: "ParameterList",
      production: ["id", ":", "Type", "MoreParameters"],
    },
    {
      nonTerminal: "MoreParameters",
      production: [",", "id", ":", "Type", "MoreParameters"],
    },
    { nonTerminal: "MoreParameters", production: ["ε"] },

    { nonTerminal: "Arguments", production: ["ArgumentList"] },
    { nonTerminal: "Arguments", production: ["ε"] },
    {
      nonTerminal: "ArgumentList",
      production: ["Expression", "MoreArguments"],
    },
    {
      nonTerminal: "MoreArguments",
      production: [",", "Expression", "MoreArguments"],
    },
    { nonTerminal: "MoreArguments", production: ["ε"] },

    { nonTerminal: "Statements", production: ["Statement", "Statements"] },
    { nonTerminal: "Statements", production: ["ε"] },

    { nonTerminal: "Statement", production: ["VariableDeclaration"] },
    { nonTerminal: "Statement", production: ["VariableAssignment"] },
    { nonTerminal: "Statement", production: ["FunctionDefinition"] },
    { nonTerminal: "Statement", production: ["FunctionCall"] },
    { nonTerminal: "Statement", production: ["IfStatement"] },
    { nonTerminal: "Statement", production: ["ForLoop"] },
    { nonTerminal: "Statement", production: ["ReturnStatement"] },
    { nonTerminal: "Statement", production: ["PrintStatement"] },

    {
      nonTerminal: "VariableDeclaration",
      production: ["id", ":", "Type", "Expression", ";"],
    },
    {
      nonTerminal: "VariableAssignment",
      production: ["id", "=", "Expression", ";"],
    },
    { nonTerminal: "Type", production: ["int"] },
    { nonTerminal: "Type", production: ["double"] },
    { nonTerminal: "Type", production: ["boolean"] },
    { nonTerminal: "Type", production: ["string"] },

    {
      nonTerminal: "IfStatement",
      production: [
        "if",
        "(",
        "Condition",
        ")",
        "{",
        "Statements",
        "}",
        "ElseClause",
      ],
    },
    { nonTerminal: "ElseClause", production: ["else", "{", "Statements", "}"] },
    { nonTerminal: "ElseClause", production: ["ε"] },

    {
      nonTerminal: "ForLoop",
      production: [
        "for",
        "(",
        "VariableDeclaration",
        "Condition",
        ";",
        "Expression",
        ")",
        "{",
        "Statements",
        "}",
      ],
    },

    {
      nonTerminal: "Condition",
      production: ["Expression", "RelationalOp", "Expression"],
    },
    {
      nonTerminal: "RelationalOp",
      production: ["==", "!=", "<", "<=", ">", ">="],
    },

    {
      nonTerminal: "ReturnStatement",
      production: ["return", "Expression", ";"],
    },
    { nonTerminal: "ReturnStatement", production: ["return", ";"] },

    {
      nonTerminal: "PrintStatement",
      production: ["print", "(", "PrintArgument", ")", ";"],
    },
    { nonTerminal: "PrintArgument", production: ["Expression", "str"] },

    { nonTerminal: "Expression", production: ["Term", "MoreTerms"] },

    { nonTerminal: "MoreTerms", production: ["+", "Term", "MoreTerms"] },
    { nonTerminal: "MoreTerms", production: ["-", "Term", "MoreTerms"] },
    {
      nonTerminal: "MoreTerms",
      production: ["LogicalOp", "Term", "MoreTerms"],
    },
    { nonTerminal: "MoreTerms", production: ["ε"] },

    { nonTerminal: "LogicalOp", production: ["&&"] },
    { nonTerminal: "LogicalOp", production: ["||"] },

    { nonTerminal: "Term", production: ["Factor", "MoreFactors"] },

    { nonTerminal: "MoreFactors", production: ["*", "Factor", "MoreFactors"] },
    { nonTerminal: "MoreFactors", production: ["/", "Factor", "MoreFactors"] },
    { nonTerminal: "MoreFactors", production: ["%", "Factor", "MoreFactors"] },
    { nonTerminal: "MoreFactors", production: ["ε"] },

    { nonTerminal: "Factor", production: ["(", "Expression", ")"] },
    { nonTerminal: "Factor", production: ["id"] },
    { nonTerminal: "Factor", production: ["integer"] },
    { nonTerminal: "Factor", production: ["decimal"] },
    { nonTerminal: "Factor", production: ["digit"] },
    { nonTerminal: "Factor", production: ["str"] },
    { nonTerminal: "Factor", production: ["true"] },
    { nonTerminal: "Factor", production: ["false"] },
    { nonTerminal: "Factor", production: ["null"] },
  ],
};

const grammar = new Grammar(input);

const first = grammar.calculateFirst();
const follow = grammar.calculateFollow(first);
const parsingTable = grammar.createParsingTable(first, follow);

console.log("--------");
console.log("First Sets:");
console.log(first);
console.log("Follow Sets:");
console.log(follow);
console.log("Parsing Table:");
console.log(parsingTable);
console.log("--------");

// console.log('First Sets:');
// first.forEach((set, symbol) => {
//     console.log(`${symbol}: ${Array.from(set).join(', ')}`);
// });

// console.log('Follow Sets:');
// follow.forEach((set, symbol) => {
//     console.log(`${symbol}: ${Array.from(set).join(', ')}`);
// });
