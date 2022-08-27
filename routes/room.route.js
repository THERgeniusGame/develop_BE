const express = require("express");
const roomRouter = express.Router();

const RoomController = require("../controllers/room.controller");
const roomController = new RoomController();

roomRouter.get("/", roomController.getRobby);
roomRouter.post("/", roomController.createRoom);

module.exports = roomRouter;
