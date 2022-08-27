const express = require("express");
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const { error404, error } = require("./middlewares/error");
const cors = require("cors");
const IO=require("./socket/io")
const http=require('http')
const socket=require('socket.io')

class App {
  constructor() {
    this.app = express();
    this.app.use('/route/static', express.static('index.html'));  
    this.setMiddleWare();
    this.setRouter();
    this.setIo(this.app);
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
  setIo=(app)=>{
    this.server = http.createServer(app);
    this.io = socket.listen(this.server);

    this.io.on('connection', (socket)=> {
    
      // 접속한 클라이언트의 정보가 수신되면
      socket.on('login', (data)=> {
        console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);
    
        // socket에 클라이언트 정보를 저장한다
        socket.name = data.name;
        socket.userid = data.userid;
    
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        this.io.emit('login', data.name );
      });
  
      // 클라이언트로부터의 메시지가 수신되면
      socket.on('msg', (data)=> {
        console.log('Message from %s: %s', socket.name, data.msg);
    
        var msg = {
          from: {
            name: socket.name,
            userid: socket.userid
            },
            msg: data.msg
        };
    
        // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
        this.io.emit('msg', msg);
      
        // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
        // socket.emit('s2c chat', msg);
    
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        // io.emit('s2c chat', msg);
    
        // 특정 클라이언트에게만 메시지를 전송한다
        // io.to(id).emit('s2c chat', data);
        });
        // force client disconnect from server
        socket.on('forceDisconnect', ()=> {
          socket.disconnect();
        })
      
        socket.on('disconnect', ()=> {
          console.log('user disconnected: ' + socket.name);
        })
      }
    );
  }
  
  setErrorHandler() {
    this.app.use(error404);
    this.app.use(error);
  }
}
module.exports = new App().server;
