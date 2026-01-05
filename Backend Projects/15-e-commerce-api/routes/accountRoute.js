const express = require("express");
const router = express.Router();
const { logoutUser } = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/").get(verifyJWT, logoutUser);

module.exports = router;
