
import fs from "fs";
import readline from "readline";
import { dataPath } from "../util/projectPaths";

/**
 * Third solution
 *
 * Same as the second, but instead makes everything classes.
 */

main(dataPath("01/input.txt"));

async function main(inputPath: string) {
  const lines = readline.createInterface({
    input: fs.createReadStream(inputPath, { encoding: "utf-8" }),
    terminal: false,
  });

  const processor = new Processor();

  for await (let line of lines) {
    processor.processReading(parseInt(line));
  }

  console.log("Total increases:", processor.increaseCount);
}

class Processor {
  private rollingAverage = new RollingAverage(3);
  private prevReading = Infinity;
  private _increaseCount = 0;

  processReading(reading: number) {
    const avgReading = this.rollingAverage.advance(reading);

    if (avgReading > this.prevReading) {
      this._increaseCount++;
    }
    this.prevReading = avgReading;
  }

  get increaseCount(): number {
    return this._increaseCount;
  }

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
