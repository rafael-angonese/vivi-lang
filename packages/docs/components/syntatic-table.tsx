import { viviLangGrammarInput } from '@/constants/vivi-lang-grammar-input';
import { generateLL1ParsingTable } from "@fantastic/compiler";
import React from 'react';

const { parsingTable } = generateLL1ParsingTable(viviLangGrammarInput);

const table = Object.fromEntries(
  [...parsingTable.entries()].map(([k, v]) => [k, Object.fromEntries(v)])
)

export const SyntacticTable: React.FC = () => {
  return (
    <>
      <div className='px-4'>
        <table>
          <thead>
            <tr>
              <th align="left">Não Terminal</th>
              {
                Array.from(viviLangGrammarInput.terminals).filter((item) => item !== 'ε').map((terminal) => (
                  <th align="left" key={terminal}>{terminal}</th>
                ))
              }
              <th>$</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.entries(table).map(([nonTerminal, row]) => (
                <tr key={nonTerminal}>
                  <td>{nonTerminal}</td>
                  {Array.from(viviLangGrammarInput.terminals).filter((item) => item !== 'ε').map((terminal) => {
                    // @ts-ignore
                    const values = Array.isArray(row[terminal]) ? row[terminal].map((item) => item).join(' ') : row[terminal]
                    return (
                      <td key={terminal}>{values || "-"}</td>
                    )
                  })}
                  <td>{row["$"] || "-"}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
