const express = require("express");
const fs = require("fs");
const http = require("http");
const path = require("path");
const HTTPS = require("https");
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const { error404, error } = require("./middlewares/error");
const cors = require("cors");
const IO = require("./socket/socket");
const { swaggerUi, specs } = require("./modules/swagger");

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("데이터베이스 연결 성공");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

class App {
  app = express();
  constructor() {
    this.sslServer();
    this.app.use("/route/static", express.static("index.html"));
    this.setMiddleWare();
    this.setRouter();
    this.socketIO = new IO(this.app);
    this.setErrorHandler();
  }
  setMiddleWare() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  setRouter() {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    this.app.use("/api", indexRouter);
  }

  setErrorHandler() {
    this.app.use(error404);
    this.app.use(error);
  }

  sslServer() {
    try {
      const option = {
        ca: fs.readFileSync(
          "/etc/letsencrypt/live/sparta-emil.shop/fullchain.pem"
        ),
        key: fs
          .readFileSync(
            path.resolve(
              process.cwd(),
              "/etc/letsencrypt/live/sparta-emil.shop/privkey.pem"
            ),
            "utf8"
          )
          .toString(),
        cert: fs
          .readFileSync(
            path.resolve(
              process.cwd(),
              "/etc/letsencrypt/live/sparta-emil.shop/cert.pem"
            ),
            "utf8"
          )
          .toString(),
      };

      HTTPS.createServer(option, this.app);
    } catch (error) {
      console.log(error);
      // colorConsole.error(
      //   "[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다."
      // );
      // colorConsole.warn(error);
    }
  }
}
module.exports = new App().socketIO.server;
