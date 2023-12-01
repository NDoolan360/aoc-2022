import { importFile, sum } from '../../utils';

type Round = { opponent: string; code: string };

const fileLines = importFile('./file_in/2022/advent2_input.txt');

// calculate which move is needed to reach an outcome against an opponent
const move = (res: number, opponent: string) =>
    String.fromCharCode(((opponent.charCodeAt(0) - 65 + res) % 3) + 65);

// function to calc score for a player given values played by both
function score(me: string, opponent: string): number {
    // Score for playing a shape
    let score = me == 'A' ? 1 : me == 'B' ? 2 : me == 'C' ? 3 : 0;
    // Score for outcome
    score += me == move(1, opponent) ? 6 : me == move(0, opponent) ? 3 : 0;
    return score;
}

// Part 1 - assume XYZ was my play
function assumedPlay(line: string): number {
    let round: Round = { opponent: line[0], code: line[2] };
    let me = String.fromCharCode(round.code.charCodeAt(0) - 23);
    return score(me, round.opponent);
}

// calc scores for each line from file then sum
console.log(fileLines.map(assumedPlay).reduce(sum));

//  Part 2 - told XYZ is the expected outcome
function exactResult(line: string): number {
    let round: Round = { opponent: line[0], code: line[2] };
    let res = round.code == 'X' ? -1 : round.code == 'Y' ? 0 : 1;
    let me = move(res, round.opponent);
    return score(me, round.opponent);
}

// map score to each line from file then sum
console.log(fileLines.map(exactResult).reduce(sum));
