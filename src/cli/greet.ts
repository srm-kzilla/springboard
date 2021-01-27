import chalk from "chalk";

export default function greet() {
  console.log(
    chalk.hex("#54a870")(`
+-+-+-+-+-+-+-+-+-+-+-+
|S|p|r|i|n|g|b|o|a|r|d|
+-+-+-+-+-+-+-+-+-+-+-+`)
  );
  console.log(
    chalk.hex("#54a870").bold("Springboard jumpstarts your projects for you.")
  );
  console.log(chalk.hex("#54a870")(`v${getVersion()}\n`));
  console.log(
    chalk.hex("#26baff")("crafted with ❤ by your friends on the SRMKZILLA team")
  );
  console.log("\n");
}

export const getVersion = () => {
  return "1.1.1";
};

export const showVersion = () => {
  console.log(
    chalk.hex("#26baff")(`Springboard is runnin' at ${getVersion()}! 🥳`)
  );
};
