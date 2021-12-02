import Solution from './solution';

class Day02 extends Solution {
    private readonly inputMoves: { direction: string, magnitude: number }[];

    constructor() {
        super(2);
        if (!this.input.inputString) {
            throw new Error('error reading input');
        }
        this.inputMoves = [];
        this.input.inputString.split('\n').forEach(line => {
            this.inputMoves.push({ direction: line.split(' ')[0], magnitude: parseInt(line.split(' ')[1]) });
        });
        console.log(this.inputMoves);
    }

    public part1(): string {
        let pos = { x: 0, y: 0 };

        this.inputMoves.forEach(move => {
            if (move.direction === 'forward') {
                pos.x += move.magnitude;
            } else if (move.direction === 'up') {
                pos.y -= move.magnitude;
            } else if (move.direction === 'down') {
                pos.y += move.magnitude;
            }
        });

        return (pos.x * pos.y).toString();
    }

    public part2(): string {
        let pos = { x: 0, y: 0, aim: 0 };

        this.inputMoves.forEach(move => {
            if (move.direction === 'forward') {
                pos.x += move.magnitude;
                pos.y += pos.aim * move.magnitude;
            } else if (move.direction === 'up') {
                pos.aim -= move.magnitude;
            } else if (move.direction === 'down') {
                pos.aim += move.magnitude;
            }
        });

        return (pos.x * pos.y).toString();
    }
}

export { Day02 };