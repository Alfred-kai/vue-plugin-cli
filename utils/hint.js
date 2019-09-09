const pkg = require("../package.json");
const chalk = require("chalk");
const workingDir = process.cwd();

const log = () => {
  console.log(chalk.blue(`vue-plugin-cli v${pkg.version}`));
  console.log(chalk.blue(`Creating project in ${chalk.yellow(workingDir)}`));
  console.log(`Initializing git repository...`);
};

module.exports = {
  log
};
