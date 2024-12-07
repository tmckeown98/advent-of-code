/* Day 1: Historian Hysteria

Part 1: 
- input: 2 lists of numbers side-by-side
- process: 
  - parse the input into 2 separate lists
  - sort each list (ascending)
  - get absolute difference between them
  - calc the total
*/
const ERROR_LIST_LENGTH = "Error: lists are not equal length";
const ERROR_NON_NUMERIC = "Error: lists contain non-numeric data";

interface LocationListComparison {
  left: number[];
  right: number[];
}
function parseLists(input: string): LocationListComparison {
  const left: number[] = [];
  const right: number[] = [];

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      // Skip empty lines
      if (!line.trim()) return;

      // Split by any amount of whitespace and check we have exactly 2 tokens (left and right)
      const tokens = line.trim().split(/\s+/);
      if (tokens.length !== 2) {
        throw new Error(ERROR_LIST_LENGTH);
      }

      // Convert tokens to numbers and throw if they contain non-numeric data
      const [leftVal, rightVal] = tokens.map((token) => {
        const num = Number(token);
        if (isNaN(num)) {
          throw new Error(ERROR_NON_NUMERIC);
        }
        return num;
      });
      left.push(leftVal);
      right.push(rightVal);
    });

  return { left, right };
}

function getTotalDistance(left: number[], right: number[]): number {
  if (left.length !== right.length) {
    throw new Error(ERROR_LIST_LENGTH);
  }

  let total = 0;
  const leftAsc = [...left].sort((a, b) => a - b);
  const rightAsc = [...right].sort((a, b) => a - b);

  leftAsc.forEach((val, idx) => {
    total += Math.abs(val - rightAsc[idx]);
  });

  return total;
}

function getSimilarityScore(left: number[], right: number[]): number {
  if (left.length !== right.length) {
    throw new Error(ERROR_LIST_LENGTH);
  }
  if (left.length === 0 || right.length === 0) {
    return 0;
  }

  return left
    .map((lval) => lval * right.filter((rval) => rval === lval).length)
    .reduce((acc, current) => acc + current);
}

export { getSimilarityScore, getTotalDistance, parseLists };
