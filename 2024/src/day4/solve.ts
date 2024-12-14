import { Puzzle } from "@common/puzzle";
import { countCrossovers, findWords, parseGrid } from "./funcs";

const puzzle = new Puzzle({
  directoryPath: "./src/day4",
  part1: (data) => {
    const grid = parseGrid(data["input"]);
    const results = findWords(grid, "XMAS");
    return results.length;
  },
  part2: (data) => {
    const grid = parseGrid(data["input"]);
    const results = findWords(grid, "MAS");
    return countCrossovers(results);
  },
});
puzzle.solve();
