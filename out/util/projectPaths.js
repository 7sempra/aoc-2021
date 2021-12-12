"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataPath = exports.PROJECT_DATA_DIR = exports.PROJECT_ROOT = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.PROJECT_ROOT = findProjectRoot(__dirname);
exports.PROJECT_DATA_DIR = path_1.default.resolve(exports.PROJECT_ROOT, "data");
function dataPath(childPath) {
    return path_1.default.join(exports.PROJECT_DATA_DIR, childPath);
}
exports.dataPath = dataPath;
function findProjectRoot(currentPath) {
    if (currentPath == "/") {
        throw new Error(`Cannot find project root`);
    }
    if (fs_1.default.existsSync(path_1.default.join(currentPath, ".git"))) {
        return currentPath;
    }
    else {
        return findProjectRoot(path_1.default.resolve(currentPath, "../"));
    }
}
