const express = require("express");
const router = express.Router();
//const auth = require("../middlewares/auth.middleware");
const RankController = require("../controllers/rank.controller");
const rankController = new RankController();

//router.use(auth);
/**
 * @swagger
 * components:
 *   schemas:
 *     RankMy:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *           description: The nickname of the user
 *         win:
 *           type: integer
 *           description: The number of winnings
 *         lose:
 *           type: integer
 *           description: The number of losings
 *         total:
 *           type: integer
 *           description: The number of play the games
 *         rank:
 *           type: integer
 *           description: The rank of the user
 *       example:
 *         nickname: 채종원
 *         win: 10
 *         lost: 900
 *         total: 999
 *         rank: 99
 *     RankList:
 *       type: object
 *       properties:
 *         rank:
 *           type: integer
 *           description: The rank of the user
 *         nickname:
 *           type: string
 *           description: The nickname of the user
 *         winavg:
 *           type: integer
 *           description: The number of winnings
 *       example:
 *         rank: 1
 *         nickname: 최성영
 *         winavg: 50
 */

/**
 * @swagger
 * tags:
 *   name: Rank
 *   description: The Rank managing API
 */

/**
 * @swagger
 * /api/rank/my:
 *   get:
 *     summary: The rank information of the user
 *     tags: [Rank]
 *     parameters:
 *      - name: userId
 *        in: header
 *        description: The information of mypage
 *        require: true
 *     responses:
 *       200:
 *         description: The rank information of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RankMy'
 *       400:
 *           description: error
 */

router.get("/rank/my", rankController.rankMy);
/**
 * @swagger
 * /api/rank/list:
 *   get:
 *     summary: The rank information
 *     tags: [Rank]
 *     responses:
 *       200:
 *         description: The rank information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RankList'
 *       400:
 *           description: error
 */
router.get("/rank/list", rankController.rankList);

module.exports = router;
