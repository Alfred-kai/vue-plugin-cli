const pkg = require("./package.json");
const program = require("commander");
const fsExt = require("fs-extra");
const download = require("download-git-repo");
const config = require("./config");
const act = require("./utils/file.js");
const downloadUrl = `direct:${config.templateUrl}`;
const templateDir = `${__dirname}/template@@_`;

let FilesList = [];

program.version(pkg.version, "-v,--version");

program.command("tpl <name>").action((name, args) => {
  fsExt.emptyDir(templateDir);
  download(downloadUrl, templateDir, { clone: true }, function(err) {
    console.log(err ? "Error" : "Success");
    act.readFileList(`${templateDir}/`, FilesList);

    FilesList.map(item => {
      act.handleFiles(item.path, item.fullPath, name);
    });
  });
});

program.parse(process.argv);
