import chalk from "chalk";

export default function greet() {
  console.log(
    chalk.hex("#54a870")(`
+-+-+-+-+-+-+-+-+-+-+-+
|S|p|r|i|n|g|b|o|a|r|d|
+-+-+-+-+-+-+-+-+-+-+-+`)
  );
  console.log(
    chalk
      .hex("#54a870")
      .bold("Let springboard jumpstart your projects for you.\n")
  );
  console.log(
    chalk.hex("#26baff")("crafted with ❤ by your friends on the SRMKZILLA team")
  );
  console.log("\n\n");
}
