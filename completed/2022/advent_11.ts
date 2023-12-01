import { desc, importFile, product, range } from '../../utils';

type Item = number;
type Monkey = {
    items: Item[];
    operation: string;
    test: number;
    outcome: [number, number];
    inspections: number;
};

const monkeysInit: Monkey[] = importFile(
    './file_in/2022/advent11_input.txt',
    /\r?\n\r?\n/
).map((monkeyInfo): Monkey => {
    const lines = monkeyInfo.split(/\r?\n/);
    const items = lines[1].slice(17).split(', ').map(Number);
    const operation = lines[2].slice(19);
    const test = lines[3].split(' ').map(Number).at(-1)!;
    const outcome = [
        lines[5].split(' ').map(Number).at(-1)!,
        lines[4].split(' ').map(Number).at(-1)!,
    ] as [number, number];
    return { items, operation, test, outcome, inspections: 0 };
});

const chillVibes = monkeysInit.map((m) => m.test).reduce(product);

const inspectItem = (monkey: Monkey, old: Item): Item => {
    monkey.inspections++;
    let newItem = eval(monkey.operation.replace(/old/g, old.toString()));
    // newItem = Math.floor(newItem / 3);  // Part 1
    return newItem;
};
const monkeyThrow = (monkey: Monkey, item: number, monkeys: Monkey[]) =>
    item % monkey.test == 0
        ? monkeys[monkey.outcome[1]].items.push(item)
        : monkeys[monkey.outcome[0]].items.push(item);

const numRounds = 10000; // 20; // Part 1
const monkeyBusiness = range(numRounds)
    .reduce((monkeys, _) => {
        monkeys.forEach((monkey) => {
            while (monkey.items.length) {
                let newItem = inspectItem(monkey, monkey.items.shift()!);
                newItem %= chillVibes; // Part 2
                monkeyThrow(monkey, newItem, monkeys);
            }
        });
        return monkeys;
    }, monkeysInit)
    .map((m) => m.inspections)
    .sort(desc)
    .slice(0, 2)
    .reduce(product);
console.log(monkeyBusiness);
