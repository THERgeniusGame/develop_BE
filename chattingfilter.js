//const filterList = ["fuck", "존나", "미친", "시발", "개새끼"];
const fs = require("fs");
const filterList = fs.readFileSync("forbidwords.txt").toString().split("\n");
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

function filter4(message) {
  //금기어가 포함된 Msg
  const filteredMsg = message.filter((el) =>
    filterList.some((word) => el.includes(word))
  );
  let badword = [];
  for (let i = 0; i < filterList.length; i++) {
    if (message[0].includes(filterList[i]) === true) {
      badword.push(filterList[i]);
    }
  }

  console.log("badword", badword);
  if (filteredMsg.length !== 0) {
    let sendMsg = "";
    for (let j = 0; j < badword.length; j++) {
      sendMsg = message[0].replace([badword[j]], "*".repeat(badword[j].length));
      message[0] = sendMsg;
    }
    return { sendMsg, msg: "badword" };
  } else {
    return { message, msg: "goodword" };
  }
}
console.log(filter4(message));
