import {
    importFile,
    transpose,
    skip,
    mask,
    loop,
    clone,
    first,
} from '../../utils';

type Crate = string;
type Stack = Crate[];
type Move = { amount: number; from: number; to: number };

const fileLines = importFile('./file_in/2022/advent5_input.txt');

// parse crate strucutre
const stacks = fileLines
    .splice(0, fileLines.findIndex((v) => v.length == 0) + 1)
    .map((rowText) => rowText.split('').filter(skip(4, 1)))
    .reduce(...transpose)
    .map((crateStack: Stack) => crateStack.filter(mask(/[A-Z]/)));

// parse moves
const moves = fileLines.map((line: string): Move => {
    const nums = line.split(' ').filter(Number).map(Number);
    return {
        amount: nums[0],
        from: nums[1] - 1, // 0 index location for array ref later
        to: nums[2] - 1, // 0 index location for array ref later
    };
});

// returns an array of stacks that would be a result of moves
const runMoves = (
    moves: Move[],
    stacks: Stack[],
    machine: (stacks: Stack[], move: Move) => Stack[]
): Stack[] => moves.reduce(machine, stacks);

// Part 1 - crateMover9000
const crateMover9000 = (stacks: Stack[], move: Move) => {
    loop(move.amount, () => {
        const crate = stacks[move.from].splice(0, 1);
        stacks[move.to] = crate.concat(stacks[move.to]);
    });
    return stacks;
};
console.log(runMoves(moves, clone(stacks), crateMover9000).reduce(first, ''));

// Part 2 - CrateMover 9001
const crateMover9001 = (stacks: Stack[], move: Move) => {
    const movedCrates = stacks[move.from].splice(0, move.amount);
    stacks[move.to] = movedCrates.concat(stacks[move.to]);
    return stacks;
};
console.log(runMoves(moves, clone(stacks), crateMover9001).reduce(first, ''));
