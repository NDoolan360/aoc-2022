import { numberHist, importFile, transpose, range } from '../../utils';

const fileLines = importFile('./file_in/2021/advent_3_in.txt');

const commonBits = fileLines
    .map((l) => l.split('').map(Number))
    .reduce(...transpose)
    .map((column) => {
        const hist = column.reduce(...numberHist);
        return hist[0] > hist[1] ? 0 : 1;
    });

const uncommonBits = commonBits.map((v) => (v == 1 ? 0 : 1));

const gamma = Number.parseInt(commonBits.join(''), 2);
const epsilon = Number.parseInt(uncommonBits.join(''), 2);

const oxyGen = Number.parseInt(
    range(fileLines[0]!.length)
        .reduce(
            (lines, _, i) => {
                if (lines.length == 1) return lines;
                const flip = lines.reduce(...transpose);
                const flipCommon = flip.map((col) => {
                    const hist = col.reduce(...numberHist);
                    return hist[0] > hist[1] ? 0 : 1;
                });
                return lines.filter((v) => v[i] == flipCommon[i]);
            },
            fileLines.map((l) => l.split('').map(Number))
        )[0]
        .join(''),
    2
);

const scrubber = Number.parseInt(
    range(fileLines[0]!.length)
        .reduce(
            (lines, _, i) => {
                if (lines.length == 1) return lines;
                const flip = lines.reduce(...transpose);
                const flipUncommon = flip.map((col) => {
                    const hist = col.reduce(...numberHist);
                    return hist[0] <= hist[1] ? 0 : 1;
                });
                return lines.filter((v) => v[i] == flipUncommon[i]);
            },
            fileLines.map((l) => l.split('').map(Number))
        )[0]
        .join(''),
    2
);

console.log(gamma * epsilon);
console.log(oxyGen * scrubber);
