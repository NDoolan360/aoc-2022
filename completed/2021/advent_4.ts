import { all, any, importFile, sum, transpose } from '../../utils';

type Cell = [number, boolean];
type Board = Cell[][];

const fileLines = importFile('./file_in/2021/advent_4_in.txt', /\r?\n\r?\n/);

const numbers = fileLines.shift()!.split(',').map(Number);
const boards = fileLines.map(
    (board): Board =>
        board.split(/\r?\n/).map((line): Cell[] =>
            line
                .trim()
                .split(/\s+/)
                .map((v): Cell => [Number(v), false])
        )
);

const updateBoard = (board: Board, number: number): void => {
    board.forEach((line, i) =>
        line.forEach((val, j) => {
            if (val[0] == number) {
                board[i][j][1] = true;
            }
        })
    );
};

const checkBoard = (board: Board, number: number): number => {
    const win = board
        .reduce(...transpose)
        .concat(board)
        .map((line) => line.map((cell) => cell[1] == 1).reduce(all, true));
    if (!win.reduce(any, false)) return 0;
    return (
        board
            .flat()
            .map((v) => (v[1] ? 0 : v[0]))
            .reduce(sum) * number
    );
};

let finishedBoards = new Array<[number, number]>();

numbers.forEach((number) => {
    boards.forEach((board, i) => {
        updateBoard(board, number);
        const score = checkBoard(board, number);
        if (score > 0 && !finishedBoards.find((v) => v[0] == i)) {
            finishedBoards.push([i, score]);
        }
    });
});

console.log(finishedBoards.at(0)![1]);
console.log(finishedBoards.at(-1)![1]);
