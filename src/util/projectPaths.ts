
import path from "path";
import fs from "fs";

export const PROJECT_ROOT = findProjectRoot(__dirname);
export const PROJECT_DATA_DIR = path.resolve(PROJECT_ROOT, "data");

export function dataPath(childPath: string) {
  return path.join(PROJECT_DATA_DIR, childPath);
}

function findProjectRoot(currentPath: string): string {
  if (currentPath == "/") {
    throw new Error(`Cannot find project root`);
  }
  if (fs.existsSync(path.join(currentPath, ".git"))) {
    return currentPath;
  } else {
    return findProjectRoot(path.resolve(currentPath, "../"));
  }
}
