import { argv } from 'process';
import { Coord, getMatrixVal, importFile } from '../../utils';

type Map = { height: number; steps: number }[][];

const maxStepUp = 1;
let startCoord: Coord, endCoord: Coord;
const part = Number(argv[2]) || 1;

const fileLines = importFile('./file_in/2022/advent12_input.txt');

const map: Map = fileLines.map((row, y) =>
    row.split('').map((val, x) => {
        let steps = Infinity;
        let height = 'abcdefghijklmnopqrstuvwxyz'.indexOf(val);
        if (val == 'S') (startCoord = { y, x }), (height = 0), (steps = 0);
        if (val == 'E') (endCoord = { y, x }), (height = 26);
        return { height, steps };
    })
);

const getMapVal = (point: Coord) => getMatrixVal(map, point);
const getValidNeighbours = (point: Coord): Coord[] => {
    return [
        map[point.y - 1]?.[point.x] ? { y: point.y - 1, x: point.x } : null,
        map[point.y][point.x + 1] ? { y: point.y, x: point.x + 1 } : null,
        map[point.y + 1]?.[point.x] ? { y: point.y + 1, x: point.x } : null,
        map[point.y][point.x - 1] ? { y: point.y, x: point.x - 1 } : null,
    ].filter(
        (neighbour): boolean =>
            neighbour !== null &&
            getMapVal(neighbour).steps > getMapVal(point).steps + 1 &&
            getMapVal(neighbour).height <= getMapVal(point).height + maxStepUp
    ) as Coord[];
};

// BFS (modified for part 2)
const queue = new Array<Coord>(startCoord!);
while (queue.length) {
    const point = queue.pop()!;
    const val = getMapVal(point);
    getValidNeighbours(point).forEach((neighbourPoint) => {
        const neighbour = getMapVal(neighbourPoint);
        // in part 2 treat all height 0 points as start points
        if (part == 2 && neighbour.height == 0) neighbour.steps = 0;
        else neighbour.steps = val.steps + 1;
        queue.push(neighbourPoint);
    });
}
console.log(getMapVal(endCoord!).steps);
