const pkg = require("./package.json");
const program = require("commander");
const fs = require("fs-extra");
const path = require("path");
var download = require("download-git-repo");
var exec = require("child_process").exec;
var cli = __dirname + "/gulp replace";

program.version(pkg.version, "-v,--version");

program.command("tpl <name>").action((name, args) => {
  // fs.copySync(`${__dirname}/template`, `${workingDir}/${name}`);

  download(
    "direct:https://github.com/Alfred-kai/vue-plugin-template.git",
    `${__dirname}/template`,
    { clone: true },
    function(err) {
      console.log(err ? "Error" : "Success");
      console.log("cli is : " + cli);
      exec(cli, { encoding: "utf8" }, function(err, stdout, stderr) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("stdout" + stdout);
        console.log("stderr" + stderr);
      });
    }
  );
});

program.parse(process.argv);
