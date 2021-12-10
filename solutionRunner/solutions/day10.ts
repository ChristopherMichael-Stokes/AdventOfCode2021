import Solution from './solution';

// GRAMMAR ->
/*
 * S -> (S) | [S] | {S} | <S> | eps
 * */
type Symbol = '(' | ')' | '{' | '}' | '[' | ']' | '<' | '>';

class Day10 extends Solution {
    private readonly inputLines: string[];
    private readonly symbolMap: Map<Symbol, Symbol>;
    private readonly symbolMapInv: Map<Symbol, Symbol>;
    private readonly errorMap: Map<Symbol, number>;
    private readonly completionMap: Map<Symbol, number>;
    constructor() {
        super(10);
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        this.inputLines = this.input.inputString.trim().split('\n');
        this.symbolMap = new Map();
        this.symbolMap.set('(', ')');
        this.symbolMap.set('{', '}');
        this.symbolMap.set('[', ']');
        this.symbolMap.set('<', '>');
        this.symbolMapInv = new Map();
        this.symbolMap.forEach((close, open, _) => { this.symbolMapInv.set(close, open) });

        this.errorMap = new Map();
        this.errorMap.set(')', 3);
        this.errorMap.set(']', 57);
        this.errorMap.set('}', 1197);
        this.errorMap.set('>', 25137);

        this.completionMap = new Map();
        this.completionMap.set(')', 1);
        this.completionMap.set(']', 2);
        this.completionMap.set('}', 3);
        this.completionMap.set('>', 4);
    }

    public part1(): string {
        let errorSum = 0;

        this.inputLines.map(line => line.split('')).forEach(tokens => {
            let error = false;

            // Push open brackets to stack, if closing bracket is met, pop stack
            // If popped value doesn't match current value --> error
            const stack: string[] = [];
            for (const token_ of tokens) {
                const token = token_ as Symbol;
                if (this.symbolMap.has(token)) {
                    stack.push(token);
                } else if (this.symbolMapInv.has(token)) {
                    const last = stack.pop();
                    if (last != this.symbolMapInv.get(token)) {
                        error = true;
                        if (!this.errorMap.has(token)) {
                            throw new Error('Bad input');
                        }
                        errorSum += this.errorMap.get(token) as number;
                        break;
                    }
                } else {
                    throw new Error('Bad input');
                }
            }
        });
        return `${errorSum}`;
    }

    public part2(): string {
        let completions: Symbol[][] = [];

        this.inputLines.map(line => line.split('')).forEach(tokens => {
            let error = false;

            // Push open brackets to stack, if closing bracket is met, pop stack
            // If popped value doesn't match current value --> error
            const stack: string[] = [];
            for (const token_ of tokens) {
                const token = token_ as Symbol;
                if (this.symbolMap.has(token)) {
                    stack.push(token);
                } else if (this.symbolMapInv.has(token)) {
                    const last = stack.pop();
                    if (last != this.symbolMapInv.get(token)) {
                        if (!this.errorMap.has(token)) {
                            throw new Error('Bad input');
                        }
                        error = true;
                        break;
                    }
                } else {
                    throw new Error('Bad input');
                }
            }

            if (!error) {
                // Now we can start autocompleting
                const completion: Symbol[] = [];
                // Until parse stack is empty, pop head
                // push inverse to completion stack
                while (stack.length > 0) {
                    const head = stack.pop() as Symbol;
                    if (!this.symbolMap.has(head)) {
                        throw new Error('Bad input');
                    }
                    completion.push(this.symbolMap.get(head) as Symbol);
                }
                completions.push(completion);
            }
        });

        // Work out scores for each completion
        const scores = completions.map(completion => {
            let score = 0;
            completion.forEach(token => score = (score * 5) + (this.completionMap.get(token) as number));
            return score;
        }).sort((a, b) => a < b ? -1 : 1);

        const middle = scores[Math.floor(scores.length / 2)];
        return `${middle}`;
    }
}

export { Day10 };