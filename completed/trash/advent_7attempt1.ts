import { importFile, sum } from '../../utils';

type File = number;
type Dir = { size: number; subDirs: Dir[] };

const fileLines = importFile('./file_in/2022/advent7_input.txt', /\$ /);

let currentDir = new Array<string>();

const dirs = fileLines
    .map((line) => line.split(/\r?\n/).filter((l) => l))
    .reduce((dirs, response) => {
        const c = response.shift();
        if (!c) return dirs;
        const command = c.split(' ');
        switch (command[0]) {
            case 'cd':
                if (command[1] == '..') currentDir.pop();
                else currentDir.push(command[1]);
                break;
            case 'ls':
                response.forEach((line) => {
                    const dir = dirs.get(currentDir.at(-1) || '');
                    const args = line.split(' ');
                    if (Number(args[0]) > 0 && dir) {
                        dir.size += Number(args[0]);
                    } else {
                        dirs.set(args[1], { size: 0, subDirs: new Array() });
                        dir?.subDirs.push(
                            dirs.get(args[1]) || { size: 0, subDirs: [] }
                        );
                    }
                });
        }
        return dirs;
    }, new Map<string, Dir>([['/', { size: 0, subDirs: [] }]]));

const directorySize = (sum: number, subDir: Dir): number =>
    sum + subDir.subDirs.length == 0
        ? subDir.size
        : subDir.size + subDir.subDirs.reduce(directorySize, 0);

let dirSizes = new Array<number>();

console.log(dirs);
dirs.forEach((dir) => dirSizes.push(dir.subDirs.reduce(directorySize, 0)));
console.log(dirSizes);
console.log(dirSizes.filter((val) => val <= 100000));

console.log(dirSizes.filter((val) => val <= 100000).reduce(sum, 0));
