import { render } from "@common/markdown";
import fs from "fs";
import path from "path";

interface PuzzleOptions {
  directoryPath: string;
  outputFileName?: string;
  descriptionFileName?: string;
  inputs?: string[];
  part1: (data: Record<string, string>) => any;
  part2: (data: Record<string, string>) => any;
}

class Puzzle {
  private description: string;
  private outputFilePath: string;
  private data: Record<string, string> = {};
  private part1Func: (data: Record<string, string>) => any;
  private part2Func: (data: Record<string, string>) => any;

  constructor({
    directoryPath,
    outputFileName = "solution.md",
    descriptionFileName = "description.md",
    inputs = ["input"],
    part1,
    part2,
  }: PuzzleOptions) {
    // Load description markdown and render it
    const descriptionPath = path.join(directoryPath, descriptionFileName);
    if (!fs.existsSync(descriptionPath)) {
      throw new Error(`Description file not found: ${descriptionPath}`);
    }
    this.description = fs.readFileSync(descriptionPath, "utf-8");

    // Set file path for output to be saved to
    // This will be saved in markdown
    this.outputFilePath = path.join(directoryPath, outputFileName);

    // Load inputs and store internally
    inputs.forEach((inputFileName) => {
      const inputPath = path.join(directoryPath, inputFileName);
      if (!fs.existsSync(inputPath)) {
        throw new Error(`Input file not found: ${inputPath}`);
      }
      this.data[inputFileName] = fs.readFileSync(inputPath, "utf-8");
    });

    // Assign part1 and part2 functions
    this.part1Func = part1;
    this.part2Func = part2;
  }

  getDescription(): string {
    return this.description;
  }

  getInput(input: string): string {
    if (!this.data[input]) {
      throw new Error(`Input file not loaded: ${input}`);
    }
    return this.data[input];
  }

  solve(): void {
    let output = this.getDescription() + "\n";
    output += "# **Solutions**\n\n";
    output += "## Part One Solution\n\n";
    output += `**${this.part1Func(this.data)}**\n\n`;
    output += "## Part Two Solution\n\n";
    output += `**${this.part2Func(this.data)}**\n`;

    console.log(render(output));

    try {
      fs.writeFileSync(this.outputFilePath, output, "utf-8");
    } catch (err: any) {
      console.error(`Failed to write solution to file: ${err.message}`);
    }
  }
}

export { Puzzle };
export type { PuzzleOptions };
