const camelize = str => {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
};

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getComponentName = str => {
  return capitalize(camelize(str));
};

module.exports = {
  getComponentName
};
