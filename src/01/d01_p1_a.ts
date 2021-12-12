import * as fsp from "fs/promises";
import { dataPath } from "../util/projectPaths";

/**
 * First version, reads the entire file into memory (this is fine for this
 * size of file)
 */

main(dataPath("01/input.txt"));

async function main(inputPath: string) {
  const readings =
      (await fsp.readFile(inputPath, { encoding: "utf-8" }))
          .split("\n")
          .map(line => parseInt(line));

  let prevReading = -1;
  let increaseCount = 0;

  for (let reading of readings) {
    if (prevReading != -1 && reading > prevReading) {
      increaseCount++;
    }
    prevReading = reading;
  }

  console.log("Total increases:", increaseCount);
}
