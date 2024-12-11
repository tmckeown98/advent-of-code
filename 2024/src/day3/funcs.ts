const ERROR_UNKNOWN_INSTRUCTION = "Error: Instruction unknown";

interface MultiplyInstruction {
  type: "mul";
  x: number;
  y: number;
}
interface ConditionalInstruction {
  type: "do" | "don't";
}
type Instruction = MultiplyInstruction | ConditionalInstruction;

function parseInstructions(input: string): Instruction[] {
  // Regex matches `mul(x,y)` where x and y are both 1-3 digit values
  // It also matches `do()` and `don't()` conditional instructions
  // Using named capture groups to make the instruction parsing easier to read later
  const MUL_REGEX = /(?<typeMul>mul)\((?<x>\d{1,3}),(?<y>\d{1,3})\)/;
  const DO_REGEX = /(?<typeDo>do)\(\)/;
  const DONT_REGEX = /(?<typeDont>don't)\(\)/;

  const INSTRUCTION_REGEX = new RegExp(
    `(${MUL_REGEX.source}|${DO_REGEX.source}|${DONT_REGEX.source})`,
    "g"
  );

  const parseLine = (line: string): Instruction[] => {
    const instructions: Instruction[] = [];
    for (const match of line.matchAll(INSTRUCTION_REGEX)) {
      const groups = match.groups;
      if (!groups) continue;

      if (groups.typeMul) {
        instructions.push({
          type: "mul",
          x: parseInt(groups.x, 10),
          y: parseInt(groups.y, 10),
        });
      } else if (groups.typeDo) {
        instructions.push({ type: "do" });
      } else if (groups.typeDont) {
        instructions.push({ type: "don't" });
      }
    }
    return instructions;
  };

  return input
    .trim()
    .split("\n")
    .flatMap((line) => parseLine(line));
}

function resolveInstructions(
  instructions: Instruction[],
  enableConditionals: boolean = false
): number[] {
  const resolved: number[] = [];
  let enabled = true;

  instructions.forEach((inst) => {
    switch (inst.type) {
      case "mul":
        if (enabled) resolved.push(inst.x * inst.y);
        break;
      case "do":
        if (enableConditionals) enabled = true;
        break;
      case "don't":
        if (enableConditionals) enabled = false;
        break;
    }
  });

  return resolved;
}
// function resolveInstruction(instruction: Instruction): number {
//   switch (instruction.type) {
//     case "mul":
//       return instruction.x * instruction.y;
//     default:
//       throw Error(ERROR_UNKNOWN_INSTRUCTION);
//   }
// }

export { parseInstructions, resolveInstructions };
export type { Instruction };
