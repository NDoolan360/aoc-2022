import { importFile, range } from '../../utils';

type Valve = {
    name: string;
    flow: number;
    open: boolean;
    connections: Map<string, number>;
};

const fileLines = importFile('./file_in/2022/advent16_input.txt');

// parse input
const valves = fileLines.reduce((valves, l) => {
    const name = l.split(/Valve (\w+)/)[1];
    const flow = Number(l.split(/rate=(\d+);/)[1]);
    const connections = new Map<string, number>([[name, 0]]);
    l.split(/valves? /)[1]
        .split(', ')
        .forEach((name) => {
            connections.set(name, 1);
        });
    valves.set(name, { name, flow, open: false, connections });
    return valves;
}, new Map<string, Valve>());

const getDistBetween = (valve1: string, valve2: string): number =>
    valves.get(valve1)!.connections.get(valve2) || Infinity;

// floyd warshall to update min distance between useful valves
valves.forEach((valve1) =>
    valves.forEach((valve2) =>
        valves.forEach((valve3) =>
            valve2.connections.set(
                valve3.name,
                Math.min(
                    getDistBetween(valve2.name, valve3.name),
                    getDistBetween(valve2.name, valve1.name) +
                        getDistBetween(valve1.name, valve3.name)
                )
            )
        )
    )
);
// remove no flow valves after finding min distance between useful valves
valves.forEach((valve, name) => {
    if (name != 'AA' && !valve.flow) valves.delete(name);
    valves.forEach((valve2, _) => {
        if (!valve.flow) valve2.connections.delete(name);
    });
});

const knownStates = new Map<string, number>();
const allValves = Array.from(valves.keys());

const stateToInt = (state: string[]): number => {
    return Number.parseInt(
        allValves
            .map((valve) => (state.findIndex((v) => v == valve) >= 0 ? 1 : 0))
            .join(''),
        2
    );
};

const dfs = (time: number, valve: string, valvesState: string[]): number => {
    if (knownStates.get(`${time}$${valve}$${stateToInt(valvesState)}`))
        return knownStates.get(`${time}$${valve}$${stateToInt(valvesState)}`)!;
    let maxFlow = 0;
    valves.get(valve)!.connections.forEach((dist, neighbour) => {
        if (valvesState.indexOf(neighbour) >= 0) return;
        const remTime = time - dist - 1;
        if (remTime <= 0) return;
        valves.get(neighbour)!.open = true;
        maxFlow = Math.max(
            maxFlow,
            valves.get(neighbour)!.flow * remTime +
                dfs(remTime, neighbour, valvesState.concat(neighbour))
        );
    });
    knownStates.set(`${time}$${valve}$${stateToInt(valvesState)}`, maxFlow);
    return maxFlow;
};
console.log(dfs(30, 'AA', [])); // Part 1

// Part 2
// Just try every partition of all the valves between person and elephant
// required adding caching of states and the decimal to binary to valve state converter
// Very slow, but get's done eventually (approx 1.5 mins  )

let bestWithElephantScore = 0;
const decimalToBinaryToValves = (n: number): string[] => {
    if (n <= 0) return [];
    let binary: number[] = [];
    while (n > 0) {
        binary.push(n % 2);
        n = Math.floor(n / 2);
    }
    return allValves.filter((_, i) => binary[i] == 1);
};

range(Math.pow(2, allValves.length) - 1).forEach((int) => {
    const personValves = decimalToBinaryToValves(int);
    const elephantValves = allValves.filter((v) => !personValves.includes(v));
    bestWithElephantScore = Math.max(
        bestWithElephantScore,
        dfs(26, 'AA', personValves) + dfs(26, 'AA', elephantValves)
    );
});

console.log(bestWithElephantScore);
