import Solution from './solution';

class Day11 extends Solution {
    constructor() {
        super(11);
    }
    private makeGrid(): number[][] {
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        return this.input.inputString.split('\n').map(line => line.split('').map(n => parseInt(n)));
    }
    public part1(): string {
        let dirs = [0, 1, -1];
        let adjacent = dirs.map(x => dirs.map(y => [x, y])).reduce((accumulator, value) => accumulator.concat(value));
        const grid = this.makeGrid();
        let flashCount = 0;
        const epochs = 100;
        for (let t = 0; t < epochs; ++t) {
            // Increase energy by 1
            grid.forEach((row, i) => row.forEach((x, j) => ++grid[i][j]));

            // Work out who flashes + adjacent levels
            let flashes = grid.map(row => row.map(_ => false));
            let flashes_t = flashes.map(row => row.map(x => x));

            // If flashes at the beginning are same as flashes at the end then break
            do {
                flashes = flashes_t.map(row => row.map(x => x));
                flashes_t = flashes.map(row => row.map(x => x));

                grid.forEach((row, i) => row.forEach((x, j) => {
                    if (x > 9) {
                        // Ensure we only flash once
                        if (!flashes_t[i][j]) {
                            flashes_t[i][j] = true;
                            // Work out adjacent levels
                            adjacent.map(pos => [i + pos[0], j + pos[1]])
                                .filter(pos => pos[0] >= 0 && pos[0] < grid.length && pos[1] >= 0 && pos[1] < grid[0].length)
                                .forEach(pos => grid[pos[0]][pos[1]] = grid[pos[0]][pos[1]] + 1);
                        }
                    }
                }));
            } while (flashes_t.toString() != flashes.toString());

            // Reset energy & sum flashes
            grid.forEach((row, i) => row.forEach((x, j) => {
                if (x > 9) {
                    grid[i][j] = 0;
                }
            }));
            flashes.forEach(row => row.forEach(x => flashCount += x ? 1 : 0));
            if (!(t % 10)) {
                console.log(`${t}:\t${flashCount}`);
            }
        }


        return `${flashCount}`;
    }

    public part2(): string {
        let dirs = [0, 1, -1];
        let adjacent = dirs.map(x => dirs.map(y => [x, y])).reduce((accumulator, value) => accumulator.concat(value));
        const grid = this.makeGrid();
        const zeros = grid.map(row => row.map(_ => 0)).toString();
        let flashCount = 0;
        const epochs = 10000;

        let steps = -1;
        for (let t = 0; t < epochs; ++t) {
            // Increase energy by 1
            grid.forEach((row, i) => row.forEach((x, j) => ++grid[i][j]));

            // Work out who flashes + adjacent levels
            let flashes = grid.map(row => row.map(_ => false));
            let flashes_t = flashes.map(row => row.map(x => x));

            // If flashes at the beginning are same as flashes at the end then break
            do {
                flashes = flashes_t.map(row => row.map(x => x));
                flashes_t = flashes.map(row => row.map(x => x));

                grid.forEach((row, i) => row.forEach((x, j) => {
                    if (x > 9) {
                        // Ensure we only flash once
                        if (!flashes_t[i][j]) {
                            flashes_t[i][j] = true;
                            // Work out adjacent levels
                            adjacent.map(pos => [i + pos[0], j + pos[1]])
                                .filter(pos => pos[0] >= 0 && pos[0] < grid.length && pos[1] >= 0 && pos[1] < grid[0].length)
                                .forEach(pos => grid[pos[0]][pos[1]] = grid[pos[0]][pos[1]] + 1);
                        }
                    }
                }));
            } while (flashes_t.toString() != flashes.toString());

            // Reset energy & sum flashes
            grid.forEach((row, i) => row.forEach((x, j) => {
                if (x > 9) {
                    grid[i][j] = 0;
                }
            }));

            // Check if all flashed 
            if (grid.toString() === zeros) {
                steps = t + 1;
                break;
            }
            flashes.forEach(row => row.forEach(x => flashCount += x ? 1 : 0));

        }
        return `${steps}`;
    }
}

export { Day11 }