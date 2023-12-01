import { importFile, range, setDifference, skip } from '../../utils';

const fileLines = importFile('./file_in/2022/advent15_input.txt');

const knownBeacons = new Set<number>();
const getNoBeaconIntervals = (row: number) =>
    fileLines
        // Parse file
        .map((l) =>
            l
                .split(/(-?\d+)/)
                .filter(skip(2, 1))
                .map(Number)
        )
        // generate intervals at specific row coming from different sensors
        .reduce((intervals, [sx, sy, bx, by]) => {
            const dist = Math.abs(sx - bx) + Math.abs(sy - by);
            const offset = dist - Math.abs(sy - row);
            if (offset < 0) return intervals;
            const lowX = sx - offset;
            const highX = sx + offset;
            if (by == row) knownBeacons.add(bx);
            return intervals.concat([[lowX, highX]]);
        }, [] as [number, number][])
        // combine intervals to help identify where the missing beacon is
        // it should be the only one left with two intervals (one either side)
        .sort((a, b) => (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]))
        .reduce((intervals, [lo, hi]) => {
            if (intervals.length == 0) return intervals.concat([[lo, hi]]);
            let [intLo, intHi] = intervals.pop()!;
            if (lo > intHi + 1)
                return intervals.concat([
                    [intLo, intHi],
                    [lo, hi],
                ]);
            intHi = Math.max(intHi, hi);
            return intervals.concat([[intLo, intHi]]);
        }, [] as [number, number][]);

// Part 1
let focusRow = 2000000;
const missingBeacons = getNoBeaconIntervals(focusRow).reduce(
    (cannot, [intHi, intLo]) => {
        range(intLo, intHi, true).forEach((v) => {
            cannot.add(v);
        });
        return cannot;
    },
    new Set<number>()
);
console.log(setDifference(missingBeacons, knownBeacons).size);

// Part 2 - super inefficient but it works in < 1 min
focusRow = 0;
const rowMax = 4000000;
while (focusRow++ <= rowMax) {
    const cannotIntervals = getNoBeaconIntervals(focusRow);
    if (cannotIntervals.length == 2) {
        console.log((cannotIntervals[0][1] + 1) * 4000000 + focusRow);
        break;
    }
}
