const pkg = require("./package.json");
const program = require("commander");
const fsExt = require("fs-extra");
const fs = require("fs");
const download = require("download-git-repo");
const config = require("./config");
const act = require("./utils/file.js");
const downloadUrl = `direct:${config.templateUrl}`;
const templateDir = `${__dirname}/template@@_`;
const chalk = require("chalk");
const workingDir = process.cwd();
const hint = require("./utils/hint");
const { exec } = require("child_process");
const Utils = require("./utils/index.js");
const inquirer = require("inquirer");

let FilesList = [];

program.version(pkg.version, "-v,--version");

program.command("tpl <name>").action((name, args) => {
  const formalName = Utils.getComponentName(name);
  if (fs.existsSync(`${workingDir}/${formalName}`)) {
    inquirer
      .prompt({
        type: "confirm",
        name: "isOverwrite",
        message: `Target directory ${formalName} already exists.Overwrite it?`
      })
      .then(isOverwrite => {
        if (!isOverwrite) {
          console.log(chalk.red(`Project ${formalName} canceled`));
          return;
        }

        fsExt.emptyDir(formalName);
        initProject(name);
      });
    return;
  }

  initProject(name);
});

const initProject = name => {
  hint.log();
  fsExt.emptyDir(templateDir);
  download(downloadUrl, templateDir, { clone: true }, async function(err) {
    console.log(`Finish git repository`);
    console.log(`handling the project...`);
    act.readFileList(`${templateDir}/`, FilesList);

    await FilesList.map(item => {
      act.handleFiles(item.path, item.fullPath, name);
    });
    console.log("Installing CLI plugins.This might take a while...");
    exec(
      `cd ${workingDir}/${name} & npm i`,
      { cwd: workingDir },
      (error, stdout, stderr) => {
        console.log(
          `${chalk.green("project " + name + " created in ")}${chalk.yellow(
            workingDir
          )}`
        );
      }
    );
  });
};

program.parse(process.argv);
