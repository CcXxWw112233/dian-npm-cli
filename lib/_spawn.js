const { spawn } = require("child_process");
const _spawn = async (...args) => {
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
    proc.on("error", (err) => {
      resolve();
    });
  });
};

module.exports = _spawn;
