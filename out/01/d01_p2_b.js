"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const projectPaths_1 = require("../util/projectPaths");
/**
 * Second solution
 *
 * Avoids using classes; bundles the data processing functionality into its own
 * chunk.
 */
main((0, projectPaths_1.dataPath)("01/input.txt"));
function main(inputPath) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const lines = readline_1.default.createInterface({
            input: fs_1.default.createReadStream(inputPath, { encoding: "utf-8" }),
            terminal: false,
        });
        const processor = buildProcessor();
        try {
            for (var lines_1 = __asyncValues(lines), lines_1_1; lines_1_1 = yield lines_1.next(), !lines_1_1.done;) {
                let line = lines_1_1.value;
                processor.processNextReading(parseInt(line));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) yield _a.call(lines_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log("Total increases:", processor.totalIncrease);
    });
}
function buildProcessor() {
    const rollingAverage = buildRollingAverage(3);
    let prevReading = Infinity;
    let increaseCount = 0;
    return {
        processNextReading(reading) {
            const avgReading = rollingAverage.advance(reading);
            if (avgReading > prevReading) {
                increaseCount++;
            }
            prevReading = avgReading;
        },
        get totalIncrease() {
            return increaseCount;
        }
    };
}
function buildRollingAverage(windowSize) {
    let dataWindow = [];
    let nextIndex = 0;
    return {
        advance(nextValue) {
            if (dataWindow.length < windowSize) {
                dataWindow.push(nextValue);
            }
            else {
                dataWindow[nextIndex] = nextValue;
                nextIndex = (nextIndex + 1) % dataWindow.length;
            }
            return dataWindow.reduce((a, b) => a + b) / dataWindow.length;
        }
    };
}
