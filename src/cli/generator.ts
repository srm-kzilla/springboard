import { exec, ExecOptions } from "child_process";
import fse from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";

export interface Options {
  name: string;
  author: string;
  license: string;
  "package-manager": "yarn" | "npm";
  git: boolean;
  architecture: "server" | "client" | "full-stack";
  "server-ts": boolean;
  "server-express": boolean;
  "client-ts": boolean;
  styling: "css" | "scss" | "bootstrap" | "styled-components" | "tailwind-css";
}

export default async function generator(options: Options) {
  const spinner = ora({
    text: "Sprinkling magic...",
    color: "cyan",
  });
  const projectDir = path.join(process.cwd(), options.name);
  try {
    spinner.start();
    const template = getTemplate(options);
    if (template === null) throw new Error("Template not found");

    await fse.copy(path.join(__dirname, "../templates", template), projectDir, {
      overwrite: true,
    });

    const packagePath = path.join(process.cwd(), options.name, "package.json");
    const packageObj = await fse.readJSON(packagePath);
    const {
      scripts: { springboard: springboardScript },
    } = packageObj;
    delete packageObj.scripts.springboard;
    await fse.writeJson(
      packagePath,
      {
        ...packageObj,
        name: options.name,
        author: options.author,
        license: options.license,
      },
      { spaces: 2 }
    );

    await execShellCommand(
      options["package-manager"] === "npm" ? "npm install" : "yarn",
      {
        cwd: projectDir,
      }
    );

    if (springboardScript) {
      await execShellCommand(springboardScript, {
        cwd: projectDir,
      });
    }

    spinner.succeed();

    if (options.git) initGitRepo(projectDir);

    console.log(
      `\n${chalk.hex("#54a870")("Success! Created")} ${chalk
        .hex("#26baff")
        .bold(options.name)} ${chalk.hex("#54a870")("at")} ${chalk.hex(
        "#26baff"
      )(process.cwd())}`
    );
    console.log(`\n${chalk.hex("#54a870").bold("Code away!")} 🧪\n`);

    offerVSCode(projectDir);
  } catch (e) {
    spinner.fail("A template for that configuration does not exist");
    console.log("\n");
  }
}

const getTemplate = (options: Options) => {
  switch (options.architecture) {
    case "server":
      if (options["server-ts"]) {
        return options["server-express"] ? "server-express-ts" : "server-ts";
      } else {
        return options["server-express"] ? "server-express-js" : "server-js";
      }
    case "client":
      if (options["client-ts"]) {
        switch (options.styling) {
          case "bootstrap":
            return "client-bootstrap-ts";
          case "css":
            return "client-css-ts";
          case "scss":
            return "client-scss-ts";
          case "styled-components":
            return "client-styled-components-ts";
          case "tailwind-css":
            return "client-tailwind-ts";
        }
      } else {
        switch (options.styling) {
          case "bootstrap":
            return "client-bootstrap-js";
          case "css":
            return "client-css-js";
          case "scss":
            return "client-scss-js";
          case "styled-components":
            return "client-styled-components-js";
          case "tailwind-css":
            return "client-tailwind-js";
        }
      }

    case "full-stack":
      if (
        options["server-ts"] &&
        options["server-express"] &&
        options["client-ts"] &&
        options.styling === "tailwind-css"
      )
        return "full-stack-tailwind-tsx-express-ts";

    default:
      return null;
  }
};

export const execShellCommand = (cmd: string, options: ExecOptions = {}) => {
  return new Promise((resolve, reject) => {
    exec(cmd, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
};

const initGitRepo = async (cwd: string) => {
  try {
    const message = `🎉 Initialize project using Springboard`;
    await execShellCommand(
      `git --version && git init && git checkout -b main && git add -A && git commit -m "${message}"`,
      { cwd }
    );
  } catch (_) {}
};

const offerVSCode = async (cwd: string) => {
  const questions: inquirer.QuestionCollection<any> = [
    {
      type: "list",
      name: "vscode",
      message: "Would you like to open this project in Visual Studio Code?",
      choices: [
        {
          name: "Yes",
          value: true,
        },
        {
          name: "No",
          value: false,
        },
      ],
    },
  ];

  try {
    await execShellCommand("code --version");
    const { vscode } = await inquirer.prompt(questions);
    if (vscode) {
      execShellCommand("code .", { cwd });
    }
  } catch (_) {}
};
