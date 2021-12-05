import Solution from './solution';

class Day05 extends Solution {
    private readonly lineSegments: number[][];
    private readonly highestPoint: { x: number, y: number };

    constructor() {
        super(5);
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        let inputLines = this.input.inputString.split('\n');
        console.log(inputLines);

        // Lets represent line segments with four points
        this.lineSegments = [[]];
        this.lineSegments.pop();
        inputLines.forEach(line => {
            let points = line.split('->');

            let lineSegment: number[] = [];
            points.forEach(point => {
                lineSegment.push(...point.split(',').map(x => parseInt(x)));
            });
            this.lineSegments.push(lineSegment);
        });
        console.log(this.lineSegments)


        // Find the maximum x and y on the grid
        this.highestPoint = { x: 0, y: 0 };
        // Find biggest x
        this.lineSegments.forEach(line => {
            if (line[0] > this.highestPoint.x) {
                this.highestPoint.x = line[0];
            }
            if (line[2] > this.highestPoint.x) {
                this.highestPoint.x = line[2];
            }
        })
        // Find biggest y
        this.lineSegments.forEach(line => {
            if (line[1] > this.highestPoint.y) {
                this.highestPoint.y = line[1];
            }
            if (line[3] > this.highestPoint.y) {
                this.highestPoint.y = line[3];
            }
        })
        console.log(this.highestPoint);
    }

    private makeGrid(): number[][] {
        return [...Array(this.highestPoint.x + 1)].map(x => Array(this.highestPoint.y + 1).fill(0));
    }

    public part1(): string {
        // Fill in line hit points in the grid, but only for cardinal lines
        const grid = this.makeGrid();
        this.lineSegments.forEach(line => {
            if (line[0] === line[2]) {
                // Same xs so vertical line
                const start = line[1] < line[3] ? line[1] : line[3];
                const end = line[1] < line[3] ? line[3] : line[1];
                for (let i = start; i <= end; ++i) {
                    ++grid[i][line[0]];
                }
            } else if (line[1] === line[3]) {
                // same ys so horizontal line
                const start = line[0] < line[2] ? line[0] : line[2];
                const end = line[0] < line[2] ? line[2] : line[0];
                for (let i = start; i <= end; ++i) {
                    ++grid[line[1]][i];
                }
            }
            
        });
        let overlaps = 0;
        grid.forEach(row => {
            overlaps += row.filter(x => x >= 2).length;
            console.log(row.toString());
        })

        
        return `${overlaps}`;
    }

    public part2(): string {
        const grid = this.makeGrid();
        this.lineSegments.forEach(line => {
            if (line[0] === line[2]) {
                // Same xs so vertical line
                const start = line[1] < line[3] ? line[1] : line[3];
                const end = line[1] < line[3] ? line[3] : line[1];
                for (let i = start; i <= end; ++i) {
                    ++grid[i][line[0]];
                }
            } else if (line[1] === line[3]) {
                // Same ys so horizontal line
                const start = line[0] < line[2] ? line[0] : line[2];
                const end = line[0] < line[2] ? line[2] : line[0];
                for (let i = start; i <= end; ++i) {
                    ++grid[line[1]][i];
                }
            } else {
                // 45 degree line
                let x = line[2];
                let y = line[3];
                const xIncrement = line[0] > x ? 1 : -1;
                const yIncrement = line[1] > y ? 1 : -1;
                // Start at first point, increment position by above values
                while (x != line[0] && y != line[1]) {
                    ++grid[y][x];
                    x += xIncrement;
                    y += yIncrement;
                }
                ++grid[y][x];              
            }
        });
        let overlaps = 0;
        grid.forEach(row => {
            overlaps += row.filter(x => x >= 2).length;
            console.log(`\n`,row.toString());
        })
        return `${overlaps}`;
    }
}

export { Day05 };