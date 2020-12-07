const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

/**
 * 获取后缀
 * @param {String} file_name xxx/xxx/index.js
 * @returns {String} '.js || .less
 */
const getSuffix = (file_name) => {
  if (!file_name) return ".";
  return file_name.substring(file_name.lastIndexOf("."));
};

/**
 * 获取文件名
 * @param {String} file_name xxx/xxx/index.js
 * @returns {String}  index
 */
const getFileNameNoSuffix = (file_name) => {
  if (!file_name) return ".";
  return file_name.substring(
    file_name.lastIndexOf("/") + 1,
    file_name.lastIndexOf(".")
  );
};
/**
 * 获取文件父文件夹路径
 * @param {String} file_name xxx/aaa/index.js
 * @returns {String}  xxx/aaa/
 */
const getFileNameParentDir = (file_name) => {
  if (!file_name) return ".";
  return file_name.substring(0, file_name.lastIndexOf("/") + 1);
};

/**
 * 获取文件夹下面的所有的文件(包括子文件夹)
 * @param {String} dir
 * @param {Function} callback
 * @returns {Array}
 */
const readFilesRecusion = function (dir, callback) {
  log("444" + dir);

  const filesArr = [];
  dir = path.join(dir, "/");
  log("555" + dir);

  function recusionReadDir(dirpath) {
    const files = fs.readdirSync(dirpath);
    files.map((item) => {
      const info = fs.statSync(dirpath + item);
      if (info.isDirectory()) {
        recusionReadDir(dirpath + item + `/`);
      } else {
        const filepath = dirpath + item;
        filesArr.push(filepath);
        typeof callback == "function" && callback(dirpath + item);
      }
    });
  }
  recusionReadDir(dir);
  return filesArr;
};

const log = (content) => console.log(chalk.green(content));

module.exports = {
  getSuffix,
  getFileNameNoSuffix,
  getFileNameParentDir,
  readFilesRecusion,
  log,
};
