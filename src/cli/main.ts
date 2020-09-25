import inquirer from "inquirer";

const questions: inquirer.QuestionCollection<any> = [
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
      {
        name: "Styled JSX",
        value: "styled-jsx",
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
    .then((answers) => {
      // TODO: Generate template using answers
      console.log(answers);
    })
    .catch((error) => {
      if (error.isTtyError) {
      } else {
      }
    });
}
