import { Puzzle } from "@common/puzzle";
import { parseInstructions, resolveInstructions } from "./funcs";

const puzzle = new Puzzle({
  directoryPath: "./src/day3",
  part1: (data) => {
    const instructions = parseInstructions(data["input"]);
    const sum = resolveInstructions(instructions).reduce(
      (acc, current) => acc + current
    );
    return sum;
  },
  part2: (data) => {
    const instructions = parseInstructions(data["input"]);
    const sum = resolveInstructions(instructions, true).reduce(
      (acc, current) => acc + current
    );
    return sum;
  },
});
puzzle.solve();
