/** 将.js文件替换成jsx文件, 或tsx替换成js文件*/

const fs = require("fs");

const {
  getFileNameNoSuffix,
  getSuffix,
  getFileNameParentDir,
  readFilesRecusion,
  log,
} = require("./_utils");

function rename(dir_name, { from, to }) {
  const filesArr = readFilesRecusion(dir_name);
  filesArr.map((item) => {
    const file_name = getFileNameNoSuffix(item);
    const suffix = getSuffix(item);
    const dir = getFileNameParentDir(item);
    if (from == suffix) {
      fs.renameSync(item, `${dir}${file_name}${to}`);
    }
  });
}
module.exports = rename;
