const fs = require("fs");

function writeFile(name, data) {
  // 打开文件
  fs.writeFile(name, data, "utf-8", function (err) {
    if (err) {
      console.log("err:", err);
    } else {
      console.log("writefile finished");
    }
  });
}
module.exports = {
  writeFile,
};
