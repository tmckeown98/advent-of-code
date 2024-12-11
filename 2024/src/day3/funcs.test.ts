import { Instruction, parseInstructions, resolveInstructions } from "./funcs";

describe("parseInstructions", () => {
  it("should parse an input with only valid instructions", () => {
    const input = "mul(4,4)do()mul(2,45)don't()mul(1,65)";
    const instructions = parseInstructions(input);
    expect(instructions.length).toBe(5);
    expect(instructions[0]).toEqual({ type: "mul", x: 4, y: 4 });
    expect(instructions[1]).toEqual({ type: "do" });
    expect(instructions[2]).toEqual({ type: "mul", x: 2, y: 45 });
    expect(instructions[3]).toEqual({ type: "don't" });
    expect(instructions[4]).toEqual({ type: "mul", x: 1, y: 65 });
  });

  it("should parse an input with no valid instructions", () => {
    const input = "mujl(4,4)mul(2555,45)mul(1,6x5)";
    const instructions = parseInstructions(input);
    expect(instructions.length).toBe(0);
  });

  it("should parse an input with some valid and some invalid instructions", () => {
    const input = "mul(5,77)MUL(42,12)mul(12,425)mm,xul(1,3)ul(1,65)";
    const instructions = parseInstructions(input);
    expect(instructions.length).toBe(2);
    expect(instructions[0]).toEqual({ type: "mul", x: 5, y: 77 });
    expect(instructions[1]).toEqual({ type: "mul", x: 12, y: 425 });
  });

  it("should handle an empty input", () => {
    const input = "";
    const instructions = parseInstructions(input);
    expect(instructions.length).toBe(0);
  });

  it("should handle a long input", () => {
    const input =
      "mul(5,77)MUL(42,12)mul(12,425)mm,xul(1,3)ul(1,65)mul(5,77)MUL(42,12)mul(12,425)mm,xul(1,3)ul(1,65)mul(5,77)MUL(42,12)mul(12,425)mm,xul(1,3)ul(1,65)mul(5,77)MUL(42,12)mul(12,425)mm,xul(1,3)ul(1,65)mul(5,77)MUL(42,12)mul(12,425)mm,xul(1,3)ul(1,65)";
    const instructions = parseInstructions(input);
    expect(instructions.length).toBe(10);
  });

  it("should handle multiline input", () => {
    const input = `mul(5,77)MUL(42,12)mul(12,425)mm,xul(1,3)ul(1,65)mul(5,77)MUL(42,12)mul(12,425)mm,xul(1,3)ul(1,65)mul(5,77)MUL(42,12)
    mul(12,425)mm,xul(1,3)ul(1,65)mul(5,77)MUL(42,12)mul(12,425)mm,xul(1,3)ul(1,65)mul(5,77)MUL(42,12)mul(12,425)mm,xul(1,3)ul(1,65)`;
    const instructions = parseInstructions(input);
    expect(instructions.length).toBe(10);
  });
});

describe("resolveInstruction", () => {
  it("should resolve a valid multiply instruction", () => {
    const input: Instruction = { type: "mul", x: 4, y: 2 };
    const result = resolveInstructions([input]);
    expect(result).toEqual([8]);
  });

  it("should resolve several valid multiply instructions", () => {
    const input: Instruction[] = [
      { type: "mul", x: 4, y: 2 },
      { type: "mul", x: 2, y: 5 },
      { type: "mul", x: 7, y: 7 },
      { type: "mul", x: 2, y: 1 },
    ];
    const result = resolveInstructions(input);
    expect(result).toEqual([8, 10, 49, 2]);
  });

  it("should resolve instructions with a conditional to disable a single instruction", () => {
    const input: Instruction[] = [
      { type: "mul", x: 4, y: 2 },
      { type: "mul", x: 2, y: 5 },
      { type: "mul", x: 7, y: 7 },
      { type: "don't" },
      { type: "mul", x: 2, y: 1 },
    ];
    const result = resolveInstructions(input, true);
    expect(result).toEqual([8, 10, 49]);
  });

  it("should resolve instructions with a conditional to disable multiple instructions", () => {
    const input: Instruction[] = [
      { type: "mul", x: 4, y: 2 },
      { type: "mul", x: 2, y: 5 },
      { type: "don't" },
      { type: "mul", x: 7, y: 7 },
      { type: "mul", x: 2, y: 1 },
    ];
    const result = resolveInstructions(input, true);
    expect(result).toEqual([8, 10]);
  });

  it("should resolve instructions with a conditional to disable multiple instructions and then re-enable them", () => {
    const input: Instruction[] = [
      { type: "mul", x: 4, y: 2 },
      { type: "don't" },
      { type: "mul", x: 2, y: 5 },
      { type: "mul", x: 7, y: 7 },
      { type: "do" },
      { type: "mul", x: 2, y: 1 },
    ];
    const result = resolveInstructions(input, true);
    expect(result).toEqual([8, 2]);
  });
});
