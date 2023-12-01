import { importFile, intersect, range } from '../../utils';

type Sections = number[];
type ElfGroup = Sections[];

const fileLines = importFile('./file_in/2022/advent4_input.txt');

const allPairs = fileLines
    // break up file into custom data structure
    .map((pair): ElfGroup => {
        return pair.split(',').map((sections): Sections => {
            const assignment = sections.split('-').map(Number);
            return range(assignment[0], assignment[1], true);
        });
    });

const isSubset = <T extends Sections>(superSet: T, subSet: T): boolean =>
    intersect(superSet, subSet).length === subSet.length;

// Part 1
const subset = (elfGroup: ElfGroup): boolean =>
    isSubset(elfGroup[0], elfGroup[1]) || isSubset(elfGroup[1], elfGroup[0]);
console.log(allPairs.filter(subset).length);

// Part 2
const anyOverlap = (elfGroup: ElfGroup): boolean =>
    intersect(elfGroup[0], elfGroup[1]).length > 0;

console.log(allPairs.filter(anyOverlap).length);
