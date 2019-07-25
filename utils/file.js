const fs = require("fs");
const Utils = require("./index.js");
const workingDir = process.cwd();

const readFileList = (path, filesList) => {
  const files = fs.readdirSync(path);
  files.forEach((itm, index) => {
    const stat = fs.statSync(path + itm);
    if (stat.isDirectory()) {
      readFileList(path + itm + "/", filesList);
    } else {
      const obj = {};
      obj.path = path; //路径
      obj.filename = itm; //名字
      obj.fullPath = path + itm; //全路径
      filesList.push(obj);
    }
  });
};

const handleFiles = (path, fullPath, name) => {
  fs.readFile(fullPath, "utf8", (err, files) => {
    const result1 = files.replace(/@COMP_NAME/g, Utils.getComponentName(name));
    const result = result1.replace(/@NAME/g, name);

    const idx = path.indexOf("@@_");
    const pathPostFix = path.substring(idx + 3);
    const fullPathPostFix = fullPath.substring(idx + 3);

    const path2 = workingDir + "/" + name + pathPostFix;
    const fullPath2 = workingDir + "/" + name + fullPathPostFix;

    if (!fs.existsSync(path2)) {
      fs.mkdirSync(path2);
    }

    fs.appendFile(fullPath2, result, "utf8", function(err) {
      if (err) return console.log(err);
    });
  });
};

module.exports = {
  readFileList,
  handleFiles
};
