import { Token } from "../token/token"


export class Lexer {

    content: string = ""
    state: number = 0
    position: number = 0
    line: number = 1
    column: number = 1
    term: string = ""


    constructor(content: string) {
        this.content = content;
    }

    public nextToken() {

        let currentChar = "" // this.content[this.position]

        if (this.isEOF()) {
			return null;
		}

        this.state = 0

        while(true) {
            currentChar = this.nextChar();
			this.column++;

            switch(this.state) {
                case 0:
                    if (this.isChar(currentChar)) {
                        this.term += currentChar;
                        this.state = 1;
                    }
                    else if (this.isDigit(currentChar)) {
                        this.state = 2;
                        this.term += currentChar;
                    }
                    else if (this.isSpace(currentChar)) {
                        this.state = 0;
                    }
                    else if (this.isOperator(currentChar)) {
                        this.term += currentChar;
                        const token = new Token();
                        token.setType(Token.TK_OPERATOR);
                        token.setText(this.term);
                        token.setLine(this.line);
                        token.setColumn(this.column - this.term.length);
                        return token;
                    }
                    else {
                        // throw new IsiLexicalException("Unrecognized SYMBOL");
                        throw new Error("Unrecognized SYMBOL");
                    }
                    break;
                case 1:
                    if (this.isChar(currentChar) || this.isDigit(currentChar)) {
                        this.state = 1;
                        this.term += currentChar;
                    }
                    else if (this.isSpace(currentChar) || this.isOperator(currentChar) || this.isEOFL(currentChar)){
                        if (!this.isEOFL(currentChar))
                            this.back();
                        const token = new Token();
                        token.setType(Token.TK_IDENTIFIER);
                        token.setText(this.term);
                        token.setLine(this.line);
                        token.setColumn(this.column - this.term.length);
                        return token;
                    }
                    else {
                        // throw new IsiLexicalException("Malformed Identifier");
                        throw new Error("Malformed Identifier");
                    }
                    break;
                case 2:
                    if (this.isDigit(currentChar) || currentChar == '.') {
                        this.state = 2;
                        this.term += currentChar;
                    }
                    else if (!this.isChar(currentChar) || this.isEOFL(currentChar)) {
                        if (!this.isEOFL(currentChar))
                            this.back();
                        const token = new Token();
                        token.setType(Token.TK_NUMBER);
                        token.setText(this.term);
                        token.setLine(this.line);
                        token.setColumn(this.column - this.term.length);
                        return token;
                    }
                    else {
                        // throw new IsiLexicalException("Unrecognized Number");
                        throw new Error("Unrecognized Number");
                    }
                    break;
                }
        }


    }

    private isDigit(value: string): boolean {
		return value >= '0' && value <= '9';
	}
	
	private isChar(value: string): boolean {
		return (value >= 'a' && value <= 'z') || (value>='A' && value <= 'Z');
	}
	
	private isOperator(value: string): boolean {
		return value == '>' || value == '<' || value == '=' || value == '!' || value == '+' || value == '-' || value == '*' || value == '/';
	}
	private isSpace(value: string): boolean {
		if (value == '\n' || value == '\r') {
			this.line++;
			this.column=0;
		}
		return value == ' ' || value == '\t' || value == '\n' || value == '\r'; 
	}
	
	private nextChar(): string {
		if (this.isEOF()) {
			return '\0';
		}
		return this.content[this.position++];
	}

	
    private back(): void {
    	this.position--;
    	this.column--;
    }

    private isEOFL(value: string): boolean {
		return value == '\0';
	}

    private isEOF(): boolean {
		return this.position >= this.content.length;
	}
}