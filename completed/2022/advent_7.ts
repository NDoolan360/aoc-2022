import { importFile, sum, min } from '../../utils';

const fileLines = importFile('./file_in/2022/advent7_input.txt');

const pwd = new Array<string>();

// traverse structure and keep track of directory sizes
const dirs = fileLines.reduce((dirs, l) => {
    const cmd = l.split(' ');
    // $ cd /, $ cd <filename>, $ cd ..
    if (cmd[1] == 'cd') {
        // update pwd path
        if (cmd[2] == '..') pwd.pop();
        else if (cmd[2] == '/') pwd.push('root');
        else pwd.push(cmd[2]);
    }
    // <fileSize> <fileName>
    else if (Number(cmd[0])) {
        // for each directory in pwd path
        pwd.forEach((_, index) => {
            // using whole path to root as id
            const pwdId = pwd.slice(0, index + 1).join('/');
            dirs.get(pwdId)
                ? // update directory size
                  dirs.set(pwdId, dirs.get(pwdId)! + Number(cmd[0]))
                : // store new directory
                  dirs.set(pwdId, Number(cmd[0]));
        });
    }
    return dirs;
}, new Map<string, number>());

const dirSizes = Array.from(dirs.values());

// Part 1
const atMost = 100000;
console.log(dirSizes.filter((s) => s <= atMost).reduce(sum));

// Part 2
const minSpaceRequired = 30000000 - (70000000 - dirs.get('root')!);
console.log(dirSizes.filter((s) => s >= minSpaceRequired).reduce(min));
