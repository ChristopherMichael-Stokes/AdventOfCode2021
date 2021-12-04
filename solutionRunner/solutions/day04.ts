import Solution from './solution';

class BingoBoard {
    public bingo = false;
    public readonly marks: boolean[][];

    constructor(public readonly rows: number[][]) {
        this.marks = rows.map(row => row.map(item => false));
    }

    public markMatches(bingoNumber: number): void {
        // Track all matches in the marks array
        for (let i = 0; i < this.rows.length; ++i) {
            const row = this.rows[i]
            for (let j = 0; j < row.length; ++j) {
                if (row[j] === bingoNumber) {
                    this.marks[i][j] = true;
                }
            }
        }

        // Check rows for a bingo
        for (const row of this.marks) {
            if (row.every(match => match)) {
                this.bingo = true;
                return;
            }
        }
        // Check columns for a bingo
        for (let i = 0; i < this.marks[0].length; ++i) {
            const column = this.marks.map(row => row[i]);
            if (column.every(match => match)) {
                this.bingo = true;
                return;
            }
        }
    }

    public sumUnmarked(): number {
        let sum = 0;
        for (let i = 0; i < this.marks.length; ++i) {
            const row = this.marks[i];
            for (let j = 0; j < row.length; ++j) {
                if (!row[j]) {
                    sum += this.rows[i][j];
                }
            }
        }

        return sum;
    }
}

class Day04 extends Solution {
    private readonly bingoNumbers: number[];
    private readonly bingoBoards: BingoBoard[];

    constructor() {
        super(4);
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        let inputLines = this.input.inputString.split('\n');

        this.bingoNumbers = inputLines[0].split(',').map(n => parseInt(n));

        let rows = [];
        this.bingoBoards = [];

        for (let i = 1; i < inputLines.length; ++i) {
            if (inputLines[i] === '') {
                if (rows.length > 0) {
                    // Create a board, push it to the array and reset the temporary rows
                    this.bingoBoards.push(new BingoBoard(rows));
                    rows = [];
                }
            } else {
                rows.push(inputLines[i].split(' ')
                    .filter(n => n != '' && n != ' ')
                    .map(n => parseInt(n)));
                if (i === inputLines.length - 1) {
                    this.bingoBoards.push(new BingoBoard(rows));
                }
            }
        }

        //this.bingoBoards.forEach(board => {
        //    console.log(board.rows);
        //    console.log(board.marks);
        //});
    }

    public part1(): string {
        // Read bingo numbers
        for (const bingoNumber of this.bingoNumbers) {
            //console.log(bingoNumber);
            for (const board of this.bingoBoards) {
                // Mark matches
                board.markMatches(bingoNumber);
                // Check for any winners
                if (board.bingo) {
                    const unmarkedSum = board.sumUnmarked();
                    console.log(`bingo number: ${bingoNumber}\tunmarked sum: ${unmarkedSum}`)
                    return `${bingoNumber * unmarkedSum}`;
                }
            }
        }

        return 'No winners';
    }

    public part2(): string {
        const winningBoards: number[] = [];
        // Read bingo numbers
        for (const bingoNumber of this.bingoNumbers) {
            //console.log(bingoNumber);
            for (let i = 0; i < this.bingoBoards.length; ++i) {
                const board = this.bingoBoards[i];
                if (winningBoards.includes(i)) {
                    continue;
                }
                // Mark matches
                board.markMatches(bingoNumber);
                // Check for any winners
                if (board.bingo) {
                    winningBoards.push(i);
                    if (winningBoards.length === this.bingoBoards.length) {
                        // This is the last winning board
                        const unmarkedSum = board.sumUnmarked();
                        console.log(`bingo number: ${bingoNumber}\tunmarked sum: ${unmarkedSum}`)
                        return `${bingoNumber * unmarkedSum}`;
                    }
                    
                }
            }
        }
        return 'No winners';
    }
}

export { Day04 };