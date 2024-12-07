import { exec } from "child_process";
import fs from "fs";
import path from "path";

const dayArg = process.argv[2];
const daysDir = path.resolve(__dirname, "../");

function runDay(day: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const dayScript = path.join(daysDir, `day${day}/solve.ts`);

    if (fs.existsSync(dayScript)) {
      exec(
        `npx ts-node -r tsconfig-paths/register ${dayScript}`,
        { env: { ...process.env, FORCE_COLOR: "true" } },
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error running Day ${day}:`, stderr.trim());
            reject(error);
          } else {
            console.log(`Day ${day} output:\n${stdout.trim()}`);
            resolve();
          }
        }
      );
    } else {
      console.log(`Error: cannot find '${dayScript}'`);
    }
  });
}

function getAvailableDays(): number[] {
  return fs
    .readdirSync(daysDir)
    .filter(
      (name) =>
        name.startsWith("day") &&
        fs.existsSync(path.join(daysDir, name, "solve.ts"))
    )
    .map((name) => parseInt(name.replace("day", ""), 10))
    .sort((a, b) => a - b);
}

async function runAllDays(): Promise<void> {
  console.log("Running all days sequentially...");
  getAvailableDays().forEach(async (day) => {
    try {
      console.log(`Running Day ${day}...`);
      await runDay(day);
    } catch (error) {
      console.error(`Failed to run Day ${day}. Stopping execution.`);
      return;
    }
  });
}

if (dayArg) {
  const day = parseInt(dayArg, 10);
  if (isNaN(day)) {
    console.error("Invalid day number. Please provide a valid number.");
    process.exit(1);
  }
  runDay(day).catch((err) => console.error(`Error: ${err.message}`));
} else {
  runAllDays().catch((err) => console.error(`Error: ${err.message}`));
}
