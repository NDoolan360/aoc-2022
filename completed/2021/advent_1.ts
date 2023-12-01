import { importFile, sum } from '../../utils';

const fileLines = importFile('./file_in/2021/advent_1_in.txt');

let last: number;

const outcome1 = fileLines.map(Number).reduce((count, val) => {
    if (last && last < val) count++;
    last = val;
    return count;
}, 0);

console.log(outcome1);

let lastWindow = new Array(3);

const outcome2 = fileLines.map(Number).reduce((count, val, i) => {
    const newWindow = Array.from([lastWindow[1], lastWindow[2], val]);
    if (i > 2 && lastWindow.reduce(sum) < newWindow.reduce(sum)) count++;
    lastWindow = newWindow;
    return count;
}, 0);

console.log(outcome2);
