#!/usr/bin/env node
import { greet, main, showVersion } from "./cli";

function runner() {
  const args = process.argv;

  if (args.includes("-v") || args.includes("--version")) {
    return showVersion();
  }

  greet();
  main();
}

runner();
