import { importFile } from '../../utils';

type Monkey = {
    name: string;
    left: string;
    op: '+' | '-' | '*' | '/';
    right: string;
};

const fileLines = importFile('./file_in/2022/advent21_input.txt');

const monkeys = fileLines
    .map((l) => {
        let [name, left, op, right] = l.split(' ');
        name = name.slice(0, -1);
        return { name, left, op, right } as Monkey;
    })
    .reduce((monkeyMap: Map<string, Monkey>, currMonkey: Monkey) => {
        monkeyMap.set(currMonkey.name, currMonkey);
        return monkeyMap;
    }, new Map<string, Monkey>());

// Part 1
const getValue = (monke: Monkey): number => {
    if (monke.op === undefined) return Number(monke.left);
    const left = getValue(monkeys.get(monke.left)!);
    const right = getValue(monkeys.get(monke.right)!);
    return eval(''.concat(left.toString(), monke.op, right.toString()));
};
console.log(getValue(monkeys.get('root')!));

// Part 2
const findHumnSide = (monke: Monkey): string => {
    const left = monkeys.get(monke.left)!;
    const right = monkeys.get(monke.right)!;
    if (monke.op === undefined) return '';
    if (left.name == 'humn') return 'left';
    if (right.name == 'humn') return 'right';
    if (findHumnSide(left) != '') return 'left';
    if (findHumnSide(right) != '') return 'right';
    return '';
};

const findHumnVal = (monkeName: string, score: number): number => {
    if (monkeName == 'humn') return score;
    const monke = monkeys.get(monkeName)!;
    const side = findHumnSide(monke);
    const humnSide = side == 'left' ? monke.left : monke.right;
    const notHumnSide = side == 'left' ? monke.right : monke.left;
    const value = getValue(monkeys.get(notHumnSide)!);
    if (monkeName == 'root') return findHumnVal(humnSide, value);
    if (monke.op == '+') return findHumnVal(humnSide, score - value);
    if (monke.op == '*') return findHumnVal(humnSide, score / value);
    if (side == 'left') {
        if (monke.op == '-') return findHumnVal(humnSide, score + value);
        if (monke.op == '/') return findHumnVal(humnSide, score * value);
    } else {
        if (monke.op == '-') return findHumnVal(humnSide, value - score);
        if (monke.op == '/') return findHumnVal(humnSide, value / score);
    }
    throw Error;
};
console.log(findHumnVal('root', 0));
