//const filterList = ["fuck", "존나", "미친", "시발", "개새끼"];
const fs = require("fs");
const path=require("path");
const filterList = fs.readFileSync(path.resolve(__dirname, "./forbidwords.txt")).toString().split("\r\n");
for (i in filterList) {
}
let message = [
  //"내가 이겼어!!!!",
  //"시발 존나 짜증나게 하지 마라",
  //"안녕하세요",
  //"개새끼입니까?",
  "이 또라이같은 새끼야",
  //"fuck you",
  //"fuck",
];
module.exports=function(message) {
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
}