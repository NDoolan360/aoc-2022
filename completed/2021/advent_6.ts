import { importFile, numberHist, range, sum } from '../../utils';

const initFish = importFile('./file_in/2021/advent_6_in.txt', /,/)
    .map(Number)
    .reduce(...numberHist);
const resetAge = 6;
const newAge = 8;

const daysElapsed = 256;

const outcome = range(daysElapsed).reduce((fish) => {
    const newFish = fish[0];
    return range(0, newAge, true).reduce((stages, stage) => {
        stages[stage] = stages[stage + 1] || 0;
        if (stage == newAge || stage == resetAge) stages[stage] += newFish;
        return stages;
    }, fish);
}, initFish);

console.log(Object.values(outcome).reduce(sum));
