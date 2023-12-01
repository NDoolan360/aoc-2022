import { importFile, transpose } from '../../utils';

const fileLines = importFile('./file_in/2022/advent18_input.txt');

const lavaDroplet = new Set<string>(fileLines);

// Part 1
const surfaceArea = (voxels: Set<string>) =>
    Array.from(voxels).reduce((surfaceArea: number, voxel: string) => {
        const [i, j, k] = voxel.split(',').map(Number);
        // Check if any of the surrounding voxels are not touching
        if (!voxels.has(`${i - 1},${j},${k}`)) surfaceArea++;
        if (!voxels.has(`${i + 1},${j},${k}`)) surfaceArea++;
        if (!voxels.has(`${i},${j - 1},${k}`)) surfaceArea++;
        if (!voxels.has(`${i},${j + 1},${k}`)) surfaceArea++;
        if (!voxels.has(`${i},${j},${k - 1}`)) surfaceArea++;
        if (!voxels.has(`${i},${j},${k + 1}`)) surfaceArea++;
        return surfaceArea;
    }, 0);
console.log(surfaceArea(lavaDroplet));

// Part 2
const dropletBounds = Array.from(lavaDroplet)
    .map((v) => v.split(',').map(Number))
    .reduce(...transpose)
    .map((axis) => [Math.min(...axis), Math.max(...axis)]);

// make a shell around the droplet with BFS
const shell = new Set<string>();
const queue = [dropletBounds.map((b) => b[0]).join(',')];
while (queue.length > 0) {
    const point = queue.shift()!;
    const [x, y, z] = point.split(',').map(Number);
    if (shell.has(point) || lavaDroplet.has(point)) continue;
    shell.add(point);
    if (x >= dropletBounds[0][0]) queue.push([x - 1, y, z].join(','));
    if (x <= dropletBounds[0][1]) queue.push([x + 1, y, z].join(','));
    if (y >= dropletBounds[1][0]) queue.push([x, y - 1, z].join(','));
    if (y <= dropletBounds[1][1]) queue.push([x, y + 1, z].join(','));
    if (z >= dropletBounds[2][0]) queue.push([x, y, z - 1].join(','));
    if (z <= dropletBounds[2][1]) queue.push([x, y, z + 1].join(','));
}
// calc the external surfacearea of the shell
const shellLength = Math.abs(dropletBounds[0][0] - dropletBounds[0][1]) + 3;
const shellWidth = Math.abs(dropletBounds[1][0] - dropletBounds[1][1]) + 3;
const shellHeight = Math.abs(dropletBounds[2][0] - dropletBounds[2][1]) + 3;
const shellSurfaceArea =
    2 *
    (shellLength * shellWidth +
        shellLength * shellHeight +
        shellHeight * shellWidth);
// the droplets external surfacec area is the same as the internal surface area of the shell
console.log(surfaceArea(shell) - shellSurfaceArea);
