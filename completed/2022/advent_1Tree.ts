// Christmas tree code of day 1 part 2
// ts-node advent_1.ts <file input path> <number of sharing elves>
import { readFileSync } from 'fs';
import { argv } from 'process';

                        //*
                    console.log(
                readFileSync(argv[2]
            , 'utf-8').split(/\r?\n\r?\n/
              ).map((elfList, index) =>
          {const calories = elfList.split(
        /\r?\n/).reduce((sum, entry) => sum +
      Number.parseInt(entry), 0); return{ index
        , calories };}).sort((elf1, elf2) =>
    elf2.calories - elf1.calories).slice(0, Number
  .parseInt(argv[3])).reduce((sum, elf) => sum + elf
                   .calories, 0));
