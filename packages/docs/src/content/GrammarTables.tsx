
import { generateLL1ParsingTable } from "@fantastic/compiler";
import React from "react";

const input = {
  startSymbol: "S",
  terminals: new Set([
    "if",
    "(",
    ")",
    "{",
    "}",
    "else",
    "condition",
    "command",
    "ε",
  ]),
  nonTerminals: new Set([
    "S",
    "SL",
    "CONDITION",
    "BLOCK",
    "COMMANDS",
    "COMMANDSL",
  ]),
  productionRules: [
    {
      nonTerminal: "S",
      production: ["if", "(", "CONDITION", ")", "BLOCK", "SL"],
    },
    { nonTerminal: "SL", production: ["else", "BLOCK"] },
    { nonTerminal: "SL", production: ["ε"] },
    { nonTerminal: "CONDITION", production: ["condition"] },
    { nonTerminal: "BLOCK", production: ["{", "COMMANDS", "}"] },
    { nonTerminal: "COMMANDS", production: ["command", "COMMANDSL"] },
    { nonTerminal: "COMMANDSL", production: ["command", "COMMANDSL"] },
    { nonTerminal: "COMMANDSL", production: ["ε"] },
  ],
};

const { first, follow, parsingTable } = generateLL1ParsingTable(input);

const firstSet = Object.fromEntries(first)
const followSet = Object.fromEntries(follow)
const table = Object.fromEntries(
  [...parsingTable.entries()].map(([k, v]) => [k, Object.fromEntries(v)])
)

export const GrammarTables: React.FC = () => {

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
            {Array.from(input.nonTerminals).map(nonTerminal => (
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

        <h2>Tabela de símbolos</h2>
        <table>
          <thead>
            <tr>
              <th align="left">Non-Terminal</th>
              {
                Array.from(input.terminals).map((terminal) => (
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
                  {Array.from(input.terminals).map((terminal) => (
                    <td key={terminal}>{row[terminal] || "-"}</td>
                  ))}
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