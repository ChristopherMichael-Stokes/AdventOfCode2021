/// < reference path="enums.ts" />
/// < reference path="params.ts" />
import * as fs from 'fs';

/** Class template for solution implementations */
export default abstract class Solution {
    private readonly inputRoot = '../inputs';
    protected readonly input: params.problemInput;
    protected value1 = '';
    protected value2 = '';

    constructor(day: number) {
        // Get the input file name
        const inputPath = `${this.inputRoot}/day${day.toString().padStart(2, '0')}.json`;
        console.log(inputPath);
        let inputString = '';
        let inputStatus: enums.inputStatus;

        try {
            // Read file data
            const data = fs.readFileSync(inputPath);
            const json = JSON.parse(data.toString());
            inputString = json.input;
            inputStatus = enums.inputStatus.readSuccess;
        } catch (e) {
            const error = e as Error;
            if (error.message.includes('ENOENT')) {
                inputStatus = enums.inputStatus.inputNotFound;
            } else {
                inputStatus = enums.inputStatus.readFailure;
            }
            //console.log(error.name);
            //console.log(error.message);
            inputString = '';
        }
        this.input = {
            inputStatus: inputStatus,
            inputString: inputString
        };
    }

    public part1(): string {
        return 'Not implemented';
    }
    public part2(): string {
        return 'Not implemented';
    }
}

export { Solution };