import { importFile, nth, max, sum } from '../../utils';

const fileLines = importFile('./file_in/2022/advent8_input.txt');

// determine if a tree at <row>, <col> in <trees> is visible from the outside
const visible = <T extends number>(trees: T[][], height: T, row: T, col: T) => {
    const treeCol = trees.reduce(nth(col), []);
    let visible = trees[row].slice(0, col).reduce(max, -1) < height;
    visible = visible || trees[row].slice(col + 1).reduce(max, -1) < height;
    visible = visible || treeCol.slice(0, row).reduce(max, -1) < height;
    visible = visible || treeCol.slice(row + 1).reduce(max, -1) < height;
    return visible;
};

// find the distance to the first item larger than <height> in <view>
const viewDist = <T extends number>(view: T[], height: T) =>
    view.reduce((out, tree, i) => (tree >= height && !out ? i + 1 : out), 0) ||
    view.length;

// determine the scenic score of a tree at <row>, <col> in <trees>
const score = <T extends number>(trees: T[][], height: T, row: T, col: T) => {
    const treeCol = trees.reduce(nth(col), []);
    let scores = viewDist(trees[row].slice(0, col).reverse(), height);
    scores *= viewDist(trees[row].slice(col + 1), height);
    scores *= viewDist(treeCol.slice(0, row).reverse(), height);
    scores *= viewDist(treeCol.slice(row + 1), height);
    return scores;
};

// parse grid of trees into
const trees = fileLines.map((l) => l.split('').map(Number));

// Part 1 - how many visible trees?
const visibleTrees = trees.map((xs: number[], y: number) =>
    xs.map((tree, x): boolean => visible(trees, tree, y, x))
);
console.log(visibleTrees.flat().map(Number).reduce(sum));

// Part 2 - what is the best scenic score?
const scenicVals = trees.map((xs: number[], y: number): number[] =>
    xs.map((tree, x): number => score(trees, tree, y, x))
);
console.log(scenicVals.flat().reduce(max));
