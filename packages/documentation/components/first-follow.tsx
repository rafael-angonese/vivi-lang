import { viviLangGrammarInput } from '@/constants/vivi-lang-grammar-input';
import { generateLL1ParsingTable } from "@fantastic/compiler";
import React from 'react';

const { first, follow, parsingTable } = generateLL1ParsingTable(viviLangGrammarInput);

const firstSet = Object.fromEntries(first)
const followSet = Object.fromEntries(follow)

export const FirstFollow: React.FC = () => {
    return (
        <>
            <div>
                <h2>First and Follow Sets</h2>
                <table>
                    <thead>
                        <tr>
                            <th align="left">Não terminal</th>
                            <th align="left">First</th>
                            <th align="left">Follow</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(viviLangGrammarInput.nonTerminals).map(nonTerminal => (
                            <tr key={nonTerminal}>
                                <td>{nonTerminal}</td>
                                <td>{[...first.get(nonTerminal) || []].join(", ")}</td>
                                <td>{[...follow.get(nonTerminal) || []].join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ul>
                    {
                        Object.entries(firstSet).map(([key, value]) => (
                            <li key={key}>
                                First({key}): {"{ "}
                                {[...value].join(", ")}
                                {" }"}
                            </li>
                        ))
                    }
                </ul>

                <ul>
                    {
                        Object.entries(followSet).map(([key, value]) => (
                            <li key={key}>
                                Follow({key}): {"{ "}
                                {[...value].join(", ")}
                                {" }"}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
