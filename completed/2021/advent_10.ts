import { asc, importFile, nth, sum } from '../../utils';

const fileLines = importFile('./file_in/2021/advent_10_in.txt');

const syntaxScore = new Map<string, number>(
    Object.entries({ ')': 3, ']': 57, '}': 1197, '>': 25137 })
);
const autoCScore = new Map<string, number>(
    Object.entries({ ')': 1, ']': 2, '}': 3, '>': 4 })
);
const openers = ['(', '[', '{', '<'];
const closers = Array.from(syntaxScore.keys());

const flipBracket = (bracket: string) =>
    openers.indexOf(bracket) >= 0
        ? closers[openers.indexOf(bracket)]
        : openers[closers.indexOf(bracket)];

const findEndingDepth = (line: string) =>
    line.split('').reduce((nesting, bracket) => {
        const closerIdx = closers.indexOf(bracket);
        if (closers.indexOf(nesting.at(-1)!) >= 0) return nesting;
        if (openers.indexOf(bracket) >= 0) return nesting.concat(bracket);
        if (closerIdx >= 0) {
            if (openers.indexOf(nesting.at(-1)!) == closerIdx)
                return nesting.slice(0, -1);
            else return nesting.concat(bracket);
        }
        return nesting;
    }, [] as string[]);

const outcome1 = fileLines
    .filter((l) => syntaxScore.get(findEndingDepth(l).at(-1)!) != undefined)
    .map((str) => syntaxScore.get(findEndingDepth(str).at(-1)!)!)
    .reduce(sum);
console.log(outcome1);

const outcome2 = fileLines
    .map((l) => findEndingDepth(l).reverse())
    .filter((str) => syntaxScore.get(str[0]) == undefined)
    .map((l) =>
        l.reduce(
            (score, bracket) =>
                score * 5 + autoCScore.get(flipBracket(bracket))!,
            0
        )
    )
    .sort(asc)
    .filter((_, i, arr) => i === Math.floor(arr.length / 2))[0];
console.log(outcome2);
