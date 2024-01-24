const express = require("express");
const authcontroller = require("../controllers/authcontroller");
const router = express.Router();
router.post("/signup", authcontroller.signup);
router.post("/login", authcontroller.login);
router.post("/refreshToken", authcontroller.refreshToken);
router.get("/userData", authcontroller.userData);
router.post("/updatePassword", authcontroller.updatePassword);
router.post("/forgotPassword", authcontroller.forgotPassword);
router.post("/resetPassword", authcontroller.resetPassword);
module.exports = router;