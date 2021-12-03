import Solution from './solution';

class Day03 extends Solution {
    private readonly inputGrid: string[];
    constructor() {
        super(3);
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        this.inputGrid = this.input.inputString.split('\n').filter(s => !s.match(/^\s*$/));
        console.log(this.inputGrid);
    }

    public part1(): string {
        // Find epsilon rate
        let commonBits = [];
        for (let i = 0; i < this.inputGrid[0].length; ++i) {
            let count = 0;
            this.inputGrid.forEach(n => { count += n[i] === '1' ? 1 : -1 });
            commonBits.push(count >= 0 ? 1 : 0);
        }

        // Need to work around sign bit, so ensure 0 is in the msb position
        let uncommonBits: number[] = commonBits.map(digit => { return digit === 1 ? 0 : 1 });
        commonBits = [0].concat(commonBits);
        uncommonBits = [0].concat(uncommonBits);

        const gammaRate = parseInt(commonBits.join(''), 2);
        const epsilonRate = parseInt(uncommonBits.join(''), 2)

        console.log('gamma rate: ', gammaRate, 'epsilon rate: ', epsilonRate);
        return `${gammaRate * epsilonRate}`;
    }

    public part2(): string {
        let ratingCandidates = { oxygen: [...this.inputGrid], co2: [...this.inputGrid] };

        // Search for oxygen values
        let i = 0;
        while (ratingCandidates.oxygen.length > 1) {
            // find most common value in candidates
            let count = 0;
            ratingCandidates.oxygen.forEach(n => { count += n[i] === '1' ? 1 : -1 });
            const mostCommon = count >= 0 ? '1' : '0';

            // Filter out non-matching values
            const newCandidates = ratingCandidates.oxygen.filter(n => n[i] === mostCommon);
            ratingCandidates.oxygen = newCandidates;
            ++i;
        }

        // Search for co2 values
        i = 0;
        while(ratingCandidates.co2.length > 1) {
            // find most common value in candidates
            let count = 0;
            ratingCandidates.co2.forEach(n => { count += n[i] === '1' ? 1 : -1 });
            const mostCommon = count >= 0 ? '1' : '0';

            // Filter out non-matching values
            const newCandidates = ratingCandidates.co2.filter(n => n[i] != mostCommon);
            ratingCandidates.co2 = newCandidates;
            ++i;
        }

        // convert binary strings to unsigned integers
        console.log('co2: ', ratingCandidates.co2, 'oxygen: ', ratingCandidates.oxygen);
        let lifeSupportRating = parseInt('0' + ratingCandidates.oxygen[0], 2);
        lifeSupportRating *= parseInt('0' + ratingCandidates.co2[0], 2);
        return `${lifeSupportRating}`;
    }
}

export { Day03 };