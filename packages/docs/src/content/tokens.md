# Tabela de símbolos


| Token | Descrição | Lexema | Regex | Nome |
| --- | --- | --- | --- | --- |
| letter | Composto por qualquer letra minuscula ou maiuscula de a até z | a, b, c, d, e, f, A, B, C, D, E, F | /[a-zA-Z]/ | Letra |
| digit | Composto por número de 0 a 9 | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 | /\d/ | Digito |
| str | Composto por qualquer caracteres dentro aspas duplas | “hello”, “A”, “World!”, “Meu nome:”, “yg5” | /"[^"]*"/ | Conjunto de caracteres literais |
| integer | Composto por dígitos de 0 a 9 | 10, 200, 4, 76, 8000, 78645, 2, 7 | /\b\d+\b/ | Número inteiro |
| decimal | Composto por números com separador .(ponto) para a casa decimal | 3.14, 15.23, 1.5, 4444.33, 999.999, 7.33333 | /\b\d+\.\d+\b/ | Número decimal |
| id | Composto por letras maiúsculas e minúsculas, números, e underlines | variável123, meuNome, nome_da_função | /^[a-zA-Z_][a-zA-Z0-9_]*$/ | Identificador, Nome de uma variável, parâmetros de funções e nome de função |
| whitespace | Composto por espaços em branco e tabulações | , \t | /[ \t]/ | Espaço em branco e tabulação. |
| linebreak | Composto por quebra de linha \n\r | \n, \r | /\r?\n|\r/ | Quebra de linha |
| $\<vivi> | Composto pelo conjunto de caracteres: $\<vivi> | $\<vivi> | /\$\<vivi>/ | Palavra reservada Início do programa |
| $\</vivi> | Composto pelo conjunto de caracteres: $\</vivi> | $\</vivi> | /\$<\/vivi>/ | Palavra reservada Fim do programa |
| int | Composto pelo conjunto de caracteres: int | int | /\int/ | Palavra reservada Int |
| double | Composto pelo conjunto de caracteres: double | double | /\double/ | Palavra reservada Double |
| boolean | Composto pelo conjunto de caracteres: boolean | boolean | /\boolean/ | Palavra reservada Bool |
| string | Composto pelo conjunto de caracteres: string | string | /\string/ | Palavra reservada String |
| if | Composto pelo conjunto de caracteres: if | if | /\if/ | Palavra reservada if |
| else | Composto pelo conjunto de caracteres: else | else | /\else/ | Palavra reservada else |
| for | Composto pelo conjunto de caracteres: for | for | /\for/ | Palavra reservada for |
| return | Composto pelo conjunto de caracteres: return | return | /\return/ | Palavra reservada return |
| function | Composto pelo conjunto de caracteres: function | function | /\function/ | Palavra reservada function |
| true | Composto pelo conjunto de caracteres: true | true | /\true/ | Valor verdadeiro/booleano: true |
| false | Composto pelo conjunto de caracteres: false | false | /\false/ | Valor verdadeiro/booleano: false |
| null | Composto pelo conjunto de caracteres: null | null | /\null/ | Valor nulo: null |
| print | Composto pelo conjunto de caracteres: print | print | /\print/ | Palavra reservada print |
| = | Composto pelo caractere: = | = |  | Operador de Atribuição |
| + | Composto pelo caractere: + | + |  | Operador aritmético Adição |
| - | Composto pelo caractere: - | - |  | Operador aritmético Subtração |
| * | Composto pelo caractere: * | * |  | Operador aritmético Multiplicação |
| / | Composto pelo caractere: / | / |  | Operador aritmético Divisão |
| % | Composto pelo caractere: % | % |  | Operador aritmético Módulo |
| && | Composto pelo conjunto de caracteres: && | && |  | Operador lógico E |
| \|\| | Composto pelo conjunto de caracteres: \|\| | \|\| |  | Operador lógico OU |
| ! | Composto pelo caractere: ! | ! |  | Operador lógico Negação |
| > | Composto pelo caractere: > | > |  | Operador relacional Maior |
| >= | Composto pelo conjunto de caracteres: >= | >= |  | Operador relacional Maior ou Igual |
| < | Composto pelo caractere: < | < |  | Operador relacional Menor |
| <= | Composto pelo conjunto de caracteres: <= | <= |  | Operador relacional Menor ou Igual |
| == | Composto pelo conjunto de caracteres: == | == |  | Operador relacional Igual |
| != | Composto pelo conjunto de caracteres: != | != |  | Operador relacional Diferente |
| ( | Composto pelo caractere: ( | ) |  | Parêntese Abr |
| ) | Composto pelo caractere: ) | ) |  | Parêntese Fecha |
| [ | Composto pelo caractere: [ | [ |  | Colchete Abre |
| ] | Composto pelo caractere: ] | ] |  | Colchete Fecha |
| { | Composto pelo caractere: { | { |  | Chave Abre |
| } | Composto pelo caractere: } | } |  | Chave Fecha |
| : | Composto pelo caractere: : | : |  | Dois Pontos |
| ; | Composto pelo caractere: ; | ; |  | Ponto e Vírgula |
| , | Composto pelo caractere: , | , |  | Virgula |
| . | Composto pelo caractere: . | . |  | Ponto |
| | | | |


# Autômatos

# Gramática LL(1)

S → Script  
Script → \vivi Statements vivi\  

FunctionDefinition → function id ( Parameters ) : Type { Statements }  
FunctionCall → id ( Arguments )  

Parameters -> ParameterList | &  
ParameterList -> id : Type MoreParameters  
MoreParameters → , id : Type MoreParameters | &  

Arguments → ArgumentList | &  
ArgumentList → Expression MoreArguments  
MoreArguments → , Expression MoreArguments | &  

Statements → Statement Statements | &  
Statement → VariableDeclaration | VariableAssignment | FunctionDefinition | FunctionCall | IfStatement | ForLoop | ReturnStatement | PrintStatement  

VariableDeclaration → id : Type = Expression ;  
VariableAssignment → id = Expression ;  

Type → int | double | boolean | string  

IfStatement → if ( Condition ) { Statements } ElseClause  
ElseClause → else { Statements } | &  
ForLoop → for ( VariableDeclaration Condition ; Expression ) { Statements }  

Condition → Expression RelationalOp Expression  
RelationalOp → == | != | < | > | <= | >=  

ReturnStatement → return Expression ; | return ;

PrintStatement → print ( PrintArgument ) ;  
PrintArgument → Expression | str 

Expression → Term MoreTerms  
MoreTerms → + Term MoreTerms | - Term MoreTerms | LogicalOp Term MoreTerms | &  

LogicalOp → && | ||  
Term → Factor MoreFactors  
MoreFactors → * Factor MoreFactors | / Factor MoreFactors | % Factor MoreFactors | &  
Factor → ( Expression ) | id | integer | decimal | digit | str | true | false | null  