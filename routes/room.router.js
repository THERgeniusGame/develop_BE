const express = require("express");
const roomRouter = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const RoomController = require("../controllers/room.controller");
const roomController = new RoomController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         roomId:
 *           type: integer
 *           description: The auto generated id of the room
 *         roomTitle:
 *           type: string
 *           description: The name of room
 *         roomLock:
 *           type: boolean
 *           description: private room - 1, public room - 0
 *         roomPw:
 *           type: string
 *           description: The password to enter the room
 *         userId:
 *           type: integer
 *           description: The id of user who creat this room
 *       example:
 *         roomId: 1
 *         roomTitle: room1
 *         roomLock: false
 *         roomPw: null
 *         userId: 1
 */

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: The Rooms managing API
 */

/**
 * @swagger
 * /api/room:
 *   get:
 *     summary: Returns the list of all the rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: The list of the rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       400:
 *         description: The rooms information does not exist
 */

roomRouter.get("/", authMiddleware, roomController.getRobby);

/**
 * @swagger
 * /api/room:
 *   post:
 *     summary: Creates a room and returns a roomId
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: The room was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *         400:
 *           description: The user information does not exist
 *
 */

roomRouter.post("/", authMiddleware, roomController.createRoom);

/**
 * @swagger
 * /api/room/search:
 *   get:
 *     summary: Returns the list of the rooms searched
 *     tags: [Rooms]
 *     parameters:
 *      - name: keyword
 *        in: query
 *        description: The keyword to search rooms
 *        require: true

 *     responses:
 *       200:
 *         description: The list of the rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       400:
 *         description: The rooms information does not exist
 */
roomRouter.get("/search", authMiddleware, roomController.searchRoom);

module.exports = roomRouter;
