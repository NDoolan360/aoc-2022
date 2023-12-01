import { importFile, intersect } from '../../utils';

const noteLines = importFile('./file_in/2021/advent_8_in.txt').map((line) =>
    line
        .split(' | ')
        .map((side) => side.split(' ').map((v) => v.split('').sort().join('')))
);

const inBothLen = (s1: string, s2: string): number =>
    intersect(s1.split(''), s2.split('')).length;

const solveJumble = (inputs: string[]): string[] => {
    const _1 = inputs.filter((v) => v.length == 2)[0];
    const _4 = inputs.filter((v) => v.length == 4)[0];
    const _7 = inputs.filter((v) => v.length == 3)[0];
    const _8 = inputs.filter((v) => v.length == 7)[0];
    const _9 = inputs.filter((v) => v.length == 6 && inBothLen(v, _4) == 4)[0];
    const _3 = inputs.filter((v) => v.length == 5 && inBothLen(v, _1) == 2)[0];
    const _2 = inputs.filter((v) => v.length == 5 && inBothLen(v, _4) == 2)[0];
    const _5 = inputs.filter((v) => v.length == 5 && v != _3 && v != _2)[0];
    const _0 = inputs.filter((v) => v.length == 6 && inBothLen(v, _5) == 4)[0];
    const _6 = inputs.filter((v) => v.length == 6 && v != _9 && v != _0)[0];
    return [_0, _1, _2, _3, _4, _5, _6, _7, _8, _9];
};

const outcome1 = noteLines
    .map((line) =>
        line[1].filter((right) => [2, 3, 4, 7].find((v) => v == right.length))
    )
    .flat();
console.log(outcome1.length);

const outcome2 = noteLines.reduce((total, [inputs, dials]) => {
    const solution = solveJumble(inputs);
    const actual = dials
        .map((dial) => solution.findIndex((s) => s == dial).toString())
        .join('');
    return total + Number(actual);
}, 0);
console.log(outcome2);
