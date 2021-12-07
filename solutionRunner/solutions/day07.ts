import Solution from './solution';

class Day07 extends Solution {
    private readonly positions: number[];
    private readonly minPosition: number;
    private readonly maxPosition: number;
    constructor() {
        super(7);
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        this.positions = this.input.inputString.split(',').map(n => parseInt(n));
        let maxPosition = 0;
        let minPosition = 2 ** 32;
        this.positions.forEach(x => {
            if (x > maxPosition) {
                maxPosition = x;
            }
            if (x < minPosition) {
                minPosition = x;
            }
        });
        this.maxPosition = maxPosition;
        this.minPosition = minPosition;
        console.log(this.positions, maxPosition, minPosition);
    }

    public part1(): string {
        let minEnergyUsage = 2 ** 32;
        for (let i = this.minPosition; i <= this.maxPosition; ++i) {
            let energyUsage = 0;
            this.positions.forEach(x => {
                energyUsage += Math.abs(i - x);
            });
            if (energyUsage < minEnergyUsage) {
                minEnergyUsage = energyUsage;
            }
        }
        return `${minEnergyUsage}`;
    }

    public part2(): string {
        let minEnergyUsage = 2 ** 32;
        for (let i = this.minPosition; i <= this.maxPosition; ++i) {
            let energyUsage = 0;
            this.positions.forEach(x => {
                // Could generalise the series progression, but I'm too lazy
                let usage = 0;
                const distance = Math.abs(i - x);
                for (let j = 0; j <= distance; ++j) {
                    usage += j;
                }
                energyUsage += usage;
            });
            if (energyUsage < minEnergyUsage) {
                minEnergyUsage = energyUsage;
            }
        }
        return `${minEnergyUsage}`;
    }
}

export { Day07 };