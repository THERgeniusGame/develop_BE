const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const headerMiddleware = require("../middlewares/header.middleware");
const signupMiddleware = require("../middlewares/signup.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const userController = new UserController();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       properties:
 *         userId:
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
 *         confirmPw:
 *           type: string
 *           description: Checking the password
 *         win:
 *           type: integer
 *           description: The number of winnings
 *         lose:
 *           type: integer
 *           description: Checking the password
 *         total:
 *           type: integer
 *           description: The number of play the games
 *       example:
 *         email: test@test.com
 *         nickname: nickname
 *         password: 1234qwer
 *         confirmPw: 1234qwer
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: test@test.com
 *         password: 1234qwer
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
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: 회원가입이 완료되었습니다.
 *       400:
 *           description: Something is wrong
 */
//회원가입
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
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: The user successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: token
 *       400:
 *           description: Something is wrong
 */
//로그인
router.post("/login", userController.login);
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
 *             type: string
 *             example:
 *               email: test@test.com
 *     responses:
 *       200:
 *         description: Available email
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 message: "사용가능한 이메일 입니다."
 *                 success: true
 *       400:
 *          description: Disavailable email
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                example:
 *                  message: "중복된 이메일 입니다."
 *                  success: false
 */
//이메일 중복확인
router.post("/checkemail", userController.checkemail);
/**
 * @swagger
 * /api/user/changePw:
 *   post:
 *     summary: changePw
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example:
 *               password:password
 *               confirmPw:confirmPw
 *     responses:
 *       200:
 *         description: Available nickname
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 message: "password change success"
 *                 success: true
 *       400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                example:
 *                  message: "Bad request"
 *                  success: false
 */
//비밀번호 찾기
router.patch("/changePw", userController.changePw);
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
 *             type: string
 *             example:
 *               nickname: 닉네임
 *     responses:
 *       200:
 *         description: Available nickname
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 message: "사용 가능한 닉네임 입니다."
 *                 success: true
 *       400:
 *          description: Disavailable nickname
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                example:
 *                  message: "중복된 닉네임 입니다."
 *                  success: false
 */
//닉네임 중복확인
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

 *       400:
 *           description: The issue of the token
 */
//헤더 값
router.get("/header", headerMiddleware, userController.userinfo);

router.delete("/secession",authMiddleware, userController.secession);

/**
 * @swagger
 * /api/user/kakao:
 *   post:
 *     summary: Singup
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       200:
 *         description: The user successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: token
 *       400:
 *           description: Something is wrong
 */
//카카오 로그인
router.post("/kakao", userController.kakaologin);

module.exports = router;
