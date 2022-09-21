const router = require("express").Router();
const authController = require("../controller/authController");
const catchError = require("./../utils/catchError");

router.post("/signup", catchError(authController.signup));

router.post("/login", catchError(authController.login));

module.exports = router;
