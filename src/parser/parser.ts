import { SYNTAX_EXCEPTION, SyntaxException } from "../exceptions/SyntaxException";
import { Lexer } from "../lexer/lexer";
import { Token, TokenType } from "../token/token";

interface Tree {
    nodeType: TokenType;
    value?: string;
    left?: Tree | null;
    right?: Tree | null;
    children?: Tree[] | null;
}

export class Parser {
    private currentToken: Token;

    constructor(private lexer: Lexer) {
        this.currentToken = this.lexer.nextToken();
    }

    private eat(tokenType: TokenType) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.lexer.nextToken();
        } else {
            throw new SyntaxException({
                message: `${tokenType} expected, but found ${this.currentToken.type}`,
                token: this.currentToken,
                tokenType: tokenType,
                error: SYNTAX_EXCEPTION.EXPECTED_TOKEN
            });
        }
    }

    public parse(): Tree {
        return this.S();
    }

    S(): Tree {
        // S → Script
        return this.Script();
    }

    Script(): Tree {
        // Script → \vivi Statements vivi\
        this.eat(TokenType.START);
        const statements = this.Statements();
        this.eat(TokenType.END);

        return {
            nodeType: TokenType.START,
            left: statements,
            right: {
                nodeType: TokenType.END,
                left: null,
                right: null
            }
        };
    }

    Statements(): Tree | null {
        // Statements → Statement Statements | &

        if (this.currentToken.type !== TokenType.END) {
            const statement = this.Statement();
            const statements = this.Statements();

            return {
                nodeType: TokenType.ID,
                left: statement,
                right: statements
            };
        }
        return null;
    }

    Statement(): Tree {
        switch (this.currentToken.type) {
            case TokenType.ID:
                return this.IdStatement();
            case TokenType.FUNCTION:
                return this.FunctionDefinition();
            case TokenType.IF:
                return this.IfStatement();
            case TokenType.FOR:
                return this.ForLoop();
            case TokenType.RETURN:
                return this.ReturnStatement();
            case TokenType.PRINT:
                return this.PrintStatement();
            default:
                throw new SyntaxException({
                    message: `Unexpected token: ${this.currentToken.type}`,
                    token: this.currentToken,
                    tokenType: this.currentToken.type,
                    error: SYNTAX_EXCEPTION.UNEXPECTED_TOKEN
                });
        }
    }

    IdStatement(): Tree {
        // IdStatement → id IdStatementLine
        const idToken = this.currentToken;
        this.eat(TokenType.ID);
        const idStatementLine = this.IdStatementLine(idToken.value);

        return idStatementLine;
    }

    IdStatementLine(idValue: string): Tree {
        // IdStatementLine → : Type = Expression ; | = Expression ; | ( Arguments )
        switch (this.currentToken.type) {
            case TokenType.COLON:
                this.eat(TokenType.COLON);
                const type = this.Type();
                this.eat(TokenType.ASSIGN);
                const expr1 = this.Expression();
                this.eat(TokenType.SEMICOLON);
                return {
                    nodeType: TokenType.ID,
                    value: idValue,
                    left: type,
                    right: expr1
                };
            case TokenType.ASSIGN:
                this.eat(TokenType.ASSIGN);
                const expr2 = this.Expression();
                this.eat(TokenType.SEMICOLON);
                return {
                    nodeType: TokenType.ID,
                    value: idValue,
                    left: expr2
                };
            case TokenType.OPEN_PARENTHESIS:
                this.eat(TokenType.OPEN_PARENTHESIS);
                const args = this.Arguments();
                this.eat(TokenType.CLOSE_PARENTHESIS);
                return {
                    nodeType: TokenType.ID,
                    value: idValue,
                    left: args
                };
            default:
                throw new SyntaxException({
                    message: `Unexpected token in IdStatementLine: ${this.currentToken.type}`,
                    token: this.currentToken,
                    tokenType: this.currentToken.type,
                    error: SYNTAX_EXCEPTION.UNEXPECTED_TOKEN
                });
        }
    }


    VariableDeclaration(): Tree {
        // VariableDeclaration → id : Type = Expression ;
        const idToken = this.currentToken;
        this.eat(TokenType.ID);
        this.eat(TokenType.COLON);
        const type = this.Type();
        this.eat(TokenType.ASSIGN);
        const expression = this.Expression();
        this.eat(TokenType.SEMICOLON);

        return {
            nodeType: TokenType.ID,
            value: idToken.value,
            left: type,
            right: expression
        };
    }

    Type(): Tree {
        // Type → int | double | boolean | string
        const token = this.currentToken;
        switch (token.type) {
            case TokenType.INT:
            case TokenType.DOUBLE:
            case TokenType.BOOLEAN:
            case TokenType.STRING:
                this.eat(token.type);
                return { nodeType: token.type, value: token.value };
            default:
                throw new SyntaxException({
                    message: `Unexpected type: ${token.type}`,
                    token: token,
                    tokenType: token.type,
                    error: SYNTAX_EXCEPTION.UNEXPECTED_TOKEN
                });
        }
    }

    Expression(): Tree {
        // Expression → Term MoreTerms
        const term = this.Term();
        const moreTerms = this.MoreTerms();
        if (moreTerms) {
            return {
                nodeType: TokenType.ID,
                left: term,
                right: moreTerms
            };
        }
        return term;
    }

    MoreTerms(): Tree | null {
        // MoreTerms → + Term MoreTerms | - Term MoreTerms | LogicalOp Term MoreTerms | &
        switch (this.currentToken.type) {
            case TokenType.PLUS:
            case TokenType.MINUS:
            case TokenType.AND:
            case TokenType.OR:
                const token = this.currentToken;
                this.eat(token.type);
                const term = this.Term();
                const moreTerms = this.MoreTerms();
                return {
                    nodeType: token.type,
                    left: term,
                    right: moreTerms
                };
            default:
                return null;
        }
    }

    Term(): Tree {
        // Term → Factor MoreFactors
        const factor = this.Factor();
        const moreFactors = this.MoreFactors();
        if (moreFactors) {
            return {
                nodeType: TokenType.ID,
                left: factor,
                right: moreFactors
            };
        }
        return factor;
    }

    MoreFactors(): Tree | null {
        // MoreFactors → * Factor MoreFactors | / Factor MoreFactors | % Factor MoreFactors | &
        switch (this.currentToken.type) {
            case TokenType.MULTIPLY:
            case TokenType.DIVIDE:
            case TokenType.MOD:
                const token = this.currentToken;
                this.eat(token.type);
                const factor = this.Factor();
                const moreFactors = this.MoreFactors();
                return {
                    nodeType: token.type,
                    left: factor,
                    right: moreFactors
                };
            default:
                return null;
        }
    }

    Factor(): Tree {
        // Factor → ( Expression ) | id | integer | decimal | digit | str | true | false | null
        switch (this.currentToken.type) {
            case TokenType.OPEN_PARENTHESIS:
                this.eat(TokenType.OPEN_PARENTHESIS);
                const expression = this.Expression();
                this.eat(TokenType.CLOSE_PARENTHESIS);
                return expression;
            case TokenType.ID:
            case TokenType.INTEGER:
            case TokenType.DECIMAL:
            case TokenType.TRUE:
            case TokenType.FALSE:
            case TokenType.NULL:
                const token = this.currentToken;
                this.eat(token.type);
                return { nodeType: token.type, value: token.value };
            default:
                throw new SyntaxException({
                    message: `Unexpected factor: ${this.currentToken.type}`,
                    token: this.currentToken,
                    tokenType: this.currentToken.type,
                    error: SYNTAX_EXCEPTION.UNEXPECTED_TOKEN
                });
        }
    }

    FunctionDefinition(): Tree {
        // FunctionDefinition → function id ( Parameters ) : Type { Statements };
        let statements: Tree | null = null
        this.eat(TokenType.FUNCTION);
        const idToken = this.currentToken;
        this.eat(TokenType.ID);
        this.eat(TokenType.OPEN_PARENTHESIS);
        const parameters = this.Parameters();
        this.eat(TokenType.CLOSE_PARENTHESIS);
        this.eat(TokenType.COLON);
        const returnType = this.Type();
        this.eat(TokenType.OPEN_BRACE);
        if (this.currentToken.type !== TokenType.CLOSE_BRACE) {
            statements = this.Statements();
        }
        this.eat(TokenType.CLOSE_BRACE);
        this.eat(TokenType.SEMICOLON);


        let children: Tree[] = []

        if (parameters) children.push(parameters)
        children.push(returnType)
        if (statements) children.push(statements)

        return {
            nodeType: TokenType.FUNCTION,
            value: idToken.value,
            children
        };
    }

    Parameters(): Tree | null {
        // Parameters → ParameterList | &
        if (this.currentToken.type === TokenType.CLOSE_PARENTHESIS) {
            return null;
        }
        return this.ParameterList();
    }

    ParameterList(): Tree {
        // ParameterList → id : Type MoreParameters
        const idToken = this.currentToken;
        this.eat(TokenType.ID);
        this.eat(TokenType.COLON);
        const type = this.Type();
        const moreParameters = this.MoreParameters();

        return {
            nodeType: TokenType.ID,
            value: idToken.value,
            left: type,
            right: moreParameters
        };
    }

    MoreParameters(): Tree | null {
        // MoreParameters → , id : Type MoreParameters | &
        if (this.currentToken.type === TokenType.COMMA) {
            this.eat(TokenType.COMMA);
            const idToken = this.currentToken;
            this.eat(TokenType.ID);
            this.eat(TokenType.COLON);
            const type = this.Type();
            const moreParameters = this.MoreParameters();

            return {
                nodeType: TokenType.ID,
                value: idToken.value,
                left: type,
                right: moreParameters
            };
        }
        return null;
    }

    Arguments(): Tree | null {
        // Arguments → ArgumentList | &
        if (this.currentToken.type === TokenType.CLOSE_PARENTHESIS) {
            return null;
        }
        return this.ArgumentList();
    }

    ArgumentList(): Tree {
        // ArgumentList → Expression MoreArguments
        const expression = this.Expression();
        const moreArguments = this.MoreArguments();

        return {
            nodeType: TokenType.ID,
            left: expression,
            right: moreArguments
        };
    }

    MoreArguments(): Tree | null {
        // MoreArguments → , Expression MoreArguments | &
        if (this.currentToken.type === TokenType.COMMA) {
            this.eat(TokenType.COMMA);
            const expression = this.Expression();
            const moreArguments = this.MoreArguments();

            return {
                nodeType: TokenType.ID,
                left: expression,
                right: moreArguments
            };
        }
        return null;
    }

    IfStatement(): Tree {
        // IfStatement → if ( Condition ) { Statements } ElseClause
        this.eat(TokenType.IF);
        this.eat(TokenType.OPEN_PARENTHESIS);
        const condition = this.Condition();
        this.eat(TokenType.CLOSE_PARENTHESIS);
        this.eat(TokenType.OPEN_BRACE);
        const statements = this.Statements();
        this.eat(TokenType.CLOSE_BRACE);
        const elseClause = this.ElseClause();

        return {
            nodeType: TokenType.IF,
            left: condition,
            right: {
                nodeType: TokenType.ID,
                left: statements,
                right: elseClause
            }
        };
    }

    ElseClause(): Tree | null {
        // ElseClause → else { Statements } | &
        if (this.currentToken.type === TokenType.ELSE) {
            this.eat(TokenType.ELSE);
            this.eat(TokenType.OPEN_BRACE);
            const statements = this.Statements();
            this.eat(TokenType.CLOSE_BRACE);

            return {
                nodeType: TokenType.ELSE,
                left: statements
            };
        }
        return null;
    }

    ForLoop(): Tree {
        // ForLoop → for ( VariableDeclaration Condition ; Expression ) { Statements }
        this.eat(TokenType.FOR);
        this.eat(TokenType.OPEN_PARENTHESIS);
        const varDecl = this.VariableDeclaration();
        const condition = this.Condition();
        this.eat(TokenType.SEMICOLON);
        const expression = this.Expression();
        this.eat(TokenType.CLOSE_PARENTHESIS);
        this.eat(TokenType.OPEN_BRACE);
        const statements = this.Statements();
        this.eat(TokenType.CLOSE_BRACE);

        let children: Tree[] = [varDecl, condition, expression]
        if (statements) children.push(statements)
        return {
            nodeType: TokenType.FOR,
            children,
        };
    }

    Condition(): Tree {
        // Condition → Expression RelationalOp Expression
        const leftExpression = this.Expression();
        const relationalOp = this.RelationalOp();
        const rightExpression = this.Expression();

        return {
            nodeType: relationalOp.nodeType,
            left: leftExpression,
            right: rightExpression
        };
    }

    RelationalOp(): Tree {
        // RelationalOp → == | != | < | > | <= | >=
        const token = this.currentToken;
        switch (token.type) {
            case TokenType.EQUAL:
            case TokenType.NOT_EQUAL:
            case TokenType.LESS_THAN:
            case TokenType.GREATER_THAN:
            case TokenType.LESS_THAN_OR_EQUAL:
            case TokenType.GREATER_THAN_OR_EQUAL:
                this.eat(token.type);
                return { nodeType: token.type, value: token.value };
            default:
                throw new SyntaxException({
                    message: `Unexpected relational operator: ${token.type}`,
                    token: token,
                    tokenType: token.type,
                    error: SYNTAX_EXCEPTION.UNEXPECTED_TOKEN
                });
        }
    }

    ReturnStatement(): Tree {
        // ReturnStatement → return Expression ; | return ;
        this.eat(TokenType.RETURN);
        if (this.currentToken.type !== TokenType.SEMICOLON) {
            const expression = this.Expression();
            this.eat(TokenType.SEMICOLON);
            return {
                nodeType: TokenType.RETURN,
                left: expression
            };
        } else {
            this.eat(TokenType.SEMICOLON);
            return { nodeType: TokenType.RETURN };
        }
    }

    PrintStatement(): Tree {
        // PrintStatement → print ( PrintArgument ) ;
        this.eat(TokenType.PRINT);
        this.eat(TokenType.OPEN_PARENTHESIS);
        const printArgument = this.PrintArgument();
        this.eat(TokenType.CLOSE_PARENTHESIS);
        this.eat(TokenType.SEMICOLON);

        return {
            nodeType: TokenType.PRINT,
            left: printArgument
        };
    }

    PrintArgument(): Tree {
        // PrintArgument → Expression | str
        if (this.currentToken.type === TokenType.ID ||
            this.currentToken.type === TokenType.INTEGER ||
            this.currentToken.type === TokenType.DECIMAL ||
            this.currentToken.type === TokenType.TRUE ||
            this.currentToken.type === TokenType.FALSE ||
            this.currentToken.type === TokenType.NULL) {
            return this.Expression();
        } else if (this.currentToken.type === TokenType.STRING) {
            const token = this.currentToken;
            this.eat(TokenType.STRING);
            return { nodeType: TokenType.STRING, value: token.value };
        } else {
            throw new SyntaxException({
                message: `Unexpected print argument: ${this.currentToken.type}`,
                token: this.currentToken,
                tokenType: this.currentToken.type,
                error: SYNTAX_EXCEPTION.UNEXPECTED_TOKEN
            });
        }
    }
}