export type ProductionRule = {
    nonTerminal: string;
    production: string[];
};

export interface GrammarProps {
    nonTerminals: Set<string>;
    terminals: Set<string>;
    productionRules: ProductionRule[];
    startSymbol: string;
}

export class Grammar {
    nonTerminals: Set<string>;
    terminals: Set<string>;
    productionRules: ProductionRule[];
    startSymbol: string;

    constructor({ nonTerminals, terminals, productionRules, startSymbol }: GrammarProps) {
        this.nonTerminals = nonTerminals;
        this.terminals = terminals;
        this.productionRules = productionRules;
        this.startSymbol = startSymbol;
    }

    calculateFirst(): Map<string, Set<string>> {
        const first = new Map<string, Set<string>>();

        this.nonTerminals.forEach(nt => first.set(nt, new Set<string>()));

        let changed = true;
        while (changed) {
            changed = false;

            for (const { nonTerminal, production } of this.productionRules) {
                const firstSet = first.get(nonTerminal)!;
                const initialSize = firstSet.size;

                for (const symbol of production) {
                    if (this.terminals.has(symbol)) {
                        firstSet.add(symbol);
                        break;
                    } else {
                        const symbolFirstSet = first.get(symbol)!;

                        symbolFirstSet.forEach(item => {
                            if (item !== 'ε') {
                                firstSet.add(item);
                            }
                        });

                        if (!symbolFirstSet.has('ε')) {
                            break;
                        }
                    }
                }
                if (production.every(symbol => first.get(symbol)?.has('ε'))) {
                    firstSet.add('ε');
                }

                if (firstSet.size !== initialSize) {
                    changed = true;
                }
            }
        }

        return first;
    }

    calculateFollow(first: Map<string, Set<string>>): Map<string, Set<string>> {
        const follow = new Map<string, Set<string>>();

        this.nonTerminals.forEach(nt => follow.set(nt, new Set<string>()));

        follow.get(this.startSymbol)!.add('$');

        let changed = true;
        while (changed) {
            changed = false;

            for (const { nonTerminal, production } of this.productionRules) {
                for (let i = 0; i < production.length; i++) {
                    const symbol = production[i];
                    if (this.nonTerminals.has(symbol)) {
                        const followSet = follow.get(symbol) as Set<string>;
                        const initialSize = followSet.size;

                        let nextIndex = i + 1;
                        while (nextIndex < production.length) {
                            const nextSymbol = production[nextIndex];

                            if (this.terminals.has(nextSymbol)) {
                                followSet.add(nextSymbol);
                                break;
                            } else {
                                const nextFirstSet = first.get(nextSymbol) as Set<string>;
                                nextFirstSet.forEach(item => {
                                    if (item !== 'ε') {
                                        followSet.add(item);
                                    }
                                });
                                if (!nextFirstSet.has('ε')) {
                                    break;
                                }
                            }
                            nextIndex++;
                        }

                        if (nextIndex === production.length) {
                            const nonTerminalFollowSet = follow.get(nonTerminal) as Set<string>;
                            nonTerminalFollowSet.forEach(item => followSet.add(item));
                        }

                        if (followSet.size > initialSize) {
                            changed = true;
                        }
                    }
                }
            }
        }

        return follow;
    }

    createParsingTable(first: Map<string, Set<string>>, follow: Map<string, Set<string>>): Map<string, Map<string, string[] | 'error' | 'sync'>> {
        const parsingTable = new Map<string, Map<string, string[] | 'error' | 'sync'>>();

        this.nonTerminals.forEach(nonTerminal => {
            parsingTable.set(nonTerminal, new Map<string, string[] | 'error' | 'sync'>());
        });

        for (const { nonTerminal, production } of this.productionRules) {
            const firstSet = this.calculateFirstSetOfProduction(first, production);

            firstSet.forEach(terminal => {
                if (terminal !== 'ε') {
                    parsingTable.get(nonTerminal)!.set(terminal, production);
                }
            });

            if (firstSet.has('ε') || production.length === 0) {
                const followSet = follow.get(nonTerminal)!;
                followSet.forEach(terminal => {
                    parsingTable.get(nonTerminal)!.set(terminal, production);
                });
            }
        }

        this.nonTerminals.forEach(nonTerminal => {
            const tableRow = parsingTable.get(nonTerminal)!;
            const followSet = follow.get(nonTerminal)!;
            this.terminals.forEach(terminal => {
                if (!tableRow.has(terminal)) {
                    if (followSet.has(terminal)) {
                        tableRow.set(terminal, 'sync');
                    } else {
                        tableRow.set(terminal, 'error');
                    }
                }
            });
            if (!tableRow.has('$')) {
                if (followSet.has('$')) {
                    tableRow.set('$', 'sync');
                } else {
                    tableRow.set('$', 'error');
                }
            }
        });

        return parsingTable;
    }

    private calculateFirstSetOfProduction(first: Map<string, Set<string>>, production: string[]): Set<string> {
        const firstSet = new Set<string>();

        for (const symbol of production) {
            if (this.terminals.has(symbol)) {
                firstSet.add(symbol);
                break;
            } else {
                const symbolFirstSet = first.get(symbol)!;

                symbolFirstSet.forEach(item => {
                    if (item !== 'ε') {
                        firstSet.add(item);
                    }
                });

                if (!symbolFirstSet.has('ε')) {
                    break;
                }
            }
        }

        if (production.every(symbol => first.get(symbol)?.has('ε'))) {
            firstSet.add('ε');
        }

        return firstSet;
    }
}