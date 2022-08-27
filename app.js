const express = require("express");
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const { error404, error } = require("./middlewares/error");
const cors = require("cors");
const IO=require("./socket/io")

class App {
  constructor() {
    this.app = express();
    this.setMiddleWare();
    this.setRouter();
    this.setIo(app);
    this.setErrorHandler();
  }
  setMiddleWare() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }
  setRouter() {
    this.app.use("/api", indexRouter);
    this.app.get('/', function(req, res) {
      res.sendFile(__dirname + '/static/index.html');
    });
  }
  setIo=(app)=>{
    this.server = http.createServer(app);
    let io=new IO(server);
    io.on('connection', );
  }
  setErrorHandler() {
    this.app.use(error404);
    this.app.use(error);
  }
}
module.exports = new App().app;
