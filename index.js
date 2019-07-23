const Utils = require("./utils");
const pkg = require("./package.json");
const program = require("commander");
const fsExt = require("fs-extra");
const path = require("path");
const download = require("download-git-repo");
const workingDir = process.cwd();
const fs = require("fs");
const FilesList = [];

program.version(pkg.version, "-v,--version");

program.command("tpl <name>").action((name, args) => {
  fsExt.emptyDir(__dirname + "/template@@_");
  download(
    "direct:https://github.com/Alfred-kai/vue-plugin-template.git",
    `${__dirname}/template@@_`,
    { clone: true },
    function(err) {
      console.log(err ? "Error" : "Success");
      readFileList(__dirname + "/template@@_/", FilesList);

      FilesList.map(item => {
        handleFiles(item.path, item.fullPath, name);
      });
    }
  );
});

program.parse(process.argv);

function readFileList(path, filesList) {
  var files = fs.readdirSync(path);
  files.forEach(function(itm, index) {
    var stat = fs.statSync(path + itm);
    if (stat.isDirectory()) {
      readFileList(path + itm + "/", filesList);
    } else {
      var obj = {};
      obj.path = path; //路径
      obj.filename = itm; //名字
      obj.fullPath = path + itm; //全路径
      filesList.push(obj);
    }
  });
}

function handleFiles(path, fullPath, name) {
  fs.readFile(fullPath, "utf8", function(err, files) {
    var result1 = files.replace(/@COMP_NAME/g, Utils.getComponentName(name));
    var result = result1.replace(/@NAME/g, name);

    var idx = path.indexOf("@@_");
    var pathPostFix = path.substring(idx + 3);
    var fullPathPostFix = fullPath.substring(idx + 3);

    var path2 = workingDir + "/" + name + pathPostFix;
    var fullPath2 = workingDir + "/" + name + fullPathPostFix;

    if (!fs.existsSync(path2)) {
      fs.mkdirSync(path2);
    }

    fs.appendFile(fullPath2, result, "utf8", function(err) {
      if (err) return console.log(err);
    });
  });
}
