require("dotenv").config();
const app = require("./app");

app.set("port", process.env.PORT || 8000); // 환경 변수의 값 또는 8000 포트에서 노드 실행, 배포 환경에서는 80으로 변경.

app.listen(app.get("port"), () =>
  console.log(app.get("port") + "포트에서 실행중")
);
