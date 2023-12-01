import { importFile, loop, range } from '../../utils';

type Knot = [number, number];

const directions = new Map<string, [number, number]>();
directions.set('R', [1, 0]);
directions.set('L', [-1, 0]);
directions.set('U', [0, 1]);
directions.set('D', [0, -1]);

const tug = (parent: Knot, child: Knot): Knot | undefined => {
    if (
        Math.abs(parent[0] - child[0]) <= 1 &&
        Math.abs(parent[1] - child[1]) <= 1
    ) {
        return;
    }
    const newChild = child;
    if (parent[0] != child[0]) newChild[0] += parent[0] > child[0] ? 1 : -1;
    if (parent[1] != child[1]) newChild[1] += parent[1] > child[1] ? 1 : -1;
    return newChild;
};

const fileLines = importFile('./file_in/2022/advent9_input.txt');

const knotCount = 10; // Part - 1    const knotCount = 2;
const knots = range(knotCount).map((): Knot => [0, 0]);

const tailVisits = new Set<string>();
tailVisits.add('0,0');

const updateKnot = (knotIndex: number, newPos: Knot) => {
    knots[knotIndex] = newPos;
    const childPos = knots[knotIndex + 1];
    // tail
    if (!childPos) {
        tailVisits.add(newPos.map(String).join(','));
        return;
    }
    const childNew = tug(newPos, childPos);
    if (childNew) updateKnot(knotIndex + 1, childNew);
};

for (const move of fileLines) {
    let [direction, steps] = [move[0], Number(move.substring(2))];
    const directionVec = directions.get(direction)!;
    loop(steps, () => {
        updateKnot(0, [
            knots[0][0] + directionVec[0],
            knots[0][1] + directionVec[1],
        ]);
    });
}

console.log(tailVisits.size);
