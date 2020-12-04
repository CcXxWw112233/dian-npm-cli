const { promisify } = require("util");

module.exports.clone = async function (repo, desc, options) {
  const download = promisify(require("download-git-repo"));
  const ora = require("ora");
  const process = ora(`下载...${repo}`);
  process.start();
  await download(repo, desc, options);
  process.succeed();
};
