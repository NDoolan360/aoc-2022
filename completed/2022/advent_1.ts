import { readFileSync } from 'fs';

const elves = readFileSync('./file_in/2022/advent1_input.txt', 'utf-8')
    .split(/(\r?\n){2}/)
    .map((elvesList) =>
        elvesList
            .split(/\r?\n/)
            .map((elf) => Number(elf))
            .reduce((a, v) => a + v)
    )
    .sort((v1, v2) => v2 - v1);

console.log(elves.at(0));
console.log(elves.slice(0, 3).reduce((a, v) => a + v));
