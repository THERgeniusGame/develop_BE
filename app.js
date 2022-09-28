const express = require("express");
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const { error404, error } = require("./middlewares/error");
const cors = require("cors");
const IO = require("./socket/socket");
const { swaggerUi, specs } = require("./modules/swagger");
require("dotenv").config();
const env = process.env;

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("데이터베이스 연결 성공");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

class App {
  app = express();
  constructor() {
    this.app.use("/route/static", express.static("index.html"));
    this.setMiddleWare();
    this.setRouter();
    this.socketIO = new IO(this.app);
    this.setErrorHandler();
  }
  setMiddleWare() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    const whitelist = ["https://thergenius.com/","http://localhost:3000","http://thergenius.com.s3-website.ap-northeast-2.amazonaws.com"];
    const corsOptions = {
      origin: function (origin, callback) { 
        if (whitelist.indexOf(origin) !== -1) { // 만일 whitelist 배열에 origin인자가 있을 경우
          callback(null, true); // cors 허용
        } else {
          callback(new Error("Not-Allowed-Origin!")); // cors 비허용
        }
      },
    };
    this.app.use(cors(corsOptions));
    // this.app.use(cors());
  }

  setRouter() {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    this.app.use("/api", indexRouter);
  }

  setErrorHandler() {
    this.app.use(error404);
    this.app.use(error);
  }
}
module.exports = new App().socketIO.server;
