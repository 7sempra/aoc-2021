
import fs from "fs";
import readline from "readline";
import { dataPath } from "../util/projectPaths";

/**
 * Second version, streams lines one at a time
 */

main(dataPath("01/input.txt"));

async function main(inputPath: string) {

  const lines = readline.createInterface({
    input: fs.createReadStream(inputPath, { encoding: "utf-8" }),
    terminal: false,
  });

  let prevReading = -1;
  let increaseCount = 0;

  for await (let line of lines) {
    const reading = parseInt(line);

    if (prevReading != -1 && reading > prevReading) {
      increaseCount++;
    }
    prevReading = reading;
  }

  console.log("Total increases:", increaseCount);
}

