import { checkForWord, countCrossovers, findWords, parseGrid } from "./funcs";

describe("parseGrid", () => {
  it("should parse a valid input into a grid of characters", () => {
    const input = `
    ABCDEF
    FEDCBA
    AFGAFG
    RTSDVD
    `;
    const grid = parseGrid(input);
    expect(grid).toEqual([
      ["A", "B", "C", "D", "E", "F"],
      ["F", "E", "D", "C", "B", "A"],
      ["A", "F", "G", "A", "F", "G"],
      ["R", "T", "S", "D", "V", "D"],
    ]);
  });

  it("should handle an empty input", () => {
    const grid = parseGrid("");
    expect(grid).toEqual([]);
  });

  it("should handle a large input", () => {
    const input = Array(100)
      .fill(null)
      .map((_, i) => `ABCDEFGHIJKLMNOPQRSTUVWXYZ`)
      .join("\n");
    const grid = parseGrid(input);
    expect(grid.length).toBe(100);
    expect(grid[0].length).toBe(26);
  });

  it("should throw an error if input has lines of uneven length", () => {
    const input = `
    ABCDEF
    SDEFT
    ASDGAS
    `;
    expect(() => parseGrid(input)).toThrow(
      "Error: Grid lines are not equal length"
    );
  });
});

describe("checkForWord", () => {
  describe("successful search where word exists in grid at the point of search", () => {
    it("should find a word given valid search parameters and direction is right", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "DEF",
        row: 1,
        col: 0,
        direction: { dx: 1, dy: 0 },
      });
      expect(match).toBe(true);
    });

    it("should find a word given valid search parameters and direction is diagonal down-right", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "AEI",
        row: 0,
        col: 0,
        direction: { dx: 1, dy: 1 },
      });
      expect(match).toBe(true);
    });

    it("should find a word given valid search parameters and direction is down", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "CFI",
        row: 0,
        col: 2,
        direction: { dx: 0, dy: 1 },
      });
      expect(match).toBe(true);
    });

    it("should find a word given valid search parameters and direction is diagonal down-left", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "CEG",
        row: 0,
        col: 2,
        direction: { dx: -1, dy: 1 },
      });
      expect(match).toBe(true);
    });

    it("should find a word given valid search parameters and direction is left", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "IHG",
        row: 2,
        col: 2,
        direction: { dx: -1, dy: 0 },
      });
      expect(match).toBe(true);
    });

    it("should find a word given valid search parameters and direction is diagonal up-left", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "IEA",
        row: 2,
        col: 2,
        direction: { dx: -1, dy: -1 },
      });
      expect(match).toBe(true);
    });

    it("should find a word given valid search parameters and direction is up", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "HEB",
        row: 2,
        col: 1,
        direction: { dx: 0, dy: -1 },
      });
      expect(match).toBe(true);
    });

    it("should find a word given valid search parameters and direction is diagonal up-right", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "GEC",
        row: 2,
        col: 0,
        direction: { dx: 1, dy: -1 },
      });
      expect(match).toBe(true);
    });
  });

  describe("failed search where word exists in grid but not at the point of search", () => {
    it("should fail to find a word with given search parameters and direction is right", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "DEF",
        row: 0,
        col: 0,
        direction: { dx: 1, dy: 0 },
      });
      expect(match).toBe(false);
    });

    it("should fail to find a word with given search parameters and direction is diagonal down-right", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "AEI",
        row: 1,
        col: 0,
        direction: { dx: 1, dy: 1 },
      });
      expect(match).toBe(false);
    });

    it("should fail to find a word with given search parameters and direction is down", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "CFI",
        row: 1,
        col: 2,
        direction: { dx: 0, dy: 1 },
      });
      expect(match).toBe(false);
    });

    it("should fail to find a word with given search parameters and direction is diagonal down-left", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "CEG",
        row: 0,
        col: 1,
        direction: { dx: -1, dy: 1 },
      });
      expect(match).toBe(false);
    });

    it("should fail to find a word with given search parameters and direction is left", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "IHG",
        row: 1,
        col: 2,
        direction: { dx: -1, dy: 0 },
      });
      expect(match).toBe(false);
    });

    it("should fail to find a word with given search parameters and direction is diagonal up-left", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "IEA",
        row: 2,
        col: 1,
        direction: { dx: -1, dy: -1 },
      });
      expect(match).toBe(false);
    });

    it("should fail to find a word with given search parameters and direction is up", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "HEB",
        row: 1,
        col: 1,
        direction: { dx: 0, dy: -1 },
      });
      expect(match).toBe(false);
    });

    it("should fail to find a word with given search parameters and direction is diagonal up-right", () => {
      const grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      const match = checkForWord(grid, {
        text: "GEC",
        row: 2,
        col: 1,
        direction: { dx: 1, dy: -1 },
      });
      expect(match).toBe(false);
    });
  });
});

describe("findWords", () => {
  it("should find a single word facing right", () => {
    const grid = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    const matches = findWords(grid, "DEF");
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual({
      text: "DEF",
      row: 1,
      col: 0,
      direction: { dx: 1, dy: 0 },
    });
  });

  it("should find a single word facing diagonal down-right", () => {
    const grid = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    const matches = findWords(grid, "AEI");
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual({
      text: "AEI",
      row: 0,
      col: 0,
      direction: { dx: 1, dy: 1 },
    });
  });

  it("should find a single word facing down", () => {
    const grid = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    const matches = findWords(grid, "BEH");
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual({
      text: "BEH",
      row: 0,
      col: 1,
      direction: { dx: 0, dy: 1 },
    });
  });

  it("should find a single word facing diagonal down-left", () => {
    const grid = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    const matches = findWords(grid, "CEG");
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual({
      text: "CEG",
      row: 0,
      col: 2,
      direction: { dx: -1, dy: 1 },
    });
  });

  it("should find a single word facing left", () => {
    const grid = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    const matches = findWords(grid, "CBA");
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual({
      text: "CBA",
      row: 0,
      col: 2,
      direction: { dx: -1, dy: 0 },
    });
  });

  it("should find a single word facing diagonal up-left", () => {
    const grid = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    const matches = findWords(grid, "IEA");
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual({
      text: "IEA",
      row: 2,
      col: 2,
      direction: { dx: -1, dy: -1 },
    });
  });

  it("should find a single word facing up", () => {
    const grid = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    const matches = findWords(grid, "IFC");
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual({
      text: "IFC",
      row: 2,
      col: 2,
      direction: { dx: 0, dy: -1 },
    });
  });

  it("should find a single word facing diagonal up-right", () => {
    const grid = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    const matches = findWords(grid, "GEC");
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual({
      text: "GEC",
      row: 2,
      col: 0,
      direction: { dx: 1, dy: -1 },
    });
  });

  it("should find multiple instances of a word facing the same directions", () => {
    const grid = [
      ["A", "B", "C"],
      ["A", "B", "C"],
      ["G", "H", "I"],
    ];
    const matches = findWords(grid, "ABC");
    expect(matches.length).toBe(2);
    expect(matches[0]).toEqual({
      text: "ABC",
      row: 0,
      col: 0,
      direction: { dx: 1, dy: 0 },
    });
    expect(matches[1]).toEqual({
      text: "ABC",
      row: 1,
      col: 0,
      direction: { dx: 1, dy: 0 },
    });
  });

  it("should find multiple instances of a word facing different directions", () => {
    const grid = [
      ["A", "B", "C"],
      ["C", "B", "A"],
      ["G", "V", "C"],
    ];
    const matches = findWords(grid, "ABC");
    expect(matches.length).toBe(3);
    expect(matches[0]).toEqual({
      text: "ABC",
      row: 0,
      col: 0,
      direction: { dx: 1, dy: 0 },
    });
    expect(matches[1]).toEqual({
      text: "ABC",
      row: 0,
      col: 0,
      direction: { dx: 1, dy: 1 },
    });
    expect(matches[2]).toEqual({
      text: "ABC",
      row: 1,
      col: 2,
      direction: { dx: -1, dy: 0 },
    });
  });

  it("should find multiple instances of a word in a larger grid", () => {
    const input = `
    MMMSXXMASM
    MSAMXMSMSA
    AMXSXMAAMM
    MSAMASMSMX
    XMASAMXAMM
    XXAMMXXAMA
    SMSMSASXSS
    SAXAMASAAA
    MAMMMXMMMM
    MXMXAXMASX
    `;
    const grid = parseGrid(input);
    const matches = findWords(grid, "XMAS");
    expect(matches.length).toBe(18);
  });

  it("should return when there are no instances of a word", () => {
    const grid = [
      ["A", "B", "C"],
      ["A", "B", "C"],
      ["A", "B", "C"],
    ];
    const matches = findWords(grid, "NONE");
    expect(matches.length).toBe(0);
  });
});

// TODO: Write unit tests for this
describe("countCrossovers", () => {
  it("should find a single crossover in a simple pattern", () => {
    const input = `
    .......
    ..M.M..
    ...A...
    ..S.S..
    .......
    `;
    const grid = parseGrid(input);
    const matches = findWords(grid, "MAS");
    const crossovers = countCrossovers(matches);
    expect(crossovers).toBe(1);
  });

  it("should find multiple crossovers in a simple pattern with no shared points", () => {
    const input = `
    M.S.S.M
    .A...A.
    M.S.S.M
    `;
    const grid = parseGrid(input);
    const matches = findWords(grid, "MAS");
    const crossovers = countCrossovers(matches);
    expect(crossovers).toBe(2);
  });

  it("should find multiple crossovers in a simple pattern with one shared point", () => {
    const input = `
    M.M.M
    .A.A.
    S.S.S
    `;
    const grid = parseGrid(input);
    const matches = findWords(grid, "MAS");
    const crossovers = countCrossovers(matches);
    expect(crossovers).toBe(2);
  });

  it("should find all crossovers in a complex pattern", () => {
    const input = `
    .M.S......
    ..A..MSMS.
    .M.S.MAA..
    ..A.ASMSM.
    .M.S.M....
    ..........
    S.S.S.S.S.
    .A.A.A.A..
    M.M.M.M.M.
    ..........
    `;
    const grid = parseGrid(input);
    const matches = findWords(grid, "MAS");
    const crossovers = countCrossovers(matches);
    expect(crossovers).toBe(9);
  });
});
