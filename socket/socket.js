const http = require("http");
const { Server } = require("socket.io");
const { error404, error } = require("../middlewares/error.socket");
const RoomRepository = require("../repositories/room.repository");
const event_connection=require("./event/connection")
class IO {
  constructor(app) {
    this.server = http.createServer(app);
    this.connectServer(this.server);
  }
  
  connectServer = async (server) => {
    let io = new Server(server);
    event_connection(io)
  };
}

module.exports = IO;
