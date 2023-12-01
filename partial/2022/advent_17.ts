import { any, importFile, max, range } from '../../utils';

type Shape = [number, number][];

const shapes: Shape[] = [
    [
        [0, 0], [1, 0], [2, 0], [3, 0],
    ],
    [
                [1, 2],
        [0, 1], [1, 1], [2, 1],
                [1, 0],
    ],
    [
                        [2, 2],
                        [2, 1],
        [0, 0], [1, 0], [2, 0],
    ],
    [
        [0, 3],
        [0, 2],
        [0, 1],
        [0, 0],
    ],
    [
        [0, 1], [1, 1],
        [0, 0], [1, 0],
    ],
];
const getNextRock = () => {
    shapes.push(shapes[0]); // add to end
    return shapes.shift()!; // remove from front
};

const lockedInPieces = new Set<string>(range(7).map((i) => `${i},-1`));
const lockInPiece = (shape: Shape) =>
    shape.forEach((point) => lockedInPieces.add(point.toString()));

const rockCollision = (shape: Shape) =>
    shape.map((point) => lockedInPieces.has(point.toString())).reduce(any);
const wallCollision = (shape: Shape) =>
    shape.map(([x, y]) => 0 > x || x >= 7).reduce(any);

const shiftPiece = (shape: Shape, deltaX: number, deltaY: number): Shape =>
    shape.map(([x, y]) => [x + deltaX, y + deltaY]);
const pushRight = (shape: Shape): Shape => shiftPiece(shape, 1, 0);
const pushLeft = (shape: Shape): Shape => shiftPiece(shape, -1, 0);
const pushUp = (shape: Shape): Shape => shiftPiece(shape, 0, 1);
const pushDown = (shape: Shape): Shape => shiftPiece(shape, 0, -1);

const towerHeight = () =>
    Array.from(lockedInPieces.values())
        .map((v) => Number(v.split(',')[1]))
        .reduce(max) + 1;

const airJets = importFile('./file_in/2022/advent17_input.txt')[0].split('');
const getNextAirJet = () => {
    airJets.push(airJets[0]); // add to end
    return airJets.shift()!;  // remove from front
};

let rockCount = 0;
while (++rockCount <= 2022) {
    let rockPiece = getNextRock();
    rockPiece = shiftPiece(rockPiece, 2, towerHeight() + 3);
    while (true) {
        switch (getNextAirJet()) {
            case '<':
                rockPiece = pushLeft(rockPiece);
                if (rockCollision(rockPiece) || wallCollision(rockPiece))
                    rockPiece = pushRight(rockPiece); // collision correction
                break;
            case '>':
                rockPiece = pushRight(rockPiece);
                if (rockCollision(rockPiece) || wallCollision(rockPiece))
                    rockPiece = pushLeft(rockPiece); // collision correction
        }
        rockPiece = pushDown(rockPiece);
        if (rockCollision(rockPiece)) {
            rockPiece = pushUp(rockPiece); // collision correction
            lockInPiece(rockPiece);  // set in stone
            break;
        }
    }
}

console.log(towerHeight());
