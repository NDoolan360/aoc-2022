import { clone, importFile, sum, range } from '../../utils';

type value = { num: number; ind: number };

const fileLines = importFile('./file_in/2022/advent20_input.txt')
    .map(Number)
    .map((num, ind): value => ({ num, ind }));

const mix = (input: value[], itterations = 1) => {
    let mixed: value[] = clone(input);
    range(mixed.length * itterations).forEach((i) => {
        const mixIndex = mixed.findIndex(({ ind }) => ind === i % mixed.length);
        const [val] = mixed.splice(mixIndex, 1);
        mixed.splice((mixIndex + val.num) % mixed.length, 0, val);
    });
    return mixed;
};

const groveCoords = (mixed: value[]) => {
    const theZeroIndex = mixed.findIndex((n) => n.num === 0);
    return [1000, 2000, 3000]
        .map((val: number) => mixed[(theZeroIndex + val) % mixed.length].num)
        .reduce(sum);
};
// Part 1
console.log(groveCoords(mix(fileLines)));

// Part 2
const decryptKey = 811589153;
const realInput = fileLines.map(({ num, ind }) => ({
    num: num * decryptKey,
    ind,
}));
const mixed = mix(realInput, 10);
console.log(groveCoords(mixed));
