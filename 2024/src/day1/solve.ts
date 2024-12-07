import { Puzzle } from "@common/puzzle";
import { getSimilarityScore, getTotalDistance, parseLists } from "./funcs";

const puzzle = new Puzzle({
  directoryPath: "./src/day1",
  part1: (data) => {
    const { left, right } = parseLists(data["input"]);
    return getTotalDistance(left, right);
  },
  part2: (data) => {
    const { left, right } = parseLists(data["input"]);
    return getSimilarityScore(left, right);
  },
});
puzzle.solve();
