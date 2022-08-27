const express = require("express");
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const { error404, error } = require("./middlewares/error");
const cors = require("cors");

class App {
  constructor() {
    this.app = express();
    this.setMiddleWare();
    this.setRouter();
    // this.setErrorHandler();
  }
  setMiddleWare() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }
  setRouter() {
    this.app.use("/api", indexRouter);
  }
  setErrorHandler() {
    this.app.use(error404);
    this.app.use(error);
  }
}
module.exports = new App().app;
