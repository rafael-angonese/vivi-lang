'use client'
import { Button } from "@/components/ui/button";
import { compile, LexicalException, SyntaxException, Tree } from "@fantastic/compiler";

import React from 'react';

const defaultCode = `$<vivi> 
    idade : int = 3; 
$</vivi>`

export const Playground: React.FC = () => {
    const [error, setError] = React.useState<typeof LexicalException | typeof SyntaxException | null>(null)
    const [code, setCode] = React.useState<string>(defaultCode)
    const [tree, setTree] = React.useState<Tree | null>(null)

    const onCompile = () => {
        try {
            const tree = compile(code)
            setTree(tree)
            setError(null)
        } catch (error) {
            setTree(null)
            if (error instanceof LexicalException) {
                // @ts-ignore
                setError(error)
            }

            if (error instanceof SyntaxException) {
                // @ts-ignore
                setError(error)
            }
        }

    }

    return (
        <>
            <textarea value={code} onChange={(event) => {
                setCode(event.target.value)
                setError(null)
                setTree(null)
            }}
                rows={10}
                placeholder="Digite seu código vivi-lang..."
                className="w-full min-w-[300px] border rounded-md p-2.5 focus:outline-4 placeholder:text-gray-400 bg-white border-gray-300 hover:border-gray-400 text-black focus:outline-gray-500 dark:bg-black dark:text-white dark:border-gray-500 dark:hover:border-gray-400 focus:dark:border-gray-300 dark:focus:outline-0 "
            />

            <div className="flex justify-end">
                <Button disabled={!code} onClick={onCompile}>Compilar</Button>
            </div>


            {tree && (
                <>
                    <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-400">
                        Compilado com sucesso.
                    </h1>

                    <pre className="bg-gray-100 p-4 rounded-lg">
                        {JSON.stringify(tree, null, 2)}

                        </pre>
                </>
            )}

            {error && (

                <div className="mt-4 border-2 border-red-500 p-2 rounded-lg">
                    {error && error instanceof LexicalException && (
                        <>
                            <p>Erro Léxico: `LexicalException`</p>
                            <p>Tipo: {error.error}</p>
                            <p>Mensagem: {error.message}</p>
                            <p>Linha: {error.line}</p>
                            <p>Coluna: {error.column}</p>
                        </>
                    )}

                    {error && error instanceof SyntaxException && (
                        <>
                            <p>Erro Sintático: `SyntaxException`</p>
                            <p>Tipo: {error.error}</p>
                            <p>Mensagem: {error.message}</p>
                            <p>Tipo do token: {error.token.type}</p>
                            <p>Valor do token: {error.token.value}</p>
                            <p>Linha do token: {error.token.line}</p>
                            <p>Coluna do token: {error.token.column}</p>
                            <p>Token esperado: {error.tokenType}</p>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
