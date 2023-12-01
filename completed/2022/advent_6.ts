import { importFile } from '../../utils';

const message = importFile('./file_in/2022/advent6_input.txt')[0].split('');

// Reduce callback generator to find marker with length <len>
const findMarker =
    <T extends string>(len: number) =>
    (prev: T, curr: T) =>
        new Set(prev.slice(-len)).size != len ? prev.concat(curr) : prev;

console.log(message.reduce(findMarker<string>(4)).length);
console.log(message.reduce(findMarker<string>(14)).length);
