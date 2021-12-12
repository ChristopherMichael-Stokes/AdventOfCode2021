import Solution from './solution';

class Day12 extends Solution {
    //private readonly graph: number[][];
    constructor() {
        super(12);
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        // First enumerate all node names
        let locations = [... new Set(this.input.inputString.split('\n').map(line => line.split('-')).reduce((accumulator, value) => accumulator.concat(value)))];
        console.log(locations);
    }

    public part1(): string {
        return '';
    }

    public part2(): string {
        return '';
    }
}

export { Day12 };