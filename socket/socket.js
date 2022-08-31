const http = require("http");
const { Server } = require("socket.io");
const event_connection=require("./event/connection")
class IO {
  constructor(app) {
    this.server = http.createServer(app);
    this.connectServer(this.server);
  }
  
  connectServer = async (server) => {
    let io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      }
    });
    event_connection(io)
  };
}

module.exports = IO;
