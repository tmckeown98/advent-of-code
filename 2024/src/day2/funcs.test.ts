import { checkReportSafety, parseReports } from "./funcs";

describe("parseReports", () => {
  it("should split an input into a list of reports", () => {
    const input = `
    7 6 4 2 1
    1 2 7 8 9
    9 7 6 2 1
    1 3 2 4 5
    8 6 4 4 1
    1 3 6 7 9
    `;
    const reports = parseReports(input);
    expect(reports.length).toBe(6);
    expect(reports[0]).toEqual([7, 6, 4, 2, 1]);
    expect(reports[1]).toEqual([1, 2, 7, 8, 9]);
    expect(reports[2]).toEqual([9, 7, 6, 2, 1]);
    expect(reports[3]).toEqual([1, 3, 2, 4, 5]);
    expect(reports[4]).toEqual([8, 6, 4, 4, 1]);
    expect(reports[5]).toEqual([1, 3, 6, 7, 9]);
  });

  it("should handle an input with varying whitespaces between values", () => {
    const input = `
    7 6    4 2 1
    1 2 7   8 9
    9 7  6 2 1
    1                  3 2 4 5
    8 6 4 4   1
    1 3 6 7 9
    `;
    const reports = parseReports(input);
    expect(reports.length).toBe(6);
    expect(reports[0]).toEqual([7, 6, 4, 2, 1]);
    expect(reports[1]).toEqual([1, 2, 7, 8, 9]);
    expect(reports[2]).toEqual([9, 7, 6, 2, 1]);
    expect(reports[3]).toEqual([1, 3, 2, 4, 5]);
    expect(reports[4]).toEqual([8, 6, 4, 4, 1]);
    expect(reports[5]).toEqual([1, 3, 6, 7, 9]);
  });

  it("should handle an input with empty rows", () => {
    const input = `
    
    7 6 4 2 1
    1 2 7 8 9


    9 7 6 2 1
    1 3 2 4 5
    
    8 6 4 4 1
    1 3 6 7 9
    `;
    const reports = parseReports(input);
    expect(reports.length).toBe(6);
    expect(reports[0]).toEqual([7, 6, 4, 2, 1]);
    expect(reports[1]).toEqual([1, 2, 7, 8, 9]);
    expect(reports[2]).toEqual([9, 7, 6, 2, 1]);
    expect(reports[3]).toEqual([1, 3, 2, 4, 5]);
    expect(reports[4]).toEqual([8, 6, 4, 4, 1]);
    expect(reports[5]).toEqual([1, 3, 6, 7, 9]);
  });

  it("should handle an input with 1000 rows", () => {
    const input = Array(1000)
      .fill(null)
      .map((_, i) => `${i} ${i + 1}`)
      .join("\n");
    const reports = parseReports(input);
    expect(reports.length).toBe(1000);
    expect(reports[0]).toEqual([0, 1]);
    expect(reports[46]).toEqual([46, 47]);
    expect(reports[572]).toEqual([572, 573]);
  });

  it("should throw an error when a non-numeric value is present", () => {
    const input = `
    6 4 3 three 1
    1 3 5 2 1
    `;
    expect(() => parseReports(input)).toThrow(
      "Error: report contains non-numeric data"
    );
  });
});

describe("checkReportSafety", () => {
  it("should return true when a safe ascending report is given", () => {
    const report = [1, 2, 3, 4, 5];
    const safe = checkReportSafety(report);
    expect(safe).toBe(true);
  });

  it("should return true when a safe descending report is given", () => {
    const report = [5, 3, 2];
    const safe = checkReportSafety(report);
    expect(safe).toBe(true);
  });

  it("should return false when a report has adjacent values that are equal", () => {
    const report = [4, 3, 3, 3, 1];
    const safe = checkReportSafety(report);
    expect(safe).toBe(false);
  });

  it("should return false when a report has adjacent values that have a difference greater than 3", () => {
    const report = [1, 2, 6, 7];
    const safe = checkReportSafety(report);
    expect(safe).toBe(false);
  });

  it("should return false when a report is not continuously ascending", () => {
    const report = [1, 2, 4, 3, 2, 5];
    const safe = checkReportSafety(report);
    expect(safe).toBe(false);
  });

  it("should return false when a report is not continuously descending", () => {
    const report = [4, 3, 4, 3, 1];
    const safe = checkReportSafety(report);
    expect(safe).toBe(false);
  });

  it("should return true for an empty array", () => {
    const report: number[] = [];
    const safe = checkReportSafety(report);
    expect(safe).toBe(true);
  });

  it("should return true for an array with only 1 value", () => {
    const report = [1];
    const safe = checkReportSafety(report);
    expect(safe).toBe(true);
  });

  it("should return true for a report where a single element can be removed to become safe with the problem dampener enabled", () => {
    const report = [1, 2, 3, 6, 4];
    const safe = checkReportSafety(report, true);
    expect(safe).toBe(true);
  });
});
