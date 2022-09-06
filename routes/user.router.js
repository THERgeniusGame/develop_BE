const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const headerMiddleware = require("../middlewares/header.middleware");
const signupMiddleware = require("../middlewares/signup.middleware");
const userController = new UserController();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         UserId:
 *           type: integer
 *           description: The auto generated id of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         nickname:
 *           type: string
 *           description: The nickname of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         win:
 *           type: integer
 *           description: The number of winnings
 *         total:
 *           type: integer
 *           description: The number of play the games
 *       example:
 *         userId: 1
 *         email: test@test.com
 *         nickname: nickname
 *         password: 1234qwer
 *         win: 5
 *         total: 10
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Singup
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *           description: Something is wrong
 */

router.post("/signup", signupMiddleware, userController.signup);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *           description: Something is wrong
 */

router.post("/login", signupMiddleware, userController.login);
/**
 * @swagger
 * /api/user/checkemail:
 *   post:
 *     summary: Checkemail
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Available email
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *           description: The input value dose not exist
 */
router.post("/checkemail", userController.checkemail);
/**
 * @swagger
 * /api/user/checknickname:
 *   post:
 *     summary: Checknickname
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Available nickname
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *           description: The input value dose not exist
 */
router.post("/checknickname", userController.checknickname);
/**
 * @swagger
 * /api/user/header:
 *   get:
 *     summary: The information of header
 *     tags: [Users]
 *     parameters:
 *      - name: token
 *        in: header
 *        description: To check userInfo
 *        require: true
 *     responses:
 *       200:
 *         description: The information of header
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *           description: The issue of the token
 */
router.get("/header", headerMiddleware, userController.userinfo);

module.exports = router;
