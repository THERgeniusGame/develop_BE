const http = require("http");
const { Server } = require("socket.io");
const EventConnection=require("./event/connection")
class IO {
  eventConnection=new EventConnection
  constructor(app) {
    this.server = http.createServer(app);
    this.connectServer(this.server);
  }
  
  connectServer = async (server) => {
    try{
      let io = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        }
      });
      this.eventConnection.connection(io)
    }catch(err){
    }
  };
}

module.exports = IO;
