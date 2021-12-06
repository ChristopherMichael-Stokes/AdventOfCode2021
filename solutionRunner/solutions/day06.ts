import Solution from './solution';

class Day06 extends Solution {
    private readonly initialState: number[];
    constructor() {
        super(6);
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        this.initialState = this.input.inputString.split(',').map(n => parseInt(n));
    }

    /* 
     * Only feasible for part 1 as memory usage grows exponentially with 
     * epochs input 
     */
    private simulate(epochs: number): number[] {
        const reproductionEpochs = 7;
        const epochBuffer = 2;
        let state = this.initialState.map(n => n);

        try {
            for (let i = 0; i < epochs; ++i) {
                let state_t: number[] = [];
                for (let j = 0; j < state.length; ++j) {
                    --state[j];
                    if (state[j] < 0) {
                        state[j] = reproductionEpochs - 1;
                        state_t.push(reproductionEpochs + epochBuffer - 1);
                    }
                }
                state.push(...state_t);
            }
        } catch (error) {
            console.log(error);
        }

        return state;
    }

    public part1(): string {
        return `${this.simulate(80).length}`;
    }

    public part2(): string {
        const epochs = 256;
        const cycleEpochs = 7;
        const firstCycleBuffer = 2;
        // Cannot repurpose the algorithm from part 1, as an array cannot hold the amount of entries necessary

        // So, use new datastructures -> 7 64-bit ints, each showing how many reproducible fish are alive at each age,
        // and another 9 64-bit ints showing how many new spawns are alive at each age.

        // This algorithm has constant memory usage, and computation scales linearly
        let oldGeneration = new Array(cycleEpochs).fill(0);
        let newGeneration = new Array(cycleEpochs + firstCycleBuffer).fill(0);

        this.initialState.forEach(x => ++oldGeneration[x]);

        for (let i = 0; i < epochs; ++i) {
            // Cycle through fish age pools, starting at youngest and moving to oldest,
            // moving each pool down by one on each step, and spawning new fish when the age pool is 0.
            let descendents = 0;
            for (let j = newGeneration.length - 1; j >= 0; --j) {
                let swap = newGeneration[j];
                newGeneration[j] = descendents;
                descendents = swap;
            }
            // Add new spawn
            newGeneration[newGeneration.length - 1] = descendents;

            for (let j = oldGeneration.length - 1; j >= 0; --j) {
                let swap = oldGeneration[j];
                oldGeneration[j] = descendents;
                descendents = swap;
            }
            // Add new spawn
            newGeneration[newGeneration.length - 1] += descendents;
            // Reset spawn cycle for old fish
            oldGeneration[oldGeneration.length - 1] += descendents;
        }

        let populationSize = 0;
        newGeneration.forEach(x => populationSize += x);
        oldGeneration.forEach(x => populationSize += x);

        return `${populationSize}`;
    }
}

export { Day06 };