import Solution from './solution';

class Day01 extends Solution {
    private readonly inputGrid: number[];
    constructor() {
        super(1);
        if (!this.input.inputString) {
            throw new Error("Error reading input");
        }
        this.inputGrid = this.input.inputString.split('\n').map(x => parseInt(x));
        console.log(this.inputGrid);
    }

    public part1(): string {
        let increases = 0;
        // Compare each element to the element before
        for (let i = 1; i < this.inputGrid.length; ++i) {
            if (this.inputGrid[i] > this.inputGrid[i - 1]) {
                ++increases;
            }
        }
        return increases.toString();
    }

    public part2(): string {
        let increases = 0;

        for (let i = 3; i < this.inputGrid.length; ++i) {
            // Make each 3-item window
            let windowA = this.inputGrid.slice(i - 4, i - 1);
            let windowB = this.inputGrid.slice(i - 3, i);

            // Sum window values
            let windowASum = 0;
            windowA.forEach(x => windowASum += x);
            let windowBSum = 0;
            windowB.forEach(x => windowBSum += x);

            if (windowBSum > windowASum) {
                ++increases;
            }
        }
        return increases.toString();
    }
}

export { Day01 };