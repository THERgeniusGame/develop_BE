const express = require("express");
const router = express.Router();

const gameController = require("../controllers/playGame.controller");
const GameController = new gameController();

router.get("/:roomId", GameController.visitGame);

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: The Games managing API
 */

/**
 * @swagger
 * /api/room/{roomId}:
 *   post:
 *     summary: Checking the password of the room
 *     tags: [Games]
 *     parameters:
 *       - name: roomId
 *         in: path
 *         description: The roomId which the user enters the roomPw to enter
 *         require: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example:
 *               roomPw: "1234"
 *     responses:
 *       200:
 *         description: Correct roomPw
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 success: true
 *       400v:
 *          description: Invalid roomPw
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                example:
 *                  message: "Invalid roomPw"
 *       400c:
 *          description: Incorrect roomPw
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                example:
 *                  message: "Incorrect roomPw"
 */

//상세방입장 비번 확인
router.post("/:roomId", GameController.checkPw);

module.exports = router;
