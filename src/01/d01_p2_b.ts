
import fs from "fs";
import readline from "readline";
import { dataPath } from "../util/projectPaths";

/**
 * Second solution
 *
 * Avoids using classes; bundles the data processing functionality into its own
 * chunk.
 */

main(dataPath("01/input.txt"));

async function main(inputPath: string) {
  const lines = readline.createInterface({
    input: fs.createReadStream(inputPath, { encoding: "utf-8" }),
    terminal: false,
  });

  const processor = buildProcessor();

  for await (let line of lines) {
    processor.processNextReading(parseInt(line));
  }

  console.log("Total increases:", processor.totalIncrease);
}

function buildProcessor() {
  const rollingAverage = buildRollingAverage(3);
  let prevReading = Infinity;
  let increaseCount = 0;

  return {
    processNextReading(reading: number) {
      const avgReading = rollingAverage.advance(reading);

      if (avgReading > prevReading) {
        increaseCount++;
      }
      prevReading = avgReading;
    },

    get totalIncrease(): number {
      return increaseCount;
    }
  };
}

function buildRollingAverage(windowSize: number) {
  let dataWindow = [] as number[];
  let nextIndex = 0;

  return {
    advance(nextValue: number): number {
      if (dataWindow.length < windowSize) {
        dataWindow.push(nextValue);
      } else {
        dataWindow[nextIndex] = nextValue;
        nextIndex = (nextIndex + 1) % dataWindow.length;
      }

      return dataWindow.reduce((a, b) => a + b) / dataWindow.length;
    }
  }
}
