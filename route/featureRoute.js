const router = require("express").Router();
const featureController = require("../controller/featureController");
const authController = require("../controller/authController");
const catchError = require("./../utils/catchError");

router.post(
  "/addfav",
  catchError(authController.isLoggedIn),
  catchError(featureController.addFav)
);
router.post(
  "/removefav",
  catchError(authController.isLoggedIn),
  catchError(featureController.removeFav)
);

router.get("/getfav", catchError(featureController.getFav));
module.exports = router;
