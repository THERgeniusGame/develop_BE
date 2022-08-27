const express = require("express");
const router = express.Router();

const userRoter = require("./user.router");

router.use("/user", userRoter);

module.exports = router;