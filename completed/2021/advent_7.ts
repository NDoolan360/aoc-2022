import { asc, importFile, range, sum } from '../../utils';

const crabs = importFile('./file_in/2021/advent_7_in.txt', /,/)
    .map(Number)
    .sort(asc);

const mid = crabs[Math.floor(crabs.length / 2)];
const outcome1 = crabs.map((crab) => Math.abs(crab - mid)).reduce(sum);
console.log(outcome1);

// search through all possible allignment points looking for best
const outcome2 = range(crabs[0], crabs.at(-1)!, true).reduce((best, point) => {
    return Math.min(
        best,
        crabs.reduce((cost, crab) => {
            const distToPoint = Math.abs(crab - point);
            return cost + (distToPoint * (distToPoint + 1)) / 2;
        }, 0)
    );
}, Infinity);
console.log(outcome2);
