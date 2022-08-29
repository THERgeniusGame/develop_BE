const http=require('http')
const {Server}=require('socket.io')
const { error404, error } = require("../middlewares/error.socket");
const session=require("express-session");
class IO{
  constructor(app){ 
    this.server = http.createServer(app);
    this.io = new Server(this.server);
    this.connectServer();
  }
  
  connectServer=async()=>{
    let room="1";
    var nsp = this.io.of('/'+room).on('connection', (socket)=> {
      // 접속한 클라이언트의 정보가 수신되면
      socket.on('login', (data)=> {
        console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);
    
        // socket에 클라이언트 정보를 저장한다
        socket.name = data.name;
        socket.userid = data.userid;
    
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        nsp.emit('login', data.name );
      });
  
      // 클라이언트로부터의 메시지가 수신되면
      socket.on('msg', (data)=> {
        
        var msg = {
          from: {
            name: socket.name,
            userid: socket.userid
          },
          msg: data.msg
        };
        
        // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
        if(msg.msg!==""){
          console.log('Message from %s: %s', socket.name, data.msg);
          console.log(msg);
          nsp.emit('msg', msg);
        }
      
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
    this.io.use(error404);
    this.io.use(error);
  }  
}

module.exports=IO