const express = require("express");
const router = express.Router();
const { userRegister } = require('../controllers/authCotrollers');

router.post("/", userRegister);

module.exports = router;
