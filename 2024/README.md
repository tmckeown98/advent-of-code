# Advent of Code 2024

This directory contains my solutions to [Advent of Code 2024](https://adventofcode.com/2024) challenges.

## 🌟 Progress Table

| Day                            | Part 1 | Part 2 |
| ------------------------------ | ------ | ------ |
| [1](./src/day1/description.md) | ✅     | ✅     |
| [2](./src/day2/description.md) | ✅     | ✅     |
| [3](./src/day3/description.md) | ✅     | ✅     |

---

## 🛠️ Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Jest](https://jestjs.io/)

## 📦 Packages

- [Chalk](https://www.npmjs.com/package/chalk): Terminal styling
- [Marked](https://www.npmjs.com/package/marked): Markdown parser

## 📜 Puzzle Structure

Each puzzle day is stored in their own directories with the following file structure:

- `description.md`: This markdown file contains all of the details given in the puzzle text on Advent of Code.
- `input`: This is a raw text file containing the input given with the puzzle on Advent of Code.
- `funcs.ts`: This is the functions file that contains the puzzle solving algorithms -- the brains of each puzzle.
- `funcs.test.ts`: This is the unit tests file for the puzzle functions -- necessary to ensure the puzzle solution handles all cases as expected.
- `solve.ts`: This is the entry point for running the real puzzle data.

## 🚀 How to Run

### 1. Install dependencies

```
npm install
```

### 2. Run unit tests

To run all the unit tests in the project:

```
npm test
```

To run unit tests for a specific day you will need to specify the directory:

```
npm test day1/
```

_Remember to include the trailing slash otherwise you might end up pattern matching `day1` with `day10`, `day11`, etc._

### 3. Run solutions

To run all the solutions sequentially:

```
npm start
```

To run a specific day:

```
npm start 1
```
