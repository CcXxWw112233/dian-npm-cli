const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const fs = require("fs");
const { clone } = require("./_download");
const open = require("open");
const _spawn = require("./_spawn");
const _rename = require("./_rename");
const _delete_file = require("./_delete_file");
const { log } = require("./_utils");

module.exports = async (name, options) => {
  //打印欢迎界面
  clear();
  const data = await figlet("welcome to di-an");
  log(data);

  // 下载模板
  // github
  // await clone("github:CcXxWw112233/dian-react-dva-boilerplate", name);
  // gitlab
  await clone(
    "direct:http://39.106.198.198:8234/front-develop/dian-npm-boilerplate.git",
    name,
    { clone: true }
  );

  const isTs = options.typescript; //用ts模板
  const isForNpm = options.component; //用来开发组件
  const isInstall = options.install; //是否安装依赖

  //使用ts模板
  if (isTs) {
    log("创建项目3：");
    //将所有js重命名为ts
    // _rename(`./${name}/src`, { from: ".js", to: ".tsx" });

    // //删除所有js文件
    try {
      _delete_file(`./${name}/src`, [".js"]);
    } catch (err) {
      log("错误" + err);
    }
  } else {
    //将所有tsx重命名为js
    // _rename(`./${name}/src`, { from: ".tsx", to: ".js" });

    //删除项目钟的tsx和ts文件
    _delete_file(`./${name}/src`, [".tsx", ".ts"]);
    try {
      //删除项目中的tsconfig
      fs.unlinkSync(`./${name}/tsconfig.json`);
    } catch (err) {
      log("错误" + err);
    }
  }

  //
  if (isForNpm) {
  }

  // 自动安装依赖
  if (isInstall) {
    const _comand = require("./_comand");
    log("安装依赖");
    await _spawn(_comand, ["install"], {
      cwd: `./${name}`,
    });
    log(
      `安装完成：
      =========
      cd ${name}
      npm start
      =========`
    );
    // //启动
    await _spawn(_comand, ["start"], { cwd: `./${name}` });
    // open("http://localhost:9000/");
  }
};
