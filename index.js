const pkg = require("./package.json");
const program = require("commander");
const inquirer = require("inquirer");
const Web = require("./constants/frontweb");

program.version(pkg.version, "-v,--version");

// program.command("vue-plugin <name>")
//           .action((name,args)=>{
//             console.log();
//           })

program.parse(process.argv);
