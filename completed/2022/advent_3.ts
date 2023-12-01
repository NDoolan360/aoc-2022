import { importFile, group, bundle, intersect, divide, sum } from '../../utils';
// Happy to share my utils if you want. Just ask :)

type Rucksack = Array<Array<string>>;
type Group = Array<Array<string>>;

const fileLines = importFile('./file_in/2022/advent3_input.txt');

// convert character to priority score
const toPriority = (char: string) =>
    char.toLowerCase() == char
        ? char.charCodeAt(0) - 'a'.charCodeAt(0) + 1
        : char.charCodeAt(0) - 'A'.charCodeAt(0) + 1 + 26;

// find common item
const findCommon = <T extends Object>(group: T) => {
    if (!Array.isArray(group)) return;
    return group.reduce((common: T[], item: T[]) => intersect(common, item))[0];
};

//  Part 1
const rucksackCompartments = 2;
const rucksackSum = fileLines
    // turn line into rucksacks
    .map((line) =>
        line.split('').reduce(...group<string>(divide, rucksackCompartments))
    )
    .map((rucksack: Rucksack) => findCommon(rucksack))
    .map(toPriority)
    .reduce(sum);
console.log(rucksackSum);

//  Part 2
const groupSize = 3;
const groupBadgeSum = fileLines
    // group up elves by <groupSize>
    .reduce(...group<string>(bundle, groupSize))
    // unpack grouped elves rucksacks
    .map((elves): Group => elves.map((elf) => elf.split('')))
    .map((group) => findCommon(group))
    .map(toPriority)
    .reduce(sum);
console.log(groupBadgeSum);
