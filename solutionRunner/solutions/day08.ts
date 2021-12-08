import Solution from './solution';

class Day08 extends Solution {
    private readonly encodings: { code: string[], value: string[] }[];
    private readonly digitLengths: Map<number, number>;
    constructor() {
        super(8);
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        const inputLines = this.input.inputString.split('\n');
        this.encodings = inputLines.map(line => {
            let encoding: { code: string[], value: string[] } = { code: [], value: [] };
            encoding.code = line.split('|')[0].trim().split(' ');
            encoding.value = line.split('|')[1].trim().split(' ');
            return encoding;
        });

        this.digitLengths = new Map();
        this.digitLengths.set(0, 6);
        this.digitLengths.set(1, 2);
        this.digitLengths.set(2, 5);
        this.digitLengths.set(3, 5);
        this.digitLengths.set(4, 4);
        this.digitLengths.set(5, 5);
        this.digitLengths.set(6, 6);
        this.digitLengths.set(7, 3);
        this.digitLengths.set(8, 7);
        this.digitLengths.set(9, 6);

        console.log(this.encodings);
    }

    private getUniqueLengths() {
        // Work out the unique parings of lengths to digits
        const uniqueLengths: Map<number, number> = new Map();
        for (let i = 0; i < 10; ++i) {
            const length = this.digitLengths.get(i);
            if (!length) {
                continue
            }
            let unique = true;
            for (let j = 0; j < 10; ++j) {
                if (i === j) {
                    continue;
                }
                if (this.digitLengths.get(j) === length) {
                    unique = false;
                }
            }
            if (unique) {
                uniqueLengths.set(length, i);
            }
        }
        return uniqueLengths;
    }
    public part1(): string {
        const uniqueLengths = this.getUniqueLengths();

        const digits: number[] = [];
        // Decode unique digits in input
        this.encodings.forEach(encoding => {
            encoding.value.forEach(codedDigit => {
                const digit = uniqueLengths.get(codedDigit.length);
                if (digit != undefined) {
                    digits.push(digit);
                }
            });
        });

        return `${digits.length}`;
    }

    public part2(): string {
        

        // Need to implement a constraint matching algorithm,
        // Backtracing might be the simplest

        // Goal is to match lit segments from decoded digits to a physical location,
        // then use this mapping to decode the rest of the digits


        // 1. Define the correct mapping for all digits
        type display = { a?: boolean, b?: boolean, c?: boolean, d?: boolean, e?: boolean, f?: boolean, g?: boolean }
        const segmentMap: Map<number, display> = new Map();
        segmentMap.set(0, { a: true, b: true, c: true, e: true, f: true, g: true });
        segmentMap.set(1, { c: true, f: true });
        segmentMap.set(2, { a: true, c: true, d: true, e: true, g: true });
        segmentMap.set(3, { a: true, c: true, d: true, f: true, g: true });
        segmentMap.set(4, { b: true, c: true, d: true, f: true });
        segmentMap.set(5, { a: true, b: true, d: true, f: true, g: true });
        segmentMap.set(6, { a: true, b: true, d: true, e: true, f: true, g: true });
        segmentMap.set(7, { a: true, c: true, f: true });
        segmentMap.set(8, { a: true, b: true, c: true, d: true, e: true, f: true, g: true });
        segmentMap.set(9, { a: true, b: true, c: true, d: true, f: true, g: true });

        // 2. Find 'easy' numbers
        const uniqueLengths = this.getUniqueLengths();
        let encoding = this.encodings[0];

        const decoded: Map<number, string> = new Map();
        console.log(encoding);
        encoding.code.forEach(codedDigit => {
            const digit = uniqueLengths.get(codedDigit.length);
            if (digit != undefined) {
                decoded.set(digit, codedDigit);
            }
        });
        console.log(decoded);

        // 2.1. Calculate which should be on & count each segement that is turned on
        interface Segments {
            [index: string]: number;
            a: number;
            b: number;
            c: number;
            d: number;
            e: number;
            f: number;
            g: number;
        }
        const decodedSegments: Segments = { 'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0 };
        const encodedSegments: Segments = { 'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0 };
        decoded.forEach((segments, digit, _) => {
            // Find out how many of each are actually on
            segments.split('').forEach(s => {
                ++encodedSegments[s];
            });
            // Find out how many of each should be on        
        });

        console.log(encodedSegments);
        // 2.2  Count each segement that is turned on



        // This approach will not always work as it is not guaranteed that there will be a unique amount
        // of segments always turned on
        return '';
    }
}

export { Day08 };