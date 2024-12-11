const ERROR_NON_NUMERIC = "Error: report contains non-numeric data";

function parseReports(input: string): number[][] {
  const reports: number[][] = [];

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      if (line.trim().length === 0) return;

      const report: number[] = [];
      line
        .trim()
        .split(/\s+/)
        .forEach((dataPoint) => {
          const num = Number(dataPoint);
          if (isNaN(num)) {
            throw new Error(ERROR_NON_NUMERIC);
          }
          report.push(num);
        });
      reports.push(report);
    });

  return reports;
}

function checkReportSafety(
  report: number[],
  enableProblemDampener: boolean = false
): boolean {
  if (report.length < 2) return true;

  const isSafeReport = (data: number[]): boolean => {
    const initialDelta = data[1] - data[0];
    if (Math.abs(initialDelta) < 1 || Math.abs(initialDelta) > 3) {
      return false;
    }

    const isAsc = initialDelta > 0;
    return data.every((val, idx) => {
      if (idx === 0) return true;

      const delta = val - data[idx - 1];
      if (Math.abs(delta) < 1 || Math.abs(delta) > 3) return false;

      return isAsc ? delta > 0 : delta < 0;
    });
  };

  if (isSafeReport(report)) return true;
  if (!enableProblemDampener) return false;

  return report.some((_, i) => {
    return isSafeReport(report.slice(0, i).concat(report.slice(i + 1)));
  });
}

export { checkReportSafety, parseReports };
