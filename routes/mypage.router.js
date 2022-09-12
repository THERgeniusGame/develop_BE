const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();

/**
 * @swagger
 * tags:
 *   name: Mypage
 *   description: The Mypage managing API
 */

router.use(auth);

/**
 * @swagger
 * /api/mypage:
 *   get:
 *     summary: Mypage
 *     tags: [Mypage]
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

router.get("/mypage", mypageController.mypage);
router.delete("/mypage", mypageController.Withdrawal);

module.exports = router;
