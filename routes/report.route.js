const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const ReportController = require("../controllers/report.controller");
const reportController = new ReportController();

const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();


/**
 * @swagger
 * tags:
 *   name: Report
 *   description: The Report managing API
 */

/**
 * @swagger
 * /api/report:
 *   get:
 *     summary: Report
 *     tags: [Report]
 *     parameters:
 *      - name: roomId
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

router.get("/",authMiddleware, reportController.getReportList);
router.post("/", authMiddleware,reportController.setReport);
router.get("/:reportId", authMiddleware,reportController.getReport);
router.put("/:reportId", authMiddleware,reportController.editReport);
router.delete("/:reportId", authMiddleware,reportController.deleteReport);

//comment
router.get("/:reportId/comment", commentController.getComment);
router.post("/:reportId/comment",authMiddleware, commentController.setComment);
router.put("/:reportId/comment", authMiddleware,commentController.editComment);
module.exports = router;
