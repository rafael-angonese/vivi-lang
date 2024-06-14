

export class Token {
  public static TK_IDENTIFIER  = 0;
	public static TK_NUMBER      = 1;
	public static TK_OPERATOR    = 2;
	public static TK_PONCTUATION = 3;
	public static TK_ASSIGN      = 4;
	
    type: number = 0
    text: string = ''
    line: number = 0
    column: number = 0
   
    constructor() {
    }
    // constructor(type: string, text: string) {
    //     this.type = type;
	// 	this.text = text;
    // }


  get getType() {
    return this.type;
  }

  setType(type: number) {
    this.type = type;
  }

  get getText() {
    return this.text;
  }

  setText(text: string) {
    this.text = text;
  }

  get getLine() {
    return this.line;
  }

  setLine(line: number) {
    this.line = line;
  }

  get getColumn() {
    return this.column;
  }

  setColumn(column: number) {
    this.column = column;
  }

}