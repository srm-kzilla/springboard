import inquirer from "inquirer";
import path from "path";
import fse from "fs-extra";
import generator, { Options } from "./generator";

const questions: inquirer.QuestionCollection<any> = [
  {
    type: "list",
    name: "architecture",
    message: "What modules would you like to add?",
    choices: [
      {
        name: "Server",
        value: "server",
      },
      {
        name: "Client",
        value: "client",
      },
      {
        name: "Full stack",
        value: "full-stack",
      },
    ],
  },
  {
    type: "input",
    name: "name",
    message: "What's the name of your masterpiece?",
    validate: (answer) => {
      return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,}$/.test(answer)
        ? true
        : "Please enter a valid project name.";
    },
  },
  {
    type: "input",
    name: "author",
    message: "What's the author's name?",
  },
  {
    type: "input",
    name: "license",
    message: "What's the license for your package?",
  },
  {
    type: "list",
    name: "package-manager",
    message: "What package manager would you like to use?",
    choices: [
      {
        name: "NPM (Node Package Manager)",
        value: "npm",
      },
      {
        name: "Yarn",
        value: "yarn",
      },
    ],
  },
  {
    type: "list",
    name: "git",
    message: "Would you like to initialize a Git repository?",
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
    when: () => !isGitRepo(),
  },
  {
    type: "list",
    name: "server-ts",
    message: "Would you like to add TypeScript to your Node.js?",
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
    when: (answers) => ["server", "full-stack"].includes(answers.architecture),
  },
  {
    type: "list",
    name: "server-express",
    message: "Would you like to initialize a basic server?",
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
    when: (answers) => ["server", "full-stack"].includes(answers.architecture),
  },
  {
    type: "list",
    name: "client-ts",
    message: "Would you like to add TypeScript to your React client?",
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
    when: (answers) => ["client", "full-stack"].includes(answers.architecture),
  },

  {
    type: "list",
    name: "styling",
    message: "What stylings would you like to add?",
    choices: [
      {
        name: "CSS",
        value: "css",
      },
      {
        name: "SCSS",
        value: "scss",
      },
      {
        name: "Bootstrap",
        value: "bootstrap",
      },
      new inquirer.Separator(),
      {
        name: "Styled Components",
        value: "styled-components",
      },
      new inquirer.Separator(),
      {
        name: "Tailwind CSS",
        value: "tailwind-css",
      },
      ,
    ],
    when: (answers) => ["client", "full-stack"].includes(answers.architecture),
    loop: false,
  },
];

export default function main() {
  inquirer
    .prompt(questions)
    .then((answers: inquirer.Answers) => {
      console.log("\n");
      return generator(answers as Options);
    })
    .catch((error) => {
      if (error.isTtyError) {
      } else {
      }
    });
}

const isGitRepo: () => boolean = () => {
  return fse.pathExistsSync(path.join(process.cwd(), ".git"));
};
