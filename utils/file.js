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
  const content = fs.readFileSync(fullPath, "utf8");

  const result1 = content.replace(/@COMP_NAME/g, Utils.getComponentName(name));
  const result = result1.replace(/@NAME/g, name);

  const idx = path.indexOf("@@_");
  const pathPostFix = path.substring(idx + 3);
  const fullPathPostFix = fullPath.substring(idx + 3);

  const path2 = workingDir + "/" + name + pathPostFix;
  const fullPath2 = workingDir + "/" + name + fullPathPostFix;

  createNoExitFolder(path2);

  fs.appendFileSync(fullPath2, result, "utf8", function(err) {
    if (err) return console.log(err);
  });
};

const createNoExitFolder = path => {
  if (!fs.existsSync(path)) {
    try {
      fs.mkdirSync(path);
    } catch (err) {
      const index = path.lastIndexOf("/", path.length - 2);
      const upDir = path.slice(0, index);
      createNoExitFolder(upDir);
    }
  }
};

module.exports = {
  readFileList,
  handleFiles
};
