import { importFile, fullZip, group, bundle } from '../../utils';

type List = (number | List[])[];

const fileLines: List[] = importFile('./file_in/2022/advent13_input.txt')
    .filter(Boolean) // remove blanks
    .map((list: string) => [JSON.parse(list)]);

//  > 1 if correct, 0 if unsure, < 1 if incorrect
const compare = (left: any, right: any): number => {
    if (!Array.isArray(left) && !Array.isArray(right)) return right - left;
    if (!Array.isArray(left) && Array.isArray(right)) left = [left];
    if (Array.isArray(left) && !Array.isArray(right)) right = [right];
    const compRes = fullZip(left, right).reduce((result, [l, r]) => {
        if (result != 0) return result;
        if (l == undefined) return 1;
        if (r == undefined) return -1;
        return compare(l, r);
    }, 0);
    if (compRes != 0) return compRes;
    return left.length === right.length ? 0 : 1;
};

const outcome1 = fileLines
    .reduce(...group(bundle, 2))
    .reduce((sum, [item1, item2], i) => {
        const comp = compare(item1, item2);
        return comp >= 0 ? sum + (i + 1) : sum;
    }, 0);
console.log(outcome1);

const decoderKeys = [[[2]], [[6]]];
const outcome2 = fileLines.flat().concat(decoderKeys).sort(compare).reverse();
console.log(
    (outcome2.indexOf(decoderKeys[0]) + 1) *
        (outcome2.indexOf(decoderKeys[1]) + 1)
);
