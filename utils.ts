import { readFileSync } from 'fs';

export type Coord = { y: number; x: number };

// File In
export function importFile(
    fileName: string,
    delimiter: RegExp = /\r?\n/,
    killTrailingBlank = true
) {
    const lines = readFileSync(fileName, 'utf-8').split(delimiter);
    if (killTrailingBlank && lines.at(-1) == '') lines.pop();
    return lines;
}

// Simple recursive clone
export const clone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};

// Loop (don't care about index)
export const loop = (amount: number, fn: () => void) => {
    range(0, amount).forEach(() => {
        fn();
    });
};

export const distance = (v1: [number, number], v2: [number, number]): number =>
    Math.sqrt(Math.pow(v1[0] - v2[0], 2) - Math.pow(v1[1] - v2[1], 2));

export const getMatrixVal = (map: any[][], coord: Coord) =>
    map[coord.y]?.[coord.x];

export const setDifference = (set1: Set<any>, set2: Set<any>): Set<any> => {
    const result = new Set<any>();
    set1.forEach((element) => {
        if (!set2.has(element)) {
            result.add(element);
        }
    });
    return result;
};

export const setUnion = (set1: Set<any>, set2: Set<any>): Set<any> => {
    const result = new Set<any>();
    set1.forEach((element) => result.add(element));
    set2.forEach((element) => result.add(element));
    return result;
};

export const setIntersection = (set1: Set<any>, set2: Set<any>): Set<any> => {
    const result = new Set<any>();
    set1.forEach((element) => {
        if (set2.has(element)) {
            result.add(element);
        }
    });
    return result;
};

export const setSymmetricDifference = (
    set1: Set<any>,
    set2: Set<any>
): Set<any> => {
    const result = setDifference(set1, set2);
    set2.forEach((element) => {
        if (!set1.has(element)) {
            result.add(element);
        }
    });
    return result;
};

// callbacks for array methods
export const sum = (sum: number, val: number) => sum + val;
export const difference = (difference: number, val: number) => difference - val;
export const product = (product: number, val: number) => product * val;
export const min = (min: number, val: number) => (val < min ? val : min);
export const max = (max: number, val: number) => (val > max ? val : max);
export const first = (o: string | any[], s: any[]) => o.concat(s[0]);
export const nth = (n: number) => (o: any[], s: any[]) => o.concat(s.at(n)!);
export const last = (o: string | any[], s: any[]) => o.concat(s[s.length - 1]);
export const any = (outcome: boolean, val: boolean) => outcome || val;
export const all = (outcome: boolean, val: boolean) => outcome && val;
export const asc = (val1: number, val2: number): number => val1 - val2;
export const desc = (val1: number, val2: number): number => val2 - val1;
export const hist = [
    <T extends Object>(
        hist: { [key: string]: number },
        val: T
    ): { [key: string]: number } => {
        hist[val.toString()] = (hist[val.toString()] || 0) + 1;
        return hist;
    },
    {} as { [key: string]: number },
] as const;
export const numberHist = [
    (
        hist: { [key: number]: number },
        val: number
    ): { [key: number]: number } => {
        const currAmt = hist[val];
        if (currAmt) hist[val] = currAmt + 1;
        else hist[val] = 1;
        return hist;
    },
    {} as { [key: string]: number },
] as const;

export const pair = (pairs: any[], point: any, i: number, arr: any[]) =>
    i + 1 < arr.length ? pairs.concat([[point, arr[i + 1]]]) : pairs;

export const deDup = (newArr: any[], point: any) =>
    newArr.find((v) => v.toString() == point.toString())
        ? newArr
        : newArr.concat([point]);

export const toSet = <T>(set: Set<T>, val: T): Set<T> => {
    set.add(val);
    return set;
};

export const hashTable = <T extends Object>(
    table: { [key: string]: T },
    val: T
) => {
    table[val.toString()] = val;
    return table;
};
// callback generators for array methods
// myArray1.filter(mask(<val>))
export const mask =
    <T extends Object>(mask: RegExp | T[]) =>
    (value: T): boolean => {
        if (Array.isArray(mask)) return mask.findIndex((e) => e === value) >= 0;
        return mask.test(value.toString());
    };
// myArray1.filter(skip(<jump?>, <offset?>))
export const skip = (jump = 1, offset = 0) => {
    return (_: string, index: number): boolean => (index - offset) % jump == 0;
};
// myArray1.reduce(zip(myArray2), [])
export const zip = (array2: any[]) => {
    return (zipped: any[][], item: any, index: number) => {
        if (array2[index] != undefined)
            zipped.push([item].concat([array2[index]]));
        return zipped;
    };
};
// fullZip(myArray1, myArray2);
export const fullZip = (array1: any[], array2: any[]) => {
    const out = new Array<any>(Math.max(array1.length, array2.length))
        .fill('')
        .map((_, i) => [array1[i], array2[i]]);
    return out;
};
// myArray.map(...transpose());
export const transpose = [
    (tranArray: any[][], row: any[], index: number, array: any[][]) => {
        if (tranArray.length == 0)
            tranArray = new Array(array[0].length)
                .fill('')
                .map(
                    (_, i) =>
                        new Array(
                            i >= array[array.length - 1].length
                                ? array.length - 1
                                : array.length
                        )
                );
        row.map((elem, i) => (tranArray[i][index] = elem));
        return tranArray;
    },
    new Array<Array<any>>(),
] as const;
// myArray.reduce(...group<T>(<indexer>, args...));
export const group = <T>(
    indexer: (index: number, arrayLength: number, ...args: any[]) => number,
    ...args: any[]
) => {
    return [
        (groups: T[][], item: T, index: number, array: T[]) => {
            const group = indexer(index, array.length, args);
            groups[group] = ([] as T[]).concat(groups[group] || [], item);
            return groups;
        },
        new Array<Array<T>>(),
    ] as const;
};
// indexers
export const bundle = (i: number, _: number, bundleSize: number) =>
    Math.floor(i / bundleSize);
export const divide = (i: number, arrayLength: number, binAmount: number) =>
    Math.floor((i / arrayLength) * binAmount);

// Interweb copied functions
// https://javascript.plainenglish.io/typescript-intersection-best-practice-6a7de85bb2f1
export function intersect<T extends Object>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(mask(arr2));
}
export function isSubset(superSet: any[], subSet: any[]): boolean {
    return superSet.filter(mask(subSet)).length === subSet.length;
}

// https://www.technicalfeeder.com/2021/07/how-to-generate-number-range-array-int-and-float/
export function range(
    num1: number,
    num2?: number,
    includeEnd = false
): number[] {
    const start = Math.floor(num2 != undefined ? num1 : 0);
    let end = Math.floor(num2 != undefined ? num2 : num1);
    if (includeEnd) start <= end ? end++ : end--;
    return Array(Math.abs(end - start))
        .fill(0)
        .map((_, i) => (start < end ? start + i : start - i));
}

console.log('Utils loaded.');
