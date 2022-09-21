const { readFileSync } = require("fs");
const { createServer } = require("https");
const { Server } = require("socket.io");
const EventConnection=require("./event/connection")
class IO {
  eventConnection=new EventConnection
  constructor(app) {
    try{
      this.server = createServer({
        key: readFileSync("/etc/letsencrypt/live/sparta-emil.shop/fullchain.pem"),
        cert: readFileSync("/etc/letsencrypt/live/sparta-emil.shop/privkey.pem")
      });
      this.connectServer(this.server);
    }catch(err){
      console.log(err)
    }
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
