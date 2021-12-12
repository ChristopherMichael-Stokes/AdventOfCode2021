import Solution from './solution';

class Day12 extends Solution {
    private readonly graph: number[][];
    private readonly enumerations: Map<string, number>;
    private readonly locations: string[];
    private readonly bigCaves: boolean[];

    constructor() {
        super(12);
        if (!this.input.inputString) {
            throw new Error('Error reading input');
        }
        // Make a mapping of node names to indices in the graph matrix
        const connections = this.input.inputString.split('\n').map(line => line.split('-'));
        this.locations = [... new Set(connections.reduce((accumulator, value) => accumulator.concat(value)))];
        this.enumerations = new Map();
        this.locations.forEach((name, index) => this.enumerations.set(name, index));
        this.bigCaves = this.locations.map((name, index) => name.match(/[A-Z]+/) ? true : false);

        this.graph = this.locations.map(_ => this.locations.map(_ => -1));

        // Write connections
        connections.forEach(connection => {
            console.log(connection)
            const start = this.enumerations.get(connection[0]);
            const end = this.enumerations.get(connection[1]);
            //@ts-ignore -- Fuck typescript
            this.graph[start][end] = 1;
            //@ts-ignore
            this.graph[end][start] = 1;
        });
        this.graph.forEach(row => console.log(row.toString()))
        console.log(this.locations);
    }

    public part1(): string {
        // Need a BFS graph traversal algorithm
        // Create counter for successful routes

        // Create a visited chain, make sure one of the next nodes to visit
        // has not been vistied alreay in the same chain
        // Create a visited array to show which nodes have been touched
        //  --> needed to avoid cycles

        // Create a stack
        // Push start node to stack
        // While stack is not empty:
        //  pop head
        //  if head is end, increment counter
        //  else push all connections to stack
        let routes = 0;
        const start = this.enumerations.get('start');
        const end = this.enumerations.get('end');
        if (start === undefined || end === undefined) {
            throw new Error('Bad input');
        }
        const stack: { node: number, chain: number[] }[] = [{ node: start, chain: [] }];
        while (stack.length > 0) {
            const head = stack.pop();
            if (head === undefined) {
                throw new Error('Fuck typescript');
            }
            if (!this.bigCaves[head.node] && head.chain.includes(head.node)) {
                continue;
            }
            if (head.node === end) {
                ++routes;
                //console.log(head.chain.map(n => this.locations[n]));
            } else {
                // Find all other connections
                this.graph[head.node].forEach((distance, index) => {
                    if (index != head.node && distance >= 0) {
                        stack.push({
                            node: index,
                            chain: [...head.chain.map(x => x), head.node]
                        });
                    }
                });

            }
        }


        return `${routes}`;
    }

    public part2(): string {
        let routes = 0;
        const start = this.enumerations.get('start');
        const end = this.enumerations.get('end');
        if (start === undefined || end === undefined) {
            throw new Error('Bad input');
        }
        const stack: { node: number, chain: number[], littleBigCave: number }[] = [{ node: start, chain: [], littleBigCave: -1 }];
        while (stack.length > 0) {
            const head = stack.pop();
            if (head === undefined) {
                throw new Error('Fuck typescript');
            }

            // Add new rules to allow single small cave to be seen twice
            if (head.node === end) {
                ++routes;
                console.log(head.chain.map(n => this.locations[n]).join(',')+',end');
                continue;
            }

            // Issue -> we are breaking too early
            if (!this.bigCaves[head.node]) {
                // If there is no set littleBigCave
                if (head.node != start && head.littleBigCave === -1) {
                    // BUg ^ we always set littleBig cave to first cave visited
                    head.littleBigCave = head.node;
                }



                // If we are in the littleBigCave
                if (head.littleBigCave === head.node) {
                    let visits = 0;
                    head.chain.forEach(x => {
                        if (x === head.node) {
                            ++visits;
                        }
                    });
                    // Make sure we visit at most twice
                    if (visits > 1) {
                        continue;
                    }
                } else if (head.chain.includes(head.node)) {
                    continue;
                }
            }

            // Find all other connections
            this.graph[head.node].forEach((distance, index) => {
                if (index != head.node && distance >= 0) {
                    stack.push({
                        node: index,
                        chain: [...head.chain.map(x => x), head.node],
                        littleBigCave: head.littleBigCave
                    });
                }
            });
        }


        return `${routes}`;
    }
}

export { Day12 };