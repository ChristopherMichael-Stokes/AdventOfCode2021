import Solution from './solution';

class Day09 extends Solution {
    private readonly inputGrid: number[][];
    constructor() {
        super(9);
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        this.inputGrid = [];
        this.input.inputString.split('\n').forEach(line => {
            const row: number[] = [];
            line.split('').forEach(x => row.push(parseInt(x)));
            this.inputGrid.push(row);
        });
    }

    public part1(): string {
        // Find all local minimums in grid
        const adjacent = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        const minimas: number[] = [];

        for (let i = 0; i < this.inputGrid.length; ++i) {
            for (let j = 0; j < this.inputGrid[0].length; ++j) {
                // Find valid neighbours
                let neighbours = adjacent.map(dir => {
                    return [dir[0] + i, dir[1] + j];
                }).filter(pos => pos[0] >= 0 && pos[0] < this.inputGrid.length && pos[1] >= 0 && pos[1] < this.inputGrid[0].length);

                // Compare value of neighbours to current pos
                const value = this.inputGrid[i][j];
                const values = neighbours.map(pos => this.inputGrid[pos[0]][pos[1]]);
                const minima = values.every(x => value < x);
                if (minima) {
                    minimas.push(value);
                }
            }
        }

        return `${minimas.reduce((prev, next) => prev + next + 1) + 1}`;
    }

    public part2(): string {
        // Store all basin locations, each entry with the same number is in the same basin
        const basins: number[][] = this.inputGrid.map(row => row.map(x => x === 9 ? -1 : 0));
        const adjacent = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        const checkBasin = (visited: number[][], basinValue: number, x: number, y: number) => {
            // Check pos is valid
            if (x >= 0 && x < this.inputGrid[0].length && y >= 0 && y < this.inputGrid.length) {
                // Check pos hasn't been visited
                if (visited[y][x] === 0) {
                    visited[y][x] = basinValue;
                    adjacent.forEach(dir => {
                        // Check if neighbours are in the same basin
                        checkBasin(visited, basinValue, dir[1] + x, dir[0] + y);
                    });
                }
            }
        }

        let basin = 0;
        this.inputGrid.forEach((row, i) => row.forEach((x, j) => {
            // This location is not currently in a basin
            let neighbours = adjacent.map(dir => {
                return [dir[0] + i, dir[1] + j];
            }).filter(pos => pos[0] >= 0 && pos[0] < this.inputGrid.length && pos[1] >= 0 && pos[1] < this.inputGrid[0].length);

            const value = this.inputGrid[i][j];
            //console.log(value, neighbours);

            const values = neighbours.map(pos => this.inputGrid[pos[0]][pos[1]]);
            const minima = values.every(x => value < x);
            if (minima) {
                // Algorithm to find a basin from any number
                // All basins are guaranteed to end in local minimas!!!
                // Thanks to part 1, we already have the local minimas
                // BFS algorithm:
                // push minima to stack
                // while stack is not empty:
                //    pop stack
                //    add item to basin
                //    mark pos as visited
                //    push all adjacent larger values to stack

                // Also keep track of points visited so we don't look at the
                // same point twice and get stuck in a loop
                checkBasin(basins, ++basin, j, i);
            }
        }));
        let basinSize: Map<number, number> = new Map();
        basins.forEach((row, i) => row.forEach((n, j) => {
            if (n != -1) {
                if (basinSize.has(n)) {
                    // @ts-ignore
                    basinSize.set(n, basinSize.get(n) + 1);
                } else {
                    basinSize.set(n, 1);
                }
            }
        }));

        let sortedBasins: number[] = [];
        basinSize.forEach((size, basin, _) => {
            sortedBasins.push(size);
        });
        sortedBasins.sort((a, b) => a < b ? 1 : -1);

        return `${sortedBasins.slice(0, 3).reduce((prev, next) => prev * next)}`;
    }
}

export { Day09 };