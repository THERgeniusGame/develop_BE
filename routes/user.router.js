const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const headerMiddleware = require("../middlewares/header.middleware");
const signupMiddleware = require("../middlewares/signup.middleware");
const userController = new UserController();


router.post("/signup",signupMiddleware , userController.signup);
router.post("/login", signupMiddleware , userController.login);
router.post("/checkemail", userController.checkemail);
router.post("/checknickname", userController.checknickname);
router.get("/header", headerMiddleware , userController.userinfo);

module.exports = router;