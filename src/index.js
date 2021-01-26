#!/usr/bin/env node
import { greet, main } from "./cli";

function runner() {
  greet();
  main();
}

runner();
