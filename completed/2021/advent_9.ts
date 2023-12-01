import { desc, importFile, product, sum } from '../../utils';

type Point = [number, number];

const grid = importFile('./file_in/2021/advent_9_in.txt').map((l) =>
    l.split('').map(Number)
);

const lowPoint = (y: number, x: number) =>
    [
        grid[y + 1]?.[x],
        grid[y]?.[x + 1],
        grid[y - 1]?.[x],
        grid[y]?.[x - 1],
    ].filter((p) => p == undefined || p > grid[y][x]).length == 4;

const lowPoints = grid
    .map((xs, y) =>
        xs.map((_, x): Point => [y, x]).filter((_, x) => lowPoint(y, x))
    )
    .flat();

console.log(lowPoints.map(([y, x]) => grid[y][x] + 1).reduce(sum));

const getBasinSize = (y: number, x: number): number => {
    const points = new Set<string>();
    const toVisit = new Array<[number, number]>([y, x]);
    while (toVisit.length) {
        const [currY, currX] = toVisit.shift()!;
        if (
            grid[currY]?.[currX] == undefined ||
            points.has([currY, currX].toString()) ||
            grid[currY][currX] == 9
        )
            continue;
        points.add([currY, currX].toString());
        toVisit.push([currY + 1, currX]);
        toVisit.push([currY, currX + 1]);
        toVisit.push([currY - 1, currX]);
        toVisit.push([currY, currX - 1]);
    }
    return points.size;
};

console.log(
    lowPoints
        .map((point) => getBasinSize(...point))
        .sort(desc)
        .slice(0, 3)
        .reduce(product)
);
