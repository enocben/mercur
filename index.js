#!/usr/bin/env node

const { spawnSync, spawn } = require("child_process");
const path = require("path");

try {
  const scriptDir = __dirname;
  process.chdir(scriptDir);

  console.log(`Starting Mercur development server from: ${scriptDir}`);

  const child = spawn("bun", ["run", "dev"], {
    stdio: "inherit",
    shell: true,
  });

  child.on("error", (error) => {
    console.error("Failed to start Mercur development server:", error.message);
    process.exit(1);
  });
} catch (error) {
  console.error("Error starting Mercur:", error.message);
  console.log("Make sure Bun is installed: https://bun.sh");
  process.exit(1);
}

