import { importFile, sum } from '../../utils';

type Dir = { name: string; size: number };

const fileLines = importFile('./file_in/2022/advent7_input.txt', /\$ /);

const findDirSize = (findDir: string, dirs: Array<Dir>): number =>
    dirs.find((dir) => dir.name == findDir)?.size || 0;

const dirs = fileLines
    .map((line) =>
        line
            .split(/\r?\n/)
            .filter((l) => l)
            .map((v) => v.split(' '))
    )
    .reverse()
    .reduce((allDirs, response) => {
        const command = response.shift() || '';
        if (command[0] == 'ls') {
            let dirSize = response.reduce((sum, item) => {
                if (item[0] == 'dir')
                    return sum + findDirSize(item[1], allDirs);
                return sum + Number(item[0]);
            }, 0);
            allDirs.push({ name: '', size: dirSize });
        } else if (command[0] == 'cd' && command[1] != '..') {
            allDirs[allDirs.length - 1].name = command[1];
            console.log(allDirs[allDirs.length - 1]);
        }
        return allDirs;
    }, new Array<Dir>());

console.log(
    dirs
        .map((dir) => dir.size)
        .filter((v) => v <= 100000)
        .reduce(sum)
);
console.log(
    dirs
        .map((dir) => dir.size)
        .slice(0, -1)
        .reduce(sum)
);
