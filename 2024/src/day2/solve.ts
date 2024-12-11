import { Puzzle } from "@common/puzzle";
import { checkReportSafety, parseReports } from "./funcs";

const puzzle = new Puzzle({
  directoryPath: "./src/day2",
  part1: (data) => {
    const reports = parseReports(data["input"]);
    const safeReports = reports.filter((report) => checkReportSafety(report));
    return safeReports.length;
  },
  part2: (data) => {
    const reports = parseReports(data["input"]);
    const safeReports = reports.filter((report) =>
      checkReportSafety(report, true)
    );
    return safeReports.length;
  },
});
puzzle.solve();
