const { createServer } = require("https");
const fs = require("fs");
const { Server } = require("socket.io");
const EventConnection=require("./event/connection")
class IO {
  eventConnection=new EventConnection
  constructor(app) {
    try{
      this.server = createServer({
        ca: fs.readFileSync(
          "/etc/letsencrypt/live/sparta-emil.shop/fullchain.pem"
        ),
        key: fs
          .readFileSync(
            path.resolve(
              process.cwd(),
              "/etc/letsencrypt/live/sparta-emil.shop/privkey.pem"
            ),
            "utf8"
          )
          .toString(),
        cert: fs
          .readFileSync(
            path.resolve(
              process.cwd(),
              "/etc/letsencrypt/live/sparta-emil.shop/cert.pem"
            ),
            "utf8"
          )
          .toString(),
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
