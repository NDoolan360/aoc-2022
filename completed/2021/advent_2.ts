import { importFile, product } from '../../utils';

const fileLines = importFile('./file_in/2021/advent_2_in.txt');

// part 1: hori, depth
// part 2: aim, hori, depth
let pos = [0, 0, 0];

const outcome = fileLines.forEach((l) => {
    const command = l.split(' ');
    console.log(command, pos);
    switch (command[0]) {
        case 'up':
            pos[0] -= Number(command[1]);
            break;
        case 'down':
            pos[0] += Number(command[1]);
            break;
        case 'forward':
            pos[1] += Number(command[1]);
            pos[2] += pos[0] * Number(command[1]); // part 2
            break;
        case 'down':
            pos[1] -= Number(command[1]);
            break;
    }
    console.log(command, pos);
});

// Part 1
// console.log(pos.reduce(product));
console.log(pos.slice(1, 3).reduce(product));
