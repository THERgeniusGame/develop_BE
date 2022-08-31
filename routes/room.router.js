const express = require("express");
const roomRouter = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const RoomController = require("../controllers/room.controller");
const roomController = new RoomController();

roomRouter.get("/", authMiddleware, roomController.getRobby);
roomRouter.post("/", authMiddleware, roomController.createRoom);

module.exports = roomRouter;
