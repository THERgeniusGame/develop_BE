const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { Server } = require("socket.io");
const EventConnection = require("./event/connection");
require("dotenv").config();
const env = process.env;

class IO {
  eventConnection = new EventConnection();
  constructor(app) {
    try {
      if (env.CHECK_HTTPS==1) {
        this.server = https.createServer(
          {
            ca: fs.readFileSync(
              "/etc/letsencrypt/live/sparta-emil.shop/fullchain.pem"
            ),
            key: fs.readFileSync(
                path.resolve(
                  process.cwd(),
                  "/etc/letsencrypt/live/sparta-emil.shop/privkey.pem"
                ),
                "utf8"
              )
              .toString(),
            cert: fs.readFileSync(
                path.resolve(
                  process.cwd(),
                  "/etc/letsencrypt/live/sparta-emil.shop/cert.pem"
                ),
                "utf8"
              )
              .toString(),
          },
          app
        );
      } else {
        this.server = http.createServer(app);
      }
      this.connectServer(this.server);
    } catch (err) {
      console.log(err);
    }
  }

  connectServer = async (server) => {
    try {
      let io = new Server(server, {
        cors: {
          origin: "*"
        }
      });
      this.eventConnection.connection(io);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = IO;
