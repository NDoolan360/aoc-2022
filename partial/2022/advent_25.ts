import { importFile, sum } from '../../utils';

const fileLines = importFile('./file_in/2022/advent25_input.txt');

const toSNAFU = (num: number): string => {
    const result = [] as string[];
    let remaining = num;
    while (remaining > 0) {
        const remainder = ((remaining + 2) % 5) - 2;
        remaining = Math.floor((remaining + 2) / 5);
        result.unshift(
            remainder == -2 ? '=' : remainder == -1 ? '-' : String(remainder)
        );
    }
    return result.join('');
};

const fromSNAFU = (snafu: string): number =>
    Array.from(snafu).reduce(
        (result, char, index) =>
            result +
            (char == '=' ? -2 : char == '-' ? -1 : Number(char)) *
                5 ** (snafu.length - index - 1),
        0
    );

const outcome = toSNAFU(fileLines.map(fromSNAFU).reduce(sum));

console.log(outcome);
