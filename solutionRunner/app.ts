import * as readline from 'readline';
import * as solutions from './solutions';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

console.log('\nEnter problem number to get solution for, or q to quit');
rl.on('line', async (input) => {
    if (input === 'q') {
        rl.close();
    }
    const problem: number = parseInt(input);
    if (Number.isNaN(problem)) {
        console.log(`${input} is not a number`);
    } else if (problem > 25 || problem < 1) {
        console.log(`Input needs to be between 1 and 25 inclusive`);
    } else {
        let solution: solutions.Solution | undefined;

        switch (problem) {
            case (1):
                solution = new solutions.Day01();
                break;
            case (2):
                solution = new solutions.Day02();
                break;
            case (3):
                solution = new solutions.Day03();
                break;
            case (4):
                solution = new solutions.Day04();
                break;
            case (5):
                solution = new solutions.Day05();
                break;
            case (6):
                solution = new solutions.Day06();
                break;
            default:
                solution = undefined;
                break;
        }

        if (!solution) {
            console.log(`Solutions for day ${problem} have not been implemented`);
        } else {
            console.log(`Day ${problem} solution:`);
            console.log(`Part 1: ${solution.part1()}`);
            console.log(`Part 2: ${solution.part2()}`);
        }
    }

    console.log('\nEnter problem number to get solution for, or q to quit:');
});