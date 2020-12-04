/** 将.js文件替换成jsx文件, 或tsx替换成js文件*/

const fs = require("fs");
const { getSuffix, readFilesRecusion } = require("./_utils");

function deleteFile(dir_name, suffix_format = []) {
  const filesArr = readFilesRecusion(dir_name);
  filesArr.map((item) => {
    const suffix = getSuffix(item);
    if (suffix_format.includes(suffix)) {
      fs.unlinkSync(item);
    }
  });
}
module.exports = deleteFile;
