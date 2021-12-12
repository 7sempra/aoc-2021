
import fs from "fs";
import readline from "readline";
import { dataPath } from "../util/projectPaths";

main(dataPath("01/input.txt"));

/**
 * First solution
 *
 * Uses a RollingAverage class to track the average
 */

async function main(inputPath: string) {
  const lines = readline.createInterface({
    input: fs.createReadStream(inputPath, { encoding: "utf-8" }),
    terminal: false,
  });

  const rollingAverage = new RollingAverage(3);
  let prevReading = Infinity;
  let increaseCount = 0;

  for await (let line of lines) {
    const avgReading = rollingAverage.advance(parseInt(line));

    if (avgReading > prevReading) {
      increaseCount++;
    }
    prevReading = avgReading;
  }

  console.log("Total increases:", increaseCount);
}

class RollingAverage {
  private windowSize: number;
  private dataWindow = [] as number[];
  private nextIndex = 0;

  constructor(windowSize: number) {
    this.windowSize = windowSize;
  }

  advance(nextValue: number): number {
    if (this.dataWindow.length < this.windowSize) {
      this.dataWindow.push(nextValue);
    } else {
      this.dataWindow[this.nextIndex] = nextValue;
      this.nextIndex = (this.nextIndex + 1) % this.dataWindow.length;
    }

    return this.dataWindow.reduce((a, b) => a + b) / this.dataWindow.length;
  }
}
