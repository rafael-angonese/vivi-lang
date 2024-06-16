export enum TokenType {
  ID = 'id',
  INTEGER = 'integer',
  DECIMAL = 'decimal',
  START = '$<vivi>',
  END = '$</vivi>',

  // reserved keywords
  INT = 'int',
  DOUBLE = 'double',
  BOOLEAN = 'boolean',
  STRING = 'string',
  IF = 'if',
  ELSE = 'else',
  RETURN = 'return',
  FUNCTION = 'function',
  TRUE = 'true',
  FALSE = 'false',
  NULL = 'null',
  PRINT = 'print',
  FOR = 'for',

  // arithmetic operators
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  MOD = '%',

  ASSIGN = '=',

  // logic operators
  AND = "&&",
  OR = "||",
  NOT = "!",

  // relational operators
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL = '<=',
  EQUAL = '==',
  NOT_EQUAL = '!=',

  // special symbols
  OPEN_PARENTHESIS = '(',
  CLOSE_PARENTHESIS = ')',
  OPEN_BRACKET = '[',
  CLOSE_BRACKET = ']',
  OPEN_BRACE = '{',
  CLOSE_BRACE = '}',
  COLON = ':',
  SEMICOLON = ';',
  COMMA = ',',

  EOF = 'EOF',
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}