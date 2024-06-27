import { GrammarProps } from "@fantastic/compiler";

export const viviLangGrammarInput: GrammarProps = {
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
