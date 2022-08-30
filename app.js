const express = require("express");
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const { error404, error } = require("./middlewares/error");
const cors = require("cors");
const IO=require("./socket/socket")

class App {
  app = express();
  constructor() {
    this.app.use('/route/static', express.static('index.html'));  
    this.setMiddleWare();
    this.setRouter();
    this.socketIO=new IO(this.app);
    this.setErrorHandler();
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
module.exports = new App().socketIO.server;
