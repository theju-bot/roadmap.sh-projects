const express = require("express");
const router = express.Router();
const { userLogout } = require("../controllers/authCotrollers");

router.post("/", userLogout);

module.exports = router;
