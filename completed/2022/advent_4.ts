import { importFile } from '../../utils';

type SectionAssignment = { start: number; end: number };
type ElfPair = { elf1: SectionAssignment; elf2: SectionAssignment };

const fileLines = importFile('./file_in/2022/advent4_input.txt');

const subset = (pair: ElfPair): boolean =>
    //         1s-------1e
    //    2s-----------------2e
    //              or
    //    1s-----------------1e
    //         2s-------2e
    (pair.elf1.start >= pair.elf2.start && pair.elf1.end <= pair.elf2.end) ||
    (pair.elf1.start <= pair.elf2.start && pair.elf1.end >= pair.elf2.end);

const tailOverlap = (pair: ElfPair): boolean =>
    //         1s-------1e
    //    2s-------2e
    //         or
    //    1s-------1e
    //         2s-------2e
    (pair.elf1.start <= pair.elf2.start &&
        pair.elf1.end <= pair.elf2.end &&
        pair.elf2.start <= pair.elf1.end) ||
    (pair.elf1.start >= pair.elf2.start &&
        pair.elf1.end >= pair.elf2.end &&
        pair.elf1.start <= pair.elf2.end);

const outcome = fileLines
    // break up data structure
    .map((pair): ElfPair => {
        const elves = pair.split(',').map((sections) => {
            const assignment = sections.split('-').map(Number);
            return { start: assignment[0], end: assignment[1] };
        });
        return { elf1: elves[0], elf2: elves[1] };
    });

console.log(outcome.filter((pair) => subset(pair)).length);

console.log(outcome.filter((pair) => subset(pair) || tailOverlap(pair)).length);
