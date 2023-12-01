import { readFileSync } from 'fs';

const elves = readFileSync('./file_in/2022/advent1_input.txt', 'utf-8')
    .split(/\r?\n/)
    .map(Number)
    .reduce(
        (elves, l) =>
            !l ? [0].concat(elves) : [elves[0] + l].concat(elves.slice(1)),
        [0] as number[]
    )
    .sort((v1, v2) => v2 - v1);
console.log(
    elves[0],
    elves.slice(0, 3).reduce((a, v) => a + v)
);
