import { hist, importFile, range, zip } from '../../utils';

const fileLines = importFile('./file_in/2021/advent_5_in.txt');

const pointMap = fileLines
    .map((line) => line.split(' -> ').map((p) => p.split(',').map(Number)))
    .reduce((pointList, [[x1, y1], [x2, y2]]) => {
        const xs = range(x1, x2, true);
        const ys = range(y1, y2, true);
        if (x1 === x2) return pointList.concat(ys.map((y) => `${x1},${y}`));
        if (y1 === y2) return pointList.concat(xs.map((x) => `${x},${y1}`));
        return pointList.concat(
            xs.reduce(zip(ys), []).map(([x, y]) => `${x},${y}`)
        );
    }, [] as string[])
    .reduce(...hist);

console.log(Object.values(pointMap).filter((v) => v > 1).length);
