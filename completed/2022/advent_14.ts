import {
    importFile,
    pair,
    range,
    transpose,
    min,
    max,
    hashTable,
    any,
} from '../../utils';

type Point = [number, number];
type Obstacles = { [key: string]: Point };

const generateLine = ([x1, y1]: Point, [x2, y2]: Point): Point[] => {
    if (x1 === x2) return range(y1, y2, true).map((y) => [x1, y]);
    if (y1 === y2) return range(x1, x2, true).map((x) => [x, y1]);
    return [] as Point[];
};

const caveInit: Obstacles = importFile('./file_in/2022/advent14_input.txt')
    .map((line) =>
        line
            .split(' -> ')
            .map((point) => point.split(',').map(Number))
            .reduce(pair, [])
            .reduce(
                (points, [p1, p2]) => points.concat(generateLine(p1, p2)),
                [] as string[]
            )
    )
    .flat()
    .reduce(hashTable, {} as Obstacles);

const bounds = (grid: Obstacles, source: Point): Point[] =>
    Object.values(grid)
        .concat([source])
        .reduce(...transpose)
        .map((axis) => [axis.reduce(min), axis.reduce(max)]);

const collision = (point: Point, grids: Obstacles[]): boolean =>
    grids.map((grid) => grid[point.toString()] != undefined).reduce(any);

const displayCave = (cave: Obstacles, sand: Obstacles, source: Point) => {
    const [[xMin, xMax], [yMin, yMax]] = bounds(cave, source);
    console.log(
        range(yMin, yMax, true)
            .reduce((ys, y) => {
                return ys.concat(
                    range(xMin, xMax, true).reduce((xs, x) => {
                        if (collision([x, y], [cave])) return xs.concat('#');
                        if (collision([x, y], [sand])) return xs.concat('o');
                        if (x == source[0] && y == source[1])
                            return xs.concat('+');
                        return xs.concat(' ');
                    }, '')
                );
            }, [] as string[])
            .join('\n')
    );
};

const addSand = (cave: Obstacles, sand: Obstacles, source: Point): boolean => {
    if (collision(source, [sand])) return false;
    let [x, y]: Point = source;
    const [[xMin, xMax], [yMin, yMax]] = bounds(cave, source);
    while (true) {
        if (yMin > y || y > yMax || xMin > x || x > xMax) return false;
        let settled = true;
        [x, x - 1, x + 1].forEach((newXPos) => {
            if (!collision([newXPos, y + 1], [cave, sand]) && settled) {
                [x, y] = [newXPos, y + 1];
                settled = false;
            }
        });
        if (settled) break;
    }
    sand[[x, y].toString()] = [x, y];
    return true;
};

const fillCave = (cave: Obstacles, source: Point) => {
    const sand = {} as Obstacles;
    while (addSand(cave, sand, source)) {
        // displayCave(cave, sand, source);
    }
    return Object.values(sand).length;
};

const fillCaveToTop = (cave: Obstacles, source: Point) => {
    const [__, [_, yMax]] = bounds(cave, source);
    const dist = yMax + 2;
    generateLine([source[0] - dist, dist], [source[0] + dist, dist]).forEach(
        (point) => (cave[point.toString()] = point)
    );
    return fillCave(cave, source);
};

const sandSource: Point = [500, 0];
console.log(fillCave(caveInit, sandSource));
console.log(fillCaveToTop(caveInit, sandSource));
