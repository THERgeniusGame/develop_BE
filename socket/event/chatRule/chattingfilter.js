const fs = require("fs");
const path = require("path");
const filterList = fs
  .readFileSync(path.resolve(__dirname, "./forbidwords.txt"))
  .toString()
  .split("\n");

module.exports = function (message) {
  //금기어가 포함된 Msg
  let badword = [];
  for (let i = 0; i < filterList.length; i++) {
    if (message.includes(filterList[i]) === true) {
      badword.push(filterList[i]);
    }
  }
  if (badword.length !== 0) {
    let sendMsg = "";
    for (let j = 0; j < badword.length; j++) {
      sendMsg = message.replace(badword[j], "*".repeat(badword[j].length));
      message = sendMsg;
    }
    return { sendMsg, msg: "badword" };
  } else {
    return { message, msg: "goodword" };
  }
};
