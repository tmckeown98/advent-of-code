import { getSimilarityScore, getTotalDistance, parseLists } from "./funcs";

describe("parseLists", () => {
  it("should split valid input into left and right lists", () => {
    const input = `
      3   4
      4   3
      2   5
      1   3
      3   9
      3   3
      `;
    const result = parseLists(input);
    expect(result).toEqual({
      left: [3, 4, 2, 1, 3, 3],
      right: [4, 3, 5, 3, 9, 3],
    });
  });

  it("should return two empty lists for an empty input", () => {
    const input = "";
    const result = parseLists(input);
    expect(result).toEqual({
      left: [],
      right: [],
    });
  });

  it("should handle extra whitespace and correctly parse an input", () => {
    const input = `
         3   4
      5 3
  
         2                  7
      1    3       
      `;
    const result = parseLists(input);
    expect(result).toEqual({
      left: [3, 5, 2, 1],
      right: [4, 3, 7, 3],
    });
  });

  it("should handle input with only a single row", () => {
    const input = "1   3";
    const result = parseLists(input);
    expect(result).toEqual({
      left: [1],
      right: [3],
    });
  });

  it("should handle large input size", () => {
    const input = Array(1000)
      .fill(null)
      .map((_, i) => `${i}  ${i + 1}`)
      .join("\n");
    const result = parseLists(input);
    expect(result.left).toHaveLength(1000);
    expect(result.right).toHaveLength(1000);
  });

  it("should throw an error if lists are not the same length", () => {
    const input = `
      2   4
      4    
      1   2
      `;
    expect(() => parseLists(input)).toThrow(
      "Error: lists are not equal length"
    );
  });

  it("should throw an error if lists contain non-numeric data", () => {
    const input = `
      3   4
      1   three
      2   5
      `;
    expect(() => parseLists(input)).toThrow(
      "Error: lists contain non-numeric data"
    );
  });
});

describe("getTotalDistance", () => {
  it("should calculate the total distance between lowest values for valid input", () => {
    const left: number[] = [3, 4, 2, 1, 3, 3];
    const right: number[] = [4, 3, 5, 3, 9, 3];
    const total = getTotalDistance(left, right);
    // |1-3| + |2-3| + |3-3| + |3-4| + |3-5| + |4-9|
    // 2 + 1 + 0 + 1 + 2 + 5
    expect(11).toEqual(total);
  });

  it("should handle identical lists and calculate the correct distance", () => {
    const left: number[] = [1, 2, 3, 4, 5];
    const right: number[] = [1, 2, 3, 4, 5];
    const total = getTotalDistance(left, right);
    expect(0).toEqual(total);
  });

  it("should handle lists with negative numbers and calculate the correct distance", () => {
    const left: number[] = [1, -2, 3, -4, 5];
    const right: number[] = [1, 1, 1, 1, 1];
    const total = getTotalDistance(left, right);
    // |1-1| + |-2-1| + |3-1| + |-4-1| + |5-1|
    // 0 + 3 + 2 + 5 + 4
    expect(14).toEqual(total);
  });

  it("should handle empty lists", () => {
    const left: number[] = [];
    const right: number[] = [];
    const total = getTotalDistance(left, right);
    expect(0).toEqual(total);
  });

  it("should handle lists with only 1 element", () => {
    const left: number[] = [2];
    const right: number[] = [1];
    const total = getTotalDistance(left, right);
    expect(1).toEqual(total);
  });

  it("should handle lists with a large number of elements", () => {
    const left: number[] = Array(1000).fill(1);
    const right: number[] = Array(1000).fill(2);
    const total = getTotalDistance(left, right);
    expect(1000).toEqual(total);
  });

  it("should throw an error if the lists are not equal length", () => {
    const left = [1, 2, 3, 4];
    const right = [1, 2];
    expect(() => getTotalDistance(left, right)).toThrow(
      "Error: lists are not equal length"
    );
  });
});

describe("getSimilarityScore", () => {
  it("should calculate the similarity score for a valid input", () => {
    const left = [3, 4, 2, 1, 3, 3];
    const right = [4, 3, 5, 3, 9, 3];
    const similarityScore = getSimilarityScore(left, right);
    expect(31).toEqual(similarityScore);
  });

  it("should handle empty lists", () => {
    const similarityScore = getSimilarityScore([], []);
    expect(0).toEqual(similarityScore);
  });

  it("should handle lists with only 1 element", () => {
    const similarityScore = getSimilarityScore([1], [1]);
    expect(1).toEqual(similarityScore);
  });

  it("should handle lists with a large number of elements", () => {
    const left = Array(1000).fill(1);
    const right = Array(1000).fill(1);
    const similarityScore = getSimilarityScore(left, right);
    expect(1000000).toEqual(similarityScore);
  });

  it("should throw an error if the lists are not equal length", () => {
    const left = [1, 2, 3, 4];
    const right = [1, 2];
    expect(() => getSimilarityScore(left, right)).toThrow(
      "Error: lists are not equal length"
    );
  });
});
