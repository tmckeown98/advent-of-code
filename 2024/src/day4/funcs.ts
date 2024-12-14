const ERROR_GRID_NOT_BALANCED = "Error: Grid lines are not equal length";

interface SearchDirection {
  dx: number;
  dy: number;
}
interface Search {
  text: string;
  row: number;
  col: number;
  direction: SearchDirection;
}
interface Point {
  x: number;
  y: number;
}

function parseGrid(input: string): string[][] {
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (!lines.every((line) => line.length === lines[0].length)) {
    throw new Error(ERROR_GRID_NOT_BALANCED);
  }

  return lines.map((line) => line.split(""));
}

function checkForWord(grid: string[][], search: Search): boolean {
  for (let i = 0; i < search.text.length; ++i) {
    const c = search.col + i * search.direction.dx;
    const r = search.row + i * search.direction.dy;

    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) {
      return false;
    }
    if (grid[r][c] !== search.text[i]) {
      return false;
    }
  }
  return true;
}

function findWords(grid: string[][], target: string): Search[] {
  const results: Search[] = [];
  if (!target || target.length === 0) {
    return results;
  }

  const directions: SearchDirection[] = [
    { dx: 1, dy: 0 }, // Right
    { dx: 1, dy: 1 }, // Diagonal Down-Right
    { dx: 0, dy: 1 }, // Down
    { dx: -1, dy: 1 }, // Diagonal Down-Left
    { dx: -1, dy: 0 }, // Left
    { dx: -1, dy: -1 }, // Diagonal Up-Left
    { dx: 0, dy: -1 }, // Up
    { dx: 1, dy: -1 }, // Diagonal Up-Right
  ];

  for (let r = 0; r < grid.length; ++r) {
    for (let c = 0; c < grid[0].length; ++c) {
      for (const direction of directions) {
        const search: Search = {
          text: target,
          row: r,
          col: c,
          direction: direction,
        };
        if (checkForWord(grid, search)) {
          results.push(search);
        }
      }
    }
  }

  return results;
}

function countCrossovers(searchResults: Search[]): number {
  const results = searchResults.filter(
    ({ direction }) => direction.dx !== 0 && direction.dy !== 0
  );
  if (results.length === 0) return 0;

  const findCrossoverPoints = (points: Point[]): Point[] => {
    const countMap = new Map<string, number>();
    for (const { x, y } of points) {
      const key = `${x},${y}`;
      countMap.set(key, (countMap.get(key) ?? 0) + 1);
    }

    return points.filter(({ x, y }) => {
      const key = `${x},${y}`;
      return (countMap.get(key) ?? 0) > 1;
    });
  };

  const delta: number = Math.floor(results[0].text.length / 2);
  const midPoints: Point[] = results.map(({ col, row, direction }) => {
    const x = col + delta * direction.dx;
    const y = row + delta * direction.dy;
    return { x, y };
  });
  return findCrossoverPoints(midPoints).length / 2;
}

export { checkForWord, countCrossovers, findWords, parseGrid };
export type { Search, SearchDirection };
