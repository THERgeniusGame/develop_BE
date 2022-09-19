const express = require("express");
const router = express.Router();
//const auth = require("../middlewares/auth.middleware");
const RankController = require("../controllers/rank.controller");
const rankController = new RankController();

//router.use(auth);
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
 *     summary: Rank
 *     tags: [Rank]
 *     parameters:
 *      - name: userId
 *        in: header
 *        description: The information of mypage
 *        require: true
 *     responses:
 *       200:
 *         description: The information of header
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 *       400:
 *           description: error
 */

router.get("/rank/my", rankController.rankMy);
router.get("/rank/list", rankController.rankList);

module.exports = router;
