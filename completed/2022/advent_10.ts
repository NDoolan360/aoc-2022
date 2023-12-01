import { importFile, range } from '../../utils';

type Computer = { cycle: number; xReg: number; sum: number; screen: string[][] };

const fileLines = importFile('./file_in/2022/advent10_input.txt');
const screen = range(6).map(() => Array<string>(40).fill(' '));

const processCycle = (com: Computer): void => {
    com.cycle++;
    if (com.cycle % 40 == 20) com.sum += com.cycle * com.xReg; // Part 1
    // Part 2
    const screenCol = (com.cycle - 1) % 40;
    if (Math.abs(screenCol - com.xReg) <= 1) {
        com.screen[Math.floor((com.cycle - 1) / 40)][screenCol] = '.';
    }
};

const com = fileLines
    .map((line) => line.split(' '))
    .reduce(
        (com, instruction) => {
            processCycle(com);
            if (instruction[0] == 'addx') {
                processCycle(com);
                com.xReg += Number(instruction[1]);
            }
            return com;
        },
        { cycle: 0, xReg: 1, sum: 0, screen: screen }
    );

// Part 1
console.log(com.sum);
// Part 2
com.screen.forEach((row) => console.log(row.join('')));
